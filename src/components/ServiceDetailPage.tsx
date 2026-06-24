import { useState } from "react";
import { Service } from "../types";
import { Clock, Tag, MessageSquare, ArrowLeft, ShieldAlert, CheckCircle, HelpCircle } from "lucide-react";

interface ServiceDetailPageProps {
  service: Service;
  onBack: () => void;
  onBookService: (service: Service) => void;
  whatsAppNumber: string;
}

export default function ServiceDetailPage({
  service,
  onBack,
  onBookService,
  whatsAppNumber,
}: ServiceDetailPageProps) {
  const [activeImageMode, setActiveImageMode] = useState<"before" | "after">("after");

  // Format pre-filled WhatsApp link for this specific service
  const encodedText = encodeURIComponent(
    `Hello Run Machine Cricket,\n\nI would like information regarding the "${service.title}" service.\n\nPlease provide pricing details and confirm the typical turnaround window for my bat model.\n\nThank you.`
  );
  const cleanNumber = whatsAppNumber.replace(/\D/g, "");
  const whatsAppLink = `https://wa.me/${cleanNumber}?text=${encodedText}`;

  return (
    <div className="bg-white pb-12 md:pb-20 animate-fade-in">
      
      {/* Premium Hero Banner */}
      <div className="relative w-full h-[50vh] min-h-[400px] overflow-hidden mb-12 border-b border-brand-red/20">
        <img 
          src={service.afterImageUrl || service.imageUrl || "https://images.unsplash.com/photo-1607734834834-d4d4850ef3fa?auto=format&fit=crop&q=80&w=1600"} 
          alt={service.title} 
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
        
        {/* Navigation Back */}
        <div className="absolute top-8 left-4 sm:left-8 z-10">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-xs font-black tracking-widest text-white hover:text-brand-red uppercase transition-all bg-brand-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 shadow-lg cursor-pointer"
            id="detail-back-button"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to All Services</span>
          </button>
        </div>

        {/* Hero Content Overlays */}
        <div className="absolute bottom-8 left-4 sm:left-8 right-4 sm:right-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono tracking-widest uppercase font-black">
              <span className="flex items-center space-x-1.5 text-white bg-brand-red px-3 py-1.5 rounded-xl shadow-lg">
                <Clock className="h-3 w-3" />
                <span>{service.duration || "4 Days Turnaround"}</span>
              </span>
              
              <span className="flex items-center space-x-1.5 text-brand-black bg-white px-3 py-1.5 rounded-xl shadow-lg">
                <Tag className="h-3 w-3 text-brand-red" />
                <span>FROM ${service.startingPrice}</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-sans font-black tracking-tight text-white uppercase leading-none drop-shadow-2xl">
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Master Detail Frame */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Description Specs FAQs Column */}
          <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
            
            <div className="space-y-4">
              <h3 className="text-xs font-black tracking-widest text-brand-red uppercase font-mono">Service Overview</h3>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans">
                {service.description}
              </p>
            </div>

            {/* Actions CTA buttons box */}
            <div className="bg-brand-gray rounded-3xl border border-gray-100 p-6 sm:p-8 space-y-4 shadow-inner">
              <h3 className="text-[10px] font-black text-brand-red uppercase tracking-widest font-mono">Restoration Dispatch</h3>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => onBookService(service)}
                  className="flex-1 py-4 bg-brand-black hover:bg-brand-red text-white font-black text-xs uppercase tracking-widest rounded-xl transition cursor-pointer shadow-xl shadow-brand-black/20"
                  id="detail-action-book"
                >
                  Book Repair Spot
                </button>
                
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-4 border border-brand-red/20 hover:border-brand-red bg-white hover:bg-brand-red/5 text-brand-red text-center font-black text-xs uppercase tracking-widest rounded-xl transition duration-250 flex items-center justify-center space-x-2 shadow-sm"
                  id="detail-action-whatsapp"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp Enquire</span>
                </a>
              </div>
            </div>

            {/* FAQ Accordion Lists */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="space-y-4 pt-4">
                <h3 className="text-xs font-black text-brand-black uppercase tracking-widest font-sans border-b border-gray-100 pb-3">
                  Service Specific FAQs
                </h3>
                
                <div className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-gray-100 p-5 bg-white space-y-2 hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-start space-x-2.5">
                        <HelpCircle className="h-4.5 w-4.5 text-brand-red shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <h4 className="text-xs sm:text-sm font-black text-brand-black uppercase tracking-tight font-sans">
                          {faq.question}
                        </h4>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans pl-7">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Compare Image Frame Column */}
          <div className="lg:col-span-5 space-y-6 order-1 lg:order-2 lg:sticky lg:top-28">
            
            <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-brand-gray shadow-2xl">
              
              <div className="relative h-80 sm:h-[400px] w-full">
                <img
                  src={
                    activeImageMode === "before"
                      ? service.beforeImageUrl || "https://images.unsplash.com/photo-1629731670940-154a5f450ab5?auto=format&fit=crop&q=80&w=600"
                      : service.afterImageUrl || "https://images.unsplash.com/photo-1607734834834-d4d4850ef3fa?auto=format&fit=crop&q=80&w=600"
                  }
                  alt={`${service.title} comparison preview`}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-all duration-300"
                />
                
                {/* Badge specifying what state we are analyzing */}
                <div className="absolute bottom-4 left-4 rounded-xl bg-brand-black/90 text-white font-mono text-[10px] uppercase font-black tracking-widest py-1.5 px-3.5 border border-white/10">
                  {activeImageMode === "before" ? "🔴 BEFORE REPAIR" : "⚫ RESTORED WORK"}
                </div>
              </div>

              {/* Slider Toggles */}
              <div className="bg-brand-black text-white grid grid-cols-2 text-[10px] font-black tracking-widest uppercase divide-x divide-white/5 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setActiveImageMode("before")}
                  className={`py-4 transition-all cursor-pointer ${
                    activeImageMode === "before" ? "bg-brand-red text-white" : "hover:bg-brand-red/10 hover:text-brand-red"
                  }`}
                  id="toggle-image-before"
                >
                  View Broken
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageMode("after")}
                  className={`py-4 transition-all cursor-pointer ${
                    activeImageMode === "after" ? "bg-brand-red text-white" : "hover:bg-brand-red/10 hover:text-brand-red"
                  }`}
                  id="toggle-image-after"
                >
                  View Restored
                </button>
              </div>

            </div>

            <p className="text-[11px] text-gray-400 text-center italic font-sans leading-relaxed">
              Toggle comparison views to verify our surgical timber repairs.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}
