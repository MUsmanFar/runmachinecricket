import { Shield, Award, Wrench, CheckCircle } from "lucide-react";

export default function AboutUs() {
  const values = [
    {
      title: "Master Craftsmanship",
      desc: "Our workshop is led by master artisans who have restored bats for international stars, county, and premier league cricketers.",
      icon: <Award className="h-6 w-6 text-brand-red" />
    },
    {
      title: "Premium Materials Only",
      desc: "We use top-tier Singapore multi-spring cane inserts, authentic cross-weave fiber wraps, raw cold-pressed linseed, and high-impact polymers.",
      icon: <Wrench className="h-6 w-6 text-brand-black" />
    },
    {
      title: "Zero compromises",
      desc: "Every bat undergoes extensive post-repair dynamic inspection, balance testing, pickup assessment, and finish verification before sign-off.",
      icon: <Shield className="h-6 w-6 text-brand-red" />
    }
  ];

  return (
    <div className="bg-white py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          <div className="space-y-6">
            <p className="text-xs font-mono font-black tracking-widest text-brand-red uppercase">
              THE WORKSHOP TRADITION
            </p>
            <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-brand-black leading-tight uppercase">
              Born in the Nets. Perfected in the Workshop.
            </h1>
            
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans">
              Run Machine Cricket was founded by cricket enthusiasts who understand the spiritual bond between a batsman and their willow. A high-end cricket bat is not just wood; it is an extension of your hands, engineered with precise sweet spots, grain contours, and balance profiles.
            </p>
            
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-sans">
              When a premium bat cracks, splits its toe, or snaps its cane handle, most retailers simply declare it dead. We disagree. Utilizing surgical carpentry techniques, marine-grade epoxies, structural bindings, and high-speed hydraulic pressing, we bring dead willow back to active service, preserving its original ping and response.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border-l-4 border-brand-red pl-4">
                <p className="text-3xl font-black text-brand-black tracking-tight">15,000+</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Bats Saved</p>
              </div>
              <div className="border-l-4 border-brand-red pl-4">
                <p className="text-3xl font-black text-brand-black tracking-tight">100%</p>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Singapore Cane Handles</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/5 to-transparent rounded-3xl -z-10" />
            <img
              src="https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=800"
              alt="Wood craftsmanship workshop"
              referrerPolicy="no-referrer"
              className="rounded-3xl border border-gray-100 shadow-2xl w-full object-cover h-[450px]"
            />
          </div>

        </div>

        {/* Core Values Grid */}
        <div className="mt-20 lg:mt-28">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-xs font-mono font-black tracking-widest text-brand-red uppercase">
              OUR SERVICE VALUES
            </p>
            <h2 className="text-2xl sm:text-4xl font-sans font-black tracking-tight text-brand-black uppercase">
              Why Serious Cricketers Trust Run Machine
            </h2>
            <p className="text-sm text-gray-500 font-sans">
              We approach every bat with deep respect for its history, density, and performance potential. Here are the core pillars of our restoration process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl hover:border-brand-red/20 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-2xl bg-brand-gray border border-gray-100 flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h3 className="text-lg font-black text-brand-black mb-2 font-sans uppercase tracking-tight">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Seal Section */}
        <div className="mt-20 border border-brand-red/10 bg-brand-red/5 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <CheckCircle className="h-10 w-10 text-brand-red mx-auto mb-4" />
          <h3 className="text-lg font-black text-brand-black mb-2 font-sans uppercase tracking-tight">
            Our Solid Lifetime Wood Bonding Guarantee
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto font-sans">
            We are so confident in our structural composite bonding resins that if the handle joint or repair seam we glued splits open, we will rebuild it completely free of charge. No questions asked.
          </p>
        </div>

      </div>
    </div>
  );
}
