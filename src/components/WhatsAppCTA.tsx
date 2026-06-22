import { MessageSquare, HelpCircle, ShieldCheck } from "lucide-react";

interface WhatsAppCTAProps {
  whatsAppNumber: string;
}

export default function WhatsAppCTA({ whatsAppNumber }: WhatsAppCTAProps) {
  
  const encodedMessage = encodeURIComponent(
    "Hello Run Machine Cricket,\n\nI need advice on choosing the right repair or refurbishment service for my cricket bat. Could you help me with a recommendation?\n\nThank you."
  );
  
  const cleanNumber = whatsAppNumber.replace(/\D/g, "");
  const whatsAppLink = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

  return (
    <section className="bg-white py-16 sm:py-24 relative overflow-hidden border-b border-gray-100">
      
      {/* Background radial soft light */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-red/5 blur-3xl -z-10 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-black px-6 py-12 sm:px-12 sm:py-16 text-center text-white relative overflow-hidden shadow-2xl">
          
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-brand-red/10 to-transparent blur-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-40 w-40 bg-gradient-to-tr from-brand-red/10 to-transparent blur-xl pointer-events-none" />

          {/* Icon Badge */}
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-red text-white shadow-xl shadow-brand-red/20 mb-6">
            <HelpCircle className="h-6 w-6" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-sans font-black tracking-tight mb-4 uppercase">
            UNSURE OF THE WORK REQUIRED?
          </h2>
          
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-gray-400 leading-relaxed mb-8 font-sans">
            Is your handle clicking? Are surface fissures threatening to snap the blade? Shoot some snap-shots of your bat directly to our workbench via WhatsApp, and receive a professional assessment from our master craftsmen.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noreferrer"
              id="cta-whatsapp-block"
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 rounded-xl bg-brand-red hover:bg-white hover:text-brand-black px-8 py-4.5 text-xs font-black tracking-widest text-white shadow-xl shadow-brand-red/10 transition-all font-sans cursor-pointer uppercase"
            >
              <MessageSquare className="h-4 w-4" />
              <span>CONSULT A MASTER NOW</span>
            </a>

            <div className="flex items-center space-x-2 text-[10px] font-black tracking-wider text-gray-300 bg-brand-gray/5 border border-white/5 rounded-xl py-3.5 px-5 font-sans uppercase">
              <ShieldCheck className="h-4 w-4 text-brand-red animate-pulse" />
              <span>Average Response: UNDER 15 MINS</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
