'use client'

import { GamePage } from '@/components/GamePage'
import { useTranslations } from 'next-intl'

export default function LocalePage() {
  const t = useTranslations('game')

  return (
    <GamePage
      translations={{
        subtitle: t('subtitle'),
        playNow: t('playNow'),
        description: t('description'),
        playtime: t('playtime'),
        controls: t('controls'),
        storyTitle: t('story.title'),
        storyParagraph1: t('story.paragraph1'),
        storyParagraph2: t('story.paragraph2'),
        featuresTitle: t('features.title'),
        feature1: t('features.feature1'),
        feature2: t('features.feature2'),
        feature3: t('features.feature3'),
        feature4: t('features.feature4'),
        howToPlayTitle: t('howToPlayTitle'),
        howToPlayStep1: t('howToPlayStep1'),
        howToPlayStep2: t('howToPlayStep2'),
        howToPlayStep3: t('howToPlayStep3'),
        tipsTitle: t('tipsTitle'),
        tip1: t('tip1'),
        tip2: t('tip2'),
        tip3: t('tip3'),
        loading: t('loading'),
        fullscreen: t('fullscreen'),
        exitFullscreen: t('exitFullscreen'),
        gameplayImageAlt: t('gameplayImageAlt'),
        factoryImageAlt: t('factoryImageAlt'),
        magicImageAlt: t('magicImageAlt'),
      }}
    />
  )
}
