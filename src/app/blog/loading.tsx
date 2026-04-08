export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-bg-base pt-16">
      {/* Hero skeleton */}
      <div className="py-28 flex flex-col items-center gap-5 px-6">
        <div className="h-3 w-24 bg-bg-elevated rounded-full animate-pulse" />
        <div className="h-14 w-96 max-w-full bg-bg-elevated rounded-xl animate-pulse" />
        <div className="h-5 w-72 max-w-full bg-bg-surface rounded-xl animate-pulse" />
      </div>

      {/* Card grid skeleton */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-bg-surface border border-white/8 overflow-hidden animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="aspect-video bg-bg-elevated" />
              <div className="p-6 flex flex-col gap-3">
                <div className="h-3 w-16 bg-bg-elevated rounded-full" />
                <div className="h-5 w-full bg-bg-elevated rounded-lg" />
                <div className="h-5 w-3/4 bg-bg-elevated rounded-lg" />
                <div className="h-4 w-full bg-bg-elevated/50 rounded-lg mt-2" />
                <div className="h-4 w-full bg-bg-elevated/50 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
