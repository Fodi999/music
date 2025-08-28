import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Play, Music, Search, User, Calendar, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import React, { useEffect, useState } from 'react';

const Particle = ({ delay, index }: { delay: number; index: number }) => {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    // Генерируем стили только на клиенте для избежания hydration mismatch
    setStyle({
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${8 + Math.random() * 4}s`,
    });
  }, [delay]);

  return (
    <div
      className="particle w-2 h-2"
      style={style}
    />
  );
};

interface HeroSectionProps {
  onNavigateToMusic: () => void;
}

export function HeroSection({ onNavigateToMusic }: HeroSectionProps) {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a1a1a]">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 border-b border-[#9d4edd]/20 backdrop-blur-sm bg-[#0a0a0a]/80">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00ffff] rounded-full animate-pulse" />
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
                NEXUS
              </span>
              <div className="w-2 h-2 bg-[#ff00ff] rounded-full animate-pulse" />
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-[#00ffff] hover:bg-[#00ffff]/10 transition-colors"
                onClick={onNavigateToMusic}
              >
                <div className="w-4 h-4 mr-2">
                  <Music size={16} />
                </div>
                Music
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-[#8000ff] hover:bg-[#8000ff]/10 transition-colors"
                onClick={onNavigateToMusic}
              >
                <div className="w-4 h-4 mr-2">
                  <Music size={16} />
                </div>
                Electronic
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-[#ff00ff] hover:bg-[#ff00ff]/10 transition-colors"
                onClick={onNavigateToMusic}
              >
                <div className="w-4 h-4 mr-2">
                  <Play size={16} />
                </div>
                Playlist
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-[#9d4edd] hover:bg-[#9d4edd]/10 transition-colors"
              >
                <div className="w-4 h-4 mr-2">
                  <Search size={16} />
                </div>
                Search
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-400 hover:text-[#00ffff] hover:bg-[#00ffff]/10 transition-colors"
                onClick={onNavigateToMusic}
              >
                <div className="w-4 h-4 mr-2">
                  <Play size={16} />
                </div>
                Audio Test
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Анимированные частицы */}
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <Particle key={i} delay={i * 0.5} index={i} />
        ))}
      </div>

      {/* Фоновое изображение с наложением */}
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1674507887404-06428dbaff19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBwcm9kdWNlciUyMGRhcmslMjBuZW9ufGVufDF8fHx8MTc1NjIyNDM2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Electronic Music Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />
      </div>

      {/* Контент */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] via-[#ff00ff] to-[#9d4edd] neon-glow">
            NEXUS
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <p className="text-xl md:text-2xl text-gray-300 mb-2">
            Electronic Music Producer
          </p>
          <div className="flex items-center justify-center gap-2 text-[#00ffff]">
            <div className="w-5 h-5">
              <Music size={20} />
            </div>
            <span className="text-sm uppercase tracking-wide">Future Bass • Synthwave • Ambient</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={onNavigateToMusic}
            className="bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black px-8 py-6 text-lg hover:shadow-[0_0_20px_#00ffff] transition-all duration-300 group border border-[#00ffff]/30"
          >
            <div className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform">
              <Play size={20} />
            </div>
            Слушать музыку
          </Button>
          
          <Button
            onClick={onNavigateToMusic}
            className="bg-gradient-to-r from-[#8000ff] to-[#0080ff] text-white px-8 py-6 text-lg hover:shadow-[0_0_20px_#8000ff] transition-all duration-300 group border border-[#8000ff]/30"
          >
            <div className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform">
              <Music size={20} />
            </div>
            Electronic Music
          </Button>
          
          <Button
            onClick={scrollToContact}
            variant="outline"
            className="border-[#9d4edd] text-[#9d4edd] px-8 py-6 text-lg hover:bg-[#9d4edd]/10 hover:shadow-[0_0_20px_#9d4edd] transition-all duration-300"
          >
            Связаться
          </Button>
        </motion.div>

        {/* Визуализатор звука */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-12 flex justify-center gap-1"
        >
          {Array.from({ length: 32 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-gradient-to-t from-[#00ffff] to-[#ff00ff] rounded-full"
              style={{
                height: `${20 + (i % 5) * 8}px`,
              }}
              animate={{
                height: [
                  `${20 + (i % 5) * 8}px`, 
                  `${30 + (i % 7) * 12}px`, 
                  `${20 + (i % 5) * 8}px`
                ],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 1.5 + (i % 3) * 0.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Прокрутка вниз */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#00ffff] animate-bounce cursor-pointer"
        onClick={onNavigateToMusic}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm uppercase tracking-wide">Прокрутить</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#00ffff] to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}