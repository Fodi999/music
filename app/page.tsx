'use client'

import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { MusicSection } from '@/components/MusicSection'
import { ToursSection } from '@/components/ToursSection'
import { ContactSection } from '@/components/ContactSection'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  const navigateToMusic = () => {
    router.push('/music')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <HeroSection onNavigateToMusic={navigateToMusic} />
      <AboutSection />
      <MusicSection />
      <ToursSection />
      <ContactSection />
      
      {/* Футер */}
      <footer className="bg-[#0a0a0a] border-t border-[#9d4edd]/20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-[#00ffff] rounded-full animate-pulse-neon" />
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
              NEXUS
            </span>
            <div className="w-2 h-2 bg-[#ff00ff] rounded-full animate-pulse-neon" />
          </div>
          
          <p className="text-gray-400 mb-4">
            Electronic Music Producer • Creating the Future of Sound
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span>© 2024 NEXUS Music</span>
            <span>•</span>
            <span>Made with 💜 in the Digital Age</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
