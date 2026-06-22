import { useState } from "react";
import { WorkshopGalleryItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Image, Hammer, Eye, Sliders } from "lucide-react";

interface WorkshopGalleryProps {
  items: WorkshopGalleryItem[];
  isAdmin?: boolean;
}

export default function WorkshopGallery({ items }: WorkshopGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Before/After", "Workshop", "Repair"];

  const filteredItems = activeFilter === "All" 
    ? items 
    : items.filter(item => item.category === activeFilter);

  // Lightbox State
  const [lightboxItem, setLightboxItem] = useState<WorkshopGalleryItem | null>(null);

  return (
    <section className="bg-white py-16 md:py-24 border-t border-gray-100" id="workshop-gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest text-brand-red uppercase font-mono">
            <span>●</span>
            <span>VISUAL STORYTELLING</span>
            <span>●</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-brand-black uppercase font-display">
            THE WORKSHOP GALLERY
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Witness the intricate processes, physical presses, and mirror-buffed restorations performed daily by our master woodworkers.
          </p>
        </div>



        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                activeFilter === category
                  ? "bg-brand-red text-white shadow-lg shadow-brand-red/20 scale-[1.02]"
                  : "bg-brand-gray text-gray-600 hover:bg-brand-black hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="break-inside-avoid relative overflow-hidden bg-brand-black group shadow-xl"
              >
                {/* Image Wrap */}
                <div 
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => setLightboxItem(item)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-auto object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-100"
                  />
                  
                  {/* Subtle Top-Right Category Badge */}
                  <span className="absolute top-4 right-4 bg-brand-red text-white font-mono text-[9px] uppercase font-black py-1.5 px-3 tracking-[0.2em] shadow-lg">
                    {item.category}
                  </span>

                  {/* Dark Overlap Reveal */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 sm:p-8">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 space-y-3">
                      <div className="w-8 h-1 bg-brand-red" />
                      <p className="text-white text-xl font-black tracking-tighter uppercase leading-none font-display">
                        {item.title}
                      </p>
                      {item.description && (
                        <p className="text-gray-300 text-sm font-light leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20 border rounded-3xl bg-brand-gray/50 border-dashed border-gray-300">
            <Image className="h-10 w-10 mx-auto text-gray-350 mb-3" />
            <h4 className="text-sm font-bold text-gray-500 uppercase">Gallery is dry</h4>
            <p className="text-xs text-gray-400 mt-1">Check back soon for freshly logged woodcare processes.</p>
          </div>
        )}

      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setLightboxItem(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-brand-red transition-colors"
              onClick={() => setLightboxItem(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxItem.imageUrl} 
                alt={lightboxItem.title} 
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight font-display">{lightboxItem.title}</h3>
                {lightboxItem.description && (
                  <p className="mt-2 text-gray-400 text-sm max-w-2xl mx-auto">{lightboxItem.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
