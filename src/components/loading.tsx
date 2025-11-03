export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center w-full bg-white select-none">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div
            className="w-full h-full border-2 border-transparent border-t-neutral-800 border-r-neutral-800  rounded-full animate-spin"
            aria-label="Loading"
          />
        </div>
        <p className="text-neutral-800 text-sm font-medium tracking-wide">Loading...</p>
      </div>
    </div>
  )
}