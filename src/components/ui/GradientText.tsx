import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: "blue" | "subtle" | "warm";
}

const variants = {
  blue: "from-[#F0F4FF] via-[#60a5fa] to-[#0066FF]",
  subtle: "from-[#F0F4FF] to-[#8896B3]",
  warm: "from-[#F0F4FF] via-[#93c5fd] to-[#3b82f6]",
};

export function GradientText({
  children,
  className,
  variant = "blue",
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
