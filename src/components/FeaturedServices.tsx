import { Service } from "../types";
import { ArrowRight, Clock, Tag } from "lucide-react";

interface FeaturedServicesProps {
  services: Service[];
  onSelectService: (serviceId: string) => void;
  onBookService: (service: Service) => void;
}

export default function FeaturedServices({
  services,
  onSelectService,
  onBookService,
}: FeaturedServicesProps) {
  
  return (
    <section className="bg-white py-16 sm:py-24 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block with high agency luxury tone */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-mono font-black tracking-widest text-brand-red uppercase">
              WORKSHOP MASTERPIECES
            </p>
            <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-brand-black uppercase">
              Specialized Repair & Restoration Services
            </h2>
            <p className="text-sm sm:text-base text-gray-500 font-sans leading-relaxed">
              Hand-pressed English willow deserves surgical care. From multi-spring Singapore cane handle inserts to complete custom seasonal overhauls, our craftsmen preserve your sweet spot with extreme physics and physical care.
            </p>
          </div>
          
          <button
            onClick={() => onSelectService("all")}
            className="mt-6 md:mt-0 flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-brand-red hover:text-brand-black transition-colors cursor-pointer group font-sans"
          >
            <span>VIEW ALL 20 SERVICES</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Services Grid (Displaying first 6 services for a highly aesthetic, non-cramped home block) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 6).map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/50 hover:border-brand-red/10 hover:-translate-y-1.5"
            >
              {/* Service Hero Image with premium hover Zoom */}
              <div className="relative h-56 overflow-hidden bg-brand-gray">
                <img
                  src={
                    service.imageUrl ||
                    "https://images.unsplash.com/photo-1540747737956-37872404797a?auto=format&fit=crop&q=80&w=800"
                  }
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Meta price tag overlay */}
                <div className="absolute top-4 right-4 flex items-center space-x-1 rounded-xl bg-brand-black/90 py-1.5 px-3.5 text-[10px] font-mono font-black text-white tracking-widest backdrop-blur-sm border border-white/10">
                  <Tag className="h-3 w-3 text-brand-red" />
                  <span>FROM £{service.startingPrice}</span>
                </div>
              </div>

              {/* Card Meta Content Info */}
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                
                <div className="flex items-center space-x-2 text-[9px] font-mono tracking-widest text-brand-red uppercase font-black mb-3">
                  <Clock className="h-3 w-3 text-brand-red" />
                  <span>{service.duration || "3 Days Turnaround"}</span>
                </div>

                <h3 className="text-lg font-black text-brand-black group-hover:text-brand-red transition-colors mb-3 uppercase tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans mb-6 line-clamp-3">
                  {service.description}
                </p>

                {/* Card Action Alignment Buttons */}
                <div className="mt-auto grid grid-cols-2 gap-4 pt-4 border-t border-brand-gray">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="flex items-center justify-center rounded-xl bg-brand-gray border border-gray-100 py-3.5 text-xs font-black uppercase tracking-wider text-gray-700 hover:bg-brand-black hover:text-white hover:border-brand-black transition-all cursor-pointer font-sans"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onBookService(service)}
                    className="flex items-center justify-center rounded-xl bg-brand-red py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-brand-red/10 hover:bg-brand-black transition-all cursor-pointer font-sans"
                  >
                    Book Repair
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
