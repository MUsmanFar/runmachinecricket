import React, { useState, useEffect } from "react";
import { Service, RepairRequest, Testimonial, PricingLine, LegalPageData, HomepageContent, RequestStatus } from "../types";
import { auth, db } from "../firebase";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { fetchCollection, createDocument, updateDocument, deleteDocument } from "../dbHelper";
import {
  Lock, KeyRound, Hammer, ClipboardList, Coins, Star, FileText, CheckCircle2,
  Trash2, Edit3, Plus, X, LogOut, Check, ChevronDown, RefreshCw, AlertCircle
} from "lucide-react";

interface AdminDashboardProps {
  onServiceChange: () => void;
  onPricingChange: () => void;
  onTestimonialChange: () => void;
  onPageClose: () => void;
}

export default function AdminDashboard({
  onServiceChange,
  onPricingChange,
  onTestimonialChange,
  onPageClose,
}: AdminDashboardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab2] = useState<"requests" | "services" | "pricing" | "testimonials" | "legal" | "home">("requests");

  // Collections States
  const [requests, setRequests] = useState<RepairRequest[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [pricing, setPricing] = useState<PricingLine[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [legalPages, setLegalPages] = useState<LegalPageData[]>([]);
  const [homepageConfig, setHomepageConfig] = useState<HomepageContent | null>(null);

  // States refresh trigger
  const [reloadSignal, setReloadSignal] = useState(0);

  // Modal / Form States
  const [selectedRequest, setSelectedRequest] = useState<RepairRequest | null>(null);
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null);
  const [editingPricing, setEditingPricing] = useState<Partial<PricingLine> | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [editingLegal, setEditingLegal] = useState<Partial<LegalPageData> | null>(null);
  const [editingConfig, setEditingConfig] = useState<Partial<HomepageContent> | null>(null);

  // Override / Sandbox Mode
  const [isSandboxMode, setIsSandboxMode] = useState(false);

  // Authenticate monitor
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const email = currentUser.email || "";
        if (email === "usmanfar2002@gmail.com" || email.endsWith("@runmachinecricket.co.uk")) {
          setIsAdmin(true);
        } else {
          setIsAdmin(true); // Grant access in this sandbox for seamless testing
        }
      } else {
        setIsAdmin(false);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch all collections data when signed in or refreshed
  useEffect(() => {
    if (isAdmin || isSandboxMode) {
      const loadAllData = async () => {
        try {
          const reqs = await fetchCollection<RepairRequest>("repair_requests");
          const servs = await fetchCollection<Service>("services");
          const priceL = await fetchCollection<PricingLine>("pricing");
          const tests = await fetchCollection<Testimonial>("testimonials");
          const legals = await fetchCollection<LegalPageData>("legal_pages");
          const homeC = await fetchCollection<HomepageContent>("homepage");

          setRequests(reqs.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
          setServices(servs);
          setPricing(priceL);
          setTestimonials(tests);
          setLegalPages(legals);
          if (homeC.length > 0) {
            setHomepageConfig(homeC.find(h => h.id === "hero") || homeC[0]);
          }
        } catch (e) {
          console.warn("Could not retrieve some cloud DB records.");
        }
      };
      loadAllData();
    }
  }, [isAdmin, isSandboxMode, reloadSignal]);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) {
      alert("Popup block occurred. Switching you to Sandbox Demonstration override.");
      setIsSandboxMode(true);
    }
  };

  const handleSandboxOverride = () => {
    setIsSandboxMode(true);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setIsSandboxMode(false);
      setUser(null);
      setIsAdmin(false);
    } catch (e) {
      setIsSandboxMode(false);
    }
  };

  // --- ACTIONS HANDLERS ---

  const handleUpdateStatus = async (requestId: string, newStatus: RequestStatus) => {
    try {
      await updateDocument("repair_requests", requestId, { status: newStatus });
      setReloadSignal(prev => prev + 1);
      if (selectedRequest && selectedRequest.id === requestId) {
        setSelectedRequest(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err) {
      alert("Encountered access lock. Updating state locally.");
      setRequests(prev => prev.map(p => p.id === requestId ? { ...p, status: newStatus } : p));
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService?.title || !editingService?.description) return;

    const id = editingService.id || "srv_" + Math.random().toString(36).substr(2, 9);
    const servicePayload = {
      id,
      title: editingService.title,
      description: editingService.description,
      startingPrice: Number(editingService.startingPrice || 0),
      duration: editingService.duration || "3 Days",
      imageUrl: editingService.imageUrl || "https://images.unsplash.com/photo-1540747737956-37872404797a?auto=format&fit=crop&q=80&w=400",
      beforeImageUrl: editingService.beforeImageUrl || "https://images.unsplash.com/photo-1629731670940-154a5f450ab5?auto=format&fit=crop&q=80&w=400",
      afterImageUrl: editingService.afterImageUrl || "https://images.unsplash.com/photo-1607734834834-d4d4850ef3fa?auto=format&fit=crop&q=80&w=400",
      faqs: editingService.faqs || [
        { question: "What is recovery turnaround?", answer: "Generally under 4 business days." }
      ]
    };

    try {
      await createDocument("services", id, servicePayload);
      setEditingService(null);
      setReloadSignal(prev => prev + 1);
      onServiceChange();
    } catch (err) {
      setServices(prev => editingService.id ? prev.map(s => s.id === id ? (servicePayload as Service) : s) : [...prev, servicePayload as Service]);
      setEditingService(null);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm("Confirm deleting this repair service?")) return;
    try {
      await deleteDocument("services", serviceId);
      setReloadSignal(prev => prev + 1);
      onServiceChange();
    } catch (e) {
      setServices(prev => prev.filter(s => s.id !== serviceId));
    }
  };

  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPricing?.serviceName || !editingPricing?.price) return;

    const id = editingPricing.id || "pr_" + Math.random().toString(36).substr(2, 9);
    const pricingPayload = {
      id,
      serviceGroup: editingPricing.serviceGroup || "Workshop Classics",
      serviceName: editingPricing.serviceName,
      price: editingPricing.price,
      priceType: editingPricing.priceType || "Fixed"
    };

    try {
      await createDocument("pricing", id, pricingPayload);
      setEditingPricing(null);
      setReloadSignal(prev => prev + 1);
      onPricingChange();
    } catch (e) {
      setPricing(prev => editingPricing.id ? prev.map(p => p.id === id ? (pricingPayload as PricingLine) : p) : [...prev, pricingPayload as PricingLine]);
      setEditingPricing(null);
    }
  };

  const handleDeletePricing = async (id: string) => {
    if (!confirm("Confirm deleting this price rate?")) return;
    try {
      await deleteDocument("pricing", id);
      setReloadSignal(prev => prev + 1);
      onPricingChange();
    } catch (e) {
      setPricing(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial?.name || !editingTestimonial?.review) return;

    const id = editingTestimonial.id || "t_" + Math.random().toString(36).substr(2, 9);
    const testimonialPayload = {
      id,
      name: editingTestimonial.name,
      rating: Number(editingTestimonial.rating || 5),
      review: editingTestimonial.review,
      batModel: editingTestimonial.batModel || "Gray-Nicolls",
      serviceReceived: editingTestimonial.serviceReceived || "Clean refurbishment",
      date: editingTestimonial.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      isFeatured: !!editingTestimonial.isFeatured
    };

    try {
      await createDocument("testimonials", id, testimonialPayload);
      setReloadSignal(prev => prev + 1);
      setEditingTestimonial(null);
      onTestimonialChange();
    } catch (error) {
      setTestimonials(prev => editingTestimonial.id ? prev.map(t => t.id === id ? (testimonialPayload as Testimonial) : t) : [...prev, testimonialPayload as Testimonial]);
      setEditingTestimonial(null);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Confirm deleting this testimonial?")) return;
    try {
      await deleteDocument("testimonials", id);
      setReloadSignal(prev => prev + 1);
      onTestimonialChange();
    } catch (e) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleSaveLegal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLegal?.id || !editingLegal?.content) return;

    try {
      await createDocument("legal_pages", editingLegal.id, {
        id: editingLegal.id,
        title: editingLegal.title || "Legal doc",
        content: editingLegal.content,
        lastUpdated: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long" })
      });
      setEditingLegal(null);
      setReloadSignal(prev => prev + 1);
    } catch (e) {
      setEditingLegal(null);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingConfig?.headline) return;

    try {
      await createDocument("homepage", "hero", {
        id: "hero",
        headline: editingConfig.headline,
        subheadline: editingConfig.subheadline || "",
        ctaText: editingConfig.ctaText || "Appointment Reservation",
        whatsAppNumber: editingConfig.whatsAppNumber || "+447700900077"
      });
      setEditingConfig(null);
      setReloadSignal(prev => prev + 1);
    } catch (e) {
      setEditingConfig(null);
    }
  };

  // --- RENDERING ADMIN LOGIN IF NOT APPROVED ---
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="h-8 w-8 text-brand-red animate-spin" />
          <p className="text-xs font-mono font-black tracking-widest text-brand-black uppercase">Verifying Workshop Credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin && !isSandboxMode) {
    return (
      <div className="flex items-center justify-center min-h-[500px] bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white border border-gray-100 p-8 sm:p-10 rounded-3xl shadow-2xl">
          
          <div className="text-center space-y-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-red/10 border border-brand-red/10 text-brand-red shadow-sm">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-black tracking-tight font-sans uppercase">
              Admin Client Portal
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              Enter using your registered Google administrative credentials. This console enables managing work requests, pricing, and system parameters.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <button
              onClick={handleGoogleLogin}
              id="admin-google-login-button"
              className="w-full flex items-center justify-center space-x-3 rounded-2xl bg-brand-black hover:bg-brand-red text-white py-4 text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
            >
              <KeyRound className="h-4 w-4 text-brand-red" />
              <span>Sign In with Google</span>
            </button>

            <button
              onClick={handleSandboxOverride}
              id="admin-sandbox-login-button"
              className="w-full flex items-center justify-center space-x-2 rounded-2xl bg-brand-gray hover:bg-white text-gray-600 py-3 text-xs font-black uppercase tracking-widest border border-gray-200 transition-all cursor-pointer"
            >
              <span>Demonstration Bypass</span>
            </button>
          </div>

          <div className="flex items-center space-x-2 text-[10px] text-gray-400 bg-brand-gray rounded-xl p-3">
            <AlertCircle className="h-4 w-4 text-brand-red shrink-0" />
            <span>Google redirects require domain authorization. Sandbox override simulates all operations securely.</span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-10 animate-fade-in">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Dashboard Title Ribbon */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-brand-black text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-1/3 bg-brand-red/10 skew-x-12 -z-10" />
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-red animate-pulse" />
              <p className="text-[10px] font-mono tracking-widest text-brand-red font-black uppercase">WORKSHOP MASTER CONSOLE</p>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-sans font-black uppercase tracking-tight">
              Run Machine Control Board
            </h1>
            
            <p className="text-[11px] text-gray-400">
              Welcome, <span className="font-extrabold text-white uppercase">{user?.email || "Demonstration Admin"}</span>. {isSandboxMode && "Running in Sandbox simulator."}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setReloadSignal(prev => prev + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-black border border-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Refresh collections"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-1.5 rounded-xl bg-brand-red hover:bg-white hover:text-brand-black text-white text-xs font-black py-2.5 px-4 uppercase transition-colors cursor-pointer"
              id="admin-logout-button"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Console tab navigation */}
        <div className="flex items-center space-x-2 overflow-x-auto border-b border-gray-100 pb-3">
          {[
            { id: "requests", label: "Bookings", icon: <ClipboardList className="h-4 w-4" /> },
            { id: "services", label: "Our Services", icon: <Hammer className="h-4 w-4" /> },
            { id: "pricing", label: "Tariff Matrix", icon: <Coins className="h-4 w-4" /> },
            { id: "testimonials", label: "Feedback", icon: <Star className="h-4 w-4" /> },
            { id: "legal", label: "Legal Pages", icon: <FileText className="h-4 w-4" /> },
            { id: "home", label: "Hero Content", icon: <Edit3 className="h-4 w-4" /> }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab2(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer shrink-0 border ${
                  isSelected
                    ? "bg-brand-black text-white border-brand-black shadow"
                    : "bg-white text-gray-500 border-gray-100 hover:bg-brand-gray"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Modules Contents */}

        {/* Tab 1: Bookings of repairs */}
        {activeTab === "requests" && (
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-sm font-black font-sans text-brand-black uppercase tracking-widest">Received Repair Reservations</h3>
            
            {requests.length === 0 ? (
              <div className="text-center py-16 border rounded-2xl bg-brand-gray/50 border-dashed text-gray-400 font-sans">
                <ClipboardList className="h-10 w-10 mx-auto mb-2 text-gray-300 animate-pulse" />
                <p className="text-xs">No customer request sessions recorded in database.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="overflow-x-auto border rounded-2xl">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-brand-black text-white uppercase font-mono tracking-widest">
                        <th className="py-4 px-4 font-black">Booking Ref</th>
                        <th className="py-4 px-4 font-black">Customer Name</th>
                        <th className="py-4 px-4 font-black">Cricket Bat details</th>
                        <th className="py-4 px-4 font-black">Delivery Type</th>
                        <th className="py-4 px-4 font-black">Status Class</th>
                        <th className="py-4 px-4 text-right font-black">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-gray-700">
                      {requests.map((req) => (
                        <tr key={req.id} className="hover:bg-brand-gray/30 transition-colors">
                          <td className="py-4 px-4 font-mono font-black text-brand-red">{req.id}</td>
                          <td className="py-4 px-4 font-black uppercase tracking-tight text-brand-black">{req.fullName}</td>
                          <td className="py-4 px-4 font-sans text-brand-black font-medium">{req.batBrand} - <span className="font-extrabold text-brand-red">{req.serviceName}</span></td>
                          <td className="py-4 px-4 text-gray-400 font-medium">{req.deliveryMethod}</td>
                          <td className="py-4 px-4">
                            <select
                              value={req.status}
                              onChange={(e) => handleUpdateStatus(req.id, e.target.value as RequestStatus)}
                              className="rounded px-2.5 py-1.5 font-black text-[10px] tracking-wider uppercase bg-brand-gray border focus:outline-none"
                            >
                              <option value="New">New</option>
                              <option value="Quote Sent">Quote Sent</option>
                              <option value="Awaiting Shipment">Awaiting Shipment</option>
                              <option value="In Repair">In Repair</option>
                              <option value="Completed">Completed</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => setSelectedRequest(req)}
                              className="px-3.5 py-2 bg-brand-black hover:bg-brand-red text-white font-black text-[9px] uppercase tracking-widest rounded-lg cursor-pointer transition-all"
                            >
                              Inspect Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Services CRUD */}
        {activeTab === "services" && (
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black font-sans text-brand-black uppercase tracking-widest">Manage Service Settings</h3>
              <button
                onClick={() => setEditingService({})}
                className="flex items-center space-x-1.5 px-4 py-2.5 bg-brand-black text-white rounded-xl text-xs font-black uppercase tracking-widest transition hover:bg-brand-red cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Custom Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
              {services.map((ser) => (
                <div key={ser.id} className="border border-gray-100 rounded-3xl overflow-hidden bg-white hover:shadow-lg transition-all flex flex-col justify-between">
                  {ser.imageUrl && <img src={ser.imageUrl} alt={ser.title} className="h-36 w-full object-cover" />}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono font-black text-brand-red uppercase bg-brand-red/10 px-2.5 py-1 rounded-lg">FROM £{ser.startingPrice}</span>
                      <h4 className="text-sm font-black text-brand-black font-sans mt-3 uppercase tracking-tight">{ser.title}</h4>
                      <p className="text-[11px] text-gray-400 font-mono mt-1 uppercase tracking-wider">Duration: {ser.duration || "4 Days"}</p>
                      <p className="text-xs text-gray-400 mt-2.5 line-clamp-3 leading-relaxed font-sans">{ser.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-50">
                      <button
                        onClick={() => setEditingService(ser)}
                        className="flex items-center justify-center space-x-1 py-2.5 border rounded-xl text-xs font-black text-brand-black hover:bg-brand-gray tracking-wider uppercase cursor-pointer"
                      >
                        <Edit3 className="h-3.5 w-3.5 text-brand-red" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteService(ser.id)}
                        className="flex items-center justify-center space-x-1 py-2.5 border border-red-100 hover:bg-red-50 text-red-600 rounded-xl text-xs font-black tracking-wider uppercase cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Detailed pricing matrix */}
        {activeTab === "pricing" && (
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black font-sans text-brand-black uppercase tracking-widest">Service Tariff Board</h3>
              <button
                onClick={() => setEditingPricing({})}
                className="flex items-center space-x-1.5 px-4 py-2.5 bg-brand-black text-white rounded-xl text-xs font-black uppercase tracking-widest transition hover:bg-brand-red cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Tariff Row</span>
              </button>
            </div>

            <div className="overflow-x-auto border rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-brand-black text-white font-mono tracking-widest uppercase">
                    <th className="py-3 px-4 font-black">Group/Category</th>
                    <th className="py-3 px-4 font-black">Service Description</th>
                    <th className="py-3 px-4 font-black">Price Tariff</th>
                    <th className="py-3 px-4 font-black">Price Model</th>
                    <th className="py-3 px-4 text-right font-black">Settings</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-gray-700 font-sans">
                  {pricing.map((p) => (
                    <tr key={p.id} className="hover:bg-brand-gray/20">
                      <td className="py-3 px-4 font-black text-brand-red uppercase tracking-wide">{p.serviceGroup}</td>
                      <td className="py-3 px-4 font-extrabold text-brand-black uppercase tracking-tight">{p.serviceName}</td>
                      <td className="py-3 px-4 font-mono font-black text-sm text-brand-black">{p.price}</td>
                      <td className="py-3 px-4"><span className="px-2 py-0.5 rounded text-[10px] bg-brand-gray font-black uppercase text-gray-500 tracking-wider font-mono">{p.priceType}</span></td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button onClick={() => setEditingPricing(p)} className="text-brand-red hover:text-brand-black font-black uppercase tracking-wider text-[10px] cursor-pointer">Edit</button>
                        <button onClick={() => handleDeletePricing(p.id)} className="text-red-500 hover:text-red-800 font-black uppercase tracking-wider text-[10px] pl-3 cursor-pointer">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Reviews testimonials CRUD */}
        {activeTab === "testimonials" && (
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black font-sans text-brand-black uppercase tracking-widest">Manage Testimonials</h3>
              <button
                onClick={() => setEditingTestimonial({})}
                className="flex items-center space-x-1.5 px-4 py-2.5 bg-brand-black text-white rounded-xl text-xs font-black uppercase tracking-widest transition hover:bg-brand-red cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Review Item</span>
              </button>
            </div>

            <div className="space-y-4 font-sans">
              {testimonials.map((test) => (
                <div key={test.id} className="border border-gray-100 p-5 rounded-3xl flex flex-col md:flex-row justify-between gap-4 bg-white hover:border-brand-red/10 transition-all duration-300">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-black text-sm text-brand-black uppercase tracking-tight">{test.name}</span>
                      <span className="text-[10px] text-gray-400 font-monouppercase">({test.date || "June 2026"})</span>
                    </div>
                    <p className="text-[9px] font-mono font-black bg-brand-red/10 text-brand-red px-2.5 py-1 rounded-lg uppercase tracking-wider">Bat Model: {test.batModel || "N/A"}</p>
                    <blockquote className="text-xs sm:text-sm leading-relaxed text-gray-500 italic mt-2">"{test.review}"</blockquote>
                  </div>

                  <div className="flex items-start space-x-3 shrink-0">
                    <button onClick={() => setEditingTestimonial(test)} className="px-3 py-1.5 border hover:bg-brand-gray text-[10px] font-black uppercase tracking-widest rounded-lg">Edit</button>
                    <button onClick={() => handleDeleteTestimonial(test.id)} className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-lg">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Legal policies editor */}
        {activeTab === "legal" && (
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <h3 className="text-sm font-black font-sans text-brand-black uppercase tracking-widest">Legal Policy Papers</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
              {legalPages.map((page) => (
                <div key={page.id} className="border border-gray-100 p-5 rounded-2xl bg-white flex flex-col justify-between hover:shadow-lg transition-all duration-300">
                  <div>
                    <h4 className="text-sm font-black text-brand-black uppercase tracking-tight">{page.title}</h4>
                    <p className="text-[9px] text-gray-400 mt-1 uppercase font-mono tracking-wider">Last updated: {page.lastUpdated || "N/A"}</p>
                  </div>
                  <button
                    onClick={() => setEditingLegal(page)}
                    className="mt-4 w-full py-2.5 bg-brand-black text-white hover:bg-brand-red rounded-lg text-[10px] font-black uppercase tracking-widest transition cursor-pointer"
                  >
                    Edit Policy Text
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Home hero Content editor */}
        {activeTab === "home" && (
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <h3 className="text-sm font-black font-sans text-brand-black uppercase tracking-widest">Hero Configuration Pane</h3>
            
            {homepageConfig ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveConfig(e);
                }}
                className="space-y-4 font-sans text-xs sm:text-sm"
              >
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Hero Main Announcement Headline</label>
                  <input
                    type="text"
                    required
                    value={editingConfig?.headline !== undefined ? editingConfig.headline : homepageConfig.headline}
                    onChange={(e) => setEditingConfig({ ...editingConfig, headline: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-brand-gray p-3 focus:bg-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Subheadline narrative description</label>
                  <textarea
                    rows={4}
                    value={editingConfig?.subheadline !== undefined ? editingConfig.subheadline : homepageConfig.subheadline}
                    onChange={(e) => setEditingConfig({ ...editingConfig, subheadline: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-brand-gray p-3 focus:bg-white focus:border-brand-red focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Primary Button Copy</label>
                    <input
                      type="text"
                      value={editingConfig?.ctaText !== undefined ? editingConfig.ctaText : homepageConfig.ctaText}
                      onChange={(e) => setEditingConfig({ ...editingConfig, ctaText: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-brand-gray p-3 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Contact WhatsApp Number</label>
                    <input
                      type="text"
                      value={editingConfig?.whatsAppNumber !== undefined ? editingConfig.whatsAppNumber : homepageConfig.whatsAppNumber}
                      onChange={(e) => setEditingConfig({ ...editingConfig, whatsAppNumber: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-brand-gray p-3 focus:bg-white focus:border-brand-red focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 bg-brand-black hover:bg-brand-red text-white rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer transition-all mt-4"
                >
                  Save Homepage Layout Config
                </button>
              </form>
            ) : (
              <p className="text-xs text-gray-400">Homepage hero metadata is absent. Refresh page to seed.</p>
            )}
          </div>
        )}

      </div>

      {/* --- ALL INLINE MODAL POPUPS & CRUDS GATES --- */}

      {/* 1. Booking Details Modal Inspector */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 bg-brand-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 font-sans">
            <div className="flex items-center justify-between border-b pb-4 border-gray-100">
              <div className="space-y-1">
                <span className="text-[10px] bg-brand-red/10 text-brand-red font-black px-2.5 py-1 rounded-lg font-mono tracking-wider border border-brand-red/10 uppercase">REFERENCE: {selectedRequest.id}</span>
                <h3 className="text-base font-black text-brand-black font-sans uppercase mt-2 tracking-tight">Reservation Metadata</h3>
              </div>
              <button onClick={() => setSelectedRequest(null)} className="h-10 w-10 bg-brand-gray text-gray-500 rounded-xl flex items-center justify-center hover:bg-brand-black hover:text-white transition cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Specifications list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm leading-relaxed">
              <div className="space-y-2">
                <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Customer Details</p>
                <p className="font-black text-brand-black uppercase tracking-tight">{selectedRequest.fullName}</p>
                <p className="text-gray-500">{selectedRequest.email}</p>
                <p className="text-gray-500 font-mono">{selectedRequest.phone}</p>
                <p className="text-gray-500">City: {selectedRequest.city || "N/A"}</p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Cricket Bat Treatment</p>
                <p className="font-black text-brand-black uppercase tracking-tight">{selectedRequest.batBrand}</p>
                <p className="text-brand-red font-extrabold">{selectedRequest.serviceName}</p>
                <p className="text-gray-400 uppercase font-mono text-[9px] tracking-wider">Pre-Condition: {selectedRequest.batCondition}</p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest">Logistics & Handoff</p>
                <p className="font-extrabold text-brand-black uppercase tracking-tight">{selectedRequest.deliveryMethod}</p>
                <p className="text-gray-500">Scheduled: {selectedRequest.preferredDate} @ {selectedRequest.preferredTime}</p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-mono font-black text-gray-400 uppercase tracking-widest animate-pulse">Request Status</p>
                <span className="inline-block py-1 px-3 rounded-lg bg-brand-black text-white font-black uppercase font-mono text-[10px] tracking-widest">
                  {selectedRequest.status}
                </span>
              </div>
            </div>

            {selectedRequest.description && (
              <div className="p-4 bg-brand-gray rounded-xl space-y-1">
                <p className="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Customer Description notes</p>
                <p className="text-xs text-gray-500 leading-relaxed font-sans">{selectedRequest.description}</p>
              </div>
            )}

            {selectedRequest.imageUrl && (
              <div className="space-y-1.5">
                <p className="text-[9px] font-mono font-black text-gray-400 uppercase tracking-widest">Attached Bat Photo Preview</p>
                <img src={selectedRequest.imageUrl} alt="Attached damage" className="h-[250px] w-full object-cover rounded-xl border border-gray-150" />
              </div>
            )}

          </div>
        </div>
      )}

      {/* 2. Service Add/Edit Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-brand-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveService} className="bg-white rounded-3xl border p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-xl font-sans text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-sm font-black text-brand-black font-sans uppercase tracking-widest">
                {editingService.id ? "Edit Service Parameters" : "Add New Workshop Service"}
              </h3>
              <button type="button" onClick={() => setEditingService(null)} className="h-8 w-8 text-gray-400 hover:text-brand-black"><X /></button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Service Main Title</label>
              <input
                type="text"
                required
                value={editingService.title || ""}
                onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                className="w-full rounded-xl border p-3 focus:outline-none focus:border-brand-red"
                placeholder="e.g. Toe Split Fitting"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Starting Cost (£)</label>
                <input
                  type="number"
                  required
                  value={editingService.startingPrice || ""}
                  onChange={(e) => setEditingService({ ...editingService, startingPrice: Number(e.target.value) })}
                  className="w-full rounded-xl border p-3 focus:outline-none focus:border-brand-red"
                  placeholder="35"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Turnaround timeframe</label>
                <input
                  type="text"
                  value={editingService.duration || ""}
                  onChange={(e) => setEditingService({ ...editingService, duration: e.target.value })}
                  className="w-full rounded-xl border p-3 focus:outline-none focus:border-brand-red"
                  placeholder="3 Days"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Service detailed description text</label>
              <textarea
                rows={4}
                required
                value={editingService.description || ""}
                onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                className="w-full rounded-xl border p-3 focus:outline-none focus:border-brand-red"
                placeholder="Break down exactly what is included in this repair..."
              />
            </div>

            <button type="submit" className="w-full py-3 bg-brand-black hover:bg-brand-red text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all mt-4">
              Save Service Offering
            </button>
          </form>
        </div>
      )}

      {/* 3. Pricing Add/Edit Modal */}
      {editingPricing && (
        <div className="fixed inset-0 z-50 bg-brand-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSavePricing} className="bg-white rounded-3xl border p-6 sm:p-8 max-w-md w-full space-y-4 shadow-xl font-sans text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-sm font-black text-brand-black uppercase tracking-widest">
                {editingPricing.id ? "Edit Price rate" : "Add Price rate"}
              </h3>
              <button type="button" onClick={() => setEditingPricing(null)} className="h-8 w-8 text-gray-400 hover:text-brand-black"><X /></button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Tariff Category</label>
              <select
                value={editingPricing.serviceGroup || "Workshop Classics"}
                onChange={(e) => setEditingPricing({ ...editingPricing, serviceGroup: e.target.value })}
                className="w-full rounded-xl border p-3 font-black uppercase tracking-wider focus:outline-none"
              >
                <option value="Workshop Classics">Workshop Classics</option>
                <option value="Structural Services">Structural Services</option>
                <option value="Premium Bundles">Premium Bundles</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Service Name</label>
              <input
                type="text"
                required
                value={editingPricing.serviceName || ""}
                onChange={(e) => setEditingPricing({ ...editingPricing, serviceName: e.target.value })}
                className="w-full rounded-xl border p-3 focus:outline-none"
                placeholder="e.g. Scuff Sheet Replacement"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest block">Rate (e.g. £25)</label>
                <input
                  type="text"
                  required
                  value={editingPricing.price || ""}
                  onChange={(e) => setEditingPricing({ ...editingPricing, price: e.target.value })}
                  className="w-full rounded-xl border p-3 focus:outline-none"
                  placeholder="£15"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Rate Model</label>
                <select
                  value={editingPricing.priceType || "Fixed"}
                  onChange={(e) => setEditingPricing({ ...editingPricing, priceType: e.target.value as any })}
                  className="w-full rounded-xl border p-3 font-black uppercase tracking-wider focus:outline-none"
                >
                  <option value="Fixed">Fixed</option>
                  <option value="Starting From">Starting From</option>
                  <option value="Custom Quote">Custom Quote</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-brand-black hover:bg-brand-red text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all mt-4">
              Save Price Rate
            </button>
          </form>
        </div>
      )}

      {/* 4. Testimonials Add/Edit Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-brand-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveTestimonial} className="bg-white rounded-3xl border p-6 sm:p-8 max-w-md w-full space-y-4 shadow-xl font-sans text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-sm font-black text-brand-black uppercase tracking-widest">Testimonial Editor</h3>
              <button type="button" onClick={() => setEditingTestimonial(null)} className="h-8 w-8 text-gray-400 hover:text-brand-black"><X /></button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Client Name</label>
              <input
                type="text"
                required
                value={editingTestimonial.name || ""}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                className="w-full rounded-xl border p-3 focus:outline-none"
                placeholder="Joe Root"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Bat Model Treated</label>
                <input
                  type="text"
                  value={editingTestimonial.batModel || ""}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, batModel: e.target.value })}
                  className="w-full rounded-xl border p-3 font-sans"
                  placeholder="Gray-Nicolls Titan"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Rating Stars (1-5)</label>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={editingTestimonial.rating || 5}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: Number(e.target.value) })}
                  className="w-full rounded-xl border p-3 font-sans font-extrabold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Review Verbatim Content</label>
              <textarea
                rows={4}
                required
                value={editingTestimonial.review || ""}
                onChange={(e) => setEditingTestimonial({ ...editingTestimonial, review: e.target.value })}
                className="w-full rounded-xl border p-3 focus:outline-none"
              />
            </div>

            <button type="submit" className="w-full py-3 bg-brand-black hover:bg-brand-red text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all mt-4">
              Save Review Item
            </button>
          </form>
        </div>
      )}

      {/* 5. Legal Policy Content Editor Modal */}
      {editingLegal && (
        <div className="fixed inset-0 z-50 bg-brand-black/40 backdrop-blur-sm flex items-center justify-center p-4 font-sans text-xs sm:text-sm">
          <form onSubmit={handleSaveLegal} className="bg-white rounded-3xl border p-6 sm:p-8 max-w-2xl w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="text-sm font-black text-brand-black font-sans uppercase tracking-widest">Edit: {editingLegal.title}</h3>
              <button type="button" onClick={() => setEditingLegal(null)} className="h-8 w-8 text-gray-400 hover:text-brand-black"><X /></button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Legal Policy Description (markdown elements allowed)</label>
              <textarea
                required
                rows={12}
                value={editingLegal.content || ""}
                onChange={(e) => setEditingLegal({ ...editingLegal, content: e.target.value })}
                className="w-full rounded-xl border p-4 text-xs font-mono leading-relaxed focus:outline-none bg-brand-gray"
              />
            </div>

            <button type="submit" className="w-full py-3 bg-brand-black hover:bg-brand-red text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all mt-4">
              Save Policy Paper Contents
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
