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
    <section className="bg-brand-gray py-16 sm:py-24 border-b border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <p className="text-xs font-mono font-black tracking-widest text-brand-red uppercase">
            HOW WE RESTORE THE POWER
          </p>
          <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-brand-black uppercase">
            Our Professional Repair Journey
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-sans leading-relaxed">
            Every bat undergoes our rigorous 6-step workshop workflow. We handle your equipment with supreme dedication to ensure it returns match-ready.
          </p>
        </div>

        {/* Vertical Journey Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-red/20 via-brand-black/20 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center justify-between group ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-white rounded-full border-4 border-brand-gray flex items-center justify-center -translate-x-1/2 z-10 shadow-lg group-hover:border-brand-red group-hover:scale-110 transition-all duration-300">
                    <span className="text-[10px] font-mono font-black text-brand-black">{step.num}</span>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-[45%]" />

                  {/* Content Card */}
                  <div className="w-full md:w-[45%] pl-20 md:pl-0">
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:border-brand-red/20 transition-all duration-300 relative overflow-hidden">
                      <div className={`absolute top-0 ${isEven ? 'right-0 rounded-bl-3xl' : 'left-0 rounded-br-3xl'} p-4 ${step.color} transition-colors`}>
                        {step.icon}
                      </div>

                      <div className="mt-8">
                        <h3 className="text-lg font-black text-brand-black mb-2 uppercase tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                          {step.desc}
                        </p>
                      </div>
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
