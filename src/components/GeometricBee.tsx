import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { useEffect, useState } from 'react';
import { useBee } from '../BeeContext';

export default function GeometricBee() {
  const { scrollYProgress } = useScroll();
  const { hoveredTarget } = useBee();
  
  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [windowWidth, setWindowWidth] = useState(1000);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const canvasWidth = 1280;
  const leftX = 60;
  const rightX = canvasWidth - 180;
  const centerX = canvasWidth / 2 - 60;

  const scrollX = useTransform(
    smoothProgress,
    [0, 0.1, 0.35, 0.5, 0.7, 0.9, 1],
    [centerX, centerX, leftX, leftX, rightX, centerX, centerX]
  );
  
  const scrollY = useTransform(
    smoothProgress,
    [0, 0.1, 1],
    ['30vh', '35vh', '85vh']
  );

  const scrollScale = useTransform(
    smoothProgress,
    [0, 0.1],
    [1.2, 1.2]
  );

  const scrollRotate = useTransform(
    smoothProgress,
    [0, 0.2, 0.25, 0.35, 0.45, 0.5, 0.65, 0.7, 0.85, 0.9, 1],
    [0, 0, -45, -15, 0, 45, 15, 0, -30, 0, 0]
  );

  // Use motion values that we can animate
  const currentRotate = useSpring(scrollRotate, { stiffness: 100, damping: 20 });
  const [targetRot, setTargetRot] = useState<number | null>(null);

  useEffect(() => {
    if (hoveredTarget) {
      // Calculate angle from bee to target
      // Note: We need actual pixel Y coordinate of the bee.
      // Since it's fixed, its Y is window.innerHeight * percentage
      // For simplicity, let's just approximate the angle
      const beeNode = document.getElementById('geo-bee');
      if (beeNode) {
        const beeRect = beeNode.getBoundingClientRect();
        const beeX = beeRect.left + beeRect.width / 2;
        const beeY = beeRect.top + beeRect.height / 2;
        
        const dx = hoveredTarget.x - beeX;
        const dy = hoveredTarget.y - beeY;
        
        // Atan2 gives angle in radians from X axis. We want angle from Y axis pointing down.
        // SVG normally points up (0 deg), we want it to point towards the target.
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        // Adjust angle because our SVG bee naturally points up? Wait, the SVG bee's head is at top (y=15), stinger at bottom (y=85)
        // So 0 degrees points UP.
        // atan2 gives 90 deg for pointing DOWN.
        // So we need to subtract 90? Let's check:
        // if dx=0, dy>0 (target is below), atan2 is 90. Bee should point down -> rotate 180.
        const finalAngle = angle - 270; 
        currentRotate.set(finalAngle);
      }
    } else {
      // Return to scroll rotation
      const unsubscribe = scrollRotate.on("change", (v) => {
        if (!hoveredTarget) currentRotate.set(v);
      });
      return () => unsubscribe();
    }
  }, [hoveredTarget, currentRotate, scrollRotate]);


  return (
    <motion.div
      id="geo-bee"
      className="pointer-events-none z-40 transition-opacity duration-300"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: scrollX,
        y: scrollY,
        scale: scrollScale,
        rotate: currentRotate,
        opacity: 0.9,
      }}
    >
      <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Glow effect */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <g filter="url(#glow)">
          {/* Main Body Hexagon */}
          <path d="M50 25 L65 35 L65 65 L50 75 L35 65 L35 35 Z" stroke="#FFD700" strokeWidth="2" fill="#121212" />
          
          {/* Inner Nodes */}
          <circle cx="50" cy="50" r="4" fill="#FFD700" />
          <line x1="50" y1="35" x2="50" y2="46" stroke="#FFD700" strokeWidth="1.5" />
          <line x1="50" y1="54" x2="50" y2="65" stroke="#FFD700" strokeWidth="1.5" />
          <line x1="41" y1="45" x2="47" y2="48" stroke="#FFD700" strokeWidth="1.5" />
          <line x1="59" y1="45" x2="53" y2="48" stroke="#FFD700" strokeWidth="1.5" />
          <line x1="41" y1="55" x2="47" y2="52" stroke="#FFD700" strokeWidth="1.5" />
          <line x1="59" y1="55" x2="53" y2="52" stroke="#FFD700" strokeWidth="1.5" />
          
          {/* Wings */}
          {/* Left Wing Top */}
          <path d="M35 35 L15 25 L20 45 L35 50 Z" stroke="#FFD700" strokeWidth="1.5" fill="rgba(255, 215, 0, 0.1)" />
          {/* Right Wing Top */}
          <path d="M65 35 L85 25 L80 45 L65 50 Z" stroke="#FFD700" strokeWidth="1.5" fill="rgba(255, 215, 0, 0.1)" />
          
          {/* Left Wing Bottom */}
          <path d="M35 50 L10 55 L25 70 L35 65 Z" stroke="#FFD700" strokeWidth="1" fill="rgba(255, 215, 0, 0.05)" />
          {/* Right Wing Bottom */}
          <path d="M65 50 L90 55 L75 70 L65 65 Z" stroke="#FFD700" strokeWidth="1" fill="rgba(255, 215, 0, 0.05)" />
          
          {/* Antennae */}
          <path d="M45 25 L35 15" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="square" />
          <path d="M55 25 L65 15" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="square" />
          <circle cx="35" cy="15" r="1.5" fill="#FFD700" />
          <circle cx="65" cy="15" r="1.5" fill="#FFD700" />
          
          {/* Stinger */}
          <path d="M50 75 L50 85" stroke="#FFD700" strokeWidth="2" strokeLinecap="square" />
        </g>
      </svg>
    </motion.div>
  );
}
