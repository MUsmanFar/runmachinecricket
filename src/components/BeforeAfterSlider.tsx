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
    <section className="bg-brand-black py-16 sm:py-24 overflow-hidden border-t border-brand-red/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-mono font-black tracking-widest text-brand-red uppercase">
            CRAFTSMANSHIP REVEALED
          </p>
          <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-white uppercase">
            Night & Day Transformation
          </h2>
          <p className="text-sm text-gray-400 font-sans leading-relaxed">
            Drag the slider to see how our workshop revives completely shattered English willow back to pristine match-ready condition.
          </p>
        </div>

        <div className="flex justify-center">
          <div 
            ref={containerRef}
            className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden select-none cursor-ew-resize border border-white/10 shadow-2xl bg-brand-gray/5"
            onPointerDown={handlePointerDown}
            onPointerMove={(e) => e.buttons === 1 && handleDrag(e)}
            onTouchMove={handleDrag}
          >
            {/* After Image (Background) */}
            <img 
              src="https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=1200" 
              alt="Bat After Repair" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              loading="lazy"
            />
            <div className="absolute top-4 right-4 bg-brand-red text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border border-white/20 shadow-lg z-10">
              After Renovation
            </div>

            {/* Before Image (Foreground, Clipped via clip-path) */}
            <img 
              src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1200" 
              alt="Bat Before Repair" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              loading="lazy"
            />
            <div 
              className="absolute top-4 left-4 bg-brand-black text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border border-white/20 shadow-lg z-20"
              style={{ clipPath: `inset(0 ${sliderPosition < 15 ? 100 : 0}% 0 0)` }}
            >
              Shattered Damage
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] flex items-center justify-center pointer-events-none z-30"
              style={{ left: `calc(${sliderPosition}% - 2px)` }}
            >
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-gray-200">
                <ArrowLeftRight className="h-5 w-5 text-brand-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
