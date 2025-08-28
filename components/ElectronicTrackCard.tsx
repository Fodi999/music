import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Pause, Heart, Clock, Zap, Radio, Waves, Music } from 'lucide-react'
import { ImageWithFallback } from '@/components/figma/ImageWithFallback'

interface ElectronicTrackProps {
  track: {
    id: number
    title: string
    artist: string
    album?: string
    genre: string
    year: string
    duration: string
    cover: string
    isPlaying?: boolean
    isLiked?: boolean
  }
  onPlay?: () => void
  onLike?: () => void
}

export function ElectronicTrackCard({ track, onPlay, onLike }: ElectronicTrackProps) {
  const getGenreIcon = (genre: string) => {
    const lowerGenre = genre.toLowerCase()
    if (lowerGenre.includes('bass') || lowerGenre.includes('dubstep')) return Zap
    if (lowerGenre.includes('techno') || lowerGenre.includes('house')) return Radio
    if (lowerGenre.includes('ambient') || lowerGenre.includes('trance')) return Waves
    return Music
  }

  const getGenreTheme = (genre: string) => {
    const lowerGenre = genre.toLowerCase()
    if (lowerGenre.includes('bass') || lowerGenre.includes('dubstep')) {
      return {
        gradient: 'from-yellow-400/20 via-orange-500/20 to-red-500/20',
        accent: 'text-yellow-300 border-yellow-400/40',
        button: 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-black shadow-lg shadow-yellow-500/25',
        glow: 'shadow-yellow-500/30',
        wave: 'bg-yellow-400'
      }
    }
    if (lowerGenre.includes('techno') || lowerGenre.includes('house')) {
      return {
        gradient: 'from-emerald-400/20 via-teal-500/20 to-cyan-500/20',
        accent: 'text-emerald-300 border-emerald-400/40',
        button: 'bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-black shadow-lg shadow-emerald-500/25',
        glow: 'shadow-emerald-500/30',
        wave: 'bg-emerald-400'
      }
    }
    if (lowerGenre.includes('ambient') || lowerGenre.includes('trance')) {
      return {
        gradient: 'from-blue-400/20 via-purple-500/20 to-indigo-500/20',
        accent: 'text-blue-300 border-blue-400/40',
        button: 'bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-300 hover:to-purple-400 text-white shadow-lg shadow-blue-500/25',
        glow: 'shadow-blue-500/30',
        wave: 'bg-blue-400'
      }
    }
    return {
      gradient: 'from-pink-400/20 via-rose-500/20 to-purple-500/20',
      accent: 'text-pink-300 border-pink-400/40',
      button: 'bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-300 hover:to-purple-400 text-white shadow-lg shadow-pink-500/25',
      glow: 'shadow-pink-500/30',
      wave: 'bg-pink-400'
    }
  }

  const GenreIcon = getGenreIcon(track.genre)
  const theme = getGenreTheme(track.genre)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.03, y: -12 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.46, 0.45, 0.94],
        layout: { duration: 0.3 }
      }}
      className="group w-full max-w-sm"
    >
      <Card className="relative backdrop-blur-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/20 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 group-hover:shadow-3xl transition-all duration-700 group-hover:border-white/30">
        {/* Primary glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/5 to-transparent opacity-60 rounded-3xl" />
        
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-16 h-16 ${theme.wave}/20 rounded-full blur-xl`}
              style={{
                left: `${15 + i * 20}%`,
                top: `${10 + i * 15}%`,
              }}
              animate={{
                x: [-20, 20, -20],
                y: [-15, 15, -15],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.7,
              }}
            />
          ))}
        </div>
        
        {/* Genre-specific accent glow */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`}
          animate={track.isPlaying ? { opacity: [0, 0.3, 0] } : {}}
          transition={{ duration: 3, repeat: track.isPlaying ? Infinity : 0 }}
        />
        
        <CardContent className="p-8 relative z-10">
          {/* Header section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center border border-white/20"
                whileHover={{ scale: 1.15, rotate: 180 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
              >
                <GenreIcon size={20} className={theme.accent.split(' ')[0]} />
              </motion.div>
              <Badge 
                variant="outline" 
                className={`backdrop-blur-sm bg-white/10 ${theme.accent} border-2 font-medium px-4 py-2 rounded-2xl group-hover:bg-white/20 transition-all duration-500 shadow-lg`}
              >
                {track.genre}
              </Badge>
            </div>
            <Badge 
              variant="outline" 
              className="backdrop-blur-sm bg-white/5 border-white/30 text-white/80 rounded-2xl px-4 py-2 group-hover:bg-white/15 group-hover:text-white transition-all duration-500 shadow-lg"
            >
              {track.year}
            </Badge>
          </div>

          {/* Cover and track info */}
          <div className="flex gap-6 mb-6">
            <motion.div 
              className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 group/cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              {/* Glass frame with gradient border */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/30" />
              
              <ImageWithFallback
                src={track.cover}
                alt={track.title}
                className="w-full h-full object-cover transition-all duration-700 ease-out rounded-2xl group-hover/cover:scale-110"
              />
              
              {/* Dynamic playing indicator */}
              {track.isPlaying && (
                <motion.div 
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div className="flex gap-1.5 bg-white/20 rounded-full p-3 backdrop-blur-md">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={`w-1.5 rounded-full ${theme.wave}`}
                        animate={{
                          height: [10, 24, 16, 20, 10],
                          opacity: [0.6, 1, 0.8, 0.9, 0.6]
                        }}
                        transition={{
                          duration: 1.8,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}
              
              {/* Hover glow effect */}
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover/cover:opacity-70 transition-opacity duration-700 rounded-2xl`}
                whileHover={{ scale: 1.1 }}
              />
            </motion.div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <motion.h3 
                className="font-bold text-2xl text-white mb-3 truncate group-hover:text-white transition-all duration-500"
                whileHover={{ scale: 1.02 }}
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
              >
                {track.title}
              </motion.h3>
              <motion.p 
                className="text-white/90 font-medium text-lg mb-2 truncate group-hover:text-white transition-colors duration-500"
                whileHover={{ x: 4 }}
              >
                {track.artist}
              </motion.p>
              {track.album && (
                <motion.p 
                  className="text-white/70 truncate group-hover:text-white/90 transition-colors duration-500"
                  whileHover={{ x: 4 }}
                >
                  {track.album}
                </motion.p>
              )}
            </div>
          </div>

          {/* Controls section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  onClick={onPlay}
                  size="sm"
                  className={`w-14 h-14 rounded-2xl ${theme.button} backdrop-blur-sm border border-white/30 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group/play`}
                >
                  {/* Enhanced glass reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-2xl" />
                  
                  <motion.div 
                    className="w-6 h-6 relative z-10"
                    animate={track.isPlaying ? { rotate: 360 } : {}}
                    transition={{ duration: 2, repeat: track.isPlaying ? Infinity : 0, ease: "linear" }}
                  >
                    {track.isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </motion.div>
                  
                  {/* Enhanced ripple effect */}
                  {track.isPlaying && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-white/30"
                        animate={{
                          scale: [1, 2.5],
                          opacity: [0.5, 0],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-white/20"
                        animate={{
                          scale: [1, 2],
                          opacity: [0.3, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 0.5
                        }}
                      />
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
              >
                <Button
                  onClick={onLike}
                  variant="ghost"
                  size="sm"
                  className={`w-12 h-12 p-0 rounded-2xl backdrop-blur-sm border border-white/20 ${
                    track.isLiked 
                      ? `${theme.accent} bg-white/20 shadow-lg ${theme.glow}` 
                      : 'text-white/60 hover:text-white hover:bg-white/15 hover:border-white/30'
                  } transition-all duration-500`}
                >
                  <motion.div
                    animate={track.isLiked ? { 
                      scale: [1, 1.4, 1],
                      rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <Heart 
                      size={20} 
                      fill={track.isLiked ? 'currentColor' : 'none'}
                      className="transition-all duration-300"
                    />
                  </motion.div>
                </Button>
              </motion.div>
            </div>

            <motion.div 
              className="flex items-center gap-3 backdrop-blur-sm bg-white/10 rounded-2xl px-4 py-3 group-hover:bg-white/20 transition-all duration-500 border border-white/20 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Clock size={18} className="text-white/80" />
              <span className="font-mono text-white/90 font-medium">{track.duration}</span>
            </motion.div>
          </div>

          {/* Enhanced waveform visualization */}
          <motion.div 
            className="pt-6 border-t border-white/20 group-hover:border-white/40 transition-colors duration-500"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
          >
            <div className="flex justify-center">
              <div className="flex gap-1.5 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg">
                {Array.from({ length: 16 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-1.5 rounded-full ${theme.wave} opacity-60 group-hover:opacity-90`}
                    style={{
                      height: `${8 + Math.sin(i * 0.6) * 8}px`,
                    }}
                    animate={track.isPlaying ? {
                      height: [
                        `${8 + Math.sin(i * 0.6) * 8}px`, 
                        `${16 + Math.sin(i * 0.6) * 12}px`, 
                        `${8 + Math.sin(i * 0.6) * 8}px`
                      ],
                      opacity: [0.6, 1, 0.6]
                    } : {}}
                    transition={{
                      duration: 2.5,
                      repeat: track.isPlaying ? Infinity : 0,
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                    whileHover={{ 
                      height: `${16 + Math.sin(i * 0.6) * 12}px`,
                      opacity: 1
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
