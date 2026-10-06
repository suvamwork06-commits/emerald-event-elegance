import { serviceBrands } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ServiceLogo({ service, className }: {
  service: keyof typeof serviceBrands;
  className?: string;
}) {
  const identity = serviceBrands[service];
  return (
    <img
      src={identity.logo}
      alt={`${identity.name} logo`}
      className={cn("h-20 w-56 rounded-sm bg-logo-surface object-contain p-2", className)}
    />
  );
}