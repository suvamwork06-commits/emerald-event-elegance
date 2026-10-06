import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { brand } from "@/lib/content";
import { useAuthUser } from "@/hooks/use-auth-user";

export function Footer() {
  const { user } = useAuthUser();

  return (
    <footer className="grain border-t border-border bg-surface">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl tracking-[0.12em] text-ivory">
              {brand.name.toUpperCase()}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-[1.9] text-muted-foreground">
              A luxury event atelier producing weddings, galas and private
              celebrations for families and houses who expect quiet perfection.
            </p>
          </div>

          <div>
            <p className="eyebrow">Quick Links</p>
            <ul className="mt-7 space-y-4 text-sm text-muted-foreground">
              {[
                { to: "/", label: "Home" },
                { to: "/events", label: "Luxury Events" },
                { to: "/catering", label: "Luxury Catering" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="link-underline transition-colors hover:text-ivory">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-12">Follow</p>
            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              {brand.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline transition-colors hover:text-ivory"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-7 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <li>{brand.address}</li>
              <li>
                <a href={brand.phoneHref} className="link-underline hover:text-ivory">
                  {brand.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${brand.email}`} className="link-underline hover:text-ivory">
                  {brand.email}
                </a>
              </li>
            </ul>
            <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
              {brand.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-ivory/80">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gold-rule mt-16" />
        <div className="mt-8 flex flex-col gap-3 text-xs tracking-[0.16em] text-muted-foreground/70 uppercase sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p>{brand.tagline}</p>
            {user ? (
              <Link
                to="/admin/enquiries"
                aria-label="Admin portal"
                title="Admin portal"
                className="text-gold/60 transition-colors hover:text-gold"
              >
                <Lock className="size-3.5" />
              </Link>
            ) : null}
          </div>

        </div>
      </div>
    </footer>
  );
}
