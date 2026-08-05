import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { brand } from "@/lib/content";
import { useQuote } from "./QuoteModal";
import { LuxeButton } from "./LuxeButton";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/catering", label: "Catering" },
] as const;

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { open } = useQuote();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[90] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        solid
          ? "border-b border-border bg-background/85 py-4 backdrop-blur-xl"
          : "border-b border-transparent py-7",
      )}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="group flex items-baseline gap-3" aria-label={brand.name}>
          <span className="flex size-9 items-center justify-center border border-gold/40 font-display text-sm text-gold transition-colors group-hover:border-gold">
            {brand.monogram}
          </span>
          <span className="font-display text-xl tracking-[0.14em] text-ivory">
            {brand.name.toUpperCase()}
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="link-underline font-sans text-[0.7rem] tracking-[0.26em] text-muted-foreground uppercase transition-colors hover:text-ivory"
              activeProps={{ className: "text-ivory" }}
            >
              {l.label}
            </Link>
          ))}
          <LuxeButton size="sm" onClick={open}>
            Enquire
          </LuxeButton>
        </div>

        <button
          onClick={() => setOpenMenu(true)}
          aria-label="Open menu"
          className="text-ivory md:hidden"
        >
          <Menu className="size-5" />
        </button>
      </nav>

      <AnimatePresence>
        {openMenu ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex flex-col items-center justify-center gap-9 bg-background/97 backdrop-blur-xl md:hidden"
          >
            <button
              onClick={() => setOpenMenu(false)}
              aria-label="Close menu"
              className="absolute top-7 right-6 text-ivory"
            >
              <X className="size-5" />
            </button>
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.6 }}
              >
                <Link
                  to={l.to}
                  onClick={() => setOpenMenu(false)}
                  className="font-display text-4xl text-ivory"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <LuxeButton
              onClick={() => {
                setOpenMenu(false);
                open();
              }}
            >
              Enquire
            </LuxeButton>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}