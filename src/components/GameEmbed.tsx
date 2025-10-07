'use client'

import { useState, useEffect } from 'react'
import { GAME_NAME } from '@/lib/constants'

interface GameEmbedProps {
  playNowText: string
  translations?: {
    loading: string
    fullscreen: string
    exitFullscreen: string
  }
}

export function GameEmbed({ playNowText, translations }: GameEmbedProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showPlayNow, setShowPlayNow] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // 如果 iframe 已经加载完成（在客户端水合时），设置 loading 为 false
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

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

  const handlePlayNowClick = () => {
    setShowPlayNow(false)
  }

  return (
    <div className="relative w-full aspect-video bg-secondary rounded-lg overflow-hidden border-2 border-primary">
      {/* 只在客户端挂载后且正在加载时显示 Loading */}
      {isMounted && isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30">
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
      
      {/* Play Now 覆盖层 - 点击后消失并且不阻止点击穿透 */}
      {isMounted && showPlayNow && !isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center z-20 bg-black/50 cursor-pointer transition-opacity hover:bg-black/60"
          onClick={handlePlayNowClick}
          onMouseDown={(e) => {
            // 在鼠标按下时就隐藏覆盖层，让点击事件能够到达 iframe
            setShowPlayNow(false)
            e.preventDefault()
          }}
        >
          <p className="font-pixel text-primary text-2xl md:text-4xl animate-pulse drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] pointer-events-none">
            {playNowText}
          </p>
        </div>
      )}
      
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-4 bg-primary text-background px-4 py-2 font-pixel text-xs hover:opacity-80 transition-opacity z-30"
      >
        {isFullscreen ? t.exitFullscreen : t.fullscreen}
      </button>
    </div>
  )
}
