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
    <section className="relative overflow-hidden bg-white py-12 sm:py-20 lg:py-24 border-b border-gray-100">
      
      {/* Absolute Decorative Premium Blurs */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 h-[500px] w-[500px] rounded-full bg-brand-red/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-[400px] w-[400px] rounded-full bg-brand-black/5 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
        
        {/* Left: Headline & Slogan Text */}
        <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
          
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 rounded-full bg-brand-red/5 border border-brand-red/10 px-4 py-2 text-xs text-brand-red font-black uppercase tracking-widest mx-auto lg:mx-0 shadow-sm font-sans"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-red animate-pulse" />
            <span>ESTABLISHED LUXURY CRICKET WORKSHOP</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight text-gray-900 leading-none uppercase"
          >
            RESTORE THE POWER.<br />
            <span className="text-brand-red">MASTER THE PICKUP.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto lg:mx-0 max-w-xl text-sm sm:text-base text-gray-500 leading-relaxed font-normal font-sans"
          >
            Bespoke cricket bat repair, handles, and complete restorations. Handcrafted by elite workshop master craftsmen in the UK, utilizing top-tier Singapore cane and raw linseed oils.
          </motion.p>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={onBookRepair}
              id="cta-book-repair-hero"
              className="w-full sm:w-auto rounded-xl bg-brand-black px-8 py-4 text-xs font-black tracking-widest text-white shadow-xl shadow-gray-200 hover:shadow-brand-red/15 hover:bg-brand-red transition-all duration-300 transform active:scale-95 uppercase font-sans cursor-pointer"
            >
              {ctaText}
            </button>

            <a
              href={whatsAppLink}
              target="_blank"
              rel="noreferrer"
              id="cta-whatsapp-hero"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 rounded-xl bg-white border-2 border-brand-red/10 hover:border-brand-red px-8 py-3.5 text-xs font-black tracking-widest text-brand-black hover:bg-brand-gray transition-all duration-200 uppercase font-sans shadow-sm"
            >
              <MessageSquare className="h-4 w-4 text-brand-red" />
              <span>WHATSAPP EXPERT</span>
            </a>

            <button
              onClick={onWhyChooseClick}
              id="cta-why-choose-hero"
              className="w-full sm:w-auto text-xs font-black tracking-widest text-gray-400 hover:text-brand-red px-4 py-2 hover:underline transition-all uppercase font-sans"
            >
              Learn More
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 border-t border-brand-gray pt-8 font-sans"
          >
            <div>
              <p className="text-2xl sm:text-3xl font-black text-brand-black tracking-tight font-sans">G1+</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase font-sans">Pro English Willow</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-brand-black tracking-tight font-sans">15K+</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase font-sans">Bats Restored</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-brand-red tracking-tight font-sans">24h</p>
              <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase font-sans">Average Response</p>
            </div>
          </motion.div>

        </div>

        {/* Right: Immersive Custom Sports-Agency Visual Mockup */}
        <div className="lg:col-span-6 relative flex justify-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="relative w-full max-w-lg aspect-[4/3] rounded-3xl overflow-hidden border border-brand-border h-[28rem] sm:h-[32rem] group shadow-2xl"
          >
            {/* Immersive Workshop Background Crafting Image */}
            <img 
              src="https://images.unsplash.com/photo-1540747737956-37872404797a?auto=format&fit=crop&q=80&w=1200" 
              alt="Elite Bat Workshop" 
              referrerPolicy="no-referrer"
              loading="eager"
              fetchPriority="high"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* Dark Premium Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-brand-black/5" />

            {/* Float Badge: Master Carver Working */}
            <div className="absolute top-6 left-6 flex items-center space-x-2 bg-brand-black/90 backdrop-blur-md px-3.5 py-2 rounded-xl text-white border border-white/10 shadow-lg z-20">
              <span className="block h-2 w-2 rounded-full bg-brand-red animate-pulse" />
              <span className="text-[9px] font-black tracking-widest uppercase">WORKSHOP PRECISION PRESSURE</span>
            </div>

            {/* Floating Cricket Bat Element for Depth */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: [0, -15, 0], opacity: 1 }}
              transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.8, delay: 0.3 } }}
              className="absolute right-[-15%] top-[5%] w-[80%] z-10 pointer-events-none drop-shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=600&bg=transparent" 
                alt="Floating Cricket Bat" 
                className="w-full h-auto object-contain rotate-12 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]" 
                loading="eager"
              />
            </motion.div>

            {/* Core Specs Glassmorphism Overlay Card */}
            <div className="absolute bottom-6 inset-x-6 glass-card p-6 rounded-2xl border border-white/20 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-20">
              <div className="space-y-1">
                <span className="text-[9px] bg-brand-red text-white font-extrabold px-2 py-0.5 rounded uppercase tracking-wider font-sans">
                  Craftsman Curing
                </span>
                <p className="text-sm font-black text-brand-black uppercase tracking-tight">Active Bat Pressing Block</p>
                <p className="text-xs text-gray-400 font-sans leading-tight">Hydraulic rollers stabilizing split willow matrix.</p>
              </div>

              <div className="flex items-center space-x-3 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-4">
                <div className="text-right">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">CURE DAMPNESS</p>
                  <p className="text-lg font-black text-brand-black leading-none mt-1">9.2%</p>
                  <p className="text-[8px] font-bold text-brand-red tracking-wider uppercase mt-1">ESTIMATED MOISTURE</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
