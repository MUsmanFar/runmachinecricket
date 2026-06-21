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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo Container */}
        <div
          onClick={() => handleLinkClick("home")}
          className="flex cursor-pointer items-center space-x-4 transition-transform hover:scale-[1.02]"
        >
          <div className="flex h-12 w-12 items-center justify-center bg-brand-black text-white shadow-lg">
            <Hammer className="h-6 w-6" id="logo-icon-hammer" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-sans font-black text-2xl tracking-tighter text-gray-900 uppercase">
                Run Machine
              </span>
              <span className="bg-brand-red px-1.5 py-0.5 text-[10px] font-black text-white uppercase tracking-widest">
                Cricket
              </span>
            </div>
            <p className="text-[9px] font-mono font-bold tracking-widest text-gray-400 uppercase mt-0.5">
              Premium Bat Restoration
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navigationItems.map((item) => {
            const isActive = currentView === item.id || (item.id === "services" && currentView.startsWith("service-"));
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`group relative text-[11px] font-black tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? "text-brand-black"
                    : "text-gray-400 hover:text-brand-black"
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-brand-red transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            id="header-cta-book-repair"
            onClick={() => handleLinkClick("request")}
            className="group flex items-center space-x-2 bg-brand-black px-7 py-3.5 text-[11px] font-black tracking-widest text-white transition-all duration-300 hover:bg-brand-red"
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
