/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Packages from './components/Packages';
import WhyChooseUs from './components/WhyChooseUs';
import Footer from './components/Footer';
import GeometricBee from './components/GeometricBee';
import { BeeProvider } from './BeeContext';
import DoctorOnboardingWizard from './components/DoctorOnboardingWizard';
import ShafishifaLookbook from './components/ShafishifaLookbook';

function AppContent() {
  const location = useLocation();
  return (
    <div className="w-[1280px] mx-auto min-h-screen bg-[#0a0a0a] text-white font-batman relative">
      {/* Golden Ambient Lighting & Atmospheric Glow Layers */}
      <div className="fixed inset-0 w-[1280px] mx-auto pointer-events-none z-0 overflow-hidden">
        {/* Top-Right Golden Atmospheric Flare (as seen in Honeybee reference design) */}
        <div className="absolute -top-24 -right-24 w-[550px] h-[550px] bg-gradient-to-bl from-amber-400/25 via-yellow-500/10 to-transparent rounded-full blur-[100px]" />
        
        {/* Top-Left Ambient Light Emission */}
        <div className="absolute -top-28 -left-28 w-[450px] h-[450px] bg-gradient-to-br from-amber-400/15 via-yellow-500/5 to-transparent rounded-full blur-[90px]" />
        
        {/* Central Core Honeycomb Radial Aura */}
        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[130px]" />

        {/* Lower Studio Atmosphere Glow */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-yellow-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Application content layer above the glow */}
      <div className="relative z-10 w-[1280px]">
        <Header />
        {location.pathname === '/' && <GeometricBee />}
        <Routes>
          <Route path="/" element={
            <main>
              <Hero />
              <Services />
              <Packages />
              <WhyChooseUs />
              <Footer />
            </main>
          } />
          <Route path="/onboarding" element={<DoctorOnboardingWizard />} />
          <Route path="/doctor/:id" element={<ShafishifaLookbook />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <BeeProvider>
        <div className="w-[1280px] mx-auto overflow-x-hidden min-h-screen bg-[#0a0a0a]">
          <AppContent />
        </div>
      </BeeProvider>
    </BrowserRouter>
  );
}
