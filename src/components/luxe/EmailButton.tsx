import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, X } from "lucide-react";

const options = [
  { label: "Events", sub: "Ambient", email: "ambtsales@gmail.com", subject: "Event enquiry — Ambient" },
  { label: "Catering", sub: "Appetite", email: "info@appetiteevent.com", subject: "Catering enquiry — Appetite" },
];

export function EmailButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Send us an email"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -3 }}
        className="glass-panel fixed right-5 bottom-23 z-[95] flex size-14 items-center justify-center rounded-full text-gold shadow-[var(--shadow-float)] transition-colors hover:border-gold md:right-8 md:bottom-26"
      >
        <Mail className="size-6" aria-hidden />
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-background/80 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Choose a service to email"
              className="glass-panel relative w-full max-w-md p-8"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 text-muted-foreground hover:text-ivory"
              >
                <X className="size-5" />
              </button>
              <p className="font-sans text-[0.7rem] tracking-[0.26em] text-gold uppercase">Email us</p>
              <h3 className="mt-3 font-display text-3xl text-ivory">Which service is this about?</h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {options.map((o) => (
                  <a
                    key={o.label}
                    href={`mailto:${o.email}?subject=${encodeURIComponent(o.subject)}`}
                    onClick={() => setOpen(false)}
                    className="border border-border p-5 transition-colors hover:border-gold hover:bg-gold/10"
                  >
                    <span className="block font-display text-2xl text-ivory">{o.label}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">{o.sub}</span>
                    <span className="mt-3 block text-xs break-all text-gold">{o.email}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
