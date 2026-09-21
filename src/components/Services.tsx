import { motion } from 'motion/react';
import { Code2, MapPin, TrendingUp } from 'lucide-react';
import { useBee } from '../BeeContext';

const services = [
  {
    id: 1,
    title: "Software & Web Dev",
    description: "Custom architectures, precision-engineered web applications, and enterprise-grade software solutions.",
    icon: <Code2 className="w-10 h-10 mb-6 text-honey" />,
    delay: 0.1,
    gridClass: "col-span-1 md:col-start-2 md:col-end-3 md:row-start-1"
  },
  {
    id: 2,
    title: "GBP Optimization",
    description: "Algorithmic local dominance. We optimize your Google Business Profile for maximum visibility and lead generation.",
    icon: <MapPin className="w-10 h-10 mb-6 text-honey" />,
    delay: 0.3,
    gridClass: "col-span-1 md:col-start-1 md:col-end-2 md:row-start-2 md:-mt-16"
  },
  {
    id: 3,
    title: "SEO & Marketing",
    description: "Data-driven organic growth strategies, technical SEO audits, and high-conversion marketing campaigns.",
    icon: <TrendingUp className="w-10 h-10 mb-6 text-honey" />,
    delay: 0.5,
    gridClass: "col-span-1 md:col-start-3 md:col-end-4 md:row-start-2 md:-mt-16"
  }
];

export default function Services() {
  const { setHoveredTarget } = useBee();

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredTarget({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    });
  };

  const handleMouseLeave = () => {
    setHoveredTarget(null);
  };

  return (
    <section id="services" className="relative py-28 bg-transparent overflow-hidden">
      {/* Golden Ambient Radiant Glow behind services */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[450px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="font-montserrat text-xs tracking-[0.25em] text-amber-400 font-bold uppercase mb-3 inline-block drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]">
            SPECIALIZED CAPABILITIES // FULL-STACK CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 drop-shadow-[0_0_18px_rgba(250,204,21,0.35)]">
            Core Architectures
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto rounded-full shadow-[0_0_12px_rgba(250,204,21,0.6)]"></div>
        </div>

        {/* Honeycomb Grid Container - Stacks on mobile, honeycomb on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 max-w-5xl mx-auto">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: service.delay }}
              className={`${service.gridClass} group relative flex justify-center transition-transform duration-500 hover:-translate-y-2`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                filter: 'drop-shadow(0 0 16px rgba(250, 204, 21, 0.2))'
              }}
            >
              {/* Outer Hexagon (Border) */}
              <div className="w-full max-w-[320px] aspect-[1/1.15] [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] bg-gradient-to-b from-white/15 via-zinc-800 to-amber-500/25 group-hover:from-amber-300 group-hover:via-amber-400 group-hover:to-yellow-500 p-[1.5px] transition-all duration-500 relative">
                {/* Inner Hexagon (Content) with safe internal padding */}
                <div className="w-full h-full [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] bg-gradient-to-b from-[#141414] via-[#101010] to-[#080808] flex flex-col items-center justify-center p-8 sm:p-10 text-center relative z-10">
                  <div className="transform group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_12px_rgba(250,204,21,0.65)]">
                    {service.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-montserrat font-bold tracking-wider text-white mb-3 group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-roboto text-gray-300 font-normal leading-relaxed max-w-[220px]">
                    {service.description}
                  </p>
                </div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-amber-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 mix-blend-screen [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)]"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
