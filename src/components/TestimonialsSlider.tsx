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
    <section className="bg-gray-50 py-16 sm:py-24 overflow-hidden border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-mono font-black tracking-widest text-brand-red uppercase">
            CLIENT TESTIMONIALS & PROOFS
          </p>
          <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-brand-black uppercase">
            Trusted By Elite Cricketers
          </h2>
          <p className="text-sm text-gray-500 font-sans leading-relaxed">
            Hear from first-class professionals and local league players about how our bat repairs saved their seasons.
          </p>
        </div>

        {/* Slider Frame */}
        <div className="relative max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 shadow-2xl shadow-gray-200/50">
          
          <div className="absolute top-8 right-8 text-gray-100 hidden sm:block">
            <Quote className="h-16 w-16 transform rotate-180" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Rating representation */}
              <div className="flex items-center space-x-1 text-amber-500">
                {Array.from({ length: activeReview.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>

              {/* Review content body */}
              <blockquote className="text-lg sm:text-xl font-sans font-medium text-gray-900 leading-relaxed italic">
                "{activeReview.review}"
              </blockquote>

              {/* Client specifications and device details */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-50">
                <div className="flex items-center space-x-4">
                  {/* Premium Avatar */}
                  <img 
                    src={`https://i.pravatar.cc/150?u=${activeReview.id}`} 
                    alt={activeReview.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-brand-red/20 shadow-md"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-base font-bold text-gray-900 font-sans tracking-tight">
                      {activeReview.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mt-0.5">
                      {activeReview.date || "Verified Player"}
                    </p>
                  </div>
                </div>

                {activeReview.batModel && (
                  <div className="flex items-center space-x-3 text-xs bg-brand-gray border border-gray-100 px-4 py-2 rounded-xl">
                    <span className="font-bold text-gray-500 uppercase tracking-wider font-sans">Bat Treated:</span>
                    <span className="font-black text-brand-red uppercase tracking-tight">{activeReview.batModel}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Interactive Navigation Elements */}
          <div className="flex items-center justify-end space-x-4 mt-8 pt-4 border-t border-gray-50 sm:absolute sm:bottom-12 sm:right-12 sm:mt-0 sm:border-0 sm:pt-0">
            <button
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-gray-600 hover:bg-gray-100 transition-colors"
              id="slider-nav-prev"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-xs font-mono font-bold text-gray-400">
              {activeIndex + 1} / {testimonials.length}
            </span>
            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 border border-gray-100 text-gray-600 hover:bg-gray-100 transition-colors"
              id="slider-nav-next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
