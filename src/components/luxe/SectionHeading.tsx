import { Reveal, RevealLines } from "./Reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <p className="eyebrow flex items-center gap-4">
            {align === "center" ? <span className="h-px w-10 bg-gold/50" /> : null}
            {eyebrow}
            <span className="h-px w-10 bg-gold/50" />
          </p>
        </Reveal>
      ) : null}
      <h2 className="mt-6 text-[clamp(2.25rem,5.2vw,4.5rem)] leading-[1.02] text-ivory">
        <RevealLines text={title} />
      </h2>
      {intro ? (
        <Reveal delay={0.12}>
          <p className="mt-7 max-w-xl text-[0.98rem] leading-[1.9] text-muted-foreground">
            {intro}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}