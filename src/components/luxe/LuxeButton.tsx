import { cva, type VariantProps } from "class-variance-authority";
import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const luxeButton = cva(
  "relative inline-flex items-center justify-center overflow-hidden font-sans text-[0.7rem] uppercase tracking-[0.26em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60 sheen",
  {
    variants: {
      variant: {
        gold: "bg-[image:var(--gradient-gold)] text-primary-foreground hover:shadow-[0_18px_40px_-18px_var(--gold)]",
        outline:
          "border border-border text-ivory hover:border-gold hover:bg-gold/10",
        ghost: "text-muted-foreground hover:text-gold",
      },
      size: {
        default: "h-13 px-9",
        sm: "h-10 px-6",
        lg: "h-15 px-12",
      },
    },
    defaultVariants: { variant: "gold", size: "default" },
  },
);

type Variants = VariantProps<typeof luxeButton>;

export function LuxeButton({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & Variants) {
  return (
    <button
      data-cursor="hover"
      className={cn(luxeButton({ variant, size }), className)}
      {...props}
    />
  );
}

export function LuxeLink({
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Link> & Variants) {
  return (
    <Link
      data-cursor="hover"
      className={cn(luxeButton({ variant, size }), className)}
      {...props}
    />
  );
}