export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center w-full bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div
            className="w-full h-full border-2 border-transparent border-t-slate-800 border-r-slate-800 rounded-full animate-spin"
            aria-label="Loading"
          />
        </div>
        {/* Loading text */}
        <p className="text-slate-800 text-sm font-medium tracking-wide">Loading...</p>
      </div>
    </div>
  )
}