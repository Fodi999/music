import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'NEXUS - Electronic Music Producer',
    template: '%s | NEXUS Music'
  },
  description: 'Electronic Music Producer • Creating the Future of Sound with cutting-edge electronic music, immersive live performances, and innovative sound design.',
  keywords: [
    'electronic music', 
    'producer', 
    'nexus', 
    'techno', 
    'house', 
    'EDM', 
    'progressive house',
    'ambient techno',
    'experimental electronic',
    'music producer',
    'DJ',
    'sound design',
    'synthesizer',
    'live performance',
    'electronic artist'
  ],
  authors: [{ name: 'NEXUS', url: 'https://nexusmusic.com' }],
  creator: 'NEXUS',
  publisher: 'NEXUS Music',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nexusmusic.com'),
  openGraph: {
    title: 'NEXUS - Electronic Music Producer',
    description: 'Electronic Music Producer • Creating the Future of Sound',
    type: 'website',
    locale: 'ru_RU',
    url: 'https://nexusmusic.com',
    siteName: 'NEXUS Music',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NEXUS - Electronic Music Producer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXUS - Electronic Music Producer',
    description: 'Electronic Music Producer • Creating the Future of Sound',
    creator: '@nexusmusic',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.ico', sizes: '32x32' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
