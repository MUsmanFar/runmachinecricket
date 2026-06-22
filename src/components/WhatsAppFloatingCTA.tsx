import { MessageSquare } from "lucide-react";
import { motion } from "motion/react";

interface WhatsAppFloatingCTAProps {
  whatsAppNumber: string;
}

export default function WhatsAppFloatingCTA({ whatsAppNumber }: WhatsAppFloatingCTAProps) {
  const whatsAppMsg = encodeURIComponent(
    "Hello Run Machine Cricket, I'm reaching out from your website and would like to ask a question."
  );
  const cleanNumber = whatsAppNumber.replace(/\D/g, "");
  const whatsAppLink = `https://wa.me/${cleanNumber}?text=${whatsAppMsg}`;

  return (
    <motion.a
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href={whatsAppLink}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 hover:bg-green-600 transition-colors"
      aria-label="Contact us on WhatsApp"
    >
      <MessageSquare className="h-6 w-6" />
      {/* Notification Dot */}
      <span className="absolute top-0 right-0 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-red border-2 border-white"></span>
      </span>
    </motion.a>
  );
}
