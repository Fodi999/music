'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, Music } from 'lucide-react'
import { 
  searchArtist, 
  searchReleasesByArtist, 
  searchRecording, 
  MusicBrainzArtist,
  MusicBrainzRelease,
  MusicBrainzRecording 
} from '@/lib/musicbrainz'

export function MusicBrainzDemo() {
  const [isLoading, setIsLoading] = useState(false)
  const [queenArtist, setQueenArtist] = useState<MusicBrainzArtist | null>(null)
  const [queenAlbums, setQueenAlbums] = useState<MusicBrainzRelease[]>([])
  const [bohemianRhapsody, setBohemianRhapsody] = useState<MusicBrainzRecording[]>([])

  const demoSearch = async () => {
    setIsLoading(true)
    try {
      // 1. Найти исполнителя Queen
      console.log('Searching for Queen...')
      const artistResult = await searchArtist('queen')
      const queen = artistResult.artists.find(artist => 
        artist.name.toLowerCase() === 'queen' && 
        artist.type === 'Group'
      )
      
      if (queen) {
        setQueenArtist(queen)
        console.log('Found Queen:', queen)
        
        // 2. Найти альбомы Queen
        console.log('Searching for Queen albums...')
        const albumsResult = await searchReleasesByArtist(queen.id)
        setQueenAlbums(albumsResult.releases.slice(0, 10)) // Первые 10 альбомов
        console.log('Found albums:', albumsResult.releases.length)
      }
      
      // 3. Найти конкретный трек "Bohemian Rhapsody"
      console.log('Searching for Bohemian Rhapsody...')
      const trackResult = await searchRecording('bohemian rhapsody')
      const bohemianTracks = trackResult.recordings.filter(recording => 
        recording.title.toLowerCase().includes('bohemian rhapsody')
      ).slice(0, 5)
      setBohemianRhapsody(bohemianTracks)
      console.log('Found Bohemian Rhapsody tracks:', bohemianTracks.length)
      
    } catch (error) {
      console.error('Demo search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/30">
        <CardHeader>
          <CardTitle className="text-[#ff00ff] flex items-center gap-2">
            <div className="w-5 h-5">
              <Music size={20} />
            </div>
            MusicBrainz API Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Демонстрация поиска через MusicBrainz API:
          </p>
          <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
            <li>Найти исполнителя Queen</li>
            <li>Получить альбомы Queen по MBID</li>
            <li>Найти трек &quot;Bohemian Rhapsody&quot;</li>
          </ol>
          
          <Button
            onClick={demoSearch}
            disabled={isLoading}
            className="bg-gradient-to-r from-[#9d4edd] to-[#ff006e] hover:from-[#b347e8] hover:to-[#ff1a7a] text-white"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={16} />
                Загрузка...
              </>
            ) : (
              'Запустить демо'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Queen Artist Info */}
      {queenArtist && (
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/20">
          <CardHeader>
            <CardTitle className="text-[#00ffff]">Исполнитель: {queenArtist.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-gray-300">
              <strong>MBID:</strong> {queenArtist.id}
            </p>
            {queenArtist.disambiguation && (
              <p className="text-gray-300">
                <strong>Описание:</strong> {queenArtist.disambiguation}
              </p>
            )}
            <div className="flex gap-2 flex-wrap">
              {queenArtist.type && (
                <Badge className="bg-[#9d4edd]/20 text-[#ff00ff]">
                  {queenArtist.type}
                </Badge>
              )}
              {queenArtist.area?.name && (
                <Badge variant="outline" className="border-[#00ffff]/30 text-[#00ffff]">
                  {queenArtist.area.name}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Queen Albums */}
      {queenAlbums.length > 0 && (
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/20">
          <CardHeader>
            <CardTitle className="text-[#00ffff]">Альбомы Queen ({queenAlbums.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 max-h-64 overflow-y-auto">
              {queenAlbums.map((album) => (
                <div 
                  key={album.id}
                  className="p-3 bg-[#0a0a0a]/50 rounded-lg border border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">{album.title}</h4>
                      {album.date && (
                        <p className="text-sm text-gray-400">
                          {new Date(album.date).getFullYear()}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {album['primary-type'] && (
                        <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                          {album['primary-type']}
                        </Badge>
                      )}
                      {album['track-count'] && (
                        <Badge className="bg-[#9d4edd]/20 text-[#ff00ff] text-xs">
                          {album['track-count']} треков
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bohemian Rhapsody Tracks */}
      {bohemianRhapsody.length > 0 && (
        <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/20">
          <CardHeader>
            <CardTitle className="text-[#00ffff]">Bohemian Rhapsody ({bohemianRhapsody.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bohemianRhapsody.map((track) => (
                <div 
                  key={track.id}
                  className="p-3 bg-[#0a0a0a]/50 rounded-lg border border-gray-700"
                >
                  <h4 className="text-white font-medium">{track.title}</h4>
                  {track['artist-credit'] && track['artist-credit'].length > 0 && (
                    <p className="text-sm text-gray-300">
                      by {track['artist-credit'].map(ac => ac.name || ac.artist?.name).join(', ')}
                    </p>
                  )}
                  {track.length && (
                    <p className="text-xs text-gray-400">
                      Длительность: {Math.floor(track.length / 60000)}:{String(Math.floor((track.length % 60000) / 1000)).padStart(2, '0')}
                    </p>
                  )}
                  <div className="flex gap-2 mt-2">
                    {track.disambiguation && (
                      <Badge variant="secondary" className="bg-[#9d4edd]/20 text-[#ff00ff] text-xs">
                        {track.disambiguation}
                      </Badge>
                    )}
                    {track.score && (
                      <Badge variant="outline" className="border-[#00ffff]/30 text-[#00ffff] text-xs">
                        Score: {track.score}%
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
