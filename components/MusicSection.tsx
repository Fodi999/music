import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Play, Pause, ExternalLink, User, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface Collaborator {
  name: string;
  role: string;
}

interface Release {
  id: number;
  title: string;
  type: string;
  year: string;
  cover: string;
  duration: string;
  author: string;
  collaborators?: Collaborator[];
  isPlaying?: boolean;
}

const releases: Release[] = [
  {
    id: 1,
    title: "Neon Dreams",
    type: "Album",
    year: "2024",
    cover: "https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwZWxlY3Ryb25pYyUyMG11c2ljfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "45:30",
    author: "NEXUS",
    collaborators: [
      { name: "Alex Synth", role: "Co-Producer" },
      { name: "Luna Waves", role: "Vocal Features" }
    ]
  },
  {
    id: 2,
    title: "Cyberpunk City",
    type: "EP",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwZWxlY3Ryb25pYyUyMG11c2ljfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "22:15",
    author: "NEXUS",
    collaborators: [
      { name: "Digital Storm", role: "Sound Design" }
    ]
  },
  {
    id: 3,
    title: "Digital Horizon",
    type: "Single",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwZWxlY3Ryb25pYyUyMG11c2ljfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "4:20",
    author: "NEXUS",
    collaborators: [
      { name: "Echo Matrix", role: "Remix" }
    ]
  },
  {
    id: 4,
    title: "Synthwave Nights",
    type: "Album",
    year: "2022",
    cover: "https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwZWxlY3Ryb25pYyUyMG11c2ljfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "38:45",
    author: "NEXUS",
    collaborators: [
      { name: "Retro Bass", role: "Bass Synth" },
      { name: "Neon Collective", role: "Additional Production" }
    ]
  },
  {
    id: 5,
    title: "Quantum Bass",
    type: "EP",
    year: "2022",
    cover: "https://images.unsplash.com/photo-1703115015343-81b498a8c080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGJ1bSUyMGNvdmVyJTIwZWxlY3Ryb25pYyUyMG11c2ljfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    duration: "18:33",
    author: "NEXUS",
    collaborators: [
      { name: "Future Dynamics", role: "Co-Producer" }
    ]
  },
  {
    id: 6,
    title: "Future Waves",
    type: "Single",
    year: "2021",
    cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    duration: "5:12",
    author: "NEXUS"
  },
  {
    id: 7,
    title: "Electric Storm",
    type: "Single",
    year: "2024",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    duration: "4:45",
    author: "NEXUS",
    collaborators: [
      { name: "Lightning", role: "Co-Producer" }
    ]
  },
  {
    id: 8,
    title: "Midnight Drive",
    type: "Single",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    duration: "5:30",
    author: "NEXUS"
  },
  {
    id: 9,
    title: "Binary Dreams",
    type: "EP",
    year: "2024",
    cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    duration: "16:45",
    author: "NEXUS",
    collaborators: [
      { name: "Code Runner", role: "Sound Design" }
    ]
  },
  {
    id: 10,
    title: "Crystal Frequencies",
    type: "Album",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    duration: "52:18",
    author: "NEXUS",
    collaborators: [
      { name: "Ethereal Collective", role: "Ambient Design" }
    ]
  }
];

