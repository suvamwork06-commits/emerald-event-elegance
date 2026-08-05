export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="relative flex overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div className="marquee-track flex w-max shrink-0 items-center gap-16 pr-16">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-2xl whitespace-nowrap text-muted-foreground/70 transition-colors duration-500 hover:text-gold"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}