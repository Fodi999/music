import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MusicPlayer } from './MusicPlayer';
import { ArrowLeft, TrendingUp, Clock, Heart, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MusicPageProps {
  onBack: () => void;
}

const genres = [
  { name: 'Все', count: 50, color: 'from-[#00ffff] to-[#ff00ff]' },
  { name: 'Synthwave', count: 15, color: 'from-[#9d4edd] to-[#ff006e]' },
  { name: 'Future Bass', count: 12, color: 'from-[#ff006e] to-[#8338ec]' },
  { name: 'Ambient', count: 8, color: 'from-[#00ffff] to-[#9d4edd]' },
  { name: 'Chillwave', count: 10, color: 'from-[#ff00ff] to-[#00ffff]' },
  { name: 'Bass', count: 5, color: 'from-[#8338ec] to-[#ff006e]' }
];

const recentTracks = [
  {
    id: 1,
    title: "Midnight Protocol",
    artist: "NEXUS",
    duration: "4:15",
    plays: "2.1M",
    cover: "https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwZWxlY3Ryb25pYyUyMG11c2ljfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 2,
    title: "Electric Dreams",
    artist: "NEXUS ft. Luna Waves",
    duration: "5:32",
    plays: "1.8M",
    cover: "https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwZWxlY3Ryb25pYyUyMG11c2ljfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: 3,
    title: "Binary Sunset",
    artist: "NEXUS",
    duration: "6:18",
    plays: "3.2M",
    cover: "https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwZWxlY3Ryb25pYyUyMG11c2ljfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function MusicPage({ onBack }: MusicPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Хедер */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-[#9d4edd]/20"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={onBack}
                variant="ghost"
                className="text-[#00ffff] hover:text-[#ff00ff] hover:bg-[#1a1a1a] transition-all duration-300"
              >
                <div className="w-5 h-5 mr-2">
                  <ArrowLeft size={20} />
                </div>
                Назад
              </Button>
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#00ffff] rounded-full animate-pulse-neon" />
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
                  NEXUS Music
                </h1>
                <div className="w-2 h-2 bg-[#ff00ff] rounded-full animate-pulse-neon" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-[#9d4edd] to-[#ff006e] text-white">
                50 треков
              </Badge>
              <Badge className="bg-gradient-to-r from-[#00ffff] to-[#9d4edd] text-black">
                5.2M прослушиваний
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Фильтры по жанрам */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-8 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#9d4edd] mb-6 neon-glow">
            Жанры
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {genres.map((genre, index) => (
              <motion.div
                key={genre.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="cursor-pointer"
              >
                <Card className={`bg-gradient-to-br ${genre.color} p-1 hover:shadow-[0_0_20px_currentColor] transition-all duration-300`}>
                  <CardContent className="bg-[#1a1a1a] m-1 rounded-lg p-4 text-center">
                    <h3 className="font-bold text-white mb-1">{genre.name}</h3>
                    <p className="text-sm text-gray-400">{genre.count} треков</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Популярные треки */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="py-8 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 text-[#ff00ff]">
              <TrendingUp size={24} />
            </div>
            <h2 className="text-2xl font-bold text-[#ff00ff] neon-glow">
              Популярные треки
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recentTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/20 hover:border-[#ff00ff]/50 transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback
                      src={track.cover}
                      alt={track.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button className="bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black p-4 rounded-full neon-box hover:shadow-[0_0_30px_#00ffff] transition-all duration-300">
                        <Play size={24} />
                      </Button>
                    </div>

                    <div className="absolute top-4 right-4">
                      <Badge className="bg-black/70 text-[#00ffff] border border-[#00ffff]/30">
                        #{index + 1}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#ff00ff] transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{track.artist}</p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <div className="w-4 h-4">
                          <Clock size={16} />
                        </div>
                        <span>{track.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#9d4edd]">
                        <div className="w-4 h-4">
                          <Heart size={16} />
                        </div>
                        <span>{track.plays}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Основной плеер */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <MusicPlayer />
      </motion.section>
    </div>
  );
}