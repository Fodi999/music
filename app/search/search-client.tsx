'use client'

import { MusicSearch } from '@/components/MusicSearch'
import { MusicBrainzDemo } from '@/components/MusicBrainzDemo'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function MusicSearchClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a1a1a] text-white">
      {/* Navigation */}
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
                  Home
                </Button>
              </Link>
              
              <div className="flex items-center gap-4">
                <Link href="/music">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-[#ff00ff] hover:bg-[#ff00ff]/10 transition-colors"
                  >
                    Music Player
                  </Button>
                </Link>
                
                <Link href="/playlist">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-[#ff00ff] hover:bg-[#ff00ff]/10 transition-colors"
                  >
                    Playlist
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00ffff] rounded-full animate-pulse-neon" />
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
                NEXUS
              </h1>
              <div className="w-2 h-2 bg-[#ff00ff] rounded-full animate-pulse-neon" />
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#1a1a1a] border border-[#9d4edd]/30 mb-8">
              <TabsTrigger 
                value="search" 
                className="data-[state=active]:bg-[#9d4edd] data-[state=active]:text-white"
              >
                Music Search
              </TabsTrigger>
              <TabsTrigger 
                value="demo" 
                className="data-[state=active]:bg-[#9d4edd] data-[state=active]:text-white"
              >
                API Demo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search">
              <MusicSearch />
            </TabsContent>

            <TabsContent value="demo">
              <MusicBrainzDemo />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Background Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a1a1a]" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#00ffff] rounded-full animate-pulse-neon"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#9d4edd]/5 via-transparent to-[#ff006e]/5" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#00ffff]/3 to-transparent" />
      </div>
    </div>
  )
}
