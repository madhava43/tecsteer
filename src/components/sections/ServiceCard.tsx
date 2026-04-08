import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  link: string;
  size?: "default" | "large";
  className?: string;
}

const ServiceCard = ({
  title,
  description,
  icon,
  link,
  size = "default",
  className,
}: ServiceCardProps) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl",
        "bg-bg-surface border border-white/[0.06]",
        "shadow-card",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-white/[0.12] hover:shadow-card-hover",
        size === "default" ? "p-6" : "p-8",
        className
      )}
    >
      {/* Icon */}
      {icon && (
        <div
          className={cn(
            "flex items-center justify-center rounded-lg mb-5",
            "text-accent-primary",
            "bg-transparent",
            size === "default" ? "w-10 h-10" : "w-12 h-12"
          )}
        >
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col gap-2.5">
        <h3
          className={cn(
            "font-syne font-semibold text-text-primary leading-snug",
            size === "default" ? "text-[1.0625rem]" : "text-lg"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-text-secondary leading-relaxed line-clamp-3",
            size === "default" ? "text-sm" : "text-sm"
          )}
        >
          {description}
        </p>
      </div>

      {/* Link — text only, arrow slides right on hover */}
      <Link
        href={link}
        className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-text-muted group-hover:text-accent-primary transition-colors duration-150"
        aria-label={`Learn more about ${title}`}
      >
        Learn more
        <ArrowRight
          size={12}
          className="transition-transform duration-150 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
};

export default ServiceCard;
