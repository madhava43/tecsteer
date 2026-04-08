"use client";

import { cn } from "@/lib/utils";

// Static — no count-up animation. Clean numbers feel more premium.
const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "50+", label: "Clients Served" },
  { value: "100+", label: "Projects Delivered" },
  { value: "8",   label: "Core Services" },
];

interface StatsRowProps {
  className?: string;
}

export default function StatsRow({ className }: StatsRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 lg:grid-cols-4",
        "divide-x divide-y lg:divide-y-0 divide-white/[0.06]",
        className
      )}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-1.5 py-10 px-6 first:rounded-l-xl last:rounded-r-xl"
        >
          <span
            className="font-syne font-bold text-text-primary tabular-nums"
            style={{ fontSize: "clamp(2.25rem, 4vw, 3.5rem)", lineHeight: 1 }}
          >
            {stat.value}
          </span>
          <span className="text-xs text-text-muted uppercase tracking-[0.1em] font-mono text-center leading-tight">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
