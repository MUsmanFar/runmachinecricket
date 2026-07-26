import React, { useState, useRef, useEffect } from "react";
import { ArrowLeftRight } from "lucide-react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement> | React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let clientX: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent | React.PointerEvent).clientX;
    }
    
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  return (
    <section className="bg-brand-black py-20 sm:py-32 overflow-hidden border-t border-brand-red/10">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <p className="text-[10px] sm:text-xs font-mono font-black tracking-[0.2em] text-brand-red uppercase">
            CRAFTSMANSHIP REVEALED
          </p>
          <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tighter text-white uppercase leading-none">
            Night & Day <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Transformation</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-sans leading-relaxed max-w-2xl mx-auto font-light">
            Drag the slider to see how our workshop revives completely shattered English willow back to pristine match-ready condition.
          </p>
        </div>

        <div className="flex justify-center w-full">
          <div 
            ref={containerRef}
            className="relative w-full aspect-video sm:aspect-[21/9] overflow-hidden select-none cursor-ew-resize border border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] bg-brand-black"
            onPointerDown={handlePointerDown}
            onPointerMove={(e) => e.buttons === 1 && handleDrag(e)}
            onTouchMove={handleDrag}
          >
            {/* After Image (Background) */}
            <img 
              src="/images/WhatsApp Image 2026-07-26 at 5.38.31 PM (3).jpeg" 
              alt="Bat After Repair" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              loading="lazy"
            />
            <div className="absolute bottom-6 right-6 bg-brand-black text-white text-[11px] font-black tracking-[0.2em] uppercase px-5 py-3 shadow-2xl z-10 border border-white/10">
              After Renovation
            </div>

            {/* Before Image (Foreground, Clipped via clip-path) */}
            <img 
              src="/images/WhatsApp Image 2026-07-26 at 5.38.25 PM.jpeg" 
              alt="Bat Before Repair" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              loading="lazy"
            />
            <div 
              className="absolute bottom-6 left-6 bg-brand-red text-white text-[11px] font-black tracking-[0.2em] uppercase px-5 py-3 shadow-2xl z-20"
              style={{ clipPath: `inset(0 ${sliderPosition < 15 ? 100 : 0}% 0 0)` }}
            >
              Shattered Damage
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-brand-red shadow-[0_0_15px_rgba(255,0,0,0.8)] flex items-center justify-center pointer-events-none z-30"
              style={{ left: `calc(${sliderPosition}% - 2px)` }}
            >
              <div className="h-14 w-10 bg-brand-red border-2 border-white text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.5)] transition-transform rounded-md">
                <ArrowLeftRight className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
