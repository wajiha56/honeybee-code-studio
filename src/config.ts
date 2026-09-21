/**
 * Application Configuration & API Base URL
 * 
 * Supports split-deployment architectures (Vercel frontend + Render backend)
 * as well as unified preview environments (AI Studio Cloud Run container):
 */

export const COMPANY_EMAILS = ['honeybeecodestudio@gmail.com'];
export const PRIMARY_COMPANY_EMAIL = 'honeybeecodestudio@gmail.com';
export const WHATSAPP_CONTACT = '+92 300 0000000'; // Default business contact line

export const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    const isClientLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const envUrl = import.meta.env.VITE_BACKEND_URL;

    // If client is on localhost, and envUrl is provided, use it:
    if (isClientLocalhost) {
      return (envUrl || 'http://localhost:3000').replace(/\/$/, '');
    }

    // In production (Vercel, Netlify, custom domain, or live browser preview):
    // If VITE_BACKEND_URL is provided and is a valid remote URL, use it.
    if (envUrl && typeof envUrl === 'string' && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
      return envUrl.replace(/\/$/, '');
    }

    // Fallback production backend URL on Render:
    return 'https://honeybee-code-studio.onrender.com';
  }

  return (import.meta.env.VITE_BACKEND_URL || 'https://honeybee-code-studio.onrender.com').replace(/\/$/, '');
};

export const BASE_URL: string = getBaseUrl();

