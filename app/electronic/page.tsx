'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ElectronicTrackCard } from '@/components/ElectronicTrackCard'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Zap, Radio, Waves, Shuffle, Play } from 'lucide-react'

const electronicTracks = [
  {
    id: 1,
    title: "Dynamik Bass System",
    artist: "Electronic Artists",
    album: "Electronic Collection",
    genre: "Electronic",
    year: "1998",
    duration: "7:39",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    isPlaying: false,
    isLiked: true
  },
  {
    id: 2,
    title: "Neon Pulse",
    artist: "NEXUS",
    album: "Cyber Dreams",
    genre: "Synthwave Electronic",
    year: "2024",
    duration: "5:42",
    cover: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    isPlaying: false,
    isLiked: false
  },
  {
    id: 3,
    title: "Bass Drop Revolution",
    artist: "Digital Storm",
    album: "Underground Bass",
    genre: "Electronic Bass",
    year: "2023",
    duration: "6:15",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    isPlaying: false,
    isLiked: true
  },
  {
    id: 4,
    title: "Techno Fusion",
    artist: "Circuit Breaker",
    album: "Digital Machinery",
    genre: "Electronic Techno",
    year: "2022",
    duration: "8:21",
    cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    isPlaying: false,
    isLiked: false
  },
  {
    id: 5,
    title: "Ambient Waves",
    artist: "Ethereal Sounds",
    album: "Cosmic Journey",
    genre: "Electronic Ambient",
    year: "2021",
    duration: "9:03",
    cover: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    isPlaying: false,
    isLiked: true
  },
  {
    id: 6,
    title: "Progressive Evolution",
    artist: "Future State",
    album: "Next Generation",
    genre: "Progressive Electronic",
    year: "2024",
    duration: "10:17",
    cover: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    isPlaying: false,
    isLiked: false
  }
]

export default function ElectronicPage() {
  const [tracks, setTracks] = useState(electronicTracks)
  const [currentTrack, setCurrentTrack] = useState<number | null>(null)

  const handlePlay = (trackId: number) => {
    setTracks(prevTracks =>
      prevTracks.map(track => ({
        ...track,
        isPlaying: track.id === trackId ? !track.isPlaying : false
      }))
    )
    setCurrentTrack(trackId)
  }

  const handleLike = (trackId: number) => {
    setTracks(prevTracks =>
      prevTracks.map(track =>
        track.id === trackId ? { ...track, isLiked: !track.isLiked } : track
      )
    )
  }

  const getGenreStats = () => {
    const genreCount: { [key: string]: number } = {}
    tracks.forEach(track => {
      const genre = track.genre.split(' ')[0] // Берем первое слово жанра
      genreCount[genre] = (genreCount[genre] || 0) + 1
    })
    return genreCount
  }

  const genreStats = getGenreStats()

  return (
    <div className="min-h-screen synthwave-gradient digital-rain py-16 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 electronic-grid opacity-20" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00ffff] rounded-full animate-pulse-neon"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] via-[#0080ff] to-[#8000ff] beat-pulse">
              Electronic Music
            </h1>
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00ffff]/20 to-[#8000ff]/20 blur-xl -z-10" />
          </div>
          
          <div className="w-32 h-1 bg-gradient-to-r from-[#00ffff] to-[#8000ff] mx-auto mb-6 neon-glow" />
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Погрузись в мир электронной музыки - от ambient до bass, от techno до progressive
          </p>

          {/* Spectrum analyzer visualization */}
          <div className="flex justify-center mb-8">
            <div className="spectrum-analyzer">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="spectrum-bar" />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Статистика жанров */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-[#1a1a1a]/80 to-[#2a1a2a]/80 border-[#9d4edd]/30 backdrop-blur-sm electronic-border">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#00ffff] flex items-center gap-2">
                  <div className="w-6 h-6">
                    <Radio size={24} />
                  </div>
                  Жанры в коллекции
                </h2>
                
                {/* Mini waveform */}
                <div className="waveform">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="waveform-bar" />
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Object.entries(genreStats).map(([genre, count]) => (
                  <motion.div 
                    key={genre} 
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge 
                      variant="outline" 
                      className="bg-gradient-to-r from-[#0080ff] to-[#8000ff] text-white border-0 px-4 py-2 text-sm font-bold holographic group-hover:neon-glow transition-all duration-300"
                    >
                      {genre}
                    </Badge>
                    <p className="text-gray-400 text-sm mt-2">{count} треков</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center">
                <Button className="bg-gradient-to-r from-[#00ffff] to-[#8000ff] text-black hover:scale-105 transition-transform holographic">
                  <div className="w-5 h-5 mr-2">
                    <Shuffle size={20} />
                  </div>
                  Перемешать плейлист
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Треки */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <ElectronicTrackCard
                track={track}
                onPlay={() => handlePlay(track.id)}
                onLike={() => handleLike(track.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Декоративные элементы */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center"
        >
          {/* Enhanced audio visualizer */}
          <div className="flex justify-center gap-2 mb-8">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-[#00ffff] via-[#0080ff] to-[#8000ff] animate-pulse-neon rounded-full"
                style={{
                  height: `${8 + Math.sin(i * 0.3) * 20}px`,
                  animationDelay: `${i * 0.05}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
          
          {/* Electronic music quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <Card className="bg-gradient-to-br from-[#1a1a1a]/60 to-[#2a1a2a]/60 border-[#00ffff]/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <blockquote className="text-lg text-gray-300 italic mb-4">
                  &ldquo;Electronic music is the symphony of the digital age, where every beat tells a story of the future.&rdquo;
                </blockquote>
                <cite className="text-[#00ffff] font-semibold">— NEXUS</cite>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Interactive elements */}
          <div className="flex justify-center gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00ffff] to-[#0080ff] flex items-center justify-center cursor-pointer neon-glow"
            >
              <Zap size={24} className="text-black" />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.1, rotate: -180 }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8000ff] to-[#ff00ff] flex items-center justify-center cursor-pointer purple-glow"
            >
              <Waves size={24} className="text-white" />
            </motion.div>
          </div>
          
          <p className="text-gray-500 text-sm">
            🎵 Electronic music • Creating the future of sound • NEXUS 2024 🎵
          </p>
        </motion.div>
      </div>
    </div>
  )
}
