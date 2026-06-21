import { useState } from "react";
import { Hammer, Menu, X, ArrowRight } from "lucide-react";

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Header({ currentView, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact labels requested by user
  const navigationItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Repair Services" },
    { id: "pricing", label: "Pricing" },
    { id: "request", label: "Book Repair" },
    { id: "about", label: "About Workshop" },
    { id: "contact", label: "Contact" },
  ];

  const handleLinkClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-black shadow-lg">
      <div className="mx-auto flex w-full max-w-7xl h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo Container */}
        <div
          onClick={() => handleLinkClick("home")}
          className="flex cursor-pointer items-center transition-opacity hover:opacity-80 shrink-0"
        >
          <img 
            src="/logo.png" 
            alt="Run Machine Cricket Logo" 
            className="h-10 sm:h-14 object-contain" 
            id="official-logo-header"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center space-x-8 xl:space-x-12 whitespace-nowrap overflow-hidden">
          {navigationItems.map((item) => {
            const isActive = currentView === item.id || (item.id === "services" && currentView.startsWith("service-"));
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`group relative text-[11px] font-sans font-bold tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? "text-brand-red"
                    : "text-white hover:text-brand-red"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:flex items-center shrink-0">
          <button
            id="header-cta-book-repair"
            onClick={() => handleLinkClick("request")}
            className="group flex items-center space-x-2 bg-brand-red px-8 py-3.5 text-[11px] font-sans font-black tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-brand-black shadow-xl shadow-brand-red/20 uppercase whitespace-nowrap"
          >
            <span>BOOK REPAIR</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-12 w-12 items-center justify-center text-white hover:text-brand-red transition-colors lg:hidden shrink-0"
        >
          {mobileMenuOpen ? (
            <X className="h-7 w-7" id="mobile-menu-close" />
          ) : (
            <Menu className="h-7 w-7" id="mobile-menu-burger" />
          )}
        </button>

      </div>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-24 left-0 w-full bg-brand-black border-t border-white/10 px-6 py-8 shadow-2xl animate-in fade-in slide-in-from-top-10 duration-300 h-screen">
          <div className="flex flex-col space-y-6">
            {navigationItems.map((item) => {
              const isActive = currentView === item.id || (item.id === "services" && currentView.startsWith("service-"));
              return (
                <button
                  key={item.id}
                  id={`nav-link-mobile-${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-left text-sm font-sans font-black tracking-widest uppercase transition-colors ${
                    isActive
                      ? "text-brand-red"
                      : "text-white hover:text-brand-red"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-8 mt-8 border-t border-white/10">
              <button
                id="mobile-header-cta-book-repair"
                onClick={() => handleLinkClick("request")}
                className="w-full flex items-center justify-center space-x-2 bg-brand-red py-5 text-xs font-sans font-black tracking-[0.2em] text-white hover:bg-white hover:text-brand-black transition-all shadow-xl uppercase"
              >
                <span>BOOK REPAIR</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
