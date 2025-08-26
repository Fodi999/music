'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, Heart, Clock, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'
import Link from 'next/link'

interface PlaylistTrack {
  id: number
  title: string
  artist: string
  album: string
  duration: string
  genre: string
  year: string
  cover: string
  isLiked?: boolean
}

const playlistTracks: PlaylistTrack[] = [
  {
    id: 1,
    title: "Neon Dreams",
    artist: "NEXUS",
    album: "Neon Dreams",
    duration: "4:32",
    genre: "Synthwave",
    year: "2024",
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    isLiked: true
  },
  {
    id: 2,
    title: "Cyberpunk City",
    artist: "NEXUS ft. Alex Synth",
    album: "Cyberpunk City EP",
    duration: "5:18",
    genre: "Future Bass",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300"
  },
  {
    id: 3,
    title: "Digital Horizon",
    artist: "NEXUS",
    album: "Digital Horizon",
    duration: "4:20",
    genre: "Ambient",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    isLiked: true
  },
  {
    id: 4,
    title: "Quantum Bass",
    artist: "NEXUS ft. Future Dynamics",
    album: "Quantum Bass EP",
    duration: "3:45",
    genre: "Bass",
    year: "2022",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300"
  },
  {
    id: 5,
    title: "Synthwave Nights",
    artist: "NEXUS",
    album: "Synthwave Nights",
    duration: "6:12",
    genre: "Synthwave",
    year: "2022",
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    isLiked: true
  },
  {
    id: 6,
    title: "Future Waves",
    artist: "NEXUS",
    album: "Future Waves",
    duration: "5:12",
    genre: "Future Bass",
    year: "2021",
    cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300"
  },
  {
    id: 7,
    title: "Electric Storm",
    artist: "NEXUS ft. Lightning",
    album: "Storm Series",
    duration: "4:45",
    genre: "Electro",
    year: "2024",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    isLiked: true
  },
  {
    id: 8,
    title: "Midnight Drive",
    artist: "NEXUS",
    album: "Nocturnal",
    duration: "5:30",
    genre: "Synthwave",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    isLiked: true
  },
  {
    id: 9,
    title: "Binary Dreams",
    artist: "NEXUS ft. Code Runner",
    album: "Digital Consciousness",
    duration: "3:58",
    genre: "Techno",
    year: "2024",
    cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300"
  },
  {
    id: 10,
    title: "Crystal Frequencies",
    artist: "NEXUS",
    album: "Ethereal Sounds",
    duration: "7:22",
    genre: "Ambient",
    year: "2023",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    isLiked: true
  }
]

