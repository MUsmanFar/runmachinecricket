import { Hammer, MessageSquare, ShieldCheck, Mail, MapPin, Phone } from "lucide-react";

interface FooterProps {
  onNavigate: (view: string) => void;
  onNavigateLegal: (pageId: string) => void;
}

export default function Footer({ onNavigate, onNavigateLegal }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "Pricing", id: "pricing" },
    { label: "Book Repair", id: "request" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" }
  ];

  const legalLinks = [
    { label: "Privacy Policy", id: "privacy-policy" },
    { label: "Terms & Conditions", id: "terms-conditions" },
    { label: "Cookie Policy", id: "cookie-policy" }
  ];

  return (
    <footer className="bg-brand-black text-gray-400 border-t border-white/10 pt-24 pb-8 relative overflow-hidden">
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          
          {/* LEFT: Brand Presentation */}
          <div className="space-y-6">
            <div className="flex items-center text-white">
              <img 
                src="/logo.png" 
                alt="Run Machine Cricket Logo" 
                className="h-12 sm:h-16 object-contain" 
                id="official-logo-footer"
              />
            </div>
            
            <p className="text-sm text-gray-500 leading-relaxed font-sans font-light">
              Run Machine Cricket represents ultimate elite craftsmanship. We specialize in precision repair, structural reinforcement, and comprehensive English willow restorations.
            </p>

            <div className="flex items-center space-x-2 text-white text-[10px] font-sans font-black tracking-[0.2em] uppercase bg-white/5 px-4 py-3 border border-white/10 w-fit">
              <ShieldCheck className="h-4 w-4 text-brand-red" />
              <span>Trusted by Professionals</span>
            </div>
          </div>

          {/* CENTER: Quick Links */}
          <div className="md:mx-auto">
            <h4 className="text-sm font-sans font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center">
              Quick Links
            </h4>
            <ul className="space-y-4 text-xs font-sans font-bold tracking-[0.1em] uppercase text-gray-500">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-brand-red transition-colors duration-300 text-left cursor-pointer flex items-center"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: Contact Information */}
          <div className="md:ml-auto">
            <h4 className="text-sm font-sans font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center">
              Contact
            </h4>
            
            <div className="space-y-4 text-xs font-sans font-bold tracking-[0.1em] uppercase text-gray-500">
              <div className="flex items-center space-x-3 text-white">
                <Phone className="h-4 w-4 text-brand-red" />
                <span>+44 7700 900077</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <Mail className="h-4 w-4 text-brand-red" />
                <span>craft@runmachine.co.uk</span>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="https://wa.me/447700900077"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-brand-red px-6 py-4 text-[10px] text-white font-sans font-black tracking-[0.2em] uppercase hover:bg-white hover:text-brand-black transition-colors duration-300 shadow-xl shadow-brand-red/20"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM: Copyright & Legal */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-gray-500">
            Run Machine Cricket © {currentYear}
          </p>
          
          <ul className="flex flex-wrap justify-center gap-6 text-[9px] font-sans font-bold tracking-[0.2em] uppercase text-gray-600">
            {legalLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => onNavigateLegal(link.id)}
                  className="hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
