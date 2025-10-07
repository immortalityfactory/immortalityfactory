'use client'

import { GameEmbed } from '@/components/GameEmbed'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { GAME_COPYRIGHT_YEAR, GAME_NAME } from '@/lib/constants'
import Image from 'next/image'

interface GamePageProps {
  translations: {
    subtitle: string
    playNow: string
    description: string
    playtime: string
    controls: string
    storyTitle: string
    storyParagraph1: string
    storyParagraph2: string
    featuresTitle: string
    feature1: string
    feature2: string
    feature3: string
    feature4: string
    howToPlayTitle: string
    howToPlayStep1: string
    howToPlayStep2: string
    howToPlayStep3: string
    tipsTitle: string
    tip1: string
    tip2: string
    tip3: string
    loading: string
    fullscreen: string
    exitFullscreen: string
    gameplayImageAlt: string
    factoryImageAlt: string
    magicImageAlt: string
  }
}

export function GamePage({ translations: t }: GamePageProps) {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b-2 border-primary p-4 bg-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            {/* H1 - 全页面唯一的一级标题 */}
            <h1 className="font-pixel text-primary text-xl md:text-2xl">{GAME_NAME}</h1>
            <p className="font-retro text-foreground text-xs md:text-sm mt-1">{t.subtitle}</p>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Game Container */}
      <section className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl">
          <GameEmbed 
            playNowText={t.playNow}
            translations={{
              loading: t.loading,
              fullscreen: t.fullscreen,
              exitFullscreen: t.exitFullscreen
            }}
          />
        </div>
      </section>

      {/* H2 Section - Game Story */}
      <section className="border-b-2 border-[#404040] bg-black p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-primary text-lg md:text-xl mb-6">{t.storyTitle}</h2>
          
          {/* 主游戏截图 - 工厂布局 */}
          <div className="mb-6 relative w-full aspect-video border-2 border-primary overflow-hidden">
            <Image
              src="/screenshots/factory-layout.png"
              alt={t.gameplayImageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          
          <div className="space-y-4 font-retro text-foreground text-sm md:text-base">
            <p className="leading-relaxed">{t.description}</p>
            <p className="leading-relaxed">{t.storyParagraph1}</p>
            <p className="leading-relaxed">{t.storyParagraph2}</p>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4 font-retro text-sm text-foreground">
            <span className="border border-primary px-3 py-1">{t.playtime}</span>
            <span className="border border-primary px-3 py-1">{t.controls}</span>
          </div>
        </div>
      </section>

      {/* H2 Section - Features */}
      <section className="border-b-2 border-[#404040] bg-black p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-primary text-lg md:text-xl mb-6">{t.featuresTitle}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* H3 - Feature 1 with image */}
            <div className="space-y-3">
              <div className="relative w-full h-48 border border-primary overflow-hidden mb-2">
                <Image
                  src="/screenshots/factory-layout.png"
                  alt={t.factoryImageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="font-retro text-primary text-base md:text-lg flex items-start">
                <span className="text-primary mr-2">▸</span>
                <span>{t.feature1}</span>
              </h3>
            </div>

            {/* H3 - Feature 2 with image */}
            <div className="space-y-3">
              <div className="relative w-full h-48 border border-primary overflow-hidden mb-2">
                <Image
                  src="/screenshots/recipe-book.png"
                  alt={t.magicImageAlt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="font-retro text-primary text-base md:text-lg flex items-start">
                <span className="text-primary mr-2">▸</span>
                <span>{t.feature2}</span>
              </h3>
            </div>

            {/* H3 - Feature 3 */}
            <div>
              <h3 className="font-retro text-primary text-base md:text-lg flex items-start">
                <span className="text-primary mr-2">▸</span>
                <span>{t.feature3}</span>
              </h3>
            </div>

            {/* H3 - Feature 4 */}
            <div>
              <h3 className="font-retro text-primary text-base md:text-lg flex items-start">
                <span className="text-primary mr-2">▸</span>
                <span>{t.feature4}</span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* H2 Section - How to Play */}
      <section className="border-b-2 border-[#404040] bg-black p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-primary text-lg md:text-xl mb-6">{t.howToPlayTitle}</h2>
          
          <div className="space-y-4">
            {/* H3 - Step 1 */}
            <div>
              <h3 className="font-retro text-primary text-base md:text-lg mb-2 flex items-start">
                <span className="text-primary mr-2">1.</span>
                <span>{t.howToPlayStep1}</span>
              </h3>
            </div>

            {/* H3 - Step 2 */}
            <div>
              <h3 className="font-retro text-primary text-base md:text-lg mb-2 flex items-start">
                <span className="text-primary mr-2">2.</span>
                <span>{t.howToPlayStep2}</span>
              </h3>
            </div>

            {/* H3 - Step 3 */}
            <div>
              <h3 className="font-retro text-primary text-base md:text-lg mb-2 flex items-start">
                <span className="text-primary mr-2">3.</span>
                <span>{t.howToPlayStep3}</span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* H2 Section - Tips */}
      <section className="border-b-2 border-[#404040] bg-black p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-primary text-lg md:text-xl mb-6">{t.tipsTitle}</h2>
          
          <div className="space-y-3 font-retro text-foreground text-sm md:text-base">
            <p className="leading-relaxed flex items-start">
              <span className="text-primary mr-2 flex-shrink-0">💡</span>
              <span>{t.tip1}</span>
            </p>
            <p className="leading-relaxed flex items-start">
              <span className="text-primary mr-2 flex-shrink-0">💡</span>
              <span>{t.tip2}</span>
            </p>
            <p className="leading-relaxed flex items-start">
              <span className="text-primary mr-2 flex-shrink-0">💡</span>
              <span>{t.tip3}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-primary p-4 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-retro text-foreground text-sm">
            {GAME_NAME} © {GAME_COPYRIGHT_YEAR}
          </p>
        </div>
      </footer>
    </main>
  )
}

