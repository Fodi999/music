import { NextRequest, NextResponse } from 'next/server'

// Демо-аудио треки (надежные источники с поддержкой CORS)
const DEMO_TRACKS = {
  demo1: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
  demo2: 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.mp3', 
  demo3: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
  demo4: 'https://file-examples.com/storage/fec1bb7c5c1aac02ee8f6b6/2017/11/file_example_MP3_5MG.mp3',
  demo5: 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3',
  'neon-dreams': 'https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3',
  'cyberpunk-city': 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.mp3',
  'digital-horizon': 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3'
}

export async function GET(
  request: NextRequest,
  { params }: { params: { track: string } }
) {
  const trackName = params.track
  
  // Получаем URL трека из объекта
  const trackUrl = DEMO_TRACKS[trackName as keyof typeof DEMO_TRACKS]
  
  if (!trackUrl) {
    return NextResponse.json({ error: 'Track not found' }, { status: 404 })
  }

  try {
    // Проксируем аудиофайл через наш сервер для избежания CORS
    const response = await fetch(trackUrl)
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch audio' }, { status: 500 })
    }

    const audioBuffer = await response.arrayBuffer()
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (error) {
    console.error('Audio proxy error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
