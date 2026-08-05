import { motion } from "motion/react";
import { brand } from "@/lib/content";

export function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${brand.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with our concierge on WhatsApp"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="glass-panel fixed right-5 bottom-5 z-[95] flex size-14 items-center justify-center rounded-full text-gold shadow-[var(--shadow-float)] transition-colors hover:border-gold md:right-8 md:bottom-8"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden>
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.12-.41-2.14-1.32-.79-.71-1.32-1.58-1.47-1.88-.15-.3-.02-.47.13-.62.15-.15.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.46 0 1.45 1.06 2.85 1.21 3.05.15.2 2.08 3.31 5.05 4.5 2.97 1.19 2.97.79 3.51.74.54-.05 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.35z" />
        <path d="M12.04 2C6.6 2 2.17 6.43 2.17 11.87c0 1.74.45 3.44 1.32 4.94L2 22l5.35-1.4c1.44.78 3.06 1.2 4.69 1.2h.01c5.43 0 9.86-4.43 9.86-9.87C21.91 6.43 17.48 2 12.04 2zm0 17.96h-.01c-1.45 0-2.87-.39-4.11-1.13l-.29-.17-3.05.8.81-2.97-.19-.31a8.13 8.13 0 01-1.25-4.31c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.25.86 5.8 2.4a8.16 8.16 0 012.4 5.8c0 4.53-3.68 8.09-8.32 8.09z" />
      </svg>
    </motion.a>
  );
}