import type { Metadata } from 'next'
import '../styles/global.css'

export const metadata: Metadata = {
  title: 'Airel Adrivano',
  description: 'Full-stack engineer. System architect. Developer.',
  openGraph: {
    title: 'Airel Adrivano',
    description: 'Full-stack engineer. System architect. Developer.',
    url: 'https://aireladrivano.vercel.app',
    siteName: 'Airel Adrivano',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airel Adrivano',
    description: 'Full-stack engineer. System architect. Developer.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}