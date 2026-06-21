import React, { useState, useEffect } from "react";
import { Service, Testimonial, PricingLine, LegalPageData, HomepageContent, WorkshopGalleryItem } from "./types";
import { fetchCollection, seedDatabaseIfNeeded } from "./dbHelper";
import {
  defaultServices,
  defaultTestimonials,
  defaultPricingTable,
  defaultLegalPages,
  defaultHomepageContent,
  defaultGallery,
} from "./defaultData";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import RepairProcessTimeline from "./components/RepairProcessTimeline";
import FeaturedServices from "./components/FeaturedServices";
import TestimonialsSlider from "./components/TestimonialsSlider";
import WhatsAppCTA from "./components/WhatsAppCTA";
import WorkshopGallery from "./components/WorkshopGallery";
import AboutUs from "./components/AboutUs";
import ContactPage from "./components/ContactPage";
import PricingPage from "./components/PricingPage";
import RepairRequestPage from "./components/RepairRequestPage";
import ServiceDetailPage from "./components/ServiceDetailPage";
import LegalPageLayout from "./components/LegalPageLayout";
import AdminDashboard from "./components/AdminDashboard";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import WhatsAppFloatingCTA from "./components/WhatsAppFloatingCTA";

import { motion, AnimatePresence } from "motion/react";
import { Hammer, CircleHelp, ShieldCheck, Mail, MessageSquare, ClipboardCheck, ArrowRight, CheckCircle, RefreshCw } from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState<string>(() => {
    const path = window.location.pathname;
    if (path === "/rmc-admin" || path === "/secure-admin") return "admin";
    return "home";
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Core Data Sets State
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [pricingData, setPricingData] = useState<PricingLine[]>(defaultPricingTable);
  const [legalPages, setLegalPages] = useState<LegalPageData[]>(defaultLegalPages);
  const [homepageConfig, setHomepageConfig] = useState<HomepageContent>(defaultHomepageContent);
  const [gallery, setGallery] = useState<WorkshopGalleryItem[]>(defaultGallery);

  // Selected details
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedLegalPage, setSelectedLegalPage] = useState<LegalPageData | null>(null);
  const [preSelectedService, setPreSelectedService] = useState<Service | null>(null);
  const [bookingSuccessId, setBookingSuccessId] = useState<string | null>(null);

  // Administrative login detection for top navigation indicator badge
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Initial Sync & Fetch Cycle
  useEffect(() => {
    const initializeDataAndSeeding = async () => {
      try {
        setLoading(true);
        // Automate seeding if remote tables are dry
        await seedDatabaseIfNeeded();

        // Fetch dynamic sets
        const servs = await fetchCollection<Service>("services");
        const tests = await fetchCollection<Testimonial>("testimonials");
        const prices = await fetchCollection<PricingLine>("pricing");
        const legals = await fetchCollection<LegalPageData>("legal_pages");
        const homeC = await fetchCollection<HomepageContent>("homepage");
        const gall = await fetchCollection<WorkshopGalleryItem>("gallery");

        if (servs.length > 0) setServices(servs);
        if (tests.length > 0) setTestimonials(tests);
        if (prices.length > 0) setPricingData(prices);
        if (legals.length > 0) setLegalPages(legals);
        if (gall.length > 0) setGallery(gall);
        if (homeC.length > 0) {
          const matched = homeC.find((h) => h.id === "hero");
          if (matched) setHomepageConfig(matched);
        }
      } catch (e) {
        console.warn("Relying on pre-configured static local memory tables.", e);
      } finally {
        setLoading(false);
      }
    };

    initializeDataAndSeeding();
  }, []);

  // Sync callbacks to refresh lists from child modifications within the dashboard
  const handleReloadCollections = async () => {
    try {
      const servs = await fetchCollection<Service>("services");
      const prices = await fetchCollection<PricingLine>("pricing");
      const tests = await fetchCollection<Testimonial>("testimonials");
      const legals = await fetchCollection<LegalPageData>("legal_pages");
      const gall = await fetchCollection<WorkshopGalleryItem>("gallery");

      if (servs.length > 0) setServices(servs);
      if (prices.length > 0) setPricingData(prices);
      if (tests.length > 0) setTestimonials(tests);
      if (legals.length > 0) setLegalPages(legals);
      if (gall.length > 0) setGallery(gall);
    } catch (e) {
      console.log("Reload fallback silent.");
    }
  };

  // View Router Navigation
  const handleNavigate = (viewId: string) => {
    setBookingSuccessId(null);
    setPreSelectedService(null);

    if (viewId.startsWith("service-")) {
      const sId = viewId.replace("service-", "");
      const matched = services.find((s) => s.id === sId);
      if (matched) {
        setSelectedService(matched);
        setCurrentView("service-detail");
      } else {
        setCurrentView("services");
      }
    } else if (viewId.startsWith("legal-")) {
      const pId = viewId.replace("legal-", "");
      const matched = legalPages.find((p) => p.id === pId);
      if (matched) {
        setSelectedLegalPage(matched);
        setCurrentView("legal-page");
      } else {
        setCurrentView("home");
      }
    } else {
      setCurrentView(viewId);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Navigating to direct legal policy triggers
  const handleNavigateLegal = (pageId: string) => {
    const matched = legalPages.find((p) => p.id === pageId);
    if (matched) {
      setSelectedLegalPage(matched);
      setCurrentView("legal-page");
    } else {
      setCurrentView("home");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Booking CTA flow
  const handleBookService = (service: Service) => {
    setPreSelectedService(service);
    setCurrentView("request");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBookingSuccess = (requestId: string) => {
    setBookingSuccessId(requestId);
    setCurrentView("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Featured services "View details" toggle for specific listings
  const handleSelectService = (serviceId: string) => {
    if (serviceId === "all") {
      setCurrentView("services");
    } else {
      const matched = services.find((s) => s.id === serviceId);
      if (matched) {
        setSelectedService(matched);
        setCurrentView("service-detail");
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeWhatsAppNumber = homepageConfig.whatsAppNumber || "+447700900077";

  return (
    <div className="flex min-h-screen flex-col bg-white text-brand-black selection:bg-brand-red/10 selection:text-brand-red antialiased">
      {/* Dynamic Navigation Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <div className="flex min-h-[60vh] items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <RefreshCw className="h-10 w-10 text-brand-red animate-spin" />
                  <p className="text-xs font-mono font-bold tracking-widest text-gray-500 uppercase">
                    LOADING THE WORKSHOP...
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* 1. Home Base View */}
                {currentView === "home" && (
                  <div className="space-y-0 text-brand-black bg-white">
                    <HeroSection
                      headline={homepageConfig.headline}
                      subheadline={homepageConfig.subheadline}
                      ctaText={homepageConfig.ctaText}
                      whatsAppNumber={activeWhatsAppNumber}
                      onBookRepair={() => handleNavigate("request")}
                      onWhyChooseClick={() => {
                        const whySection = document.getElementById("workshop-gallery");
                        if (whySection) {
                          whySection.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }}
                    />

                    {/* BRANDING SECTION: Trusted by first-class crickets */}
                    <TrustedCricketersGrid />
                    
                    {/* Featured repairs section details */}
                    <FeaturedServices
                      services={services}
                      onSelectService={handleSelectService}
                      onBookService={handleBookService}
                    />

                    {/* Dramatic visual transformation slider */}
                    <BeforeAfterSlider />

                    {/* Highly polished active step timeline */}
                    <RepairProcessTimeline />

                    {/* Pricing Overview Section with service lines lists */}
                    <WorkshopPricingOverview 
                      pricingData={pricingData} 
                      onBookRepair={() => handleNavigate("request")} 
                    />

                    {/* Gallery section including interactive slide comparison and masonry layouts */}
                    <WorkshopGallery items={gallery} />

                    {/* Slider customer testimonials */}
                    <TestimonialSliderSection testimonials={testimonials} />

                    {/* Dynamic accordion FAQ segment */}
                    <WorkshopFAQSection />

                    {/* WhatsApp bottom banner conversion */}
                    <WhatsAppCTA whatsAppNumber={activeWhatsAppNumber} />

                    {/* Contact details section */}
                    <HomeContactSection whatsAppNumber={activeWhatsAppNumber} />
                  </div>
                )}

                {/* 2. All Services List View */}
                {currentView === "services" && (
                  <div className="bg-white py-12 md:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                      <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
                        <p className="text-xs font-mono font-black tracking-widest text-brand-red uppercase">
                          OUR BESPOKE WORKSHOP SELECTION
                        </p>
                        <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-brand-black uppercase">
                          Bespoke Bat Repair & Refurbishments
                        </h1>
                        <p className="text-sm sm:text-base text-gray-500 font-sans">
                          Browse our full service catalog below. Click view details to compare before and after photos, or book immediately to reserve a slot.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                          <div
                            key={service.id}
                            className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                          >
                            <div className="relative h-48 overflow-hidden bg-brand-gray">
                              <img src={service.imageUrl} alt={service.title} referrerPolicy="no-referrer" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              <span className="absolute top-4 right-4 bg-brand-black/90 text-white font-mono text-[10px] uppercase font-black py-1.5 px-3 rounded-xl border border-white/10">FROM £{service.startingPrice}</span>
                            </div>
                            <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                              <div className="space-y-3">
                                <h3 className="text-lg font-black text-brand-black group-hover:text-brand-red transition-colors font-sans uppercase tracking-tight">{service.title}</h3>
                                <p className="text-xs text-brand-red font-black uppercase font-mono tracking-wider">Turnaround: {service.duration || "3 Days"}</p>
                                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans line-clamp-3">{service.description}</p>
                              </div>
                              <div className="mt-6 pt-4 border-t border-brand-gray flex gap-4">
                                <button onClick={() => handleSelectService(service.id)} className="flex-1 py-2.5 bg-brand-gray hover:bg-brand-black hover:text-white text-gray-700 text-xs font-black rounded-xl transition cursor-pointer uppercase tracking-widest">Details</button>
                                <button onClick={() => handleBookService(service)} className="flex-1 py-2.5 bg-brand-red text-white text-xs font-black rounded-xl shadow-sm hover:bg-brand-black transition cursor-pointer uppercase tracking-widest">Book Spot</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Single Service Detailed View */}
                {currentView === "service-detail" && selectedService && (
                  <ServiceDetailPage
                    service={selectedService}
                    onBack={() => setCurrentView("services")}
                    onBookService={handleBookService}
                    whatsAppNumber={activeWhatsAppNumber}
                  />
                )}

                {/* 4. Service Pricing Matrix Page */}
                {currentView === "pricing" && (
                  <PricingPage
                    pricingData={pricingData}
                    onBookRepair={() => handleNavigate("request")}
                    whatsAppNumber={activeWhatsAppNumber}
                  />
                )}

                {/* 5. About Workshop Tab */}
                {currentView === "about" && <AboutUs />}

                {/* 6. Contact Form Page */}
                {currentView === "contact" && (
                  <ContactPage whatsAppNumber={activeWhatsAppNumber} />
                )}

                {/* 7. Repair Booking Reservation page state */}
                {currentView === "request" && (
                  <RepairRequestPage
                    services={services}
                    preSelectedService={preSelectedService}
                    onSuccess={handleBookingSuccess}
                  />
                )}

                {/* 8. Booking Success Screen */}
                {currentView === "success" && (
                  <div className="bg-white py-12 md:py-20 text-center space-y-8">
                    <div className="mx-auto max-w-2xl px-4 text-center space-y-6">
                                            <div className="h-16 w-16 bg-brand-red/10 border border-brand-red/10 text-brand-red rounded-2xl flex items-center justify-center mx-auto shadow animate-bounce">
                        <CheckCircle className="h-10 w-10" />
                      </div>

                      <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-brand-black uppercase">
                        Workshop Slot Secured!
                      </h1>

                      <p className="text-sm sm:text-base text-gray-550 leading-relaxed font-sans max-w-xl mx-auto">
                        Your booking has been finalized. We have locked in your diagnostics slot under reservation token:
                      </p>

                      {bookingSuccessId && (
                        <div className="inline-block py-3 px-6 rounded-2xl bg-brand-black text-white font-mono font-black text-lg tracking-widest uppercase border border-gray-900 shadow">
                          {bookingSuccessId}
                        </div>
                      )}

                      {/* Instruction Cards for Shipping bat */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">
                        <div className="p-5 border rounded-2xl bg-gray-50 space-y-2">
                          <span className="text-[10px] bg-brand-red/10 text-brand-red font-extrabold tracking-wider uppercase px-2 py-0.5 rounded font-mono">Step 1</span>
                          <h4 className="text-xs font-bold text-gray-900 font-sans uppercase">Pack in Shielding</h4>
                          <p className="text-[11px] leading-relaxed text-gray-500 font-sans">Sleeve or wrap the bat blade securely inside padded cardboard wrappers or bat boxes.</p>
                        </div>

                        <div className="p-5 border rounded-2xl bg-gray-50 space-y-2">
                          <span className="text-[10px] bg-brand-red/10 text-brand-red font-extrabold tracking-wider uppercase px-2 py-0.5 rounded font-mono">Step 2</span>
                          <h4 className="text-xs font-bold text-gray-900 font-sans uppercase">Label with reference</h4>
                          <p className="text-[11px] leading-relaxed text-gray-500 font-sans">Print the reference ID ({bookingSuccessId}) clearly on the outer surface of your box.</p>
                        </div>

                        <div className="p-5 border rounded-2xl bg-gray-50 space-y-2">
                          <span className="text-[10px] bg-brand-red/10 text-brand-red font-extrabold tracking-wider uppercase px-2 py-0.5 rounded font-mono">Step 3</span>
                          <h4 className="text-xs font-bold text-gray-900 font-sans uppercase">Send or Drop off</h4>
                          <p className="text-[11px] leading-relaxed text-gray-500 font-sans">Ship to HA9 0TH or drop off personally. Email confirmation sent to you.</p>
                        </div>
                      </div>

                      {/* WhatsApp trigger integration */}
                      <div className="bg-brand-red/5 border border-brand-red/10 rounded-2xl p-6 space-y-4 max-w-xl mx-auto">
                        <p className="text-xs sm:text-sm text-brand-black font-semibold">
                          Quick status update: Send your reference code <span className="font-bold">{bookingSuccessId}</span> on WhatsApp now for direct chat coordination!
                        </p>
                        
                        <a
                          href={`https://wa.me/${activeWhatsAppNumber.replace(/\+/g, "")}?text=${encodeURIComponent(
                            `Hello Run Machine, I just booked a repair online! My Booking Reference is ${bookingSuccessId}. Please let me know the shipping steps.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-2 bg-brand-red hover:bg-brand-black text-white rounded-xl py-3.5 px-6 text-xs font-extrabold uppercase tracking-widest transition-colors"
                        >
                          <MessageSquare className="h-4.5 w-4.5" />
                          <span>WhatsApp Ref Code</span>
                        </a>
                      </div>

                      <button
                        onClick={() => handleNavigate("home")}
                        className="text-xs font-bold underline tracking-wider uppercase text-gray-500 hover:text-gray-900 font-mono block mx-auto py-2"
                      >
                        Return to Homepage Panel
                      </button>

                    </div>
                  </div>
                )}

                {/* 9. Legal Policy Presentation View */}
                {currentView === "legal-page" && selectedLegalPage && (
                  <LegalPageLayout
                    page={selectedLegalPage}
                    onBack={() => setCurrentView("home")}
                  />
                )}

                {/* 10. Admin Control Board Console */}
                {currentView === "admin" && (
                  <AdminDashboard
                    onServiceChange={handleReloadCollections}
                    onPricingChange={handleReloadCollections}
                    onTestimonialChange={handleReloadCollections}
                    onPageClose={() => handleNavigate("home")}
                  />
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Floating Actions */}
      {currentView !== "admin" && (
        <WhatsAppFloatingCTA whatsAppNumber={activeWhatsAppNumber} />
      )}

      {/* Corporate Platform Footer */}
      <Footer onNavigate={handleNavigate} onNavigateLegal={handleNavigateLegal} />
    </div>
  );
}

// Subordinate wrapper section component strictly following modular rules
function TestimonialSliderSection({ testimonials }: { testimonials: Testimonial[] }) {
  return <TestimonialsSlider testimonials={testimonials} />;
}

// 1. BRANDING GRID: TRUSTED CRICKETERS
function TrustedCricketersGrid() {
  const brands = [
    { name: "Gray-Nicolls", spec: "G1+ Premium Blades" },
    { name: "Kookaburra", spec: "Active Cleft Shapers" },
    { name: "Gunn & Moore", spec: "Traditional Linseed Cures" },
    { name: "New Balance", spec: "High Impact Pressing" },
    { name: "Adidas Cricket", spec: "Custom Balance Tuning" }
  ];

  return (
    <div className="bg-brand-black text-white py-12 border-y border-white/5 relative overflow-hidden select-none">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-sm text-center md:text-left">
          <p className="text-[10px] font-mono tracking-widest text-brand-red font-black uppercase">TRUSTED BY THE BEST</p>
          <h3 className="text-lg font-black tracking-tight mt-1 uppercase">CRAFT INSPIRATIONS</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 flex-1 justify-items-center">
          {brands.map((brand, i) => (
            <div key={i} className="text-center group cursor-pointer p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-brand-red/20 transition-all duration-300 w-full max-w-[11rem]">
              <p className="text-sm font-black tracking-tighter uppercase font-sans text-white group-hover:text-brand-red transition-colors">
                {brand.name}
              </p>
              <p className="text-[8px] font-mono tracking-widest text-gray-400 uppercase mt-1">
                {brand.spec}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. FAQ INTERACTIVE ACCORDION
function WorkshopFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "WHY COMPRESS English Willow IN A HYDRAULIC RE-PRESS?",
      a: "English willow consists of microscopic soft-air wood-pockets. Pressing seals these cell walls together uniformly, multiplying the rebound 'ping' and hardening the surface so seam marks don't crack the bat face."
    },
    {
      q: "WHAT IS THE STANDARD WORKSHOP TURNAROUND?",
      a: "Our standard turnaround is 2 to 4 working days. Certain extensive restorations (like complete structural Re-Handles or Edge-Grafts) require consecutive cycles of oil curing and epoxy sealing under custom clamps which may extend to 5-6 days to guarantee perfect longevity."
    },
    {
      q: "CAN I BRING MY OWN BRANDED STICKERS FOR REFURBISHMENT?",
      a: "Absolutely. When you book our Re-Stickering or Full Refurbishment package, select 'Drop Off Personally' or ship the bat along with your branded stickers. Our craftsmen will block-sand and dry-seal them perfectly clean without trapped bubbles."
    },
    {
      q: "DO YOU OFFER DOOR-TO-DOOR COURIER COLLECTIONS?",
      a: "Yes. When submitting a request, you can select 'Pickup Required'. We coordinate secure tracked courier packaging through DHL/DPD to retrieve the bat from your address and return it safely wrapped inside heavy-duty armor packaging."
    },
    {
      q: "IS AN EDGE GRAFT AS DURABLE AS THE ORIGINAL WOOD PROFILE?",
      a: "Yes. We source aged English willow block grafts. We route out split tissue, inject high-torque structural resin, clamp for 24 hours high-torque curing, and hand-roll the edge to perfect curvature. In impact tests, the structural repair line is stronger than raw wood cells."
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 border-b border-gray-100">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-4">
          <p className="text-xs font-mono font-black tracking-widest text-brand-red uppercase">KNOWLEDGE BASE</p>
          <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-brand-black uppercase">FREQUENT REPAIR QUERY DIRECTS</h2>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Understand English willow physics, adhesive characteristics, and custom seasonal prep.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-250/10 rounded-2xl overflow-hidden hover:border-brand-red/20 transition-all shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full text-left p-6 flex justify-between items-center bg-brand-gray/50 hover:bg-brand-gray transition-colors cursor-pointer"
              >
                <span className="text-xs sm:text-sm font-black text-brand-black uppercase tracking-tight font-sans">
                  {faq.q}
                </span>
                <span className="text-brand-red font-black text-lg ml-4">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-white border-t border-gray-100"
                  >
                    <div className="p-6 text-xs sm:text-sm leading-relaxed text-gray-500 font-sans">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// 3. PRICING OVERVIEW TABLE
interface WorkshopPricingOverviewProps {
  pricingData: PricingLine[];
  onBookRepair: () => void;
}

function WorkshopPricingOverview({ pricingData, onBookRepair }: WorkshopPricingOverviewProps) {
  const groups = Array.from(new Set(pricingData.map(p => p.serviceGroup)));

  return (
    <section className="bg-white py-16 md:py-24 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-mono font-black tracking-widest text-brand-red uppercase">PRICING TRANSPARENCY</p>
          <h2 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-brand-black uppercase">WORKSHOP SERVICE INDEX</h2>
          <p className="text-sm text-gray-500">
            Every service is priced transparently. We quote bespoke repairs upfront before any blade machining begins.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {groups.map((group, gIdx) => (
            <div key={gIdx} className="bg-brand-gray border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="text-sm font-black tracking-wider text-brand-red uppercase font-sans pb-3 border-b border-brand-border">
                {group}
              </h3>
              
              <div className="space-y-4">
                {pricingData.filter(p => p.serviceGroup === group).map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4 text-xs sm:text-sm">
                    <div className="space-y-0.5">
                      <p className="font-extrabold text-brand-black uppercase tracking-tight font-sans">{item.serviceName}</p>
                      <p className="text-[9px] font-mono text-gray-400 uppercase tracking-widest leading-none">{item.priceType}</p>
                    </div>
                    <span className="font-mono font-black text-brand-red shrink-0 text-base">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onBookRepair}
            className="rounded-xl bg-brand-black hover:bg-brand-red text-white py-4 px-8 text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg"
          >
            BOOK REPAIR WORKSHOP SPOT
          </button>
        </div>

      </div>
    </section>
  );
}

// 4. HOME PAGE CONTACT DETAILS
function HomeContactSection({ whatsAppNumber }: { whatsAppNumber: string }) {
  const [formSent, setFormSent] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <section className="bg-brand-gray py-16 sm:py-24" id="home-contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-mono font-black tracking-widest text-brand-red uppercase">WORKSHOP ACCURACIES</p>
              <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-brand-black uppercase">CONTACT OUR LONDON LAB</h2>
              <p className="text-sm text-gray-500 font-sans leading-relaxed">
                Send your timber coordinates or schedule a direct visit to watch our automatic pressing rollers in real-time.
              </p>
            </div>

            <div className="space-y-6 font-sans text-xs sm:text-sm">
              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 bg-brand-black text-white rounded-xl flex items-center justify-center font-black">
                  L
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-black uppercase tracking-tight">Main Workshop Headquarters</h4>
                  <p className="text-gray-500 mt-1">Run Machine Cricket Repair Labs</p>
                  <p className="text-gray-500">Suite 12, Wembley Commercial Center</p>
                  <p className="text-gray-500">Wembley, London, HA9 0TH</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 shrink-0 bg-brand-red text-white rounded-xl flex items-center justify-center font-black">
                  T
                </div>
                <div>
                  <h4 className="font-extrabold text-brand-black uppercase tracking-tight">Support Lines</h4>
                  <p className="text-gray-500 mt-1">WhatsApp Desk: {whatsAppNumber}</p>
                  <p className="text-gray-500">Email Direct: info@runmachinecricket.co.uk</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            
            <h3 className="text-lg font-black text-brand-black uppercase tracking-tight mb-2">QUICK ENQUIRY</h3>
            <p className="text-xs text-gray-400 mb-6 uppercase tracking-wider">Fill in our workshop diagnostics form below</p>

            {formSent ? (
              <div className="p-6 bg-brand-red/5 border border-brand-red/10 text-brand-red text-xs sm:text-sm rounded-2xl flex flex-col items-center space-y-3 text-center">
                <CheckCircle className="h-8 w-8 text-brand-red" />
                <p className="font-black uppercase tracking-wider">Enquiry Lodged Successfully</p>
                <p className="text-gray-500 font-sans">Our master carpenter will review your specifications and contact you on WhatsApp shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 font-sans text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600 uppercase tracking-wider">Full Name</label>
                    <input required type="text" className="w-full border border-gray-200 rounded-xl py-3 px-4 focus:outline-brand-red" placeholder="Usman Farooq" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600 uppercase tracking-wider">Email Direct</label>
                    <input required type="email" className="w-full border border-gray-200 rounded-xl py-3 px-4 focus:outline-brand-red" placeholder="usman@gmail.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600 uppercase tracking-wider">WhatsApp Number</label>
                    <input required type="text" className="w-full border border-gray-200 rounded-xl py-3 px-4 focus:outline-brand-red" placeholder="+44 7700 900077" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-gray-600 uppercase tracking-wider">Bat Brand & Model</label>
                    <input type="text" className="w-full border border-gray-200 rounded-xl py-3 px-4 focus:outline-brand-red" placeholder="Gray-Nicolls Kaboom" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gray-600 uppercase tracking-wider">Condition & Repair Specifics</label>
                  <textarea required rows={4} className="w-full border border-gray-200 rounded-xl py-3 px-4 focus:outline-brand-red" placeholder="Specify click sounds in the handle, deep toe grain splits, or if you need custom knock-in..."></textarea>
                </div>

                <button type="submit" className="w-full rounded-xl bg-brand-black hover:bg-brand-red text-white py-4 text-xs font-black uppercase tracking-widest cursor-pointer transition-all shadow-md">
                  SUBMIT DIAGNOSTICS ENQUIRY
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
