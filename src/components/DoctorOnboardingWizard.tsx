import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { getBaseUrl } from '../config';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per file

const resolvePackageName = (pkg: string | null): string => {
  if (!pkg) return '';
  if (pkg === 'starter-hive' || pkg.toLowerCase().includes('starter')) {
    return 'Starter Hive (PKR 15,000/mo)';
  }
  if (pkg === 'queens-guard' || pkg.toLowerCase().includes('queen')) {
    return "Queen's Guard (PKR 45,000/mo)";
  }
  if (pkg === 'enterprise-swarm' || pkg.toLowerCase().includes('enterprise')) {
    return 'Enterprise Swarm (Custom)';
  }
  return pkg;
};

export default function DoctorOnboardingWizard() {
  const [searchParams] = useSearchParams();
  const packageParam = searchParams.get('package');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    name: '', 
    pmdc: '', 
    whatsapp: '', 
    clinic: '', 
    selectedPackage: resolvePackageName(packageParam) 
  });
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempt, setSubmitAttempt] = useState(0);
  
  useEffect(() => {
    if (packageParam) {
      setFormData(prev => ({ ...prev, selectedPackage: resolvePackageName(packageParam) }));
    }
  }, [packageParam]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const oversized = selectedFiles.filter(f => f.size > MAX_FILE_SIZE);
      
      if (oversized.length > 0) {
        setError(`File "${oversized[0].name}" exceeds the 5MB limit (${(oversized[0].size / (1024 * 1024)).toFixed(1)}MB). Please choose files under 5MB.`);
        return;
      }

      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const validateStep1 = () => {
    if (!formData.name.trim() || !formData.pmdc.trim() || !formData.whatsapp.trim() || !formData.clinic.trim() || !formData.selectedPackage) {
      setError('Please fill in all required fields and choose a package before continuing.');
      return false;
    }
    setError(null);
    return true;
  };

  const validateStep2 = () => {
    if (files.length === 0) {
      setError('Please upload your PMDC certificate or practice documents to continue.');
      return false;
    }

    const oversized = files.find(f => f.size > MAX_FILE_SIZE);
    if (oversized) {
      setError(`File "${oversized.name}" exceeds the 5MB size limit. Please remove it and upload a file under 5MB.`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!validateStep2()) return;
    setIsSubmitting(true);
    setError(null);
    setSubmitAttempt(prev => prev + 1);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    files.forEach(file => data.append('files', file));

    const baseUrl = getBaseUrl().replace(/\/$/, '');
    const primaryEndpoint = baseUrl ? `${baseUrl}/api/intake` : '/api/intake';
    const endpoints = [primaryEndpoint, '/api/intake'].filter((v, i, a) => a.indexOf(v) === i);

    let success = false;
    let serverErrorMessage = '';

    for (const endpoint of endpoints) {
      try {
        console.log(`[Onboarding] Dispatching intake to: ${endpoint}`);
        // Generous 60s timeout to allow large attachment uploads and SMTP dispatch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000);

        const response = await fetch(endpoint, {
          method: 'POST',
          body: data,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        const resData = await response.json().catch(() => ({}));
        if (response.ok && resData.success === true) {
          success = true;
          break;
        } else {
          serverErrorMessage = resData.error || 'Server error occurred during processing.';
        }
      } catch (err: any) {
        console.warn(`[Onboarding] Endpoint ${endpoint} failed:`, err);
        if (err.name === 'AbortError') {
          serverErrorMessage = 'Submission timed out while uploading files. Please try again with smaller attachments.';
        } else {
          serverErrorMessage = 'Unable to connect to the server. Please check your connection and try again.';
        }
      }
    }

    setIsSubmitting(false);

    if (success) {
      setStep(4);
    } else {
      setError(serverErrorMessage);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-lg mx-auto">
      <h1 className="text-4xl font-batman text-white mb-10 text-center">Clinical Onboarding</h1>
      
      {error && (
        <div className="p-4 mb-6 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-sm font-sans space-y-3">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <p className="font-medium text-left leading-relaxed">{error}</p>
          </div>
          
          <div className="pt-2 border-t border-rose-500/20 flex flex-wrap gap-2 justify-center sm:justify-start">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold rounded-lg border border-rose-500/40 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSubmitting ? 'animate-spin' : ''}`} />
              Retry Submit
            </button>
          </div>
        </div>
      )}
      
      {/* Hexagonal Form Container */}
      <div 
        className="relative w-full p-[1.5px] bg-gradient-to-br from-amber-400/60 via-amber-500/25 to-amber-400/50 clip-tech-hexagon"
        style={{ 
          clipPath: 'polygon(5% 0, 95% 0, 100% 10%, 100% 90%, 95% 100%, 5% 100%, 0 90%, 0 10%)',
          filter: 'drop-shadow(0 0 25px rgba(245, 158, 11, 0.18))'
        }}
      >
        <div 
          className="w-full bg-neutral-900/80 backdrop-blur-lg p-8 sm:p-10 clip-tech-hexagon"
          style={{ clipPath: 'polygon(5% 0, 95% 0, 100% 10%, 100% 90%, 95% 100%, 5% 100%, 0 90%, 0 10%)' }}
        >
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-sans font-medium tracking-wide text-slate-300">
                  Choose Package <span className="text-amber-400">*</span>
                </label>
                <select
                  value={formData.selectedPackage}
                  onChange={(e) => {
                    setFormData({ ...formData, selectedPackage: e.target.value });
                    setError(null);
                  }}
                  className="w-full bg-black/40 border border-zinc-800 text-white font-sans text-base normal-case p-4 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-neutral-900 text-gray-500">Choose Package...</option>
                  <option value="Starter Hive (PKR 15,000/mo)" className="bg-neutral-900 text-white">Starter Hive (PKR 15,000/mo)</option>
                  <option value="Queen's Guard (PKR 45,000/mo)" className="bg-neutral-900 text-white">Queen's Guard (PKR 45,000/mo)</option>
                  <option value="Enterprise Swarm (Custom)" className="bg-neutral-900 text-white">Enterprise Swarm (Custom)</option>
                  <option value="Other / Custom Package" className="bg-neutral-900 text-white">Other / Custom Package</option>
                </select>
              </div>
              <input className="w-full bg-black/40 p-4 border border-zinc-800 text-white font-sans text-base normal-case placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" placeholder="Dr. Full Name" value={formData.name} onChange={(e) => {setFormData({...formData, name: e.target.value}); setError(null);}} />
              <input className="w-full bg-black/40 p-4 border border-zinc-800 text-white font-sans text-base normal-case placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" placeholder="doctor@clinic.com" value={formData.pmdc} onChange={(e) => {setFormData({...formData, pmdc: e.target.value}); setError(null);}} />
              <input className="w-full bg-black/40 p-4 border border-zinc-800 text-white font-sans text-base normal-case placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" placeholder="+92 300 1234567" value={formData.whatsapp} onChange={(e) => {setFormData({...formData, whatsapp: e.target.value}); setError(null);}} />
              <input className="w-full bg-black/40 p-4 border border-zinc-800 text-white font-sans text-base normal-case placeholder-gray-500 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" placeholder="Clinic Name" value={formData.clinic} onChange={(e) => {setFormData({...formData, clinic: e.target.value}); setError(null);}} />
              <button className="bg-amber-500 hover:bg-amber-400 text-black font-sans font-bold text-base w-full p-4 rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer uppercase tracking-wider" onClick={() => { if (validateStep1()) setStep(2); }}>Next: Practice Documents</button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <label htmlFor="file-upload" className="block border-2 border-dashed border-zinc-700 p-12 mb-4 cursor-pointer hover:border-amber-500 transition-colors rounded-lg">
                <span className="text-lg font-batman block text-white">Upload Documents</span>
                <span className="text-xs font-montserrat text-gray-400 block mt-2">PMDC Certificate, License, or Practice ID</span>
              </label>
              <input id="file-upload" type="file" className="hidden" multiple onChange={handleFileChange} />
              {files.length > 0 && (
                <ul className="text-sm text-gray-400 mb-4 space-y-2">
                  {files.map((f, i) => (
                    <li key={i} className="flex justify-between items-center bg-black/40 p-2.5 rounded border border-zinc-700 text-left">
                      <div className="truncate mr-3">
                        <span className="text-white block truncate">{f.name}</span>
                        <span className="text-xs text-gray-500">{(f.size / 1024).toFixed(1)} KB</span>
                      </div>
                      <button onClick={() => {setFiles(files.filter((_, idx) => idx !== i)); setError(null);}} className="text-red-400 hover:text-red-200 font-bold px-2 cursor-pointer">X</button>
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex gap-3">
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-sans font-bold text-sm px-6 py-4 rounded-lg transition-all cursor-pointer uppercase tracking-wider" onClick={() => setStep(1)}>Back</button>
                <button className="bg-amber-500 hover:bg-amber-400 text-black font-sans font-bold text-base flex-1 p-4 rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer uppercase tracking-wider" onClick={() => { if (validateStep2()) setStep(3); }}>Next: Review</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-left space-y-4">
              <p className="text-slate-300 text-sm mb-4">Please verify your clinical onboarding details before submission:</p>
              
              <div className="bg-black/50 border border-white/10 rounded-lg p-4 space-y-2 text-xs font-mono text-slate-300">
                <div><span className="text-amber-400 font-semibold">Doctor:</span> {formData.name}</div>
                <div><span className="text-amber-400 font-semibold">PMDC/Email:</span> {formData.pmdc}</div>
                <div><span className="text-amber-400 font-semibold">WhatsApp:</span> {formData.whatsapp}</div>
                <div><span className="text-amber-400 font-semibold">Clinic:</span> {formData.clinic}</div>
                <div><span className="text-amber-400 font-semibold">Package:</span> {formData.selectedPackage}</div>
                <div><span className="text-amber-400 font-semibold">Files:</span> {files.map(f => f.name).join(', ') || 'None'}</div>
              </div>

              <button 
                className="bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-sans font-bold text-base w-full p-4 rounded-lg shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all cursor-pointer uppercase tracking-wider flex items-center justify-center gap-2" 
                onClick={handleSubmit} 
                disabled={isSubmitting}
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

              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-gray-400 hover:text-white underline cursor-pointer"
                >
                  Edit Information
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <div className="text-white font-batman text-2xl tracking-wide">Request Submitted Successfully</div>
              
              <p className="text-sm text-slate-300 font-sans leading-relaxed max-w-md mx-auto">
                Your onboarding request has been submitted. Our team will review your practice information and reach out to you shortly.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => {
                    setStep(1);
                    setFormData({ name: '', pmdc: '', whatsapp: '', clinic: '', selectedPackage: '' });
                    setFiles([]);
                    setError(null);
                  }}
                  className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