export function MusicSection() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  const togglePlay = (id: number) => {
    setPlayingId(playingId === id ? null : id);
  };

  return (
    <section id="music" className="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
            Релизы
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Коллекция моих электронных произведений — от ambient-медитаций до энергичных dance-треков
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {releases.map((release, index) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/20 hover:border-[#00ffff]/50 transition-all duration-300 neon-border">
                <div className="relative">
                  <ImageWithFallback
                    src={release.cover}
                    alt={release.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Оверлей при наведении */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        onClick={() => togglePlay(release.id)}
                        className="bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black p-4 rounded-full neon-box hover:shadow-[0_0_30px_#00ffff] transition-all duration-300"
                      >
                        {playingId === release.id ? (
                          <Pause size={24} />
                        ) : (
                          <Play size={24} />
                        )}
                      </Button>
                    </motion.div>
                  </div>

                  {/* Индикатор типа релиза */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      release.type === 'Album' ? 'bg-[#00ffff]/20 text-[#00ffff] border border-[#00ffff]/30' :
                      release.type === 'EP' ? 'bg-[#ff00ff]/20 text-[#ff00ff] border border-[#ff00ff]/30' :
                      'bg-[#9d4edd]/20 text-[#9d4edd] border border-[#9d4edd]/30'
                    }`}>
                      {release.type}
                    </span>
                  </div>

                  {/* Индикатор воспроизведения */}
                  {playingId === release.id && (
                    <div className="absolute top-4 right-4">
                      <div className="flex gap-1">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-[#00ffff] animate-pulse-neon"
                            style={{
                              height: `${12 + Math.random() * 8}px`,
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#00ffff] transition-colors">
                      {release.title}
                    </h3>
                    
                    {/* Информация об авторе */}
                    <div className="flex items-center gap-2 text-sm">
                      <div className="text-[#00ffff]">
                        <User size={16} />
                      </div>
                      <span className="text-[#00ffff] font-medium">{release.author}</span>
                    </div>

                    {/* Соавторы */}
                    {release.collaborators && release.collaborators.length > 0 && (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <div className="text-gray-400">
                            <Users size={12} />
                          </div>
                          <span>При участии:</span>
                        </div>
                        <div className="pl-5 space-y-1">
                          {release.collaborators.map((collab, i) => (
                            <div key={i} className="text-xs text-gray-300">
                              <span className="text-[#ff00ff]">{collab.name}</span>
                              <span className="text-gray-500"> — {collab.role}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-400 pt-2 border-t border-gray-700">
                      <span>{release.year}</span>
                      <span>{release.duration}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#9d4edd]/30 text-[#9d4edd] hover:bg-[#9d4edd]/10 hover:border-[#9d4edd] transition-all duration-300"
                    >
                      <div className="w-4 h-4 mr-2">
                        <ExternalLink size={16} />
                      </div>
                      Spotify
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-[#ff00ff]/30 text-[#ff00ff] hover:bg-[#ff00ff]/10 hover:border-[#ff00ff] transition-all duration-300"
                    >
                      <div className="w-4 h-4 mr-2">
                        <ExternalLink size={16} />
                      </div>
                      Apple Music
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Секция о сотрудничестве */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/30 p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-[#9d4edd] mb-4 neon-glow">
                Коллаборации и сотрудничество
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                В создании моей музыки принимают участие талантливые артисты со всего мира. 
                Каждый трек — это результат творческого слияния разных музыкальных видений и стилей.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] rounded-lg border border-[#00ffff]/20">
                  <div className="text-2xl font-bold text-[#00ffff] neon-glow">15+</div>
                  <div className="text-sm text-gray-400">Коллабораций</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] rounded-lg border border-[#ff00ff]/20">
                  <div className="text-2xl font-bold text-[#ff00ff] neon-glow">8</div>
                  <div className="text-sm text-gray-400">Стран</div>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] rounded-lg border border-[#9d4edd]/20">
                  <div className="text-2xl font-bold text-[#9d4edd] neon-glow">25+</div>
                  <div className="text-sm text-gray-400">Участников</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Кнопки навигации */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/playlist" className="inline-block">
              <Button
                className="bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black px-8 py-4 text-lg neon-border hover:shadow-[0_0_30px_#00ffff] transition-all duration-300"
              >
                <div className="w-5 h-5 mr-2">
                  <ExternalLink size={20} />
                </div>
                Полный плейлист (10 треков)
              </Button>
            </a>
            
            <a href="/music" className="inline-block">
              <Button
                variant="outline"
                className="border-[#9d4edd]/30 text-[#9d4edd] hover:bg-[#9d4edd]/10 hover:border-[#9d4edd] px-8 py-4 text-lg transition-all duration-300"
              >
                <div className="w-5 h-5 mr-2">
                  <ExternalLink size={20} />
                </div>
                Музыкальный плеер
              </Button>
            </a>
          </div>
          
          <p className="text-sm text-gray-400 max-w-lg mx-auto">
            Откройте полный плейлист для просмотра всех 10 треков или используйте интерактивный плеер для полного музыкального опыта
          </p>
        </motion.div>
      </div>
    </section>
  );
}