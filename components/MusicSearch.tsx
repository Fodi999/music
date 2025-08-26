'use client'

import { useState, useEffect } from 'react'
import { Search, User, Disc, Music, Loader2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  searchArtist, 
  searchRecording, 
  searchReleasesByArtist,
  MusicBrainzArtist, 
  MusicBrainzRecording,
  MusicBrainzRelease 
} from '@/lib/musicbrainz'

export function MusicSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('artists')
  const [isLoading, setIsLoading] = useState(false)
  const [artists, setArtists] = useState<MusicBrainzArtist[]>([])
  const [recordings, setRecordings] = useState<MusicBrainzRecording[]>([])
  const [releases, setReleases] = useState<MusicBrainzRelease[]>([])
  const [selectedArtist, setSelectedArtist] = useState<MusicBrainzArtist | null>(null)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setIsLoading(true)
    try {
      if (activeTab === 'artists') {
        const result = await searchArtist(searchQuery, 10)
        setArtists(result.artists || [])
      } else if (activeTab === 'tracks') {
        const result = await searchRecording(searchQuery, 10)
        setRecordings(result.recordings || [])
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleArtistSelect = async (artist: MusicBrainzArtist) => {
    setSelectedArtist(artist)
    setIsLoading(true)
    try {
      const result = await searchReleasesByArtist(artist.id, 20)
      setReleases(result.releases || [])
    } catch (error) {
      console.error('Error loading artist releases:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Search Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
          Music Search
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Найдите любого исполнителя, альбом или трек используя базу данных MusicBrainz
        </p>
      </div>

      {/* Search Input */}
      <div className="flex gap-2 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </div>
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Поиск ${activeTab === 'artists' ? 'исполнителей' : 'треков'}...`}
            className="pl-10 bg-[#1a1a1a] border-[#9d4edd]/30 text-white placeholder:text-gray-500 focus:border-[#00ffff]/50"
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={isLoading || !searchQuery.trim()}
          className="bg-gradient-to-r from-[#9d4edd] to-[#ff006e] hover:from-[#b347e8] hover:to-[#ff1a7a] text-white"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
        </Button>
      </div>

      {/* Search Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-[#1a1a1a] border border-[#9d4edd]/30">
          <TabsTrigger 
            value="artists" 
            className="data-[state=active]:bg-[#9d4edd] data-[state=active]:text-white"
          >
            <div className="w-4 h-4 mr-2">
              <User size={16} />
            </div>
            Исполнители
          </TabsTrigger>
          <TabsTrigger 
            value="tracks" 
            className="data-[state=active]:bg-[#9d4edd] data-[state=active]:text-white"
          >
            <div className="w-4 h-4 mr-2">
              <Music size={16} />
            </div>
            Треки
          </TabsTrigger>
        </TabsList>

        {/* Artists Tab */}
        <TabsContent value="artists" className="space-y-4">
          <div className="grid gap-4">
            {artists.map((artist) => (
              <Card 
                key={artist.id} 
                className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/20 hover:border-[#ff00ff]/50 transition-all duration-300 cursor-pointer"
                onClick={() => handleArtistSelect(artist)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-[#00ffff]">
                        {artist.name}
                      </h3>
                      {artist.disambiguation && (
                        <p className="text-sm text-gray-400">
                          {artist.disambiguation}
                        </p>
                      )}
                      <div className="flex items-center gap-2 flex-wrap">
                        {artist.type && (
                          <Badge variant="secondary" className="bg-[#9d4edd]/20 text-[#ff00ff]">
                            {artist.type}
                          </Badge>
                        )}
                        {artist.area?.name && (
                          <Badge variant="outline" className="border-[#00ffff]/30 text-[#00ffff]">
                            {artist.area.name}
                          </Badge>
                        )}
                        {artist['life-span']?.begin && (
                          <Badge variant="outline" className="border-gray-600 text-gray-300">
                            {artist['life-span'].begin}
                            {artist['life-span'].end && ` - ${artist['life-span'].end}`}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-[#ff00ff]">
                      <ExternalLink size={20} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tracks Tab */}
        <TabsContent value="tracks" className="space-y-4">
          <div className="grid gap-4">
            {recordings.map((recording) => (
              <Card 
                key={recording.id} 
                className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/20 hover:border-[#ff00ff]/50 transition-all duration-300"
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#00ffff]">
                      {recording.title}
                    </h3>
                    {recording['artist-credit'] && recording['artist-credit'].length > 0 && (
                      <p className="text-sm text-gray-300">
                        by {recording['artist-credit'].map(ac => ac.name || ac.artist?.name).join(', ')}
                      </p>
                    )}
                    {recording.length && (
                      <p className="text-xs text-gray-400">
                        Длительность: {Math.floor(recording.length / 60000)}:{String(Math.floor((recording.length % 60000) / 1000)).padStart(2, '0')}
                      </p>
                    )}
                    <div className="flex items-center gap-2 flex-wrap">
                      {recording.disambiguation && (
                        <Badge variant="secondary" className="bg-[#9d4edd]/20 text-[#ff00ff]">
                          {recording.disambiguation}
                        </Badge>
                      )}
                      {recording.score && (
                        <Badge variant="outline" className="border-[#00ffff]/30 text-[#00ffff]">
                          Score: {recording.score}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Artist Releases */}
      {selectedArtist && releases.length > 0 && (
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/30">
          <CardHeader>
            <CardTitle className="text-[#ff00ff] flex items-center gap-2">
              <div className="w-5 h-5">
                <Disc size={20} />
              </div>
              Релизы: {selectedArtist.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 max-h-96 overflow-y-auto">
              {releases.map((release) => (
                <div 
                  key={release.id}
                  className="p-3 bg-[#0a0a0a]/50 rounded-lg border border-gray-700 hover:border-[#00ffff]/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="text-[#00ffff] font-medium">
                        {release.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        {release.date && (
                          <span>{new Date(release.date).getFullYear()}</span>
                        )}
                        {release['primary-type'] && (
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {release['primary-type']}
                          </Badge>
                        )}
                        {release.status && (
                          <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                            {release.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {release['track-count'] && (
                      <Badge className="bg-[#9d4edd]/20 text-[#ff00ff]">
                        {release['track-count']} треков
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-[#00ffff]">
            <Loader2 className="animate-spin" size={24} />
            <span>Поиск...</span>
          </div>
        </div>
      )}

      {/* No Results */}
      {!isLoading && searchQuery && (
        (activeTab === 'artists' && artists.length === 0) ||
        (activeTab === 'tracks' && recordings.length === 0)
      ) && (
        <div className="text-center py-8 text-gray-400">
          <p>Ничего не найдено для "{searchQuery}"</p>
          <p className="text-sm mt-2">Попробуйте другой поисковый запрос</p>
        </div>
      )}
    </div>
  )
}
