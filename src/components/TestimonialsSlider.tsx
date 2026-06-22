import { useState } from "react";
import { Testimonial } from "../types";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface TestimonialsSliderProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const activeReview = testimonials[activeIndex];

  return (
    <section className="bg-brand-black py-24 sm:py-32 overflow-hidden border-t border-brand-red/10 relative">
      <div className="absolute top-0 right-0 -mr-24 -mt-24 h-[600px] w-[600px] rounded-full bg-brand-red/5 blur-[100px] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-6">
          <p className="text-[10px] sm:text-xs font-mono font-black tracking-[0.2em] text-brand-red uppercase">
            CLIENT PROOFS
          </p>
          <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tighter text-white uppercase leading-none">
            Trusted By <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Pros</span>
          </h2>
        </div>

        {/* Slider Frame */}
        <div className="relative max-w-5xl mx-auto bg-brand-black border border-white/10 p-10 sm:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
          
          <div className="absolute top-10 right-10 text-white/5 hidden sm:block">
            <Quote className="h-24 w-24 transform rotate-180" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-10"
            >
              {/* Rating representation */}
              <div className="flex items-center space-x-2 text-brand-red">
                {Array.from({ length: activeReview.rating }).map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current" />
                ))}
              </div>

              {/* Review content body */}
              <blockquote className="text-2xl sm:text-4xl font-display font-black text-white leading-[1.2] uppercase tracking-tight">
                "{activeReview.review}"
              </blockquote>

              {/* Client specifications and device details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-10 border-t border-white/10">
                <div className="flex items-center space-x-6">
                  {/* Premium Avatar */}
                  <img 
                    src={`https://i.pravatar.cc/150?u=${activeReview.id}`} 
                    alt={activeReview.name}
                    className="h-16 w-16 grayscale object-cover border-2 border-brand-red shadow-2xl"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-xl font-black text-white font-sans tracking-tight uppercase">
                      {activeReview.name}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-mono tracking-[0.2em] uppercase mt-1">
                      {activeReview.date || "Verified Player"}
                    </p>
                  </div>
                </div>

                {activeReview.batModel && (
                  <div className="flex items-center space-x-3 text-xs bg-white/5 border border-white/10 px-5 py-3">
                    <span className="font-mono text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em]">Bat Treated:</span>
                    <span className="font-black text-white uppercase tracking-tight">{activeReview.batModel}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Navigation Elements */}
          <div className="flex items-center justify-end space-x-6 mt-12 pt-6 border-t border-white/10 sm:absolute sm:top-10 sm:right-10 sm:mt-0 sm:border-0 sm:pt-0">
            <button
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-brand-red transition-all duration-300"
              id="slider-nav-prev"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="text-[10px] font-mono font-black text-gray-500 tracking-[0.2em]">
              {activeIndex + 1} / {testimonials.length}
            </span>
            <button
              onClick={handleNext}
              className="flex h-12 w-12 items-center justify-center bg-white/5 border border-white/10 text-white hover:bg-brand-red transition-all duration-300"
              id="slider-nav-next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
