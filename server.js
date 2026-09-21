import express from "express";
import path from "path";
import multer from "multer";
import nodemailer from "nodemailer";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

// 1. Multer Memory Storage with 5MB strict limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const app = express();
const PORT = process.env.PORT || 3000;

// 2. CORS configuration allowing POST, GET, PUT, DELETE, OPTIONS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
}));
app.options('*', cors());

app.use(express.json());

// 3. Top-Level Anti-Sleep Ping Route (Must come first for cron-job.org)
app.get("/api/ping", (req, res) => {
  res.status(200).json({ message: "Server is awake" });
});

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "Server is awake" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is awake" });
});

// Multer error handling wrapper
const uploadMiddleware = (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: "File size exceeds the 5MB limit. Please upload a smaller document." });
    } else if (err) {
      return res.status(400).json({ error: err.message || "File upload error" });
    }
    next();
  });
};

// ==========================================
// 4. Doctor Onboarding Intake API (Explicit POST)
// ==========================================
app.post("/api/intake", uploadMiddleware, async (req, res) => {
  try {
    const { name, pmdc, whatsapp, clinic, selectedPackage } = req.body;
    const files = req.files || [];
    
    console.log("📥 NEW DOCTOR ONBOARDING INTAKE RECEIVED:", {
      name,
      pmdc,
      whatsapp,
      clinic,
      selectedPackage,
      fileCount: files.length,
    });

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

    const mailOptions = {
      from: `Honeybee Intake <${process.env.EMAIL_USER || 'honeybeecodestudio@gmail.com'}>`,
      to: process.env.COMPANY_EMAIL || 'honeybeecodestudio@gmail.com',
      replyTo: (pmdc && pmdc.includes('@')) ? pmdc.trim() : undefined,
      subject: `🚨 New Clinical Onboarding: ${name || 'Doctor'} - ${clinic || 'Clinic'}`,
      text: emailBody,
      attachments: files.map(file => ({
        filename: file.originalname,
        content: file.buffer,
      })),
    };

    if (!process.env.EMAIL_APP_PASSWORD) {
      console.error("❌ EMAIL_APP_PASSWORD not set in Render environment.");
      return res.status(500).json({ success: false, error: "Email server credentials not configured." });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || 'honeybeecodestudio@gmail.com',
        pass: (process.env.EMAIL_APP_PASSWORD || '').replace(/\s+/g, ''),
      },
    });

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ 
      success: true, 
      message: "Intake received successfully",
      recipient: "honeybeecodestudio@gmail.com" 
    });
  } catch (error) {
    console.error("Intake Processing Error:", error);
    return res.status(500).json({ success: false, error: error.message || "Failed to process intake" });
  }
});

// ==========================================
// 5. Catch-All Static & 404 Routes (MUST BE AT THE END)
// ==========================================
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(404).send("API server is running. Frontend is deployed separately.");
    }
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});