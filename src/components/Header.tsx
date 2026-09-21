import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

// Mini Glowing Geometric Bee identical in geometry to the hero section bee
function MiniGeometricBee() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transform -rotate-45"
    >
      <defs>
        <filter id="mini-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g filter="url(#mini-glow)">
        {/* Main Body Hexagon */}
        <path
          d="M50 25 L65 35 L65 65 L50 75 L35 65 L35 35 Z"
          stroke="#FFD700"
          strokeWidth="2.5"
          fill="#121212"
        />

        {/* Inner Circuit Nodes */}
        <circle cx="50" cy="50" r="3.5" fill="#FFD700" />
        <line x1="50" y1="35" x2="50" y2="46" stroke="#FFD700" strokeWidth="2" />
        <line x1="50" y1="54" x2="50" y2="65" stroke="#FFD700" strokeWidth="2" />
        <line x1="41" y1="45" x2="47" y2="48" stroke="#FFD700" strokeWidth="1.8" />
        <line x1="59" y1="45" x2="53" y2="48" stroke="#FFD700" strokeWidth="1.8" />
        <line x1="41" y1="55" x2="47" y2="52" stroke="#FFD700" strokeWidth="1.8" />
        <line x1="59" y1="55" x2="53" y2="52" stroke="#FFD700" strokeWidth="1.8" />

        {/* Wings - Top */}
        <path
          d="M35 35 L15 25 L20 45 L35 50 Z"
          stroke="#FFD700"
          strokeWidth="2"
          fill="rgba(255, 215, 0, 0.2)"
        />
        <path
          d="M65 35 L85 25 L80 45 L65 50 Z"
          stroke="#FFD700"
          strokeWidth="2"
          fill="rgba(255, 215, 0, 0.2)"
        />

        {/* Wings - Bottom */}
        <path
          d="M35 50 L10 55 L25 70 L35 65 Z"
          stroke="#FFD700"
          strokeWidth="1.5"
          fill="rgba(255, 215, 0, 0.1)"
        />
        <path
          d="M65 50 L90 55 L75 70 L65 65 Z"
          stroke="#FFD700"
          strokeWidth="1.5"
          fill="rgba(255, 215, 0, 0.1)"
        />

        {/* Antennae */}
        <path d="M45 25 L35 15" stroke="#FFD700" strokeWidth="2" strokeLinecap="square" />
        <path d="M55 25 L65 15" stroke="#FFD700" strokeWidth="2" strokeLinecap="square" />
        <circle cx="35" cy="15" r="1.8" fill="#FFD700" />
        <circle cx="65" cy="15" r="1.8" fill="#FFD700" />

        {/* Stinger */}
        <path d="M50 75 L50 85" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="square" />
      </g>
    </svg>
  );
}

// Keyframes generating smooth continuous 360-degree orbit starting from the RIGHT side (theta = 0)
const STEPS = 16;
const RADIUS_X = 66; // horizontal orbit span around "HBCS"
const RADIUS_Y = 22; // vertical orbit span around "HBCS"

const xTrajectory = Array.from({ length: STEPS + 1 }, (_, i) => {
  const theta = (i / STEPS) * 2 * Math.PI;
  return Number((Math.cos(theta) * RADIUS_X).toFixed(1));
});

const yTrajectory = Array.from({ length: STEPS + 1 }, (_, i) => {
  const theta = (i / STEPS) * 2 * Math.PI;
  return Number((Math.sin(theta) * RADIUS_Y).toFixed(1));
});

const zIndexTrajectory = Array.from({ length: STEPS + 1 }, (_, i) => {
  const theta = (i / STEPS) * 2 * Math.PI;
  // Passes in front of HBCS when below (y >= 0), passes behind HBCS when above (y < 0)
  return Math.sin(theta) >= 0 ? 20 : 0;
});

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-5 sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/5">
      {/* Left Brand & Navigation Section */}
      <div className="flex items-center space-x-5 shrink-0">
        {/* Universal Dynamic Back Button: visible on all subpages, hidden on home */}
        {!isHomePage && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={() => navigate(-1)}
            className="flex items-center space-x-1.5 text-xs font-montserrat tracking-wider uppercase text-amber-400 hover:text-white border border-amber-500/40 rounded px-3 py-1.5 transition-all hover:bg-amber-400/10 shadow-[0_0_15px_rgba(250,204,21,0.15)] cursor-pointer whitespace-nowrap"
            aria-label="Return to previous page"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK</span>
          </motion.button>
        )}

        {/* Brand logo container with revolving glowing geometric bee */}
        <a
          href="/"
          className="relative flex items-center justify-center cursor-pointer select-none group py-1 px-3"
          aria-label="HBCS Home"
        >
          <span className="font-batman text-3xl tracking-widest text-white mt-0.5 relative z-10 text-glow-white">
            HBCS
          </span>

          {/* Orbital animation layer starting explicitly from the right */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="absolute"
              animate={{
                x: xTrajectory,
                y: yTrajectory,
                zIndex: zIndexTrajectory,
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                filter: 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.75))',
              }}
            >
              <MiniGeometricBee />
            </motion.div>
          </div>
        </a>
      </div>

      {/* Main Navigation - Non-wrapping row */}
      <nav className="hidden md:flex flex-row flex-nowrap items-center space-x-8">
        <a
          href="/"
          className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-gray-300 hover:text-amber-300 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] transition-all whitespace-nowrap"
        >
          Home
        </a>
        <a
          href="/#packages"
          className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-gray-300 hover:text-amber-300 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] transition-all whitespace-nowrap"
        >
          Packages
        </a>
        <a
          href="/#about"
          className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-gray-300 hover:text-amber-300 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] transition-all whitespace-nowrap"
        >
          About Us
        </a>
        <a
          href="/onboarding"
          className="font-montserrat text-xs font-semibold uppercase tracking-[0.2em] text-gray-300 hover:text-amber-300 hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] transition-all whitespace-nowrap"
        >
          Onboarding
        </a>
      </nav>

      {/* Standardized Sleek Modern Pill CTA Button */}
      <div className="flex items-center shrink-0">
        <a
          href="#contact"
          className="relative inline-flex items-center justify-center bg-neutral-900 border border-amber-500/50 hover:border-amber-400 text-white hover:text-amber-300 font-sans px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider hover:shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 whitespace-nowrap cursor-pointer"
        >
          Get a Quote
        </a>
      </div>
    </header>
  );
}
