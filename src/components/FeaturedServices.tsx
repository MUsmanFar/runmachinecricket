import { Service } from "../types";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { motion } from "motion/react";

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
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tight text-brand-black uppercase">
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
          {services.slice(0, 6).map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              id={`service-card-${service.id}`}
              className="group flex flex-col overflow-hidden bg-brand-black border border-white/5 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(214,0,28,0.3)] hover:border-brand-red/30"
            >
              {/* Service Hero Image with premium hover Zoom */}
              <div className="relative h-64 overflow-hidden bg-brand-black">
                <img
                  src={
                    service.imageUrl ||
                    "/images/bat_full_refurb.png"
                  }
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="h-full w-full object-cover object-center opacity-80 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-100"
                />
                
                {/* Meta price tag overlay */}
                <div className="absolute top-4 right-4 bg-brand-red py-1.5 px-4 text-[10px] font-mono font-black text-white tracking-[0.2em] uppercase shadow-lg">
                  FROM £{service.startingPrice}
                </div>
              </div>

              {/* Card Meta Content Info */}
              <div className="flex flex-1 flex-col p-6 sm:p-8 bg-white relative">
                
                {/* Decorative Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.15em] text-gray-500 uppercase font-black">
                    <Clock className="h-3.5 w-3.5 text-brand-red" />
                    <span>{service.duration || "3 Days"}</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-brand-black group-hover:text-brand-red transition-colors duration-300 mb-3 uppercase tracking-tighter leading-none font-display">
                  {service.title}
                </h3>
                
                <p className="text-sm text-gray-500 leading-relaxed font-sans mb-8 line-clamp-3">
                  {service.description}
                </p>

                {/* Card Action Alignment Buttons */}
                <div className="mt-auto grid grid-cols-2 gap-3 pt-6 border-t border-gray-100">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="flex items-center justify-center bg-gray-50 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:bg-brand-black hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => onBookService(service)}
                    className="flex items-center justify-center bg-brand-red py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-brand-black transition-colors duration-300 cursor-pointer shadow-lg shadow-brand-red/20"
                  >
                    Book Now
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
