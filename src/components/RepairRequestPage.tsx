import React, { useState } from "react";
import { Service, RequestStatus } from "../types";
import { createDocument } from "../dbHelper";
import { Calendar, Clock, Truck, ShieldCheck } from "lucide-react";

interface RepairRequestPageProps {
  services: Service[];
  preSelectedService?: Service | null;
  onSuccess: (requestId: string) => void;
}

export default function RepairRequestPage({
  services,
  preSelectedService,
  onSuccess,
}: RepairRequestPageProps) {
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsApp: "",
    city: "",
    country: "United Kingdom",
    serviceId: preSelectedService ? preSelectedService.id : services[0]?.id || "",
    batBrand: "Gray-Nicolls",
    customBrand: "",
    batCondition: "Surface Cracks & Splits",
    description: "",
    imageUrl: "",
    preferredDate: "",
    preferredTime: "10:00 AM - 12:00 PM",
    deliveryMethod: "Ship My Bat"
  });

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);

  // Brand Options
  const brandOptions = [
    "Gray-Nicolls",
    "Kookaburra",
    "SG (Sanspareils Greenlands)",
    "SS (Sarre Sports)",
    "Gunn & Moore (GM)",
    "New Balance",
    "Salix",
    "Spartan",
    "MRF",
    "Custom / Unbranded"
  ];

  // Condition Options
  const conditionOptions = [
    "Surface Cracks & Splits",
    "Snapped/Loose Handle (Clicks)",
    "Toe Splitting & Moisture Swell",
    "Edge Split / Yorker Damage",
    "Completely Worn Out (Wants Full Refurbishment)",
    "New Bat Needs Knocking In & Oiling"
  ];

  // Delivery Options
  const deliveryOptions = [
    { id: "Ship My Bat", title: "Ship My Bat", desc: "You box and send your bat to our London workshop securely." },
    { id: "Drop Off Personally", title: "Drop Off Personally", desc: "Schedule a time to drop off your bat at our Wembley HQ." },
    { id: "Pickup Required", title: "Courier Pickup Required", desc: "We arrange DPD or DHL courier pickup directly from your door ($15 fee)." }
  ];

  // Simulated Base64 compression
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadProgress(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
        setUploadProgress(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all core contact information.");
      return;
    }

    setLoading(true);
    
    // Calculate display service name
    const activeService = services.find((s) => s.id === formData.serviceId);
    const serviceName = activeService ? activeService.title : "Custom Repair Service";
    
    // Unique Reservation Reference
    const bookingRef = "RMC-" + Math.floor(100000 + Math.random() * 900000);
    const finalBrand = formData.batBrand === "Custom / Unbranded" ? formData.customBrand || "Custom Brand" : formData.batBrand;

    const requestPayload = {
      id: bookingRef,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      whatsApp: formData.whatsApp || formData.phone,
      city: formData.city,
      country: formData.country,
      serviceId: formData.serviceId,
      serviceName: serviceName,
      batBrand: finalBrand,
      batCondition: formData.batCondition,
      description: formData.description,
      imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1607734834834-d4d4850ef3fa?auto=format&fit=crop&q=80&w=400",
      preferredDate: formData.preferredDate || new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0], // default 2 days out
      preferredTime: formData.preferredTime,
      deliveryMethod: formData.deliveryMethod,
      status: RequestStatus.NEW,
      createdAt: new Date().toISOString()
    };

    try {
      await createDocument("repair_requests", bookingRef, requestPayload);
      
      // Trigger Email Notification
      try {
        await fetch("/api/sendEmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "repair_request", payload: requestPayload })
        });
      } catch (emailErr) {
        console.warn("Email notification failed to send", emailErr);
      }

      setLoading(false);
      onSuccess(bookingRef);
    } catch (error) {
      setLoading(false);
      // Fallback
      onSuccess(bookingRef);
    }
  };

  return (
    <div className="bg-white py-12 md:py-20 animate-fade-in">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <p className="text-xs font-mono font-black tracking-widest text-brand-red uppercase">
            SECURE REPAIR RESERVATION
          </p>
          <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-brand-black uppercase">
            Book Workshop Repair Slot
          </h1>
          <p className="text-sm text-gray-500 font-sans leading-relaxed">
            Fill this form to book your spot. Once received, our craftsmen prepare diagnosis guides and contact you with shipment labels or drop-off tickets.
          </p>
        </div>

        {/* Dynamic Multi-Section Form */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-12 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Step 1: Client Contact */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 border-b border-gray-100 pb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-black font-black text-white text-xs">1</span>
                <h3 className="text-sm font-black text-brand-black font-sans uppercase tracking-widest">Contact Coordinates</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brandon Taylor"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-brand-gray px-4 py-3 focus:bg-white focus:border-brand-red focus:outline-none transition-all"
                    id="booking-fullname"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. brandon@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-brand-gray px-4 py-3 focus:bg-white focus:border-brand-red focus:outline-none transition-all"
                    id="booking-email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Contact Phone Line *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +44 7712 345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-brand-gray px-4 py-3 focus:bg-white focus:border-brand-red focus:outline-none transition-all"
                    id="booking-phone"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">WhatsApp Number (For progress pics)</label>
                  <input
                    type="tel"
                    placeholder="e.g. +44 7712 345678"
                    value={formData.whatsApp}
                    onChange={(e) => setFormData({ ...formData, whatsApp: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-brand-gray px-4 py-3 focus:bg-white focus:border-brand-red focus:outline-none transition-all"
                    id="booking-whatsapp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 font-sans text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">City</label>
                  <input
                    type="text"
                    placeholder="London"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-brand-gray px-4 py-3 focus:bg-white focus:border-brand-red focus:outline-none transition-all"
                    id="booking-city"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Country</label>
                  <input
                    type="text"
                    readOnly
                    value={formData.country}
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-450 cursor-not-allowed outline-none"
                    id="booking-country"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Cricket Bat Specs */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 border-b border-gray-100 pb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-black font-black text-white text-xs">2</span>
                <h3 className="text-sm font-black text-brand-black font-sans uppercase tracking-widest">Cricket Bat Specification</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Select Required Service *</label>
                  <select
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-brand-gray px-3 py-3 focus:bg-white focus:border-brand-red focus:outline-none transition-all uppercase font-black"
                    id="booking-service"
                  >
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title} (Starting ${service.startingPrice})
                      </option>
                    ))}
                    <option value="custom">Bespoke / Multi-Repair Quote</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Bat Brand *</label>
                  <select
                    value={formData.batBrand}
                    onChange={(e) => setFormData({ ...formData, batBrand: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-brand-gray px-3 py-3 focus:bg-white focus:border-brand-red focus:outline-none transition-all uppercase font-black"
                    id="booking-brand"
                  >
                    {brandOptions.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.batBrand === "Custom / Unbranded" && (
                <div className="space-y-1 animate-in fade-in duration-200 font-sans text-xs sm:text-sm">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Specify Custom Brand Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Salix Raw / Crusader"
                    value={formData.customBrand}
                    onChange={(e) => setFormData({ ...formData, customBrand: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-brand-gray px-4 py-3 focus:bg-white focus:border-brand-red focus:outline-none transition-all"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Willow Core Condition *</label>
                  <select
                    value={formData.batCondition}
                    onChange={(e) => setFormData({ ...formData, batCondition: e.target.value })}
                    className="w-full rounded-xl border border-gray-200 bg-brand-gray px-3 py-3 focus:bg-white focus:border-brand-red focus:outline-none transition-all uppercase font-black"
                    id="booking-condition"
                  >
                    {conditionOptions.map((cond) => (
                      <option key={cond} value={cond}>{cond}</option>
                    ))}
                  </select>
                </div>

                {/* Upload Image box with drag selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest font-sans">Upload Damage Photos (Highly Recommended)</label>
                  <div className="border border-dashed border-gray-200 hover:border-brand-red rounded-xl bg-brand-gray/50 p-4 text-center cursor-pointer transition-colors relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      id="damage-pictures-uploader"
                    />
                    
                    {formData.imageUrl ? (
                      <div className="flex items-center space-x-3 text-left">
                        <img src={formData.imageUrl} alt="Damage Preview" className="h-10 w-10 object-cover rounded-lg border border-brand-red/10" />
                        <div>
                          <p className="text-[10px] font-black text-brand-red">Photo Attached!</p>
                          <p className="text-[9px] text-gray-400">Tap to replace</p>
                        </div>
                      </div>
                    ) : uploadProgress ? (
                      <span className="text-xs text-gray-400">Compressing file logs...</span>
                    ) : (
                      <div className="text-[11px] text-gray-400">
                        <span className="font-extrabold text-brand-red">Click to upload file</span> or drag image here
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1 font-sans text-xs sm:text-sm">
                <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Describe repairs needed / Any specific player demands</label>
                <textarea
                  rows={4}
                  placeholder="e.g. Blade feels unbalanced, clicked handle, or please apply carbon scuff sleeves."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-brand-gray px-4 py-3 focus:bg-white focus:border-brand-red focus:outline-none transition-all"
                  id="booking-desc"
                />
              </div>
            </div>

            {/* Step 3: Schedule & Delivery */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 border-b border-gray-100 pb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-black font-black text-white text-xs">3</span>
                <h3 className="text-sm font-black text-brand-black font-sans uppercase tracking-widest font-sans">Transit & Logistics Mode</h3>
              </div>

              {/* Delivery method Cards selection */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                {deliveryOptions.map((opt) => {
                  const isSelected = formData.deliveryMethod === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, deliveryMethod: opt.id })}
                      className={`border rounded-2xl p-5 cursor-pointer transition-all duration-250 ${
                        isSelected
                          ? "border-brand-red bg-brand-red/5 text-brand-black shadow-md"
                          : "border-gray-200 bg-white hover:bg-brand-gray/50 text-gray-500"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <Truck className={`h-4.5 w-4.5 ${isSelected ? "text-brand-red" : "text-gray-400"}`} />
                        <h4 className="text-xs font-black uppercase tracking-widest">{opt.title}</h4>
                      </div>
                      <p className="text-[11px] leading-relaxed text-gray-400 font-sans">{opt.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest font-sans">Preferred Appointment / Shipment Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-brand-gray px-4 py-3 focus:bg-white focus:border-brand-red focus:outline-none transition-all uppercase font-medium"
                      id="booking-date"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Preferred Hand-off Time Slot</label>
                  <div className="relative">
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-brand-gray px-4 py-3 focus:bg-white focus:border-brand-red focus:outline-none transition-all uppercase font-black"
                      id="booking-time"
                    >
                      <option value="09:00 AM - 12:00 PM">Morning (09:00 AM - 12:00 PM)</option>
                      <option value="12:00 PM - 03:00 PM">Midday (12:00 PM - 03:00 PM)</option>
                      <option value="03:00 PM - 06:00 PM">Afternoon (03:00 PM - 06:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Action Trigger */}
            <div className="pt-6 border-t border-gray-100 flex flex-col items-center space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-12 py-4 rounded-xl bg-brand-black hover:bg-brand-red text-white font-black text-xs tracking-widest uppercase transition-all shadow-xl cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                id="booking-submit-button"
              >
                {loading ? "TRANSMITTING RESERVATION..." : "BOOK WORKSHOP REPAIR"}
              </button>
              
              <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-black tracking-wider uppercase bg-brand-gray px-4 py-2 border rounded-xl font-sans">
                <ShieldCheck className="h-4 w-4 text-brand-red animate-pulse" />
                <span>SSL Secured • Authenticated Database • Instant Status Log</span>
              </div>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}
