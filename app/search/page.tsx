import type { Metadata } from 'next'
import { MusicSearchClient } from './search-client'

export const metadata: Metadata = {
  title: 'Music Search | NEXUS',
  description: 'Search for artists, albums, and tracks using the MusicBrainz database. Discover new music and explore detailed information about your favorite artists.',
  keywords: [
    'music search',
    'artist search',
    'album search',
    'track search',
    'musicbrainz',
    'music database',
    'electronic music',
    'NEXUS music search'
  ],
  openGraph: {
    title: 'Music Search | NEXUS Music',
    description: 'Search for artists, albums, and tracks using the MusicBrainz database.',
    type: 'website',
  },
}

export default function MusicSearchPage() {
  return <MusicSearchClient />
}
