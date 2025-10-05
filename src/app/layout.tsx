import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { GAME_NAME } from '@/lib/constants'
import { Press_Start_2P, VT323 } from 'next/font/google'
import './globals.css'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
})

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-retro',
})

export const metadata: Metadata = {
  title: `${GAME_NAME} - Magical Factory Building Game`,
  description: `Build magical factories and unlock immortality secrets in this retro pixel-art incremental game. Master automation inspired by Factorio. Free to play!`,
  authors: [{ name: 'KorbohneD' }],
  openGraph: {
    title: `${GAME_NAME} - Magical Factory Building Game`,
    description: 'Build magical factories, automate resources, unlock immortality. Retro pixel art Factorio-inspired game. Free!',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['zh_CN'],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${GAME_NAME} - Magical Factory Building Game`,
    description: 'Build magical factories and unlock immortality secrets. Factorio-inspired automation. Play free!',
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
  alternates: {
    canonical: 'https://immortalityfactory.com',
    languages: {
      'en': 'https://immortalityfactory.com/en',
      'zh': 'https://immortalityfactory.com/zh',
    },
  },
}

// 根 layout 必须包含 html 和 body 标签
// 字体和样式在这里统一定义
export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${pressStart2P.variable} ${vt323.variable}`}>
      <body className="bg-background text-foreground font-retro">{children}</body>
    </html>
  )
}
