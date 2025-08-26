'use client'

import Link from 'next/link'
import { Home, Music, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Animated 404 */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff] animate-pulse-neon mb-4">
            404
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] mx-auto rounded-full animate-glow" />
        </div>

        {/* Error message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#00ffff]">
            Страница не найдена
          </h2>
          <p className="text-gray-400 text-lg">
            Кажется, эта страница растворилась в цифровых битах...
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="group flex items-center gap-2 bg-gradient-to-r from-[#9d4edd] to-[#c77dff] px-6 py-3 rounded-lg font-medium hover:from-[#7b2cbf] hover:to-[#9d4edd] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#9d4edd]/30"
          >
            <div className="w-5 h-5">
              <Home size={20} />
            </div>
            Главная
          </Link>
          
          <Link 
            href="/music"
            className="group flex items-center gap-2 bg-gradient-to-r from-[#00ffff] to-[#40e0d0] text-black px-6 py-3 rounded-lg font-medium hover:from-[#00e6e6] hover:to-[#20c0a0] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00ffff]/30"
          >
            <div className="w-5 h-5">
              <Music size={20} />
            </div>
            Музыка
          </Link>
        </div>

        {/* Back button */}
        <button 
          onClick={() => window.history.back()}
          className="group flex items-center gap-2 text-gray-400 hover:text-[#00ffff] transition-colors duration-300 mx-auto mt-6"
        >
          <div className="w-4 h-4">
            <ArrowLeft size={16} />
          </div>
          Вернуться назад
        </button>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#9d4edd]/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#00ffff]/10 rounded-full blur-3xl animate-float-delay" />
        </div>
      </div>
    </div>
  )
}
