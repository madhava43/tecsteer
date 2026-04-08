import { useId } from "react";

import { cn } from "@/lib/utils";

interface DotPatternProps {
  width?: number; // Width should be a number
  height?: number; // Height should be a number
  x?: number; // x-coordinate should be a number
  y?: number; // y-coordinate should be a number
  cx?: number; // Circle x-coordinate should be a number
  cy?: number; // Circle y-coordinate should be a number
  cr?: number; // Circle radius should be a number
  className?: string; // ClassName should be a string
  [key: string]: unknown; // Any additional props as unknown
}
export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}: DotPatternProps) {
  const id = useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
    </svg>
  );
}

export default DotPattern;
