import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <span className="eyebrow">ERROR 404</span>

        <h1 className="font-syne font-extrabold text-[8rem] md:text-[12rem] leading-none text-text-primary opacity-10 select-none">
          404
        </h1>

        <div className="-mt-8 flex flex-col items-center gap-4">
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-text-primary">
            Page Not Found
          </h2>
          <p className="text-text-secondary text-base max-w-sm leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-primary text-white text-sm font-medium hover:bg-[#0052CC] transition-all duration-300 shadow-glow-sm hover:shadow-glow-md mt-2"
        >
          <ArrowLeft size={15} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
