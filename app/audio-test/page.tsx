'use client'

import { Card, CardContent } from '@/components/ui/card'
import { SimpleAudioPlayer } from '@/components/SimpleAudioPlayer'
import { Button } from '@/components/ui/button'
import { Volume2, VolumeX, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react'

export default function AudioTestPage() {
  const testAudio = () => {
    const audio = new Audio('https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3')
    audio.play().catch(error => {
      alert('Ошибка воспроизведения: ' + error.message)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] py-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00ffff] to-[#ff00ff]">
            🎵 Тест Аудио Системы
          </h1>
          <p className="text-xl text-gray-300">
            Проверка работы звука в браузере
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Основной плеер */}
          <div>
            <h2 className="text-2xl font-bold text-[#00ffff] mb-6">Основной Плеер</h2>
            <SimpleAudioPlayer />
          </div>

          {/* Диагностика */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#ff00ff] mb-6">Диагностика</h2>
            
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-[#00ffff] mb-4 flex items-center gap-2">
                  <div className="w-5 h-5">
                    <HelpCircle size={20} />
                  </div>
                  Быстрый тест
                </h3>
                
                <Button 
                  onClick={testAudio}
                  className="w-full bg-gradient-to-r from-[#00ffff] to-[#ff00ff] text-black hover:scale-105 transition-transform"
                >
                  <div className="w-5 h-5 mr-2">
                    <Volume2 size={20} />
                  </div>
                  Тестовый звук
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                  <div className="w-5 h-5">
                    <AlertTriangle size={20} />
                  </div>
                  Если звук не работает
                </h3>
                
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-0.5 text-[#00ffff]">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <strong>Проверьте громкость:</strong> Убедитесь, что громкость системы и браузера не на минимуме
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-0.5 text-[#00ffff]">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <strong>Разрешения браузера:</strong> Некоторые браузеры блокируют автовоспроизведение
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-0.5 text-[#00ffff]">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <strong>Интернет соединение:</strong> Демо-треки загружаются из внешних источников
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-4 h-4 mt-0.5 text-[#00ffff]">
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <strong>Взаимодействие пользователя:</strong> Нажмите на страницу, затем попробуйте снова
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                  <div className="w-5 h-5">
                    <CheckCircle size={20} />
                  </div>
                  Поддерживаемые форматы
                </h3>
                
                <div className="text-sm text-gray-300 space-y-2">
                  <div>• MP3 (основной)</div>
                  <div>• OGG (альтернативный)</div>
                  <div>• WAV (несжатый)</div>
                  <div>• AAC (современные браузеры)</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Информация о демо-треках */}
        <Card className="mt-12 bg-gradient-to-br from-[#1a1a1a] to-[#2a1a2a] border-[#9d4edd]/30">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-[#9d4edd] mb-6 text-center">
              📀 О Демо-Треках
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-bold text-[#00ffff] mb-2">Источники</h4>
                <p className="text-sm text-gray-300">
                  Бесплатные аудио-файлы из открытых источников с поддержкой CORS
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#ff00ff] mb-2">Качество</h4>
                <p className="text-sm text-gray-300">
                  Различные битрейты и форматы для тестирования совместимости
                </p>
              </div>
              
              <div>
                <h4 className="font-bold text-[#9d4edd] mb-2">Назначение</h4>
                <p className="text-sm text-gray-300">
                  Демонстрация возможностей HTML5 Audio API в веб-плеере
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
