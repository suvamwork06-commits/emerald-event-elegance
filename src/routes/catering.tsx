import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import { Reveal, RevealLines } from "@/components/luxe/Reveal";
import { SectionHeading } from "@/components/luxe/SectionHeading";
import { LuxeButton } from "@/components/luxe/LuxeButton";
import { Lightbox } from "@/components/luxe/Lightbox";
import { useQuote } from "@/components/luxe/QuoteModal";
import {
  brand,
  cateringPillars,
  cateringReviews,
  foodGallery,
  images,
  menu,
} from "@/lib/content";

const TITLE = "Luxury Catering — Maison Aurelle";
const DESCRIPTION =
  "Chef-led luxury catering: wedding buffets, Royal Bengali, continental and Italian menus, live counters, patisserie and a dedicated bar programme.";

export const Route = createFileRoute("/catering")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/catering" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/catering" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FoodService",
          name: `${brand.name} Catering`,
          description: DESCRIPTION,
          telephone: brand.phone,
          email: brand.email,
          servesCuisine: ["Bengali", "Continental", "Italian", "Patisserie"],
        }),
      },
    ],
  }),
  component: CateringPage,
});

function CateringPage() {
  return (
    <>
      <CateringHero />
      <MenuExperience />
      <Philosophy />
      <Reviews />
      <Gallery />
      <Contact />
    </>
  );
}

function CateringHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className="grain relative flex h-svh min-h-[600px] items-end overflow-hidden"
    >
      <motion.img
        style={{ y }}
        src={images.cateringHero}
        alt="An opulent banquet of gourmet dishes on dark emerald marble"
        width={1920}
        height={1088}
        className="absolute inset-0 size-full scale-110 object-cover"
      />
      <div className="absolute inset-0 bg-background/72" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-background/45" />
      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 md:px-10 md:pb-28">
        <Reveal>
          <p className="eyebrow">Premium Catering</p>
        </Reveal>
        <h1 className="mt-7 max-w-4xl text-[clamp(2.6rem,7.6vw,6.25rem)] leading-[0.95] text-ivory">
          <RevealLines text="A menu written for your guests" />
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-8 max-w-lg text-[0.98rem] leading-[1.95] text-muted-foreground">
            Chef-led kitchens, provenance-logged produce and silver-service
            brigades rehearsed on site before a single guest arrives.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function MenuExperience() {
  const { open } = useQuote();

  return (
    <section className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="The Menu"
          title="Seven experiences, endlessly composed"
          intro="Each collection is a starting point. Tastings are held at the atelier, and every menu is rewritten around your guests before it is printed."
        />

        <div className="mt-16 grid gap-6 md:mt-24 sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 0.08}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full overflow-hidden rounded-xl border border-border transition-colors duration-500 hover:border-gold/45"
              >
                <div className="aspect-4/5 overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="eyebrow">{m.note}</p>
                  <h3 className="mt-4 text-3xl text-ivory">{m.title}</h3>
                  <p className="mt-4 max-h-0 overflow-hidden text-[0.82rem] leading-[1.9] text-muted-foreground opacity-0 transition-all duration-700 group-hover:max-h-40 group-hover:opacity-100">
                    {m.text}
                  </p>
                </div>
              </motion.article>
            </Reveal>
          ))}

          <Reveal delay={0.2}>
            <div className="clay-card flex h-full flex-col justify-center rounded-xl p-10 text-center">
              <h3 className="text-3xl leading-tight text-ivory">
                Request a private tasting
              </h3>
              <p className="mt-5 text-sm leading-[1.9] text-muted-foreground">
                Four courses, your palette, your table — hosted at the atelier.
              </p>
              <LuxeButton className="mt-9 self-center" onClick={open}>
                Request Quotation
              </LuxeButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="grain bg-section py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="Why Our Catering"
            title="The kitchen is the quietest room in the building"
            intro="Our executive chef has cooked in two Michelin kitchens and one royal household. What arrives at the table is the visible tenth of a very disciplined operation."
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {cateringPillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="glass-panel sheen relative h-full overflow-hidden rounded-xl p-8">
                <p className="eyebrow">0{i + 1}</p>
                <h3 className="mt-5 text-2xl text-ivory">{p.title}</h3>
                <p className="mt-4 text-[0.82rem] leading-[1.9] text-muted-foreground">
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading eyebrow="Client Reviews" title="Tables remembered" />
        <div className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-3">
          {cateringReviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <article className="clay-card h-full rounded-xl p-9">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star key={s} className="size-3 fill-current" />
                  ))}
                </div>
                <p className="mt-7 font-display text-xl leading-[1.6] text-ivory/90 italic">
                  “{r.text}”
                </p>
                <div className="mt-9 flex items-center gap-4">
                  <img
                    src={r.image}
                    alt={r.name}
                    loading="lazy"
                    className="size-12 rounded-full border border-border object-cover"
                  />
                  <div>
                    <p className="text-sm text-ivory">{r.name}</p>
                    <p className="mt-1 text-[0.64rem] tracking-[0.24em] text-muted-foreground uppercase">
                      {r.role}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const items = foodGallery.map((image, i) => ({ image, title: `Plate ${i + 1}` }));

  return (
    <section className="bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading eyebrow="Food Gallery" title="A closer look" />
        <div className="mt-16 gap-4 md:mt-24 md:columns-2 lg:columns-3 [&>*]:mb-4">
          {items.map((item, i) => (
            <Reveal key={i} delay={(i % 3) * 0.07}>
              <button
                onClick={() => setIndex(i)}
                aria-label={`Open image ${i + 1}`}
                className="group relative block w-full overflow-hidden rounded-lg border border-border/70"
              >
                <img
                  src={item.image}
                  alt="Luxury catering detail"
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-background/0 transition-colors duration-700 group-hover:bg-background/45" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox
        items={items}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </section>
  );
}

function Contact() {
  const { open } = useQuote();

  return (
    <section className="bg-background py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Speak with the concierge"
            intro="Call, write or send a WhatsApp — a planner responds within one working day."
          />

          <div className="mt-12 space-y-6 text-sm text-muted-foreground">
            <a href={brand.phoneHref} className="flex items-center gap-4 hover:text-ivory">
              <Phone className="size-4 text-gold" /> {brand.phone}
            </a>
            <a href={`mailto:${brand.email}`} className="flex items-center gap-4 hover:text-ivory">
              <Mail className="size-4 text-gold" /> {brand.email}
            </a>
            <p className="flex items-start gap-4">
              <MapPin className="mt-1 size-4 shrink-0 text-gold" /> {brand.address}
            </p>
          </div>

          <div className="gold-rule my-10" />

          <ul className="space-y-3 text-sm text-muted-foreground">
            {brand.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-6">
                <span>{h.day}</span>
                <span className="text-ivory/80">{h.time}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <LuxeButton onClick={open}>Request Quotation</LuxeButton>
            <a
              href={`https://wa.me/${brand.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LuxeButton variant="outline" tabIndex={-1}>
                WhatsApp Us
              </LuxeButton>
            </a>
          </div>
        </div>

        <Reveal delay={0.15}>
          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title="Maison Aurelle atelier location"
              src={brand.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full grayscale-[35%] lg:h-full lg:min-h-[540px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}