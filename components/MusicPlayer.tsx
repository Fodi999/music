import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Shuffle, 
  Repeat, 
  Heart,
  Share2,
  Download,
  MoreHorizontal
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useMusicBrainz, useTrackInfo } from '@/hooks/useMusicBrainz';
import { useState, useEffect } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationSeconds: number;
  cover: string;
  genre: string;
  year: string;
  isLiked?: boolean;
}

const tracks: Track[] = [
  {
    id: 1,
    title: "Neon Dreams",
    artist: "NEXUS",
    album: "Neon Dreams",
    duration: "4:32",
    durationSeconds: 272,
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    genre: "Synthwave",
    year: "2024",
    isLiked: true
  },
  {
    id: 2,
    title: "Cyberpunk City",
    artist: "NEXUS ft. Alex Synth",
    album: "Cyberpunk City EP",
    duration: "5:18",
    durationSeconds: 318,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    genre: "Future Bass",
    year: "2023"
  },
  {
    id: 3,
    title: "Digital Horizon",
    artist: "NEXUS",
    album: "Digital Horizon",
    duration: "4:20",
    durationSeconds: 260,
    cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    genre: "Ambient",
    year: "2023",
    isLiked: true
  },
  {
    id: 4,
    title: "Quantum Bass",
    artist: "NEXUS ft. Future Dynamics",
    album: "Quantum Bass EP",
    duration: "3:45",
    durationSeconds: 225,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    genre: "Bass",
    year: "2022"
  },
  {
    id: 5,
    title: "Synthwave Nights",
    artist: "NEXUS",
    album: "Synthwave Nights",
    duration: "6:12",
    durationSeconds: 372,
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    genre: "Synthwave",
    year: "2024",
    isLiked: true
  },
  {
    id: 6,
    title: "Future Waves",
    artist: "NEXUS",
    album: "Future Waves",
    duration: "5:12",
    durationSeconds: 312,
    cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    genre: "Future Bass",
    year: "2024"
  },
  {
    id: 7,
    title: "Electric Storm",
    artist: "NEXUS ft. Lightning",
    album: "Storm Series",
    duration: "4:45",
    durationSeconds: 285,
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    genre: "Electro",
    year: "2023",
    isLiked: true
  },
  {
    id: 8,
    title: "Midnight Drive",
    artist: "NEXUS",
    album: "Nocturnal",
    duration: "5:30",
    durationSeconds: 330,
    cover: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    genre: "Synthwave",
    year: "2024"
  },
  {
    id: 9,
    title: "Binary Dreams",
    artist: "NEXUS ft. Code Runner",
    album: "Digital Consciousness",
    duration: "3:58",
    durationSeconds: 238,
    cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    genre: "Techno",
    year: "2023"
  },
  {
    id: 10,
    title: "Crystal Frequencies",
    artist: "NEXUS",
    album: "Ethereal Sounds",
    duration: "4:18",
    durationSeconds: 258,
    cover: "https://images.unsplash.com/photo-1571974599782-87624638275c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJvbmljJTIwbXVzaWMlMjBhbGJ1bSUyMGNvdmVyfGVufDF8fHx8MTc1NjIyNDM3MHww&ixlib=rb-4.1.0&q=80&w=300",
    genre: "Ambient",
    year: "2024",
    isLiked: true
  }
];

