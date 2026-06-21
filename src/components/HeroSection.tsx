import { Hammer, MessageSquare, ShieldCheck, Trophy, Sparkles, Scale, Gauge } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  whatsAppNumber: string;
  onBookRepair: () => void;
  onWhyChooseClick: () => void;
}

export default function HeroSection({
  headline,
  subheadline,
  ctaText,
  whatsAppNumber,
  onBookRepair,
  onWhyChooseClick,
}: HeroSectionProps) {
  
  const encodedMessage = encodeURIComponent(
    "Hello Run Machine Cricket,\n\nI visited your website and would like to learn more about your premium bat repair and restoration services.\n\nThank you."
  );
  const whatsAppLink = `https://wa.me/${whatsAppNumber.replace(/\+/g, "")}?text=${encodedMessage}`;

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-black">
      
      {/* Massive Immersive Background */}
      <img
        src="https://images.unsplash.com/photo-1607734834834-d4d4850ef3fa?auto=format&fit=crop&q=80&w=2400"
        alt="Premium Cricket Bat"
        className="absolute inset-0 w-full h-full object-cover opacity-60 object-center scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
        loading="eager"
        fetchPriority="high"
      />
      
      {/* Premium Vignettes & Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/90 via-brand-black/50 to-transparent" />
      
      {/* Luxury Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 flex flex-col justify-end min-h-[90vh]">
        
        {/* Floating Cricket Bat Animation Showcase */}
        <motion.div 
          className="absolute top-[10%] right-[-10%] md:right-[5%] w-[400px] sm:w-[600px] lg:w-[800px] h-[800px] pointer-events-none z-0 opacity-40 mix-blend-lighten hidden md:block"
          animate={{ 
            y: [0, -30, 0],
            rotate: [15, 12, 15] 
          }}
          transition={{ 
            duration: 8, 
            ease: "easeInOut", 
            repeat: Infinity 
          }}
        >
          {/* Using a placeholder bat image for the showcase, easily swappable with a transparent PNG */}
          <img 
            src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800"
            alt="Floating Cricket Bat Showcase"
            className="w-full h-full object-cover object-center rounded-full mask-image-gradient"
            style={{ maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))', WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))' }}
          />
        </motion.div>

        <div className="relative z-10 max-w-4xl space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center space-x-3 border-l-2 border-brand-red pl-4"
          >
            <span className="text-[10px] sm:text-xs font-sans font-black tracking-[0.2em] text-brand-red uppercase">
              Elite Willow Restoration
            </span>
            <span className="h-1 w-1 rounded-full bg-white/50" />
            <span className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] text-gray-400 uppercase">
              United Kingdom
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-6xl sm:text-7xl lg:text-8xl font-sans font-black tracking-tighter text-white leading-[0.85] uppercase"
          >
            Revive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              The Blade.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-xl text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed font-sans font-light"
          >
            Master craftsmen breathing supreme power back into shattered English willow. Authentic repairs. Immediate pickup perfection. Absolute match readiness.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-6"
          >
            <button
              onClick={onBookRepair}
              id="cta-book-repair-hero"
              className="w-full sm:w-auto bg-brand-red px-10 py-5 text-xs font-black tracking-[0.2em] text-white hover:bg-white hover:text-brand-black transition-colors duration-500 uppercase font-sans cursor-pointer shadow-2xl shadow-brand-red/20"
            >
              {ctaText}
            </button>

            <a
              href={whatsAppLink}
              target="_blank"
              rel="noreferrer"
              id="cta-whatsapp-hero"
              className="w-full sm:w-auto flex items-center justify-center space-x-3 px-10 py-5 text-xs font-black tracking-[0.2em] text-white hover:text-brand-red border border-white/20 hover:border-brand-red transition-colors duration-500 uppercase font-sans backdrop-blur-sm bg-white/5"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Expert Consult</span>
            </a>
          </motion.div>

        </div>

        {/* Premium Data Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 border-t border-white/10 pt-10"
        >
          <div>
            <p className="text-3xl font-black text-white tracking-tighter">G1+</p>
            <p className="text-[9px] font-sans font-bold tracking-[0.2em] text-gray-500 uppercase mt-2">Willow Standard</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white tracking-tighter">15K<span className="text-brand-red">+</span></p>
            <p className="text-[9px] font-sans font-bold tracking-[0.2em] text-gray-500 uppercase mt-2">Bats Restored</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white tracking-tighter">24<span className="text-brand-red">h</span></p>
            <p className="text-[9px] font-sans font-bold tracking-[0.2em] text-gray-500 uppercase mt-2">Quote Return</p>
          </div>
          <div>
            <p className="text-3xl font-black text-white tracking-tighter">5<span className="text-brand-red">★</span></p>
            <p className="text-[9px] font-sans font-bold tracking-[0.2em] text-gray-500 uppercase mt-2">Pro Rated</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
