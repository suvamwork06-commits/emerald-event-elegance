import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { brand } from "@/lib/content";

export function Loader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("luxe-entered")) {
      setVisible(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const tick = window.setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 16 + 6));
    }, 130);
    const done = window.setTimeout(() => {
      sessionStorage.setItem("luxe-entered", "1");
      setVisible(false);
    }, 2100);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(done);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grain fixed inset-0 z-[120] flex flex-col items-center justify-center bg-background"
        >
          <motion.svg
            width="112"
            height="112"
            viewBox="0 0 112 112"
            className="overflow-visible"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.rect
              x="6"
              y="6"
              width="100"
              height="100"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="0.75"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <text
              x="56"
              y="63"
              textAnchor="middle"
              className="fill-[var(--ivory)] font-display"
              style={{ fontSize: 30, letterSpacing: "0.12em" }}
            >
              {brand.monogram}
            </text>
          </motion.svg>

          <p className="eyebrow mt-10">{brand.tagline}</p>

          <div className="mt-6 h-px w-56 overflow-hidden bg-border">
            <div
              className="h-full bg-[image:var(--gradient-gold)] transition-[width] duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}