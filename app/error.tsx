'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, RefreshCw, AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a1a1a] text-white flex items-center justify-center">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-2 h-2 bg-[#00ffff] rounded-full animate-pulse-neon" />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
            NEXUS
          </h1>
          <div className="w-2 h-2 bg-[#ff00ff] rounded-full animate-pulse-neon" />
        </div>

        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-500/20 rounded-full">
            <AlertTriangle size={64} className="text-red-400" />
          </div>
        </div>

        {/* Error Text */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Something went wrong!
          </h1>
          <p className="text-xl text-gray-300 max-w-md mx-auto">
            We&apos;re experiencing some technical difficulties. Please try again in a moment.
          </p>
          {error.message && (
            <p className="text-sm text-gray-400 font-mono bg-gray-800/50 p-4 rounded-lg">
              {error.message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={reset}
            className="bg-gradient-to-r from-[#ff006e] to-[#9d4edd] text-white px-8 py-6 text-lg neon-border hover:shadow-[0_0_20px_#ff006e] transition-all duration-300 group"
          >
            <div className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform">
              <RefreshCw size={20} />
            </div>
            Try Again
          </Button>
          
          <Link href="/">
            <Button 
              variant="outline"
              className="border-[#00ffff] text-[#00ffff] px-8 py-6 text-lg neon-border hover:bg-[#00ffff]/10 hover:shadow-[0_0_20px_#00ffff] transition-all duration-300"
            >
              <div className="w-5 h-5 mr-2">
                <Home size={20} />
              </div>
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Background Animation */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-400/50 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
