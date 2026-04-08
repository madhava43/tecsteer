import { cn } from "@/lib/utils";
import ScrollToTop from "@/components/layout/ScrollToTop";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <>
      <main
        id="main-content"
        className={cn(
          "min-h-screen bg-bg-base pt-16 md:pt-18",
          className
        )}
      >
        {children}
      </main>
      <ScrollToTop />
    </>
  );
}
