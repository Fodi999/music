'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Play, Pause, Volume2 } from 'lucide-react'

export function SimpleAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState([50])
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Простые демо-треки для тестирования
  const demoTracks = [
    {
      title: 'Demo Track 1',
      url: 'https://www.soundjay.com/misc/sounds/ambient1.mp3'
    },
    {
      title: 'Demo Track 2', 
      url: 'https://file-examples.com/storage/fe30e2b69ad3c2b416b88b9/2017/11/file_example_MP3_700KB.mp3'
    },
    {
      title: 'Demo Track 3',
      url: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3'
    }
  ]

  const [currentTrack, setCurrentTrack] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio()
      const audio = audioRef.current

      audio.addEventListener('timeupdate', () => {
        setCurrentTime(audio.currentTime)
      })

      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration)
        setError(null)
      })

      audio.addEventListener('error', () => {
        setError('Ошибка загрузки аудио')
        setIsPlaying(false)
      })

      audio.addEventListener('ended', () => {
        setIsPlaying(false)
        setCurrentTime(0)
      })

      // Загружаем первый трек
      audio.src = demoTracks[currentTrack].url
      audio.volume = volume[0] / 100

      return () => {
        audio.pause()
        audio.remove()
      }
    }
  }, [currentTrack])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume[0] / 100
    }
  }, [volume])

  const togglePlay = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // Проверяем, есть ли разрешение на воспроизведение
        await audioRef.current.play()
        setIsPlaying(true)
        setError(null)
      }
    } catch (err: any) {
      console.error('Audio play error:', err)
      setIsPlaying(false)
      
      // Детальные ошибки
      if (err.name === 'NotAllowedError') {
        setError('🔒 Браузер заблокировал автовоспроизведение. Сначала кликните по странице.')
      } else if (err.name === 'NotSupportedError') {
        setError('❌ Формат аудио не поддерживается вашим браузером.')
      } else if (err.name === 'AbortError') {
        setError('⏹️ Воспроизведение было прервано.')
      } else {
        setError(`⚠️ Ошибка воспроизведения: ${err.message}`)
      }
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current && duration > 0) {
      const newTime = (value[0] / 100) * duration
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="max-w-md mx-auto p-6">
      <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/30">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-[#00ffff] mb-4">
            Тест Аудио Плеера
          </h3>
          
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="text-white font-medium">
                {demoTracks[currentTrack].title}
              </h4>
              {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
              )}
            </div>

            {/* Play/Pause Button */}
            <div className="flex justify-center">
              <Button
                onClick={togglePlay}
                size="lg"
                className="bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black hover:scale-105 transition-transform"
              >
                <div className="w-6 h-6">
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </div>
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <Slider
                value={[progress]}
                max={100}
                step={1}
                onValueChange={handleSeek}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 text-[#9d4edd]">
                <Volume2 size={20} />
              </div>
              <Slider
                value={volume}
                max={100}
                step={1}
                onValueChange={setVolume}
                className="flex-1"
              />
            </div>

            {/* Track Selection */}
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Выберите трек:</p>
              <div className="grid grid-cols-1 gap-2">
                {demoTracks.map((track, index) => (
                  <Button
                    key={index}
                    variant={currentTrack === index ? 'default' : 'outline'}
                    onClick={() => setCurrentTrack(index)}
                    className={currentTrack === index ? 
                      'bg-[#9d4edd] text-white' : 
                      'border-gray-600 text-gray-300 hover:bg-gray-700'
                    }
                  >
                    {track.title}
                  </Button>
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center mt-4">
              💡 Если звук не работает, проверьте:
              <br />
              • Разрешения браузера на аудио
              <br />
              • Громкость системы и браузера
              <br />
              • Подключение к интернету
              <br />
              
              {error && (
                <div className="mt-3 p-3 bg-red-900/20 border border-red-500/30 rounded text-red-300 text-left">
                  {error}
                </div>
              )}
              
              <button 
                onClick={() => window.location.reload()} 
                className="mt-2 px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded transition-colors"
              >
                🔄 Перезагрузить плеер
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
