'use client'

import { MusicPlayer } from '@/components/MusicPlayer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MusicPageClient() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Навигация */}
      <nav className="border-b border-[#9d4edd]/20 backdrop-blur-sm bg-[#0a0a0a]/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-[#00ffff] hover:bg-[#00ffff]/10 transition-colors"
                >
                  <div className="w-4 h-4 mr-2">
                    <ArrowLeft size={16} />
                  </div>
                  Back to Home
                </Button>
              </Link>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00ffff] rounded-full animate-pulse-neon" />
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
                  NEXUS
                </h1>
                <div className="w-2 h-2 bg-[#ff00ff] rounded-full animate-pulse-neon" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <MusicPlayer />
    </div>
  )
}
