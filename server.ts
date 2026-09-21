import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import multer from "multer";
import nodemailer from "nodemailer";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

// Strictly limit file uploads to 5MB to avoid memory crashes on Render free tier
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Backend CORS Configuration
  // Configured to allow all origins, methods, and headers for Vercel and local environments
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  }));
  app.options('*', cors());

  app.use(express.json());

  // 1. Anti-Sleep Ping Route (For cron-job.org / Keep-Alive)
  app.get("/api/ping", (req, res) => {
    res.status(200).json({ message: "Server is awake" });
  });

  // Additional alias endpoints for uptime monitors
  app.get("/ping", (req, res) => {
    res.status(200).json({ message: "Server is awake" });
  });

  app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is awake" });
  });

  // Target Company Email: Client submissions MUST only go directly to official company mail
  const COMPANY_EMAIL_TARGET = (
    process.env.COMPANY_EMAIL ||
    process.env.EMAIL_TO ||
    'honeybeecodestudio@gmail.com'
  ).trim();

  // Exclude any personal emails, strictly send to official company email only
  const RECIPIENT_EMAILS = COMPANY_EMAIL_TARGET
    .split(',')
    .map(s => s.trim())
    .filter(s => s && s.toLowerCase() !== 'mjiya0056@gmail.com')
    .join(', ') || 'honeybeecodestudio@gmail.com';

  // Robust SMTP credentials handling (supports multiple env names & automatically strips spaces from Google App Passwords)
  const EMAIL_USER = (
    process.env.EMAIL_USER ||
    process.env.MAIL_USER ||
    process.env.GMAIL_USER ||
    'honeybeecodestudio@gmail.com'
  ).trim();

  const EMAIL_PASS = (
    process.env.EMAIL_APP_PASSWORD ||
    process.env.EMAIL_PASS ||
    process.env.EMAIL_PASSWORD ||
    process.env.GMAIL_APP_PASSWORD ||
    process.env.APP_PASSWORD ||
    ''
  ).replace(/\s+/g, '');

  if (!EMAIL_PASS) {
    console.warn("⚠️ Notice: EMAIL_APP_PASSWORD / EMAIL_PASS is not detected in environment. Inquiries will be logged to server console until configured.");
  } else {
    console.log(`✅ Nodemailer configured with sender: ${EMAIL_USER} -> Recipient (Company Only): ${RECIPIENT_EMAILS}`);
  }

  // Nodemailer transporter initialization
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  if (EMAIL_PASS) {
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ SMTP Verification failed:', error.message);
      } else {
        console.log(`✅ SMTP Server verified: ready to dispatch messages directly to ${RECIPIENT_EMAILS}`);
      }
    });
  }

  // Multer upload wrapper to handle file size limit errors gracefully
  const uploadMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    upload.any()(req, res, (err) => {
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: "File size exceeds the 5MB limit. Please upload a smaller document." });
      } else if (err) {
        return res.status(400).json({ error: err.message || "File upload error" });
      }
      next();
    });
  };

  // API Route: Doctor Onboarding Intake (/api/intake)
  app.post("/api/intake", uploadMiddleware, async (req, res) => {
    try {
      const { name, pmdc, whatsapp, clinic, selectedPackage } = req.body;
      const files = (req.files as Express.Multer.File[]) || [];
      
      // Prominently log submission details to console so company never misses data even if SMTP is delayed
      console.log("==================================================");
      console.log("📥 NEW DOCTOR ONBOARDING INTAKE RECEIVED:");
      console.log(`Doctor Name:     ${name || 'N/A'}`);
      console.log(`PMDC / Email:    ${pmdc || 'N/A'}`);
      console.log(`WhatsApp:        ${whatsapp || 'N/A'}`);
      console.log(`Clinic:          ${clinic || 'N/A'}`);
      console.log(`Service/Package: ${selectedPackage || 'N/A'}`);
      console.log(`Files Attached:  ${files.length} file(s)`);
      console.log(`Timestamp:       ${new Date().toISOString()}`);
      console.log("==================================================");

      const emailBody = `
==================================================
HONEYBEE CODE STUDIO - NEW CLINICAL ONBOARDING DOSSIER
==================================================

• Doctor Name:        ${name || 'N/A'}
• PMDC No. / Email:   ${pmdc || 'N/A'}
• WhatsApp / Mobile:  ${whatsapp || 'N/A'}
• Clinic / Hospital:  ${clinic || 'N/A'}
• Service Required:   ${selectedPackage || 'N/A'}
• Attached Files:     ${files.map(f => `${f.originalname} (${(f.size / 1024).toFixed(1)} KB)`).join(', ') || 'None'}
• Submitted At:       ${new Date().toLocaleString()}

--------------------------------------------------
Direct Doctor Contact:
• WhatsApp: ${whatsapp || 'N/A'}
• Email:    ${pmdc && pmdc.includes('@') ? pmdc : 'N/A'}
==================================================
`;

      const mailOptions: any = {
        from: `Honeybee Intake <${EMAIL_USER}>`,
        to: RECIPIENT_EMAILS,
        replyTo: (pmdc && pmdc.includes('@')) ? pmdc.trim() : undefined,
        subject: `🚨 New Clinical Onboarding: ${name || 'Doctor'} - ${clinic || 'Clinic'}`,
        text: emailBody,
        attachments: files.map(file => ({
          filename: file.originalname,
          content: file.buffer,
        })),
      };

      if (!EMAIL_PASS) {
        console.error("❌ Email sending failed: EMAIL_APP_PASSWORD is not configured in server environment.");
        return res.status(500).json({ 
          success: false, 
          error: "Email server credentials not configured. Please contact the administrator." 
        });
      }

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to [${RECIPIENT_EMAILS}]. Message ID:`, info.messageId);
        return res.status(200).json({ 
          success: true, 
          message: "Intake received successfully",
          recipient: RECIPIENT_EMAILS,
        });
      } catch (emailError: any) {
        console.error('❌ Nodemailer Intake Email Error:', emailError);
        return res.status(500).json({
          success: false,
          error: "Failed to dispatch email: " + (emailError.message || "SMTP error"),
        });
      }
    } catch (error: any) {
      console.error('Intake Processing Error:', error);
      return res.status(500).json({ success: false, error: error.message || "Failed to process intake" });
    }
  });

  // API Route: Project Quote / Direct Clinical Intake (/api/quote)
  app.post("/api/quote", async (req, res) => {
    try {
      const { name, email, whatsapp, service, message } = req.body;
      
      console.log("==================================================");
      console.log("📥 NEW PROJECT QUOTE REQUEST RECEIVED:");
      console.log(`Client Name: ${name || 'N/A'}`);
      console.log(`Email:       ${email || 'N/A'}`);
      console.log(`WhatsApp:    ${whatsapp || 'N/A'}`);
      console.log(`Service:     ${service || 'N/A'}`);
      console.log(`Message:     ${message || 'N/A'}`);
      console.log(`Timestamp:   ${new Date().toISOString()}`);
      console.log("==================================================");

      const emailBody = `
==================================================
HONEYBEE CODE STUDIO - NEW PROJECT QUOTE REQUEST
==================================================

• Client Name:       ${name || 'N/A'}
• Client Email:      ${email || 'N/A'}
• WhatsApp / Mobile: ${whatsapp || 'N/A'}
• Service Needed:    ${service || 'N/A'}
• Submitted At:      ${new Date().toLocaleString()}

Project Requirements:
--------------------------------------------------
${message || 'No details provided.'}
--------------------------------------------------

Direct Reply Contact:
• WhatsApp: ${whatsapp || 'N/A'}
• Email:    ${email || 'N/A'}
==================================================
`;

      const mailOptions: any = {
        from: `Honeybee Quotes <${EMAIL_USER}>`,
        to: RECIPIENT_EMAILS,
        replyTo: (email && email.includes('@')) ? email.trim() : undefined,
        subject: `💼 New Project Quote Request from ${name || 'Client'} (${service || 'General'})`,
        text: emailBody,
      };

      if (!EMAIL_PASS) {
        console.error("❌ Email sending failed: EMAIL_APP_PASSWORD is not configured in server environment.");
        return res.status(500).json({ 
          success: false, 
          error: "Email server credentials not configured. Please contact the administrator." 
        });
      }

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully for quote to [${RECIPIENT_EMAILS}]. Message ID:`, info.messageId);
        return res.status(200).json({ 
          success: true, 
          message: 'Quote request submitted successfully.',
          recipient: RECIPIENT_EMAILS,
        });
      } catch (emailError: any) {
        console.error('❌ Nodemailer Quote Email Error:', emailError);
        return res.status(500).json({
          success: false,
          error: "Failed to dispatch email: " + (emailError.message || "SMTP error"),
        });
      }
    } catch (error: any) {
      console.error("Quote Processing Error:", error);
      return res.status(500).json({ success: false, error: error.message || "Failed to process quote request" });
    }
  });

  // API Route: AI Clinical Triage
  app.post("/api/triage", async (req, res) => {
    try {
      const { message } = req.body;
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const response = await model.generateContent(`You are a clinical triage assistant for an outpatient clinic in Gujranwala. Respond concisely to: ${message}`);
      
      return res.status(200).json({ success: true, response: response.text() });
    } catch (error: any) {
      console.error("Triage Error:", error);
      return res.status(500).json({ success: false, response: "Error in triage. Please contact clinic WhatsApp." });
    }
  });

  // Multer & General Error handling middleware (catches 5MB limit overflow)
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: "File size exceeds the 5MB limit. Please upload a smaller document." });
    }
    if (err) {
      console.error("Unhandled server error:", err);
      return res.status(500).json({ error: err.message || 'Internal server error' });
    }
    next();
  });

  // Vite middleware for development / production fallback
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
