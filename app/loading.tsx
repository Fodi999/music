export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="text-center">
        {/* Main loading spinner */}
        <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-[#9d4edd]/30 border-t-[#00ffff] rounded-full animate-spin mx-auto" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-[#ff00ff] rounded-full animate-spin-reverse mx-auto" />
        </div>

        {/* Loading text */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff] animate-pulse-neon">
            NEXUS
          </h2>
          <p className="text-gray-400 mt-2">Загружаем музыкальную вселенную...</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-[#1a1a1a] rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff] rounded-full animate-loading-bar" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#00ffff] rounded-full animate-float opacity-60" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-[#ff00ff] rounded-full animate-float-delay opacity-40" />
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-[#9d4edd] rounded-full animate-float opacity-30" />
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#00ffff] rounded-full animate-float-delay opacity-50" />
        </div>
      </div>
    </div>
  )
}
