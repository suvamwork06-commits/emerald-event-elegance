import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: { image: string; title?: string; category?: string }[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onIndexChange]);

  const current = index === null ? null : items[index];

  return (
    <AnimatePresence>
      {current ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-modal="true"
          aria-label={current.title ?? "Gallery image"}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-background/95 backdrop-blur-xl"
        >
          <button
            onClick={onClose}
            aria-label="Close gallery"
            className="absolute top-6 right-6 flex size-11 items-center justify-center border border-border text-ivory transition-colors hover:border-gold hover:text-gold"
          >
            <X className="size-4" />
          </button>
          <button
            onClick={() => onIndexChange((index! - 1 + items.length) % items.length)}
            aria-label="Previous image"
            className="absolute left-4 flex size-11 items-center justify-center border border-border text-ivory transition-colors hover:border-gold hover:text-gold md:left-10"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => onIndexChange((index! + 1) % items.length)}
            aria-label="Next image"
            className="absolute right-4 flex size-11 items-center justify-center border border-border text-ivory transition-colors hover:border-gold hover:text-gold md:right-10"
          >
            <ChevronRight className="size-4" />
          </button>

          <motion.figure
            key={current.image}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[82vh] w-[86vw] max-w-4xl"
          >
            <img
              src={current.image}
              alt={current.title ?? ""}
              className="max-h-[72vh] w-full object-contain"
            />
            {current.title ? (
              <figcaption className="mt-6 text-center">
                <p className="eyebrow">{current.category}</p>
                <p className="mt-2 font-display text-2xl text-ivory">{current.title}</p>
              </figcaption>
            ) : null}
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}