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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const type = searchParams.get('type') || 'artist'
  const limit = searchParams.get('limit') || '25'
  const offset = searchParams.get('offset') || '0'

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const encodedQuery = encodeURIComponent(query)
    let endpoint = ''

    switch (type) {
      case 'artist':
        endpoint = `${MUSICBRAINZ_BASE_URL}/artist?query=${encodedQuery}&limit=${limit}&offset=${offset}&fmt=json`
        break
      case 'recording':
        endpoint = `${MUSICBRAINZ_BASE_URL}/recording?query=${encodedQuery}&limit=${limit}&offset=${offset}&fmt=json`
        break
      case 'release':
        endpoint = `${MUSICBRAINZ_BASE_URL}/release?query=${encodedQuery}&limit=${limit}&offset=${offset}&fmt=json`
        break
      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
    }

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
