import { useState } from "react";
import { PricingLine } from "../types";
import { Search, Tag, MessageSquare, ClipboardCheck, AlertCircle } from "lucide-react";

interface PricingPageProps {
  pricingData: PricingLine[];
  onBookRepair: () => void;
  whatsAppNumber: string;
}

export default function PricingPage({
  pricingData,
  onBookRepair,
  whatsAppNumber,
}: PricingPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");

  // Get unique service groups for tabs
  const groups = ["All", ...Array.from(new Set(pricingData.map((p) => p.serviceGroup)))];

  // Filter pricing lists
  const filteredPricing = pricingData.filter((item) => {
    const matchesSearch =
      item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serviceGroup.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === "All" || item.serviceGroup === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  const getPriceTypeBadge = (type: string) => {
    switch (type) {
      case "Fixed":
        return <span className="bg-brand-red/10 text-brand-red border border-brand-red/10 text-[9px] font-black px-2 py-0.5 rounded uppercase font-mono tracking-wider">Fixed Fee</span>;
      case "Starting From":
        return <span className="bg-brand-black text-white border border-brand-black text-[9px] font-black px-2 py-0.5 rounded uppercase font-mono tracking-wider">Starting From</span>;
      default:
        return <span className="bg-brand-gray text-gray-600 border border-gray-205 text-[9px] font-black px-2 py-0.5 rounded uppercase font-mono tracking-wider">Custom Quote</span>;
    }
  };

  const whatsAppMsg = encodeURIComponent(
    "Hello Run Machine Cricket, I would like to get a quote or enquire about specific bat repairs."
  );
  const cleanNumber = whatsAppNumber.replace(/\D/g, "");
  const whatsAppLink = `https://wa.me/${cleanNumber}?text=${whatsAppMsg}`;

  return (
    <div className="bg-white py-12 md:py-20 animate-fade-in">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Grid */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <p className="text-xs font-mono font-black tracking-widest text-brand-red uppercase">
            CLEAR WORKSHOP ESTIMATES
          </p>
          <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-brand-black uppercase">
            Repair Service Tariff
          </h1>
          <p className="text-sm sm:text-base text-gray-500 font-sans leading-relaxed">
            Honest, competitive, and entirely transparent pricing. No hidden fees. If we find auxiliary issues inside your bat, we consult you first.
          </p>
        </div>

        {/* Filter Toolbar Container */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 border-b border-gray-100 pb-8">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className={`px-4 py-2.5 text-xs font-black rounded-xl border tracking-widest transition-all cursor-pointer ${
                  selectedGroup === group
                    ? "bg-brand-black text-white border-brand-black"
                    : "bg-brand-gray text-gray-500 border-gray-200 hover:bg-brand-black hover:text-white"
                }`}
              >
                {group.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search box input */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search specific repairs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs text-brand-black bg-brand-gray focus:bg-white focus:border-brand-red focus:outline-none transition-all font-sans"
              id="pricing-search-input"
            />
          </div>

        </div>

        {/* Pricing Matrix List as Premium Cards */}
        {filteredPricing.length === 0 ? (
          <div className="text-center py-16 border rounded-3xl bg-brand-gray space-y-3">
            <AlertCircle className="h-10 w-10 text-gray-400 mx-auto" />
            <p className="text-base font-black text-brand-black uppercase tracking-tight">No service tariff matches found</p>
            <p className="text-xs text-gray-500">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPricing.map((item) => (
              <div
                key={item.id}
                id={`pricing-card-${item.id}`}
                className="group flex flex-col bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-2xl hover:border-brand-red/20 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl group-hover:bg-brand-red/10 transition-colors" />

                <div className="mb-6 relative z-10">
                  <span className="text-[10px] font-mono font-black tracking-widest text-brand-red uppercase mb-2 block">
                    {item.serviceGroup}
                  </span>
                  <h3 className="text-xl font-black text-brand-black uppercase tracking-tight min-h-[3.5rem] flex items-center">
                    {item.serviceName}
                  </h3>
                </div>

                <div className="flex-grow flex flex-col justify-center py-6 border-y border-gray-50 relative z-10 space-y-4">
                  <div>
                    {getPriceTypeBadge(item.priceType)}
                  </div>
                  <div className="flex items-baseline space-x-2 text-brand-black">
                    <span className="text-4xl font-black font-mono tracking-tight">{item.price}</span>
                  </div>
                  
                  <ul className="space-y-3 mt-4 text-xs font-sans text-gray-500">
                    <li className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-brand-red" />
                      <span>Premium Craftsmanship Guaranteed</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <ClipboardCheck className="h-4 w-4 text-brand-red" />
                      <span>Multi-Point Workshop Inspection</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 relative z-10">
                  <button
                    onClick={onBookRepair}
                    className="w-full py-4 rounded-xl bg-brand-gray text-gray-700 font-black uppercase tracking-widest text-xs hover:bg-brand-black hover:text-white hover:shadow-lg transition-all cursor-pointer font-sans"
                  >
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Informative Grid Bottom Warning and CTAs */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          <div className="bg-brand-gray border border-gray-100 rounded-2xl p-6 flex gap-4">
            <AlertCircle className="h-6 w-6 text-brand-red shrink-0" />
            <div>
              <h4 className="text-xs sm:text-sm font-black text-brand-black uppercase tracking-tight mb-2">Custom Dynamic Modifications</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Notice: If you need custom structural wood shaving (Concaving reduction, spine remodeling) or severe break repairs not listed here, submit a Custom Quote request with photos. We accommodate bespoke batsman requirements.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-brand-red/10 bg-brand-red/5 p-6 flex flex-col justify-between">
            <div className="mb-4">
              <h4 className="text-xs sm:text-sm font-black text-brand-black uppercase tracking-tight mb-1">Ready to book your workshop slot?</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">
                Booking secure workshop appointments reserves our craftsman's time so your bat is handled with zero delays. Free returns on selected packages.
              </p>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={onBookRepair}
                className="flex-1 py-3 bg-brand-black hover:bg-brand-red text-white font-black uppercase tracking-widest rounded-xl text-xs transition cursor-pointer"
              >
                Book Repair Spot
              </button>
              
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 border border-brand-red/20 hover:border-brand-red text-brand-red text-center rounded-xl text-xs font-black uppercase tracking-widest transition hover:bg-brand-red/5"
              >
                WhatsApp Inquiry
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
