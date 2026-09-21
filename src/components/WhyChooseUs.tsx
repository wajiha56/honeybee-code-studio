import { motion } from 'motion/react';
import { Zap, Shield, Hexagon } from 'lucide-react';

const reasons = [
  {
    icon: <Zap className="w-8 h-8 text-honey" />,
    title: "Worker-Bee Agility",
    description: "Rapid deployment cycles and agile methodologies ensure your product ships faster without compromising on architectural integrity."
  },
  {
    icon: <Hexagon className="w-8 h-8 text-honey" />,
    title: "Modern Tech Stack",
    description: "We build on the bleeding edge. React, Node, Next.js, and advanced GSAP animations power our digital experiences."
  },
  {
    icon: <Shield className="w-8 h-8 text-honey" />,
    title: "Data-Driven Results",
    description: "No guesswork. Our SEO and GBP strategies are built on algorithmic analysis, competitive telemetry, and proven growth vectors."
  }
];

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-28 bg-gradient-to-b from-transparent via-[#0d0d0d]/80 to-transparent border-y border-white/5 relative overflow-hidden backdrop-blur-sm">
      {/* Ambient background glow */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative background hexagon */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-amber-400">
          <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="w-full lg:w-1/3 text-center lg:text-left">
            <span className="font-montserrat text-xs tracking-[0.25em] text-amber-400 font-bold uppercase mb-3 inline-block drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]">
              PRECISION TELEMETRY // SYSTEM STANDARDS
            </span>
            <motion.h2 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]"
            >
              ENGINEERED<br />FOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">SCALE.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-300 font-montserrat font-normal leading-relaxed mb-8 text-xs md:text-sm max-w-lg mx-auto lg:mx-0"
            >
              We don't just build websites; we architect digital ecosystems designed to dominate local search and convert traffic into revenue. Precision is in our DNA.
            </motion.p>
          </div>
          
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className="group relative flex justify-center w-full max-w-[320px] mx-auto transition-transform duration-500 hover:-translate-y-2"
                style={{
                  filter: 'drop-shadow(0 0 14px rgba(250, 204, 21, 0.15))'
                }}
              >
                {/* Outer Hexagon border wrapper */}
                <div className="w-full [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] bg-gradient-to-b from-white/15 via-zinc-800 to-amber-500/20 group-hover:from-amber-300 group-hover:via-amber-400 group-hover:to-yellow-500 transition-all duration-500 p-[1.5px]">
                  {/* Inner Hexagon Content with safe padding against angled corners */}
                  <div className="w-full h-full [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] bg-gradient-to-b from-[#141414] via-[#101010] to-[#080808] flex flex-col items-center justify-center pt-14 pb-14 px-6 text-center min-h-[320px]">
                    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]">
                      {reason.icon}
                    </div>
                    <h3 className="text-xs font-montserrat font-bold tracking-widest text-white mb-3 uppercase group-hover:text-amber-300 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-xs text-gray-300 font-roboto font-light leading-relaxed max-w-[200px]">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
