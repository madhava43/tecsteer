import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "tech" | "category" | "status";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default:  "bg-accent-primary/[0.1] text-accent-primary border border-accent-primary/20",
  tech:     "bg-white/[0.04] text-text-secondary border border-white/[0.08] font-mono",
  category: "bg-white/[0.04] text-text-secondary border border-white/[0.08]",
  status:   "bg-green-500/10 text-green-400 border border-green-500/20",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium",
        "whitespace-nowrap",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