export default function PlaylistPage() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [likedTracks, setLikedTracks] = useState<Set<number>>(
    new Set(playlistTracks.filter(track => track.isLiked).map(track => track.id))
  )

  const togglePlay = (trackId: number) => {
    if (currentTrack === trackId) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTrack(trackId)
      setIsPlaying(true)
    }
  }

  const toggleLike = (trackId: number) => {
    const newLikedTracks = new Set(likedTracks)
    if (newLikedTracks.has(trackId)) {
      newLikedTracks.delete(trackId)
    } else {
      newLikedTracks.add(trackId)
    }
    setLikedTracks(newLikedTracks)
  }

  const totalDuration = playlistTracks.reduce((total, track) => {
    const [minutes, seconds] = track.duration.split(':').map(Number)
    return total + minutes * 60 + seconds
  }, 0)

  const formatTotalDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    return `${hours}ч ${minutes}м`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a1a1a] text-white">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ffff]/10 to-[#ff00ff]/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[#00ffff] hover:text-[#ff00ff] transition-colors mb-8"
          >
            ← Назад на главную
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Playlist Cover */}
            <div className="relative">
              <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-2xl neon-glow">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300"
                  alt="NEXUS Complete Playlist"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40 rounded-2xl">
                <Button 
                  className="bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black p-6 rounded-full neon-box hover:shadow-[0_0_40px_#00ffff] transition-all"
                  onClick={() => togglePlay(1)}
                >
                  {isPlaying && currentTrack === 1 ? (
                    <Pause size={32} />
                  ) : (
                    <Play size={32} />
                  )}
                </Button>
              </div>
            </div>

            {/* Playlist Info */}
            <div className="flex-1">
              <Badge className="bg-[#9d4edd]/20 text-[#9d4edd] border border-[#9d4edd]/30 mb-4">
                Плейлист
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] via-[#ff00ff] to-[#9d4edd]">
                NEXUS: Complete
              </h1>
              
              <p className="text-xl text-gray-300 mb-6 max-w-2xl">
                Полная коллекция электронной музыки NEXUS — от ambient-медитаций до энергичных dance-треков. 
                Путешествие через звуки будущего.
              </p>
              
              <div className="flex items-center gap-6 text-gray-400">
                <span className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff] flex items-center justify-center text-black font-bold text-sm">
                    N
                  </div>
                  NEXUS
                </span>
                <span>•</span>
                <span>{playlistTracks.length} треков</span>
                <span>•</span>
                <span>{formatTotalDuration(totalDuration)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-[#9d4edd]/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              className="bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black p-4 rounded-full neon-box hover:shadow-[0_0_30px_#00ffff] transition-all"
              onClick={() => togglePlay(currentTrack || 1)}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#00ffff]">
              <div className="w-5 h-5 mr-2">
                <Shuffle size={20} />
              </div>
              Перемешать
            </Button>
            
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-[#ff00ff]">
              <div className="w-5 h-5 mr-2">
                <Repeat size={20} />
              </div>
              Повтор
            </Button>
          </div>
        </div>
      </div>

      {/* Track List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-2">
          {playlistTracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`group flex items-center gap-4 p-4 rounded-lg hover:bg-[#1a1a1a]/50 transition-all ${
                currentTrack === track.id ? 'bg-[#9d4edd]/10 border border-[#9d4edd]/30' : ''
              }`}
            >
              {/* Track Number / Play Button */}
              <div className="w-8 flex items-center justify-center">
                {currentTrack === track.id && isPlaying ? (
                  <div className="flex gap-1">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-[#00ffff] animate-pulse-neon"
                        style={{
                          height: `${8 + Math.random() * 8}px`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-[#00ffff] hover:bg-[#00ffff]/10"
                    onClick={() => togglePlay(track.id)}
                  >
                    <Play size={16} />
                  </Button>
                )}
                <span className={`text-sm text-gray-400 group-hover:opacity-0 transition-opacity ${
                  currentTrack === track.id ? 'opacity-0' : ''
                }`}>
                  {index + 1}
                </span>
              </div>

              {/* Track Cover */}
              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={track.cover}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <h3 className={`font-medium truncate ${
                  currentTrack === track.id ? 'text-[#00ffff]' : 'text-white'
                }`}>
                  {track.title}
                </h3>
                <p className="text-sm text-gray-400 truncate">
                  {track.artist}
                </p>
              </div>

              {/* Album */}
              <div className="hidden md:block flex-1 min-w-0">
                <p className="text-sm text-gray-400 truncate">
                  {track.album}
                </p>
              </div>

              {/* Genre */}
              <div className="hidden lg:block">
                <Badge variant="outline" className="text-xs border-[#9d4edd]/30 text-[#9d4edd]">
                  {track.genre}
                </Badge>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-all ${
                    likedTracks.has(track.id) ? 'text-[#ff00ff] opacity-100' : 'text-gray-400'
                  }`}
                  onClick={() => toggleLike(track.id)}
                >
                  <Heart size={16} fill={likedTracks.has(track.id) ? 'currentColor' : 'none'} />
                </Button>

                <div className="flex items-center gap-1 text-sm text-gray-400 w-12 justify-end">
                  <div className="w-4 h-4">
                    <Clock size={16} />
                  </div>
                  <span>{track.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
