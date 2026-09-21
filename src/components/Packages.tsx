import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PackageItem {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period?: string;
  badge?: string;
  features: string[];
  popular: boolean;
}

const packages: PackageItem[] = [
  {
    id: "starter-hive",
    name: "STARTER HIVE",
    tagline: "ESSENTIAL LOCAL GBP & MAP OPTIMIZATION FOR CLINICS",
    price: "PKR 15,000",
    period: "/mo",
    features: [
      "INITIAL GBP AUDIT & SETUP",
      "LOCAL KEYWORD STRATEGY (GUJRANWALA)",
      "MONTHLY PERFORMANCE REPORT",
      "STANDARD SUPPORT"
    ],
    popular: false
  },
  {
    id: "queens-guard",
    name: "QUEEN'S GUARD",
    tagline: "AGGRESSIVE SEO DOMINANCE & CLINICAL MARKETING INTEGRATION",
    price: "PKR 45,000",
    period: "/mo",
    badge: "MOST POPULAR",
    features: [
      "ADVANCED GBP MANAGEMENT & REVIEWS",
      "TECHNICAL MEDICAL SEO OVERHAUL",
      "PATIENT BOOKING & CONTENT STRATEGY",
      "WEEKLY ANALYTICS REVIEW",
      "PRIORITY API & TELEHEALTH INTEGRATION"
    ],
    popular: true
  },
  {
    id: "enterprise-swarm",
    name: "ENTERPRISE SWARM",
    tagline: "BESPOKE HOSPITAL ARCHITECTURE & MULTI-BRANCH ECOSYSTEM",
    price: "Custom",
    features: [
      "CUSTOM HMS & WEB APP DEVELOPMENT",
      "ENTERPRISE HEALTHCARE SEO",
      "DEDICATED ACCOUNT MANAGER",
      "24/7 SLA PRIORITY SUPPORT",
      "CUSTOM PATIENT DATA PIPELINES"
    ],
    popular: false
  }
];

