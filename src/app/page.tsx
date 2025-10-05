// 根路径显示默认语言（英文）的游戏内容
// 用户可以通过语言切换按钮切换到其他语言
'use client'

import { GamePage } from '@/components/GamePage'

export default function RootPage() {
  // 默认使用英文翻译（硬编码）
  return (
    <GamePage
      translations={{
        subtitle: 'A Factory-Building Incremental Game',
        playNow: 'Play Now',
        description: 'You were a fledgling apprentice under one of the most powerful wizards in the realm. Then you got kicked out for your interests in the forbidden magics of immortality. Now you are on your own in Immortality Factory, shunned by the magical community, armed only with a couple gold coins and a recipe book.',
        playtime: 'Duration: 4-6 hours',
        controls: 'Controls: Mouse & Keyboard (optional)',
        storyTitle: 'Your Journey to Immortality in the Factory',
        storyParagraph1: 'Banished from the magical community for dabbling in forbidden immortality magic, you find yourself alone in the cursed valley. In Immortality Factory, magic flows strong and the air is thick with cursed knowledge.',
        storyParagraph2: 'Here in your immortality factory, you must craft basic components and build production lines to unlock the secrets of eternal life. Master the art of factory automation and resource management in this immortality-seeking adventure.',
        featuresTitle: 'Game Features',
        feature1: 'Factory-building gameplay inspired by Factorio',
        feature2: 'Complex resource management and production chains',
        feature3: 'Retro pixel art visual style',
        feature4: 'Definitive ending with clear progression',
        howToPlayTitle: 'How to Play Immortality Factory',
        howToPlayStep1: 'Start your immortality factory by clicking on resources to gather gold and basic materials from your surroundings',
        howToPlayStep2: 'Open your recipe book to craft machines and buildings that automate factory production',
        howToPlayStep3: 'Chain factory production lines together to create complex items and unlock immortality secrets',
        tipsTitle: 'Immortality Factory Strategy & Tips',
        tip1: 'Plan your immortality factory layout carefully - efficient factory placement reduces transportation time and bottlenecks',
        tip2: 'Upgrade key factory buildings first to maximize immortality research output before expanding to new resources',
        tip3: 'Check your recipe book frequently in Immortality Factory to discover crafting combinations and unlock new factory automation options',
        loading: 'Loading Game...',
        fullscreen: 'Fullscreen',
        exitFullscreen: 'Exit Fullscreen',
        gameplayImageAlt: 'Immortality Factory gameplay screenshot showing magical factory building and immortality research management interface',
        factoryImageAlt: 'Immortality Factory building system with Factorio-style automated production line layout for immortality research',
        magicImageAlt: 'Immortality Factory resource management showing complex magical material production chains and immortality recipe system',
      }}
    />
  )
}
