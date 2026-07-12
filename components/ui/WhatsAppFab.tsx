import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_-6px_rgba(37,211,102,0.6)] transition-transform hover:scale-105"
    >
      <MessageCircle className="size-6" fill="currentColor" strokeWidth={0} />
    </a>
  );
}
