'use client'

import { useState } from 'react'
import { GAME_NAME } from '@/lib/constants'

interface GameEmbedProps {
  translations?: {
    loading: string
    fullscreen: string
    exitFullscreen: string
  }
}

export function GameEmbed({ translations }: GameEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // 默认英文翻译
  const t = translations || {
    loading: 'Loading Game...',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit Fullscreen'
  }

  const gameUrl = 'https://html-classic.itch.zone/html/14982516/index.html'

  const toggleFullscreen = () => {
    const iframe = document.querySelector('iframe')
    if (!document.fullscreenElement) {
      iframe?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="relative w-full aspect-video bg-secondary rounded-lg overflow-hidden border-2 border-primary">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-pixel text-primary animate-pulse">{t.loading}</p>
        </div>
      )}
      <iframe
        src={gameUrl}
        className="w-full h-full"
        onLoad={() => setIsLoading(false)}
        allow="fullscreen"
        title={GAME_NAME}
      />
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-4 bg-primary text-background px-4 py-2 font-pixel text-xs hover:opacity-80 transition-opacity"
      >
        {isFullscreen ? t.exitFullscreen : t.fullscreen}
      </button>
    </div>
  )
}
