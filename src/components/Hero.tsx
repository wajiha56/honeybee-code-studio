import { motion } from 'motion/react';
import { ArrowRight, Terminal, Star } from 'lucide-react';

// Geometric Bee Crest as displayed directly above the eyebrow in the reference design
function GoldenBeeCrest() {
  return (
    <div className="relative mb-5 flex items-center justify-center">
      {/* Radiant ambient glow behind crest */}
      <div className="absolute w-24 h-24 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
      
      <svg
        width="60"
        height="60"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 filter drop-shadow-[0_0_10px_rgba(250,204,21,0.6)]"
      >
        {/* Outer Hexagon Halo */}
        <path
          d="M50 8 L85 28 L85 72 L50 92 L15 72 L15 28 Z"
          stroke="#FFD700"
          strokeWidth="2"
          fill="rgba(255, 215, 0, 0.05)"
        />
        {/* Main Body */}
        <path
          d="M50 25 L65 35 L65 65 L50 75 L35 65 L35 35 Z"
          stroke="#FFD700"
          strokeWidth="2.5"
          fill="#121212"
        />
        {/* Core Star / Node */}
        <circle cx="50" cy="50" r="4" fill="#FFD700" />
        <line x1="50" y1="35" x2="50" y2="45" stroke="#FFD700" strokeWidth="2" />
        <line x1="50" y1="55" x2="50" y2="65" stroke="#FFD700" strokeWidth="2" />
        <line x1="41" y1="45" x2="47" y2="48" stroke="#FFD700" strokeWidth="2" />
        <line x1="59" y1="45" x2="53" y2="48" stroke="#FFD700" strokeWidth="2" />
        {/* Wings */}
        <path d="M35 35 L12 24 L20 48 L35 52 Z" stroke="#FFD700" strokeWidth="2" fill="rgba(255, 215, 0, 0.25)" />
        <path d="M65 35 L88 24 L80 48 L65 52 Z" stroke="#FFD700" strokeWidth="2" fill="rgba(255, 215, 0, 0.25)" />
        {/* Antennae */}
        <path d="M44 24 L34 14" stroke="#FFD700" strokeWidth="2" />
        <path d="M56 24 L66 14" stroke="#FFD700" strokeWidth="2" />
        <circle cx="34" cy="14" r="2" fill="#FFD700" />
        <circle cx="66" cy="14" r="2" fill="#FFD700" />
        {/* Stinger */}
        <path d="M50 75 L50 86" stroke="#FFD700" strokeWidth="2.5" />
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-transparent pt-12 pb-20">
      {/* 3D High-Tech Depth: Subtle 4% Opacity Honeycomb Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-hex-grid" width="56" height="97" patternUnits="userSpaceOnUse">
              <path
                d="M28 0 L56 16.2 L56 48.5 L28 64.7 L0 48.5 L0 16.2 Z M28 97 L56 80.8 L56 48.5 L28 64.7 L0 48.5 L0 80.8 Z"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="1.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-hex-grid)" />
        </svg>
      </div>

      {/* Soft Radial 3D Background Gradient Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgba(245,158,11,0.08),rgba(10,10,10,0)_70%)] pointer-events-none" />

      {/* Central Ambient Golden Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-amber-400/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        {/* Golden Bee Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <GoldenBeeCrest />
        </motion.div>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="flex items-center justify-center mb-5"
        >
          <span className="font-montserrat text-amber-400 tracking-[0.25em] text-xs md:text-sm uppercase font-bold drop-shadow-[0_0_8px_rgba(250,204,21,0.45)]">
            • ARCHITECT THE HIVE . DOMINATE THE WEB •
          </span>
        </motion.div>
        
        {/* Main Brand Title with Crisp, Sharp High-End Shadow */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-batman text-white leading-tight mb-6 px-2 drop-shadow-[0_2px_8px_rgba(250,204,21,0.3)] tracking-wider"
        >
          HONEY BEE CODE STUDIO
        </motion.h1>
        
        {/* Highly Readable Sub-headline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: "easeOut" }}
          className="text-base sm:text-lg text-gray-300 font-sans font-medium leading-relaxed max-w-3xl mb-10 px-4 tracking-wide"
        >
          CUSTOM SOFTWARE, LOCAL GBP DOMINANCE, AND SEO STRATEGIES THAT GENERATE A BUZZ. WE ARCHITECT DIGITAL PRECISION.
        </motion.p>
        
        {/* Sleek Horizontal Hexagon Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          {/* Explore Packages Hexagon Button */}
          <a 
            href="#packages" 
            className="group relative inline-flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{ filter: 'drop-shadow(0 0 16px rgba(234, 179, 8, 0.25))' }}
          >
            <div className="[clip-path:polygon(15px_0,calc(100%-15px)_0,100%_50%,calc(100%-15px)_100%,15px_100%,0_50%)] bg-amber-500/60 group-hover:bg-amber-400 p-[1.5px] transition-all duration-300">
              <div className="h-full px-8 sm:px-9 py-3.5 [clip-path:polygon(14px_0,calc(100%-14px)_0,100%_50%,calc(100%-14px)_100%,14px_100%,0_50%)] bg-neutral-900 group-hover:bg-neutral-800 text-white flex items-center justify-center gap-2.5 transition-all duration-300">
                <span className="font-sans font-semibold text-sm tracking-wider text-white group-hover:text-amber-300 whitespace-nowrap normal-case">
                  Explore Packages
                </span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </div>
          </a>

          {/* Let's Talk Hexagon Button */}
          <a 
            href="#contact" 
            className="group relative inline-flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{ filter: 'drop-shadow(0 0 16px rgba(234, 179, 8, 0.2))' }}
          >
            <div className="[clip-path:polygon(15px_0,calc(100%-15px)_0,100%_50%,calc(100%-15px)_100%,15px_100%,0_50%)] bg-amber-500/50 group-hover:bg-amber-400 p-[1.5px] transition-all duration-300">
              <div className="h-full px-8 sm:px-9 py-3.5 [clip-path:polygon(14px_0,calc(100%-14px)_0,100%_50%,calc(100%-14px)_100%,14px_100%,0_50%)] bg-neutral-900 group-hover:bg-neutral-800 text-white flex items-center justify-center gap-2.5 transition-all duration-300">
                <span className="font-sans font-semibold text-sm tracking-wider text-white group-hover:text-amber-300 whitespace-nowrap normal-case">
                  Let's Talk
                </span>
                <Terminal className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
              </div>
            </div>
          </a>
        </motion.div>

        {/* Trust Badge (Social Proof) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-xs text-gray-400 tracking-widest uppercase mt-6 select-none"
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="w-3.5 h-3.5 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]" 
              />
            ))}
          </div>
          <span className="font-sans font-medium text-center">
            Trusted by Top Clinics & Healthcare Professionals in Gujranwala
          </span>
        </motion.div>
      </div>
    </section>
  );
}