export function MusicPlayer() {
  const { playlist, loading, error, buildPlaylistFromMusicBrainz, toggleLike } = useMusicBrainz();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState([75]);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  const currentTrack = playlist[currentTrackIndex];
  const { trackInfo } = useTrackInfo(currentTrack?.mbid);

  // Load MusicBrainz data on component mount
  useEffect(() => {
    buildPlaylistFromMusicBrainz(['electronic', 'techno', 'house', 'ambient']);
  }, [buildPlaylistFromMusicBrainz]);

  // Convert duration string to seconds for progress calculation
  const durationToSeconds = (duration: string): number => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const currentTrackDuration = currentTrack ? durationToSeconds(currentTrack.duration) : 0;

  // Симуляция прогресса трека
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentTrackDuration) {
            if (isRepeating) {
              return 0;
            } else {
              nextTrack();
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, isRepeating, currentTrackDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (isShuffled) {
      setCurrentTrackIndex(Math.floor(Math.random() * tracks.length));
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
    setCurrentTime(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setCurrentTime(0);
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a1a1a] p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00ffff] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading MusicBrainz playlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a1a1a] p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error loading playlist: {error}</p>
          <p className="text-gray-400">Using fallback playlist instead.</p>
        </div>
      </div>
    );
  }

  if (!currentTrack) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a1a1a] p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">No tracks available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a0a1a] to-[#0a1a1a] p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Основной плеер */}
          <div className="lg:col-span-2 space-y-6">
            {/* Обложка и информация о треке */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/30 overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Обложка */}
                    <div className="relative">
                      <motion.div
                        animate={{ rotate: isPlaying ? 360 : 0 }}
                        transition={{ duration: 20, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                        className="relative"
                      >
                        <ImageWithFallback
                          src={currentTrack.coverUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'}
                          alt={currentTrack.title}
                          className="w-full aspect-square object-cover rounded-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
                        
                        {/* Центральная кнопка воспроизведения */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Button
                            onClick={togglePlay}
                            className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black hover:shadow-[0_0_40px_#00ffff] transition-all duration-300 neon-box"
                          >
                            {isPlaying ? (
                              <Pause size={32} />
                            ) : (
                              <div className="ml-1">
                                <Play size={32} />
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      </motion.div>

                      {/* Визуализатор звука */}
                      {isPlaying && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute -bottom-4 left-0 right-0 flex justify-center gap-1"
                        >
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-gradient-to-t from-[#00ffff] to-[#ff00ff] animate-pulse-neon"
                              style={{
                                height: `${8 + Math.random() * 16}px`,
                                animationDelay: `${i * 0.1}s`,
                                animationDuration: '0.8s',
                              }}
                            />
                          ))}
                        </motion.div>
                      )}
                    </div>

                    {/* Информация о треке */}
                    <div className="space-y-6">
                      <div>
                        <Badge className="mb-4 bg-gradient-to-r from-[#9d4edd] to-[#ff006e] text-white">
                          {currentTrack.genre}
                        </Badge>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff] neon-glow mb-2">
                          {currentTrack.title}
                        </h1>
                        <p className="text-xl text-gray-300 mb-1">{currentTrack.artist}</p>
                        <p className="text-gray-400">{currentTrack.genre || 'Electronic'} • {currentTrack.releaseDate || '2024'}</p>
                      </div>

                      {/* Прогресс бар */}
                      <div className="space-y-2">
                        <Slider
                          value={[currentTime]}
                          max={currentTrackDuration}
                          step={1}
                          onValueChange={(value) => setCurrentTime(value[0])}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>{formatTime(currentTime)}</span>
                          <span>{currentTrack.duration}</span>
                        </div>
                      </div>

                      {/* Управление */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsShuffled(!isShuffled)}
                            className={`${isShuffled ? 'text-[#00ffff]' : 'text-gray-400'} hover:text-[#00ffff]`}
                          >
                            <Shuffle size={20} />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={prevTrack}
                            className="text-gray-400 hover:text-[#ff00ff]"
                          >
                            <SkipBack size={24} />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={nextTrack}
                            className="text-gray-400 hover:text-[#ff00ff]"
                          >
                            <SkipForward size={24} />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsRepeating(!isRepeating)}
                            className={`${isRepeating ? 'text-[#00ffff]' : 'text-gray-400'} hover:text-[#00ffff]`}
                          >
                            <Repeat size={20} />
                          </Button>
                        </div>

                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleLike(currentTrack.id)}
                            className={`${currentTrack.isLiked ? 'text-red-400' : 'text-gray-400'} hover:text-red-400`}
                          >
                            <div className={currentTrack.isLiked ? 'fill-current' : ''}>
                              <Heart size={20} />
                            </div>
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-[#9d4edd]"
                          >
                            <Share2 size={20} />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-[#9d4edd]"
                          >
                            <Download size={20} />
                          </Button>

                          <div className="flex items-center gap-2">
                            <div className="text-gray-400">
                              <Volume2 size={16} />
                            </div>
                            <Slider
                              value={volume}
                              max={100}
                              step={1}
                              onValueChange={setVolume}
                              className="w-20"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Плейлист */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#00ffff] mb-6 neon-glow">
                    Плейлист NEXUS
                  </h3>
                  
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {playlist.map((track, index) => (
                      <motion.div
                        key={track.id}
                        whileHover={{ x: 10 }}
                        onClick={() => selectTrack(index)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                          index === currentTrackIndex
                            ? 'bg-gradient-to-r from-[#9d4edd]/20 to-[#ff006e]/20 border border-[#9d4edd]/50'
                            : 'hover:bg-[#2a2a2a]/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <ImageWithFallback
                              src={track.coverUrl || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop'}
                              alt={track.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            {index === currentTrackIndex && isPlaying && (
                              <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                                <div className="flex gap-1">
                                  {Array.from({ length: 3 }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="w-1 h-3 bg-[#00ffff] animate-pulse-neon"
                                      style={{ animationDelay: `${i * 0.1}s` }}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className={`font-medium truncate ${
                              index === currentTrackIndex ? 'text-[#00ffff]' : 'text-white'
                            }`}>
                              {track.title}
                            </p>
                            <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            {track.isLiked && (
                              <div className="text-red-400 fill-current">
                                <Heart size={16} />
                              </div>
                            )}
                            <span className="text-xs text-gray-500">{track.duration}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-400 hover:text-[#9d4edd] p-1"
                            >
                              <MoreHorizontal size={16} />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}