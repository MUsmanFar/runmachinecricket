import { useState } from "react";
import { Hammer, Menu, X, ArrowRight, UserCheck } from "lucide-react";

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Header({
  currentView,
  onNavigate,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Repair Services" },
    { id: "pricing", label: "Service Pricing" },
    { id: "request", label: "Book a Repair" },
    { id: "about", label: "About Our Workshop" },
    { id: "contact", label: "Contact Us" },
  ];

  const handleLinkClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo Container */}
        <div
          onClick={() => handleLinkClick("home")}
          className="flex cursor-pointer items-center space-x-3 transition-transform hover:scale-[1.01]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-red text-white shadow-lg shadow-brand-red/30">
            <Hammer className="h-5 w-5" id="logo-icon-hammer" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-sans font-extrabold text-xl tracking-tight text-gray-900">
                RUN MACHINE
              </span>
              <span className="rounded bg-brand-black px-1.5 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
                CRICKET
              </span>
            </div>
            <p className="text-[10px] font-mono font-black tracking-widest text-brand-red uppercase">
              Bat Repair & Refurbishment
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => {
            const isActive = currentView === item.id || (item.id === "services" && currentView.startsWith("service-"));
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`text-xs font-black tracking-widest uppercase transition-colors duration-200 ${
                  isActive
                    ? "text-brand-red font-black"
                    : "text-gray-600 hover:text-brand-black"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            id="header-cta-book-repair"
            onClick={() => handleLinkClick("request")}
            className="group flex items-center space-x-1 rounded-xl bg-brand-black px-6 py-3.5 text-xs font-black tracking-widest text-white shadow-xl shadow-gray-200 transition-all duration-200 hover:bg-brand-red hover:shadow-brand-red/10 animate-pulse"
          >
            <span>BOOK REPAIR</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" id="mobile-menu-close" />
          ) : (
            <Menu className="h-5 w-5" id="mobile-menu-burger" />
          )}
        </button>

      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-6 shadow-xl animate-in fade-in slide-in-from-top-10 duration-200">
          <div className="flex flex-col space-y-4">
            {navigationItems.map((item) => {
              const isActive = currentView === item.id || (item.id === "services" && currentView.startsWith("service-"));
              return (
                <button
                  key={item.id}
                  id={`nav-link-mobile-${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-left text-xs font-black tracking-widest uppercase px-4 py-3.5 rounded-xl transition-colors ${
                    isActive
                      ? "bg-brand-red/10 text-brand-red"
                      : "text-gray-600 hover:bg-brand-gray hover:text-brand-black"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            
            <hr className="border-gray-100 my-2" />

            <div className="flex flex-col space-y-3 px-4 pt-2">
              <button
                id="mobile-header-cta-book-repair"
                onClick={() => handleLinkClick("request")}
                className="flex items-center justify-center space-x-1.5 rounded-xl bg-brand-black py-4 text-xs font-black tracking-widest text-white hover:bg-brand-red transition-all"
              >
                <span>BOOK REPAIR APPOINTMENT</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
