import { cn } from "@/lib/utils";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "nav-cta";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  // Solid blue — hero CTAs only. Hover: brightness not color change.
  primary: [
    "bg-accent-primary text-white",
    "hover:brightness-110",
    "active:scale-[0.98]",
    "shadow-glow-sm hover:shadow-glow-md",
  ].join(" "),
  // Transparent — secondary actions
  ghost: [
    "bg-transparent text-text-secondary border border-white/[0.12]",
    "hover:text-text-primary hover:bg-white/[0.04] hover:border-white/[0.18]",
    "active:scale-[0.98]",
  ].join(" "),
  // Navbar CTA — ghost with accent tint
  "nav-cta": [
    "bg-accent-primary/[0.12] text-accent-primary border border-accent-primary/30",
    "hover:bg-accent-primary/[0.2] hover:border-accent-primary/50",
    "active:scale-[0.98]",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm:  "h-8 px-4 text-xs rounded-md gap-1.5",
  md:  "h-10 px-5 text-sm rounded-md gap-2",
  lg:  "h-11 px-7 text-sm rounded-lg gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium font-sans",
    "transition-all duration-150 cursor-pointer select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
    "disabled:opacity-40 disabled:pointer-events-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
