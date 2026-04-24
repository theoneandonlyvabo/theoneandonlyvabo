import type { Metadata } from 'next'
import '../styles/global.css'
import CustomCursor from '@/components/CustomCursor'

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.scrollY > 0) {
                window.scrollTo(0, 0);
              }
            `,
          }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}