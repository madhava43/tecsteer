export default function Loading() {
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo pulse */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-accent-primary/30 animate-ping" />
          <div className="absolute inset-2 rounded-full bg-accent-primary/20 animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-accent-primary" />
          </div>
        </div>
        <span className="font-mono text-xs text-text-muted tracking-widest uppercase">
          Loading…
        </span>
      </div>
    </div>
  );
}
