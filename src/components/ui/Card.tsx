import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: React.ElementType;
}

export function Card({
  children,
  className,
  hover = true,
  as: Component = "div",
}: CardProps) {
  return (
    <Component
      className={cn(
        "relative rounded-xl p-8",
        "bg-bg-surface border border-white/[0.06]",
        "shadow-card",
        "transition-all duration-200",
        hover && [
          "hover:-translate-y-0.5",
          "hover:border-white/[0.12]",
          "hover:shadow-card-hover",
        ],
        className
      )}
    >
      {children}
    </Component>
  );
}
