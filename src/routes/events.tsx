import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Quote, Star } from "lucide-react";
import { Reveal, RevealLines } from "@/components/luxe/Reveal";
import { SectionHeading } from "@/components/luxe/SectionHeading";
import { LuxeButton } from "@/components/luxe/LuxeButton";
import { Counter } from "@/components/luxe/Counter";
import { Marquee } from "@/components/luxe/Marquee";
import { Lightbox } from "@/components/luxe/Lightbox";
import { useQuote } from "@/components/luxe/QuoteModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  brand,
  images,
  instagramFeed,
  portfolio,
  services,
  stats,
  testimonials,
  timeline,
  trustedBy,
  whyUs,
} from "@/lib/content";

const TITLE = "Luxury Event Management — Maison Aurelle";
const DESCRIPTION =
  "Celebrity weddings, destination celebrations and high-end corporate galas, designed and produced end to end by the Maison Aurelle atelier.";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/events" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/events" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Luxury event management",
          provider: { "@type": "Organization", name: brand.name },
          areaServed: "Worldwide",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Event services",
            itemListElement: services.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.title },
            })),
          },
        }),
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <>
      <EventsHero />
      <About />
      <WhyUs />
      <Services />
      <Portfolio />
      <Timeline />
      <TrustedBy />
      <Testimonials />
      <NumbersBand />
      <Instagram />
      <ClosingCta />
    </>
  );
}

function EventsHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section
      ref={ref}
      className="grain relative flex h-[88svh] min-h-[560px] items-end overflow-hidden"
    >
      <motion.img
        style={{ y }}
        src={images.cardEvents}
        alt="Gold candelabra and orchids at a Maison Aurelle event"
        width={1200}
        height={1504}
        className="absolute inset-0 size-full scale-110 object-cover object-center"
      />
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 md:px-10 md:pb-28">
        <Reveal>
          <p className="eyebrow">Luxury Event Management</p>
        </Reveal>
        <h1 className="mt-7 max-w-4xl text-[clamp(2.6rem,7.4vw,6rem)] leading-[0.96] text-ivory">
          <RevealLines text="Celebrations composed, never assembled" />
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-lg text-[0.98rem] leading-[1.95] text-muted-foreground">
            Fifteen years of private weddings, destination celebrations and
            corporate galas — produced quietly, to a single standard.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-32 size-[34rem] rounded-full bg-[radial-gradient(circle,oklch(0.784_0.086_84_/_0.08),transparent_65%)]"
      />
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 px-6 md:px-10 lg:grid-cols-[1.05fr_1fr] lg:gap-24">
        <div className="relative">
          <Reveal>
            <img
              src={images.aboutMain}
              alt="An event designer arranging orchids and crystal at the atelier"
              loading="lazy"
              width={1000}
              height={1300}
              className="w-full rounded-xl object-cover shadow-[var(--shadow-float)]"
            />
          </Reveal>
          <Reveal delay={0.2}>
            <img
              src={images.about2}
              alt="Ivory stationery with a gold wax seal"
              loading="lazy"
              width={800}
              height={800}
              className="absolute -right-4 -bottom-12 w-36 rounded-lg border border-border object-cover shadow-[var(--shadow-float)] md:-right-12 md:w-52"
            />
          </Reveal>
          <Reveal delay={0.32}>
            <img
              src={images.about3}
              alt="Chandeliers above an emerald draped ballroom"
              loading="lazy"
              width={800}
              height={1000}
              className="absolute -bottom-16 left-6 w-28 rounded-lg border border-border object-cover shadow-[var(--shadow-float)] md:left-12 md:w-40"
            />
          </Reveal>
        </div>

        <div className="pt-20 lg:pt-0">
          <SectionHeading
            eyebrow="The Atelier"
            title="An atelier of six, not a factory of sixty"
            intro="Maison Aurelle was founded on a simple refusal: no celebration should ever look like the last one. We accept a limited number of events each year so that every drawing, every tasting and every rehearsal receives the attention it deserves."
          />
          <Reveal delay={0.2}>
            <div className="gold-rule mt-12 max-w-sm" />
            <p className="mt-10 font-display text-2xl leading-[1.5] text-ivory/90 italic">
              “We are hired for taste, retained for temperament.”
            </p>
            <p className="mt-6 text-[0.68rem] tracking-[0.28em] text-muted-foreground uppercase">
              Aurelle Sen — Founder & Creative Director
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="grain relative bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Why Maison Aurelle"
          title="Four promises we never negotiate"
        />
        <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-2">
          {whyUs.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.1}>
              <motion.article
                whileHover={{ y: -6, rotate: i % 2 ? -0.4 : 0.4 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="clay-card sheen relative h-full overflow-hidden rounded-xl p-9 md:p-12"
              >
                <span className="font-display text-5xl text-gold/35">
                  0{i + 1}
                </span>
                <h3 className="mt-7 text-3xl text-ivory">{w.title}</h3>
                <p className="mt-5 text-sm leading-[1.95] text-muted-foreground">
                  {w.text}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Services"
          title="Everything an evening requires"
          intro="Eight disciplines, one production team, a single point of contact from first sketch to final farewell."
        />
        <div className="mt-16 grid gap-5 md:mt-24 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.08}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="glass-panel sheen relative h-full overflow-hidden rounded-xl p-8 transition-colors duration-500 hover:border-gold/50"
              >
                <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-6 text-2xl leading-snug text-ivory">{s.title}</h3>
                <p className="mt-4 text-[0.82rem] leading-[1.9] text-muted-foreground">
                  {s.text}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <section className="bg-section py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading eyebrow="Portfolio" title="Selected celebrations" />

        <Carousel opts={{ align: "start", loop: true }} className="mt-16 md:mt-24">
          <CarouselContent className="-ml-5">
            {portfolio.map((p, i) => (
              <CarouselItem key={p.title} className="pl-5 sm:basis-3/4 lg:basis-1/2">
                <button
                  onClick={() => setIndex(i)}
                  aria-label={`Open ${p.title}`}
                  className="group relative block w-full overflow-hidden rounded-xl border border-border text-left"
                >
                  <div className="aspect-4/3 overflow-hidden">
                    <img
                      src={p.image}
                      alt={`${p.title} — ${p.category}`}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-8">
                    <div>
                      <h3 className="text-3xl text-ivory">{p.title}</h3>
                      <p className="mt-2 text-[0.68rem] tracking-[0.26em] text-muted-foreground uppercase">
                        {p.category}
                      </p>
                    </div>
                    <ArrowUpRight className="size-5 shrink-0 text-gold transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-10 flex justify-end gap-3">
            <CarouselPrevious className="static size-12 translate-y-0 rounded-none border-border bg-transparent text-ivory hover:border-gold hover:bg-gold/10 hover:text-gold" />
            <CarouselNext className="static size-12 translate-y-0 rounded-none border-border bg-transparent text-ivory hover:border-gold hover:bg-gold/10 hover:text-gold" />
          </div>
        </Carousel>
      </div>

      <Lightbox
        items={portfolio}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </section>
  );
}

function Timeline() {
  return (
    <section className="grain bg-background py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="The Experience"
          title="Six movements from first call to last dance"
        />

        <ol className="relative mx-auto mt-20 max-w-3xl md:mt-28">
          <div className="absolute top-0 bottom-0 left-6 hidden w-px bg-border md:left-1/2 md:block" />
          {timeline.map((t, i) => (
            <li key={t.title} className="relative flex gap-5 pb-14 md:block md:pb-20">
              <Reveal delay={0.05} className="contents">
                <div className="relative flex flex-col items-center md:hidden">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/45 bg-background font-display text-sm text-gold">
                    {t.step}
                  </span>
                  <div className="mt-4 w-px flex-1 bg-border" />
                </div>

                <div
                  className={
                    i % 2 === 0
                      ? "md:pr-[calc(50%+3rem)] md:text-right"
                      : "md:pl-[calc(50%+3rem)]"
                  }
                >
                  <p className="eyebrow">Movement {t.step}</p>
                  <h3 className="mt-4 text-3xl text-ivory md:text-4xl">{t.title}</h3>
                  <p className="mt-4 text-sm leading-[1.95] text-muted-foreground">
                    {t.text}
                  </p>
                </div>

                <span className="absolute top-1 left-6 hidden size-11 -translate-x-1/2 items-center justify-center rounded-full border border-gold/45 bg-background font-display text-sm text-gold md:left-1/2 md:flex">
                  {t.step}
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function TrustedBy() {
  return (
    <section className="border-y border-border bg-background py-14">
      <p className="eyebrow mb-9 text-center">As Trusted By</p>
      <Marquee items={trustedBy} />
    </section>
  );
}

function Testimonials() {
  const [active, setActive] = useState(0);
  const item = testimonials[active]!;

  return (
    <section className="relative overflow-hidden bg-section py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading eyebrow="Clients" title="In their words" />

        <div className="relative mx-auto mt-16 max-w-3xl md:mt-24">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel relative rounded-2xl p-9 text-center md:p-16"
          >
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(30rem_20rem_at_50%_0%,oklch(0.784_0.086_84_/_0.12),transparent_70%)]" />
            <Quote className="relative mx-auto size-9 text-gold/60" />
            <blockquote className="relative mt-8 text-[clamp(1.35rem,2.6vw,2.1rem)] leading-[1.5] text-ivory">
              {item.quote}
            </blockquote>
            <div className="relative mt-10 flex items-center justify-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="size-14 rounded-full border border-border object-cover"
              />
              <div className="text-left">
                <p className="text-sm text-ivory">{item.name}</p>
                <p className="mt-1 text-[0.66rem] tracking-[0.24em] text-muted-foreground uppercase">
                  {item.role}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-10 flex items-center justify-center gap-3">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActive(i)}
                aria-label={`Show testimonial from ${t.name}`}
                className={`h-px w-12 transition-colors duration-500 ${
                  i === active ? "bg-gold" : "bg-border"
                }`}
              />
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-14 flex items-center justify-center gap-4 text-[0.66rem] tracking-[0.24em] text-muted-foreground uppercase">
              <span className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-3 fill-current" />
                ))}
              </span>
              Video testimonials available on request
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function NumbersBand() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 border-y border-border px-6 py-14 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div>
              <p className="font-display text-[clamp(2.75rem,5.4vw,4.25rem)] leading-none gold-text">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-4 text-[0.66rem] tracking-[0.28em] text-muted-foreground uppercase">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Instagram() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Instagram" title="@maisonaurelle" className="max-w-xl" />
          <Reveal>
            <a
              href={brand.socials[0]!.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[0.7rem] tracking-[0.26em] text-gold uppercase"
            >
              Follow the atelier
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {instagramFeed.map((src, i) => (
            <Reveal key={i} delay={(i % 6) * 0.06}>
              <a
                href={brand.socials[0]!.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-md border border-border/70"
              >
                <img
                  src={src}
                  alt="Maison Aurelle event detail"
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-[1.3s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/55" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  const { open } = useQuote();

  return (
    <section className="grain relative isolate overflow-hidden">
      <img
        src={images.ctaFloral}
        alt=""
        aria-hidden
        loading="lazy"
        width={1920}
        height={912}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-background/78" />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center md:py-44">
        <Reveal>
          <p className="eyebrow">Private Consultation</p>
        </Reveal>
        <h2 className="mt-8 text-[clamp(2.25rem,5.6vw,4.75rem)] leading-[1.02] text-ivory">
          <RevealLines text="Let's create something extraordinary" />
        </h2>
        <Reveal delay={0.25}>
          <p className="mx-auto mt-8 max-w-lg text-[0.95rem] leading-[1.95] text-muted-foreground">
            Share a few details and a planner will arrange an unhurried
            conversation at the atelier or wherever you are in the world.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <LuxeButton size="lg" className="mt-12" onClick={open}>
            Schedule Your Consultation
          </LuxeButton>
        </Reveal>
      </div>
    </section>
  );
}