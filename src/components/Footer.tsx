import { Hammer, MessageSquare, ShieldCheck, Mail, MapPin } from "lucide-react";

interface FooterProps {
  onNavigate: (view: string) => void;
  onNavigateLegal: (pageId: string) => void;
}

export default function Footer({ onNavigate, onNavigateLegal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const servicesLinks = [
    { label: "Full Refurbishment", id: "full-refurbishment" },
    { label: "Singapore Cane Handle", id: "handle-replacement" },
    { label: "Toe Repair & Guard Fitting", id: "toe-repair" },
    { label: "Structural Crack Binding", id: "crack-repair-binding" },
    { label: "Pneumatic Knock-In Service", id: "pro-knocking-in" },
    { label: "Weight & Balance Shaving", id: "weight-sweetspot-tuning" }
  ];

  const quickLinks = [
    { label: "Home Base", id: "home" },
    { label: "Repair Services", id: "services" },
    { label: "Pricing Sheet", id: "pricing" },
    { label: "Submit Repair Request", id: "request" },
    { label: "About Our Workshop", id: "about" },
    { label: "Contact Workshop", id: "contact" }
  ];

  const legalLinks = [
    { label: "Privacy Policy", id: "privacy-policy" },
    { label: "Terms & Conditions", id: "terms-conditions" },
    { label: "Refund Policy", id: "refund-policy" },
    { label: "Shipping Policy", id: "shipping-policy" },
    { label: "Cookie Policy", id: "cookie-policy" }
  ];

  const handleServiceClick = (serviceId: string) => {
    onNavigate(`service-${serviceId}`);
  };

  return (
    <footer className="bg-brand-black text-gray-400 border-t-4 border-brand-red pt-24 pb-12 relative overflow-hidden">
      
      {/* Massive subtle watermark */}
      <div className="absolute -bottom-20 -right-20 text-[200px] text-white/[0.02] font-black pointer-events-none uppercase tracking-tighter leading-none select-none">
        RMC
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-4 md:gap-12">
          
          {/* Brand Presentation */}
          <div className="space-y-6 md:col-span-1">
            <div className="flex items-center space-x-3 text-white">
              <div className="flex h-12 w-12 items-center justify-center bg-brand-red text-white shadow-[0_0_20px_rgba(255,0,0,0.4)]">
                <Hammer className="h-6 w-6" />
              </div>
              <span className="font-sans font-black text-2xl tracking-tighter uppercase leading-none">
                RUN<br/>MACHINE
              </span>
            </div>
            
            <p className="text-sm text-gray-500 leading-relaxed font-sans font-light">
              Run Machine Cricket represents ultimate elite craftsmanship. We specialize in precision repair, structural reinforcement, and comprehensive English willow restorations.
            </p>

            <div className="space-y-4 pt-4 text-xs font-mono tracking-widest uppercase">
              <div className="flex items-center space-x-3 text-white">
                <MapPin className="h-4 w-4 text-brand-red" />
                <span>London Road, UK</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <Mail className="h-4 w-4 text-brand-red" />
                <span>craft@runmachine.co.uk</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center">
              <span className="w-4 h-1 bg-brand-red mr-3"></span>
              Services
            </h4>
            <ul className="space-y-4 text-xs font-mono uppercase tracking-widest text-gray-500">
              {servicesLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleServiceClick(link.id)}
                    className="hover:text-brand-red transition-colors duration-300 text-left cursor-pointer flex items-center group"
                  >
                    <span className="w-0 h-px bg-brand-red mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Website Navigation Column */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center">
              <span className="w-4 h-1 bg-brand-red mr-3"></span>
              Navigation
            </h4>
            <ul className="space-y-4 text-xs font-mono uppercase tracking-widest text-gray-500">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-brand-red transition-colors duration-300 text-left cursor-pointer flex items-center group"
                  >
                    <span className="w-0 h-px bg-brand-red mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Documents Column */}
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center">
              <span className="w-4 h-1 bg-brand-red mr-3"></span>
              Legal
            </h4>
            <ul className="space-y-4 text-xs font-mono uppercase tracking-widest text-gray-500">
              {legalLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigateLegal(link.id)}
                    className="hover:text-brand-red transition-colors duration-300 text-left cursor-pointer flex items-center group"
                  >
                    <span className="w-0 h-px bg-brand-red mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 flex flex-col space-y-3">
              <a
                href="https://wa.me/447700900077"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 bg-brand-red px-4 py-3 text-[10px] text-white font-black tracking-[0.2em] uppercase hover:bg-white hover:text-brand-black transition-colors duration-300 shadow-lg shadow-brand-red/20"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Active</span>
              </a>
              <div className="flex items-center justify-center space-x-2 text-white text-[10px] font-black tracking-[0.2em] uppercase bg-white/5 px-4 py-3 border border-white/10">
                <ShieldCheck className="h-4 w-4 text-brand-red" />
                <span>Secure Platform</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase text-gray-600">
          <p>© {currentYear} RUN MACHINE CRICKET.</p>
          <p className="mt-4 md:mt-0">DESIGNED FOR EXCELLENCE • UK</p>
        </div>
      </div>
    </footer>
  );
}
