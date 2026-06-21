import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from "lucide-react";

interface ContactPageProps {
  whatsAppNumber: string;
}

export default function ContactPage({ whatsAppNumber }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please enter all required fields.");
      return;
    }
    setSubmitted(true);
  };

  const encodedMsg = encodeURIComponent(
    "Hello Run Machine Cricket, I would like to make an inquiry regarding your workshop availability."
  );
  const whatsAppLink = `https://wa.me/${whatsAppNumber.replace(/\+/g, "")}?text=${encodedMsg}`;

  return (
    <div className="bg-white py-12 md:py-20 animate-fade-in">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-mono font-black tracking-widest text-brand-red uppercase">
            GET IN TOUCH
          </p>
          <h1 className="text-3xl sm:text-5xl font-sans font-black tracking-tight text-brand-black uppercase">
            Connect With The Workshop
          </h1>
          <p className="text-sm sm:text-base text-gray-500 font-sans">
            Have questions about a repair? Want to arrange an urgent same-day drop-off? Contact our team of experts directly.
          </p>
        </div>

        {/* Content Columns split */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Diagnostic Info Card column */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Details Cards */}
            <div className="bg-brand-black text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute bottom-0 right-0 h-32 w-32 bg-brand-red/10 rounded-full blur-2xl" />
              
              <h3 className="text-sm font-black font-sans tracking-widest uppercase border-b border-white/5 pb-4 text-brand-red">
                Run Machine Workshop HQ
              </h3>

              <div className="space-y-5 text-xs sm:text-sm text-gray-300">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-white uppercase tracking-tight">Our Main Address</p>
                    <p className="text-gray-400 mt-1">Unit 4, Olympic Industrial Park</p>
                    <p className="text-gray-400">London Road, Wembley, HA9 0TH</p>
                    <p className="text-gray-400">United Kingdom</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-white uppercase tracking-tight">Email Address</p>
                    <p className="text-gray-400 mt-1">craft@runmachinecricket.co.uk</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-white uppercase tracking-tight">Direct Phone Line</p>
                    <p className="text-gray-400 mt-1">+44 7700 900077</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-white uppercase tracking-tight font-sans">Operating Hours</p>
                    <p className="text-gray-400 mt-1">Monday - Friday: 09:00 - 18:30</p>
                    <p className="text-gray-400 font-bold text-brand-red">Saturday: 10:00 - 16:00 (Diagnostics Day)</p>
                    <p className="text-gray-450">Sunday: Closed (Willow Curing Day)</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center space-x-2 w-full py-4 px-4 bg-brand-red hover:bg-white hover:text-brand-black text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>CONSULT VIA WHATSAPP</span>
                </a>
              </div>

            </div>

            {/* Simulated Live Google Map View with pure interactive design */}
            <div className="border border-gray-100 bg-brand-gray rounded-3xl p-6 shadow-sm overflow-hidden text-center">
              <div className="flex items-center justify-center space-x-2 text-[10px] font-mono font-black text-gray-500 uppercase mb-4 tracking-widest">
                <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
                <span>Simulated Workshop Locator Pin</span>
              </div>
              
              <div className="h-48 w-full bg-gray-200 rounded-2xl relative overflow-hidden flex items-center justify-center border border-gray-305">
                
                {/* Visual grid pattern simulating map lines */}
                <div className="absolute inset-0 bg-brand-red/5 grid grid-cols-6 grid-rows-4 divide-x divide-y divide-brand-red/10 animate-pulse" />
                
                {/* Landmark indicators */}
                <div className="absolute top-1/4 left-1/4 h-3 rounded bg-white px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 shadow border uppercase">Wembley Rd</div>
                <div className="absolute top-2/3 right-1/4 h-3 rounded bg-white px-2 py-0.5 text-[8px] font-mono font-bold text-gray-400 shadow border uppercase">Olympic Crossing</div>

                {/* Simulated Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-red border-2 border-white text-white shadow-xl animate-bounce">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="mt-2 rounded-lg bg-brand-black text-[9px] font-mono font-black tracking-widest text-white px-3 py-1 uppercase shadow-md border border-white/5">
                    Run Machine HQ HA9
                  </span>
                </div>

              </div>

              <p className="text-[11px] text-gray-450 mt-3 font-sans max-w-sm mx-auto leading-relaxed">
                Located 5 minutes from Wembley Stadium. Easy private driveway access for express trunk drop-offs and drive-through checkouts.
              </p>
            </div>

          </div>

          {/* Form write block */}
          <div className="lg:col-span-7">
            
            <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-xl">
              
              {submitted ? (
                <div className="text-center py-12 space-y-6">
                  <div className="h-16 w-16 bg-brand-red/10 border border-brand-red/10 text-brand-red rounded-xl flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-black text-brand-black tracking-tight font-sans uppercase">
                    Inquiry Lodged Safely
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed font-sans">
                    Thank you {formData.name}. Your specifications are routed to our master carpenters. A specialist will review your details and contact you at <span className="font-bold text-brand-black">{formData.email}</span> within 2-4 working hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
                    }}
                    className="px-6 py-3.5 bg-brand-black text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-brand-red transition cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div>
                    <h3 className="text-xl font-black font-sans text-brand-black uppercase">
                      Send a Direct Message
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                      Diagnostics queue delay: UNDER 4 HOURS
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Usman Farooq"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 bg-brand-gray px-4 py-3 text-xs sm:text-sm text-brand-black focus:bg-white focus:border-brand-red focus:outline-none transition-all font-sans"
                        id="contact-form-name"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. usman@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 bg-brand-gray px-4 py-3 text-xs sm:text-sm text-brand-black focus:bg-white focus:border-brand-red focus:outline-none transition-all font-sans"
                        id="contact-form-email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Contact Phone Line</label>
                      <input
                        type="tel"
                        placeholder="e.g. +44 7700 900077"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 bg-brand-gray px-4 py-3 text-xs sm:text-sm text-brand-black focus:bg-white focus:border-brand-red focus:outline-none transition-all font-sans"
                        id="contact-form-phone"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Subject Context</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full rounded-xl border border-gray-200 bg-brand-gray px-3 py-3 text-xs sm:text-sm text-brand-black focus:bg-white focus:border-brand-red focus:outline-none transition-all font-sans cursor-pointer uppercase font-black"
                        id="contact-form-subject"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Emergency Restores">Emergency Same-Day service</option>
                        <option value="Shipping Logistics">Shipping or Pickup Support</option>
                        <option value="Custom Quotation">Custom Bat Diagnostics Quote</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-black text-gray-700 uppercase tracking-widest">Explain Your Inquiry *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="List bat brand details, what issues you noticed (vibrations, splits, toe swelling) or any custom questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-gray-200 bg-brand-gray px-4 py-3 text-xs sm:text-sm text-brand-black focus:bg-white focus:border-brand-red focus:outline-none transition-all font-sans"
                      id="contact-form-message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 py-4 px-6 bg-brand-black hover:bg-brand-red text-white rounded-xl text-xs font-black tracking-widest uppercase transition-all cursor-pointer"
                    id="contact-form-submit-button"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Message to Workshop</span>
                  </button>

                  <p className="text-[10px] text-gray-400 text-center font-sans tracking-wide">
                    BY SUBMITTING YOUR INQUIRY, YOU AGREE TO OUR TERMS AND GDPR DATA SECURITY POLICIES.
                  </p>

                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
