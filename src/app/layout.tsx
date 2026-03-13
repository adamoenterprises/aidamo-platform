import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://aidamo.ai'),
  title: 'AIDAMO | AI Negotiation Decision Support',
  description: 'AI-powered negotiation decision support for enterprise teams.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon-192.png',
    apple: '/icon-192.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AIDAMO | AI Negotiation Decision Support',
    description: 'AI-powered negotiation decision support for enterprise teams.',
    url: 'https://aidamo.ai',
    siteName: 'AIDAMO',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'AIDAMO',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AIDAMO | AI Negotiation Decision Support',
    description: 'AI-powered negotiation decision support for enterprise teams.',
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
