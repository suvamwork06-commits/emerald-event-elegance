import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Play } from "lucide-react";
import { useRef, useState } from "react";
import { Reveal, RevealLines } from "@/components/luxe/Reveal";
import { LuxeButton, LuxeLink } from "@/components/luxe/LuxeButton";
import { Counter } from "@/components/luxe/Counter";
import { Marquee } from "@/components/luxe/Marquee";
import { useQuote } from "@/components/luxe/QuoteModal";
import { brand, images, stats, trustedBy } from "@/lib/content";

const TITLE = "Maison Aurelle — Luxury Event Management & Premium Catering";
const DESCRIPTION =
  "A luxury event atelier crafting timeless weddings, galas and private celebrations — and chef-led premium catering. Tell us which experience you would like us to create.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Concierge />
      <TrustStrip />
      <Numbers />
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const lx = useMotionValue(50);
  const ly = useMotionValue(40);
  const sx = useSpring(lx, { stiffness: 60, damping: 20 });
  const sy = useSpring(ly, { stiffness: 60, damping: 20 });
  const light = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(60rem 45rem at ${x}% ${y}%, oklch(0.784 0.086 84 / 0.16), transparent 70%)`,
  );

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        lx.set(((e.clientX - r.left) / r.width) * 100);
        ly.set(((e.clientY - r.top) / r.height) * 100);
      }}
      className="grain relative flex h-svh min-h-[640px] items-center justify-center overflow-hidden"
    >
      <motion.img
        style={{ y: imageY }}
        src={images.heroWedding}
        alt="Candlelit luxury wedding banquet designed by Maison Aurelle"
        width={1920}
        height={1088}
        className="absolute inset-0 size-full scale-110 object-cover"
      />
      <div className="absolute inset-0 bg-background/72" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/70" />
      <motion.div style={{ background: light }} className="absolute inset-0" />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <Reveal>
          <p className="eyebrow inline-flex items-center gap-4">
            <span className="h-px w-12 bg-gold/50" />
            {brand.tagline}
            <span className="h-px w-12 bg-gold/50" />
          </p>
        </Reveal>
        <h1 className="mt-8 text-[clamp(2.9rem,9vw,7.5rem)] leading-[0.94] text-ivory">
          <RevealLines text="Extraordinary Experiences" />
        </h1>
        <Reveal delay={0.35}>
          <p className="mx-auto mt-9 max-w-xl text-[0.98rem] leading-[1.95] text-muted-foreground">
            Crafting timeless celebrations with precision, elegance and artistry.
          </p>
        </Reveal>
        <Reveal delay={0.5}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a href="#experiences">
              <LuxeButton size="lg" tabIndex={-1}>
                Discover Experiences
              </LuxeButton>
            </a>
            <LuxeButton variant="outline" size="lg" className="gap-3">
              <Play className="size-3" /> Watch Our Story
            </LuxeButton>
          </div>
        </Reveal>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 text-[0.62rem] tracking-[0.4em] text-muted-foreground/70 uppercase"
      >
        Scroll
      </motion.div>
    </section>
  );
}

const choices = [
  {
    to: "/events",
    label: "Luxury Events",
    copy: "Weddings, galas and private celebrations produced end to end by a single atelier team.",
    image: images.cardEvents,
    index: "01",
  },
  {
    to: "/catering",
    label: "Luxury Catering",
    copy: "Chef-led menus, live counters and silver-service brigades trained to five-star standards.",
    image: images.cardCatering,
    index: "02",
  },
] as const;

function Concierge() {
  return (
    <section id="experiences" className="relative bg-background py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow">The Concierge</p>
          </Reveal>
          <h2 className="mt-7 text-[clamp(2rem,4.6vw,3.9rem)] leading-[1.06] text-ivory">
            <RevealLines text="What experience would you like us to create?" />
          </h2>
        </div>

        <div className="mt-16 grid gap-7 md:mt-24 lg:grid-cols-2">
          {choices.map((c, i) => (
            <Reveal key={c.to} delay={i * 0.12}>
              <ChoiceCard {...c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChoiceCard({
  to,
  label,
  copy,
  image,
  index,
}: {
  to: "/events" | "/catering";
  label: string;
  copy: string;
  image: string;
  index: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative block overflow-hidden rounded-2xl border border-border transition-[box-shadow,border-color] duration-700 hover:border-gold/45 hover:shadow-[0_50px_90px_-50px_oklch(0.784_0.086_84_/_0.3)]"
    >
      <div className="relative aspect-4/5 overflow-hidden sm:aspect-16/11 lg:aspect-4/5">
        <motion.img
          src={image}
          alt={label}
          loading="lazy"
          animate={{ scale: hover ? 1.07 : 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
        <motion.div
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-[radial-gradient(35rem_25rem_at_50%_85%,oklch(0.784_0.086_84_/_0.22),transparent_70%)]"
        />
        <motion.div
          aria-hidden
          animate={{ x: hover ? "220%" : "-130%" }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-ivory/12 to-transparent"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-7 md:p-11">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{index}</p>
            <h3 className="mt-4 text-[clamp(2rem,3.4vw,3rem)] leading-tight text-ivory">
              {label}
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-[1.85] text-muted-foreground">
              {copy}
            </p>
          </div>
          <motion.span
            animate={{ rotate: hover ? 0 : -45, borderColor: hover ? "var(--gold)" : "var(--border)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex size-13 shrink-0 items-center justify-center rounded-full border text-gold"
          >
            <ArrowUpRight className="size-4" />
          </motion.span>
        </div>
      </div>
    </Link>
  );
}

function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface py-14">
      <p className="eyebrow mb-9 text-center">As Trusted By</p>
      <Marquee items={trustedBy} />
    </section>
  );
}

function Numbers() {
  const { open } = useQuote();

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-12 border-y border-border py-14 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center lg:text-left">
                <p className="font-display text-[clamp(3rem,6vw,4.75rem)] leading-none gold-text">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-4 text-[0.68rem] tracking-[0.28em] text-muted-foreground uppercase">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-8 text-center">
          <Reveal>
            <h2 className="max-w-2xl text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.08] text-ivory">
              Let's create something extraordinary
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-wrap justify-center gap-4">
              <LuxeButton size="lg" onClick={open}>
                Schedule Your Consultation
              </LuxeButton>
              <LuxeLink to="/events" variant="outline" size="lg">
                View Our Work
              </LuxeLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
