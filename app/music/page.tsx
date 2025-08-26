import type { Metadata } from 'next'
import { MusicPageClient } from './music-client'

export const metadata: Metadata = {
  title: 'Music Player',
  description: 'Listen to NEXUS electronic music tracks with our interactive music player. Explore curated playlists featuring progressive house, ambient techno, and experimental electronic music.',
  keywords: [
    'music player',
    'electronic music',
    'NEXUS tracks',
    'progressive house',
    'ambient techno',
    'experimental electronic',
    'online music',
    'streaming',
    'playlist'
  ],
  openGraph: {
    title: 'Music Player | NEXUS Music',
    description: 'Listen to NEXUS electronic music tracks with our interactive music player.',
    type: 'website',
  },
}

export default function MusicPage() {
  return <MusicPageClient />
}
