import { NextRequest, NextResponse } from 'next/server'

const MUSICBRAINZ_BASE_URL = 'https://musicbrainz.org/ws/2'
const USER_AGENT = 'NEXUS-Music-Website/1.0.0 (nexus@electronicmusic.com)'

// Rate limiting: MusicBrainz allows 1 request per second
let lastRequestTime = 0
const RATE_LIMIT_DELAY = 1000

async function rateLimitedFetch(url: string, options: RequestInit = {}) {
  const now = Date.now()
  const timeSinceLastRequest = now - lastRequestTime
  
  if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest))
  }
  
  lastRequestTime = Date.now()
  
  return fetch(url, {
    ...options,
    headers: {
      'User-Agent': USER_AGENT,
      'Accept': 'application/json',
      ...options.headers,
    },
  })
}

export async function GET(
  request: NextRequest,
  { params }: { params: { artistId: string } }
) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get('limit') || '50'
  const offset = searchParams.get('offset') || '0'
  const artistId = params.artistId

  if (!artistId) {
    return NextResponse.json({ error: 'Artist ID is required' }, { status: 400 })
  }

  try {
    const endpoint = `${MUSICBRAINZ_BASE_URL}/release?artist=${artistId}&limit=${limit}&offset=${offset}&fmt=json`
    
    const response = await rateLimitedFetch(endpoint)

    if (!response.ok) {
      return NextResponse.json(
        { error: 'MusicBrainz API error', status: response.status },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('MusicBrainz API error:', error)
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
