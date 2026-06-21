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
    <footer className="bg-brand-black text-gray-400 border-t border-gray-900 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
          
          {/* Brand Presentation */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-red text-white">
                <Hammer className="h-4.5 w-4.5" />
              </div>
              <span className="font-sans font-extrabold text-lg tracking-tight uppercase">
                RUN MACHINE
              </span>
            </div>
            
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Run Machine Cricket represents ultimate elite craftsmanship. We specialize in repair, Singapore cane handle refitting, crack binding, structural reinforcement, dynamic balance adjustment, and comprehensive bat restorations.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-brand-red" />
                <span>London Road workshop, United Kingdom</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-brand-red" />
                <span>craft@runmachinecricket.co.uk</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-red pl-2">
              Explore Services
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {servicesLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleServiceClick(link.id)}
                    className="hover:text-white transition-colors duration-200 text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Website Navigation Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-red pl-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-white transition-colors duration-200 text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Documents Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-red pl-2">
              Legal & Framework
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              {legalLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigateLegal(link.id)}
                    className="hover:text-white transition-colors duration-200 text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 flex space-x-3">
              <a
                href="https://wa.me/447700900077"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 rounded-lg bg-brand-red/10 border border-brand-red/20 px-3 py-1.5 text-xs text-brand-red font-semibold hover:bg-brand-red hover:text-white transition-all"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                <span>WhatsApp Active</span>
              </a>
              <div className="flex items-center space-x-1 text-brand-red text-xs font-semibold bg-brand-red/5 px-3 py-1.5 border border-brand-red/10 rounded-lg">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Fully Secure DB</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {currentYear} Run Machine Cricket. All rights preserved under strict copyright policies.</p>
          <p className="mt-2 md:mt-0">Premium Handcrafted Service Framework • Designed in UK</p>
        </div>
      </div>
    </footer>
  );
}
