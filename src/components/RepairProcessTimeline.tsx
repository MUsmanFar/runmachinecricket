import {
  FileText,
  BadgeCent,
  Truck,
  Wrench,
  Search,
  CheckCircle,
} from "lucide-react";
import { motion } from "motion/react";

export default function RepairProcessTimeline() {
  const steps = [
    {
      num: "01",
      title: "Select Service",
      desc: "Browse our premium service catalog and select the restoration package that matches your English willow needs.",
      icon: <BadgeCent className="h-6 w-6 text-brand-black" />,
      color: "border-brand-black/10 bg-brand-gray text-brand-black",
    },
    {
      num: "02",
      title: "Submit Request",
      desc: "Fill our rapid online repair reservation form with bat details, model and description.",
      icon: <FileText className="h-6 w-6 text-brand-red" />,
      color: "border-brand-red/10 bg-brand-red text-white",
    },
    {
      num: "03",
      title: "Ship Bat",
      desc: "Ship your bat using our registered courier guides or drop it off in person at our workshop.",
      icon: <Truck className="h-6 w-6 text-brand-black" />,
      color: "border-brand-black/10 bg-brand-gray text-brand-black",
    },
    {
      num: "04",
      title: "Repair Process",
      desc: "The bat goes through specialized treatments: re-pressing, cane replacements, glueing or binding.",
      icon: <Wrench className="h-6 w-6 text-brand-red" />,
      color: "border-brand-red/10 bg-brand-red/5 text-brand-red",
    },
    {
      num: "05",
      title: "Quality Inspection",
      desc: "We test the balance, pickup, moisture integration, and hand-buff for final mirror-smooth finishes.",
      icon: <Search className="h-6 w-6 text-brand-black" />,
      color: "border-brand-black/10 bg-brand-black text-white",
    },
    {
      num: "06",
      title: "Return Delivery",
      desc: "Receive your high-performance bat back inside heavy-duty armor packaging, trackable online.",
      icon: <CheckCircle className="h-6 w-6 text-brand-red" />,
      color: "border-brand-red/10 bg-brand-red text-white",
    },
  ];

  return (
    <section className="bg-white py-24 sm:py-32 border-b border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
          <p className="text-[10px] sm:text-xs font-mono font-black tracking-[0.2em] text-brand-red uppercase">
            HOW WE RESTORE THE POWER
          </p>
          <h2 className="text-4xl sm:text-6xl font-sans font-black tracking-tighter text-brand-black uppercase leading-none">
            The Repair <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Journey</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-sans leading-relaxed max-w-2xl mx-auto font-light">
            Every bat undergoes our rigorous 6-step workshop workflow. We handle your equipment with supreme dedication to ensure it returns match-ready.
          </p>
        </div>

        {/* Vertical Journey Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Heavy Vertical Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-brand-gray -translate-x-1/2" />
          {/* Animated fill line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-brand-red -translate-x-1/2 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          <div className="space-y-16 sm:space-y-24">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className={`relative flex flex-col md:flex-row items-center justify-between group ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-8 md:left-1/2 w-14 h-14 bg-brand-black rounded-none flex items-center justify-center -translate-x-1/2 z-10 shadow-2xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 group-hover:bg-brand-red border border-white/10">
                    <span className="text-[12px] font-mono font-black text-white">{step.num}</span>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Content Card */}
                  <div className="w-full md:w-[45%] pl-24 md:pl-0">
                    <div className="bg-white border-none p-8 sm:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(255,0,0,0.15)] transition-all duration-500 relative overflow-hidden group-hover:-translate-y-2">
                      {/* Subdued number watermark */}
                      <div className="absolute -right-4 -top-8 text-[120px] font-black text-brand-gray/30 select-none transition-transform duration-500 group-hover:scale-110">
                        {step.num}
                      </div>

                      <div className="relative z-10">
                        <div className={`inline-flex mb-6 p-4 rounded-full ${step.color} bg-opacity-10 transition-colors`}>
                          {step.icon}
                        </div>

                        <h3 className="text-2xl font-black text-brand-black mb-3 uppercase tracking-tighter">
                          {step.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed font-sans font-light">
                          {step.desc}
                        </p>
                      </div>
                      
                      {/* Hover bottom line indicator */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-brand-red transition-all duration-500 group-hover:w-full" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
