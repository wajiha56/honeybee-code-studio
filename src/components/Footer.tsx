import { useState } from 'react';
import { Terminal, Loader2, Mail, Phone, Facebook, MessageSquare, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getBaseUrl, PRIMARY_COMPANY_EMAIL, COMPANY_EMAILS } from '../config';

export default function Footer() {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    whatsapp: '', 
    service: '', 
    message: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'error'>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const getDirectMailtoUrl = () => {
    const to = COMPANY_EMAILS.join(',');
    const subject = encodeURIComponent(`[Quote Request] ${formData.name || 'Client'} - ${formData.service || 'Clinical Project'}`);
    const body = encodeURIComponent(`Hello Honeybee Code Studio,

I would like to request a custom quote:
• Name: ${formData.name}
• Email: ${formData.email}
• WhatsApp: ${formData.whatsapp}
• Service Needed: ${formData.service}

Project Requirements:
${formData.message}

Please get in touch with me soon.`);
    return `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const getDirectWhatsAppUrl = () => {
    const text = encodeURIComponent(`*New Project Quote Request - Honeybee Code Studio*
• Name: ${formData.name}
• Email: ${formData.email}
• WhatsApp: ${formData.whatsapp}
• Service: ${formData.service}
• Requirements: ${formData.message}`);
    return `https://wa.me/923000000000?text=${text}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setErrorMessage('');

    const baseUrl = getBaseUrl().replace(/\/$/, '');
    const primaryEndpoint = baseUrl ? `${baseUrl}/api/quote` : '/api/quote';
    const endpoints = [primaryEndpoint, '/api/quote'].filter((v, i, a) => a.indexOf(v) === i);

    let success = false;
    let serverError = '';

    for (const endpoint of endpoints) {
      try {
        console.log(`[Quote] Dispatching quote to: ${endpoint}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 45000);

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const data = await response.json().catch(() => ({}));
        if (response.ok && data.success === true) {
          success = true;
          break;
        } else {
          serverError = data.error || 'Server error during submission.';
        }
      } catch (err: any) {
        console.warn(`[Quote] Endpoint ${endpoint} failed:`, err);
        if (err.name === 'AbortError') {
          serverError = 'Submission timed out. Please check your internet connection and try again.';
        } else {
          serverError = 'Unable to connect to the server. Please check your internet connection and try again.';
        }
      }
    }

    setIsSubmitting(false);

    if (success) {
      setStatus('success');
      setFormData({ name: '', email: '', whatsapp: '', service: '', message: '' });
    } else {
      setStatus('error');
      setErrorMessage(serverError);
    }
  };

  return (
    <footer id="contact" className="bg-transparent pt-32 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Golden Ambient Lighting behind Footer */}
      <div className="absolute right-0 bottom-10 w-[700px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-0 bottom-20 w-[500px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24 items-center">
          
          {/* CTA & Info */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-6 font-normal leading-tight drop-shadow-[0_0_18px_rgba(250,204,21,0.3)]">
              Take Control of Your Digital Clinic,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 font-medium">100% Hassle-Free.</span>
            </h2>
            <p className="text-slate-300 font-sans font-normal max-w-md mb-8 md:mb-12 text-sm md:text-base leading-relaxed">
              No hidden fees, no subscriptions—just a fair, exemplary system built by medical professionals, for medical professionals.
            </p>
            
            <div className="flex items-center space-x-3 text-amber-400/80 mb-8">
              <Terminal className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
              <span className="font-sans tracking-[0.2em] text-xs uppercase font-semibold">Terminal Access // System Online</span>
            </div>
            
            <div className="space-y-6 pt-2">
              <div className="flex items-center space-x-4 text-xl md:text-2xl font-bold font-sans tracking-wide">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 shadow-[0_0_20px_rgba(250,204,21,0.25)]">
                  <Mail className="w-6 h-6 text-amber-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]" />
                </div>
                <a href="mailto:honeybeecodestudio@gmail.com" className="text-amber-400 hover:text-white transition-colors font-extrabold tracking-normal break-all drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]">
                  honeybeecodestudio@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-4 text-xl md:text-2xl font-bold font-sans tracking-wide">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 shadow-[0_0_20px_rgba(250,204,21,0.25)]">
                  <Phone className="w-6 h-6 text-amber-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]" />
                </div>
                <a href="tel:03456547567" className="text-amber-400 hover:text-white transition-colors font-extrabold tracking-wider drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]">
                  03456547567
                </a>
              </div>
              <div className="flex items-center space-x-4 text-xl md:text-2xl font-bold font-sans tracking-wide">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 shadow-[0_0_20px_rgba(250,204,21,0.25)]">
                  <Facebook className="w-6 h-6 text-amber-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]" />
                </div>
                <a href="https://web.facebook.com/profile.php?id=61589837396492" target="_blank" rel="noreferrer" className="text-amber-400 hover:text-white transition-colors font-black tracking-wide drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]">
                  Honeybee Code Studio
                </a>
              </div>
            </div>
          </div>
          
          {/* Hexagon Main Container (Modern Tech Chamfered Polygon) */}
          <div className="relative flex justify-center w-full">
            <div 
              className="relative w-full max-w-[580px] transition-all duration-300"
              style={{ filter: 'drop-shadow(0 0 25px rgba(245, 158, 11, 0.18))' }}
            >
              {/* Outer chamfered hexagon glowing border wrapper */}
              <div 
                className="w-full p-[1.5px] bg-gradient-to-br from-amber-400/60 via-amber-500/25 to-amber-400/50 clip-tech-hexagon"
                style={{ clipPath: 'polygon(5% 0, 95% 0, 100% 10%, 100% 90%, 95% 100%, 5% 100%, 0 90%, 0 10%)' }}
              >
                {/* Inner Hexagon Container with dark glassmorphism (bg-neutral-900/80) */}
                <div 
                  className="w-full bg-neutral-900/80 backdrop-blur-lg pt-10 pb-10 px-8 sm:px-12 flex flex-col justify-between clip-tech-hexagon"
                  style={{ clipPath: 'polygon(5% 0, 95% 0, 100% 10%, 100% 90%, 95% 100%, 5% 100%, 0 90%, 0 10%)' }}
                >
                  {/* Form with Clean Blank Inputs & Placeholder Hints Only */}
                  <form onSubmit={handleSubmit} className="w-full space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-sans font-medium tracking-wide text-slate-300">
                          Your Name <span className="text-amber-400">*</span>
                        </label>
                        <input 
                          required
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-black/40 border border-zinc-800 text-white font-sans text-base normal-case placeholder-gray-500 p-4 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                          placeholder="Dr. Full Name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-sans font-medium tracking-wide text-slate-300">
                          Email Address <span className="text-amber-400">*</span>
                        </label>
                        <input 
                          required
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-black/40 border border-zinc-800 text-white font-sans text-base normal-case placeholder-gray-500 p-4 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                          placeholder="doctor@clinic.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-sans font-medium tracking-wide text-slate-300">
                          WhatsApp / Mobile <span className="text-amber-400">*</span>
                        </label>
                        <input 
                          required
                          type="tel" 
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                          className="w-full bg-black/40 border border-zinc-800 text-white font-sans text-base normal-case placeholder-gray-500 p-4 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                          placeholder="+92 300 1234567"
                        />
                      </div>
                      
                      {/* Service Needed Dropdown */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-sans font-medium tracking-wide text-slate-300">
                          Service Needed <span className="text-amber-400">*</span>
                        </label>
                        <select 
                          required 
                          value={formData.service} 
                          onChange={(e) => setFormData({...formData, service: e.target.value})} 
                          className="w-full bg-black/40 border border-zinc-800 text-white font-sans text-base normal-case p-4 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none cursor-pointer"
                        >
                          <option value="" disabled className="bg-neutral-900 text-gray-500">Select a service...</option>
                          <option value="Software & Web Development" className="bg-neutral-900 text-white">Software & Web Development</option>
                          <option value="GBP Optimization" className="bg-neutral-900 text-white">GBP Optimization</option>
                          <option value="SEO & Marketing" className="bg-neutral-900 text-white">SEO & Marketing</option>
                          <option value="Other / Custom Enterprise" className="bg-neutral-900 text-white">Other / Custom Enterprise</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-medium tracking-wide text-slate-300">
                        Requirements <span className="text-amber-400">*</span>
                      </label>
                      <textarea 
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-black/40 border border-zinc-800 text-white font-sans text-base normal-case placeholder-gray-500 p-4 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
                        placeholder="Requirements"
                      ></textarea>
                    </div>
                    
                    {status === 'success' && (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-sans flex items-center gap-2.5 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        <span>Your request has been submitted.</span>
                      </div>
                    )}
                    {status === 'error' && (
                      <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-sm font-sans space-y-3">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                          <p className="font-medium">{errorMessage}</p>
                        </div>
                        <div className="pt-2 border-t border-rose-500/20 flex flex-wrap gap-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold rounded-lg border border-rose-500/40 transition-colors cursor-pointer"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
                            Retry Send
                          </button>
                          <a
                            href={getDirectWhatsAppUrl()}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 text-xs font-semibold rounded-lg border border-emerald-500/40 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            WhatsApp Quote
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {/* Prominent Submit Button with Render wake-up handling */}
                    <div className="w-full pt-2">
                      <button 
                        disabled={isSubmitting} 
                        type="submit" 
                        className="bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-sans font-bold text-base w-full p-4 rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <span>Submit Request</span>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-row items-center justify-between">
          <p className="text-xs font-sans text-gray-400">
            &copy; {new Date().getFullYear()} Honey Bee Code Studio. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-xs font-sans tracking-widest text-gray-400 hover:text-amber-300 uppercase transition-colors">Privacy</a>
            <a href="#" className="text-xs font-sans tracking-widest text-gray-400 hover:text-amber-300 uppercase transition-colors">Terms</a>
            <a href="#" className="text-xs font-sans tracking-widest text-gray-400 hover:text-amber-300 uppercase transition-colors">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