export default function Packages() {
  const navigate = useNavigate();

  return (
    <section id="packages" className="py-24 bg-transparent relative overflow-hidden">
      {/* Ambient Golden Radiant Glow behind the hexagon cluster */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="font-montserrat text-xs tracking-[0.25em] text-amber-400 font-bold uppercase mb-3 inline-block drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]">
            CLINICAL TIERS // TRANSPARENT PRICING
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 drop-shadow-[0_0_18px_rgba(250,204,21,0.35)]">
            Digital Storefront & Clinical Packages
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto rounded-full shadow-[0_0_12px_rgba(250,204,21,0.6)] mb-4"></div>
          <p className="text-gray-300 font-sans font-normal max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Transparent, performance-driven healthcare software and clinical SEO architectures engineered specifically for medical practitioners.
          </p>
        </div>

        {/* 3 Professional Pointy-Top Hexagonal Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 xl:gap-8 max-w-6xl mx-auto items-stretch justify-center">
          {packages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              className={`relative flex flex-col justify-center transition-all duration-300 hover:-translate-y-2 ${
                pkg.popular ? 'lg:-translate-y-4 z-20' : 'z-10'
              }`}
              style={{
                filter: pkg.popular
                  ? 'drop-shadow(0 0 35px rgba(250, 204, 21, 0.35))'
                  : 'drop-shadow(0 0 18px rgba(234, 179, 8, 0.18))'
              }}
            >
              {/* Glowing Geometric Honey Bee Emblem on Queen's Guard Border */}
              {pkg.popular && (
                <div 
                  className="absolute -left-5 sm:-left-7 bottom-24 sm:bottom-28 z-30 pointer-events-none"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.8))' }}
                >
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Central Hexagonal Thorax */}
                    <polygon points="50,32 66,41 66,59 50,68 34,59 34,41" stroke="#FFD700" strokeWidth="2.5" fill="#080808" />
                    {/* Core Starburst */}
                    <circle cx="50" cy="50" r="3.5" fill="#FFD700" />
                    <line x1="50" y1="38" x2="50" y2="62" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
                    <line x1="40" y1="44" x2="60" y2="56" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
                    <line x1="40" y1="56" x2="60" y2="44" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
                    {/* Head & Antennae */}
                    <polygon points="50,22 57,28 43,28" stroke="#FFD700" strokeWidth="2" fill="#080808" />
                    <line x1="46" y1="22" x2="38" y2="14" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
                    <line x1="54" y1="22" x2="62" y2="14" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
                    {/* Upper Left Wing */}
                    <polygon points="34,41 12,24 16,42 34,48" stroke="#FFD700" strokeWidth="2" fill="#080808" fillOpacity="0.85" />
                    {/* Lower Left Wing */}
                    <polygon points="34,53 14,56 22,68 34,60" stroke="#FFD700" strokeWidth="2" fill="#080808" fillOpacity="0.85" />
                    {/* Upper Right Wing */}
                    <polygon points="66,41 88,24 84,42 66,48" stroke="#FFD700" strokeWidth="2" fill="#080808" fillOpacity="0.85" />
                    {/* Lower Right Wing */}
                    <polygon points="66,53 86,56 78,68 66,60" stroke="#FFD700" strokeWidth="2" fill="#080808" fillOpacity="0.85" />
                    {/* Abdomen / Stinger */}
                    <polygon points="45,68 55,68 50,80" stroke="#FFD700" strokeWidth="2" fill="#FFD700" />
                  </svg>
                </div>
              )}

              {/* Outer Pointy-Top Hexagon Border Wrapper */}
              <div
                className={`w-full h-full [clip-path:polygon(50%_0%,100%_22%,100%_78%,50%_100%,0%_78%,0%_22%)] transition-all duration-300 ${
                  pkg.popular
                    ? 'p-[2px] bg-[#FFD700]'
                    : 'p-[1.5px] bg-amber-500/60 hover:bg-amber-400'
                }`}
              >
                {/* Inner Pointy-Top Hexagon Canvas */}
                <div className="w-full h-full [clip-path:polygon(50%_0%,100%_22%,100%_78%,50%_100%,0%_78%,0%_22%)] bg-[#090909] pt-20 sm:pt-24 pb-16 sm:pb-20 px-6 sm:px-8 flex flex-col justify-between items-center text-center min-h-[660px] lg:min-h-[700px]">
                  {/* Top Portion: Title, Subtitle, Price & Divider */}
                  <div className="w-full flex flex-col items-center">
                    {/* Most Popular Rectangular Yellow Badge */}
                    {pkg.popular ? (
                      <div className="mb-2.5">
                        <span className="bg-[#FFD700] text-black font-sans font-bold text-[10px] sm:text-xs tracking-widest px-3 py-0.5 uppercase inline-block shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                          {pkg.badge}
                        </span>
                      </div>
                    ) : (
                      <div className="h-4 sm:h-5 mb-2.5" />
                    )}

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-montserrat font-bold text-white tracking-widest uppercase mb-2 drop-shadow-[0_2px_8px_rgba(250,204,21,0.2)]">
                      {pkg.name}
                    </h3>

                    {/* Tagline / Subtitle in Bright Golden Yellow */}
                    <p className="text-[11px] sm:text-xs text-amber-400 font-sans font-semibold tracking-wider uppercase leading-relaxed max-w-[260px] mb-5">
                      {pkg.tagline}
                    </p>

                    {/* Price Block */}
                    <div className="flex items-baseline justify-center gap-1 mb-1">
                      <span className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight">
                        {pkg.price}
                      </span>
                      {pkg.period && (
                        <span className="text-xs text-slate-400 font-sans font-normal">
                          {pkg.period}
                        </span>
                      )}
                    </div>

                    {/* Clean Horizontal Divider Line */}
                    <div className="w-48 sm:w-56 h-[1px] bg-white/15 my-5 sm:my-6" />

                    {/* Features List with Golden Checkmarks */}
                    <ul className="w-full max-w-[280px] space-y-3.5 text-left mb-6 font-sans">
                      {pkg.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]" />
                          <span className="font-sans font-medium text-xs sm:text-[13px] text-slate-200 tracking-wide uppercase leading-snug">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="w-full flex justify-center mt-auto pt-2">
                    {pkg.popular ? (
                      /* Solid Yellow Button for Queen's Guard */
                      <button
                        onClick={() => navigate(`/onboarding?package=${pkg.id}`)}
                        className="w-full max-w-[230px] py-3 px-6 bg-[#FFD700] hover:bg-yellow-300 text-black font-sans font-bold text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-[0_0_18px_rgba(250,204,21,0.45)] hover:scale-105 active:scale-95 text-center"
                      >
                        SELECT PACKAGE
                      </button>
                    ) : (
                      /* Outlined Button for Starter Hive and Enterprise Swarm */
                      <button
                        onClick={() => navigate(`/onboarding?package=${pkg.id}`)}
                        className="w-full max-w-[230px] py-2.5 px-6 border border-white/25 hover:border-amber-400 text-white hover:text-amber-300 font-sans font-semibold text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer hover:shadow-[0_0_15px_rgba(250,204,21,0.25)] hover:scale-105 active:scale-95 text-center"
                      >
                        SELECT PACKAGE
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
