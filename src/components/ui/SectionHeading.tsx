import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  align?: "left" | "center";
  className?: string;
  headingClassName?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  subtext,
  align = "left",
  className,
  headingClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="eyebrow mb-4">{eyebrow}</span>
      )}
      <h2
        className={cn(
          "font-syne font-bold tracking-tight text-text-primary mb-5",
          "text-3xl md:text-4xl lg:text-[2.75rem]",
          headingClassName
        )}
        style={{ lineHeight: 1.1, letterSpacing: "-0.03em" }}
      >
        {heading}
      </h2>
      {subtext && (
        <p
          className={cn(
            "text-text-secondary leading-relaxed text-base",
            align === "center" ? "max-w-xl" : "max-w-[52ch]"
          )}
        >
          {subtext}
        </p>
      )}
    </div>
  );
}
