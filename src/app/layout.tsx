import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'AIDAMO | Negotiation Intelligence',
  description: 'Negotiation support and preparation, encoded from Alex Adamo\'s methodology.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
  openGraph: {
    title: 'AIDAMO | Negotiation Intelligence',
    description: 'Negotiation support and preparation, encoded from Alex Adamo\'s methodology.',
    images: ['/icon-512.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'AIDAMO | Negotiation Intelligence',
    description: 'Negotiation support and preparation, encoded from Alex Adamo\'s methodology.',
    images: ['/icon-512.png'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AIDAMO',
  },
}

export const viewport: Viewport = {
  themeColor: '#171717',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased min-h-screen bg-white text-neutral-900">
        {children}
      </body>
    </html>
  )
}
