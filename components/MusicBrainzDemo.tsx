'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Loader2, Music, Search, Database, Play, Clock, Users, Award } from 'lucide-react'
import { 
  searchArtist, 
  searchReleasesByArtist, 
  searchRecording, 
  MusicBrainzArtist,
  MusicBrainzRelease,
  MusicBrainzRecording 
} from '../lib/musicbrainz'

// Utility functions
function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

function getArtistNames(artistCredit: any[]): string {
  if (!artistCredit || artistCredit.length === 0) return 'Unknown Artist';
  return artistCredit.map(ac => ac.name || ac.artist?.name || 'Unknown').join(', ');
}

export function MusicBrainzDemo() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [artists, setArtists] = useState<MusicBrainzArtist[]>([])
  const [selectedArtist, setSelectedArtist] = useState<MusicBrainzArtist | null>(null)
  const [releases, setReleases] = useState<MusicBrainzRelease[]>([])
  const [recordings, setRecordings] = useState<MusicBrainzRecording[]>([])
  const [error, setError] = useState<string | null>(null)
  const [searchType, setSearchType] = useState<'demo' | 'custom'>('demo')

  const demoSearch = async () => {
    setIsLoading(true)
    setError(null)
    setSearchType('demo')
    
    try {
      // 1. Найти исполнителя Queen
      console.log('Searching for Queen...')
      const artistResult = await searchArtist('queen')
      const queen = artistResult.artists.find((artist: MusicBrainzArtist) => 
        artist.name.toLowerCase() === 'queen' && 
        artist.type === 'Group'
      )
      
      if (queen) {
        setSelectedArtist(queen)
        setArtists([queen])
        console.log('Found Queen:', queen)
        
        // 2. Найти альбомы Queen
        console.log('Searching for Queen albums...')
        const albumsResult = await searchReleasesByArtist(queen.id)
        setReleases(albumsResult.releases.slice(0, 8)) // Первые 8 альбомов
        console.log('Found albums:', albumsResult.releases.length)
      }
      
      // 3. Найти конкретный трек "Bohemian Rhapsody"
      console.log('Searching for Bohemian Rhapsody...')
      const trackResult = await searchRecording('bohemian rhapsody')
      const bohemianTracks = trackResult.recordings.filter((recording: MusicBrainzRecording) => 
        recording.title.toLowerCase().includes('bohemian rhapsody')
      ).slice(0, 4)
      setRecordings(bohemianTracks)
      console.log('Found Bohemian Rhapsody tracks:', bohemianTracks.length)
      
    } catch (error) {
      console.error('Demo search error:', error)
      setError(error instanceof Error ? error.message : 'Unknown error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const customSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsLoading(true)
    setError(null)
    setSearchType('custom')
    setSelectedArtist(null)
    setReleases([])
    setRecordings([])
    
    try {
      const artistResult = await searchArtist(searchQuery)
      setArtists(artistResult.artists.slice(0, 6))
    } catch (error) {
      console.error('Custom search error:', error)
      setError(error instanceof Error ? error.message : 'Search failed')
    } finally {
      setIsLoading(false)
    }
  }

  const selectArtist = async (artist: MusicBrainzArtist) => {
    setSelectedArtist(artist)
    setIsLoading(true)
    setError(null)
    
    try {
      const releasesResult = await searchReleasesByArtist(artist.id)
      setReleases(releasesResult.releases.slice(0, 8))
      
      // Search for popular recordings
      const recordingsResult = await searchRecording(artist.name)
      const artistRecordings = recordingsResult.recordings.filter((recording: MusicBrainzRecording) =>
        recording['artist-credit']?.some((ac: any) => 
          ac.artist?.id === artist.id || ac.name === artist.name
        )
      ).slice(0, 4)
      setRecordings(artistRecordings)
    } catch (error) {
      console.error('Artist selection error:', error)
      setError(error instanceof Error ? error.message : 'Failed to load artist data')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="musicbrainz" className="py-20 px-4 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a1a1a] relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-48 h-48 bg-gradient-to-r from-[#00ffff]/5 to-[#ff00ff]/5 rounded-full blur-3xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [-40, 40, -40],
              y: [-25, 25, -25],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] via-[#ff00ff] to-[#9d4edd]"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{ backgroundSize: '200% 200%' }}
          >
            MusicBrainz API Demo
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-[#00ffff] to-[#ff00ff] mx-auto rounded-full mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Исследуйте музыкальную базу данных MusicBrainz и найдите информацию о любимых исполнителях
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="backdrop-blur-2xl bg-white/5 border border-white/20 rounded-3xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-[#00ffff] flex items-center gap-3">
                <div className="w-8 h-8 rounded-2xl bg-gradient-to-r from-[#00ffff]/20 to-[#ff00ff]/20 flex items-center justify-center">
                  <Database size={20} />
                </div>
                Music Search & Discovery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Поиск исполнителя..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && customSearch()}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-2xl backdrop-blur-sm focus:border-[#00ffff]/50 focus:ring-[#00ffff]/20"
                    />
                    <Button
                      onClick={customSearch}
                      disabled={isLoading || !searchQuery.trim()}
                      className="bg-gradient-to-r from-[#00ffff] to-[#0080ff] hover:from-[#00dddd] hover:to-[#0066dd] text-black px-6 rounded-2xl"
                    >
                      <Search size={16} />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-gray-400">
                    Введите имя исполнителя для поиска в базе данных MusicBrainz
                  </p>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={demoSearch}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#9d4edd] to-[#ff006e] hover:from-[#b347e8] hover:to-[#ff1a7a] text-white rounded-2xl py-3"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={16} />
                        Загрузка...
                      </>
                    ) : (
                      <>
                        <Play size={16} className="mr-2" />
                        Демо: Поиск Queen
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-gray-400">
                    Демонстрация поиска информации о группе Queen
                  </p>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-sm"
                >
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Artists */}
          {artists.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-[#00ffff] mb-4 flex items-center gap-2">
                <Users size={24} />
                Исполнители
              </h3>
              
              <div className="space-y-3">
                {artists.map((artist, index) => (
                  <motion.div
                    key={artist.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className={`backdrop-blur-sm border rounded-2xl cursor-pointer transition-all duration-300 ${
                        selectedArtist?.id === artist.id 
                          ? 'bg-[#00ffff]/20 border-[#00ffff]/40 shadow-lg shadow-[#00ffff]/20' 
                          : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                      }`}
                      onClick={() => selectArtist(artist)}
                    >
                      <CardContent className="p-4">
                        <h4 className="text-white font-medium mb-1">{artist.name}</h4>
                        {artist.disambiguation && (
                          <p className="text-sm text-gray-400 mb-2">{artist.disambiguation}</p>
                        )}
                        <div className="flex gap-2 flex-wrap">
                          {artist.type && (
                            <Badge className="bg-[#9d4edd]/20 text-[#ff00ff] text-xs">
                              {artist.type}
                            </Badge>
                          )}
                          {artist.area?.name && (
                            <Badge variant="outline" className="border-[#00ffff]/30 text-[#00ffff] text-xs">
                              {artist.area.name}
                            </Badge>
                          )}
                          {artist.score && (
                            <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                              {artist.score}%
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Releases */}
          {releases.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-[#ff00ff] mb-4 flex items-center gap-2">
                <Music size={24} />
                Релизы ({releases.length})
              </h3>
              
              <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-[#ff00ff]/30">
                {releases.map((release, index) => (
                  <motion.div
                    key={release.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="backdrop-blur-sm bg-white/5 border border-white/20 rounded-2xl hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium truncate">{release.title}</h4>
                            {release.date && (
                              <p className="text-sm text-gray-400">
                                {formatDate(release.date)}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          {release['primary-type'] && (
                            <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                              {release['primary-type']}
                            </Badge>
                          )}
                          {release['track-count'] && (
                            <Badge className="bg-[#ff00ff]/20 text-[#ff00ff] text-xs">
                              {release['track-count']} треков
                            </Badge>
                          )}
                          {release.country && (
                            <Badge variant="outline" className="border-[#9d4edd]/30 text-[#9d4edd] text-xs">
                              {release.country}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Recordings */}
          {recordings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-bold text-[#9d4edd] mb-4 flex items-center gap-2">
                <Award size={24} />
                Треки ({recordings.length})
              </h3>
              
              <div className="space-y-3">
                {recordings.map((track, index) => (
                  <motion.div
                    key={track.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="backdrop-blur-sm bg-white/5 border border-white/20 rounded-2xl hover:bg-white/10 transition-all duration-300">
                      <CardContent className="p-4">
                        <h4 className="text-white font-medium mb-1">{track.title}</h4>
                        
                        {track['artist-credit'] && track['artist-credit'].length > 0 && (
                          <p className="text-sm text-gray-300 mb-2">
                            by {getArtistNames(track['artist-credit'])}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 mb-3">
                          {track.length && (
                            <div className="flex items-center gap-1 text-gray-400 text-sm">
                              <Clock size={14} />
                              <span>{formatDuration(track.length)}</span>
                            </div>
                          )}
                          {track.score && (
                            <Badge variant="outline" className="border-[#00ffff]/30 text-[#00ffff] text-xs">
                              {track.score}% match
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                          {track.disambiguation && (
                            <Badge className="bg-[#9d4edd]/20 text-[#9d4edd] text-xs">
                              {track.disambiguation}
                            </Badge>
                          )}
                          {track.releases && track.releases.length > 0 && (
                            <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                              {track.releases.length} release{track.releases.length > 1 ? 's' : ''}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 text-center p-6 backdrop-blur-sm bg-white/5 rounded-3xl border border-white/20"
        >
          <p className="text-gray-400 mb-2">
            Данные предоставлены MusicBrainz — открытой музыкальной энциклопедией
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-2 h-2 bg-[#00ffff] rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-[#ff00ff] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-2 h-2 bg-[#9d4edd] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
