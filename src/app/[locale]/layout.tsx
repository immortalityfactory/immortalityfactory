import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { Press_Start_2P, VT323 } from 'next/font/google'
import { routing } from '@/i18n/routing'
import { GAME_NAME, SITE_URL } from '@/lib/constants'

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const metadataConfig: Record<string, Metadata> = {
    en: {
      title: `${GAME_NAME} - Magical Factory Building Game`,
      description: 'Build magical factories and unlock immortality secrets in this retro pixel-art incremental game. Master automation inspired by Factorio. Free to play!',
      alternates: {
        canonical: `${SITE_URL}/en`,
      },
      openGraph: {
        title: `${GAME_NAME} - Magical Factory Building Game`,
        description: 'Build magical factories, automate resources, unlock immortality. Retro pixel art Factorio-inspired game. Free!',
        locale: 'en_US',
        url: `${SITE_URL}/en`,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${GAME_NAME} - Magical Factory Building Game`,
        description: 'Build magical factories and unlock immortality secrets. Factorio-inspired automation. Play free!',
      },
    },
    zh: {
      title: `Immortality Factory - 魔法工厂建造游戏`,
      description: '建造魔法工厂,解锁永生秘密。复古像素风格增量游戏,受 Factorio 启发的自动化玩法。免费畅玩,4-6 小时完整体验!',
      alternates: {
        canonical: `${SITE_URL}/zh`,
      },
      openGraph: {
        title: 'Immortality Factory - 魔法工厂建造游戏',
        description: '建造魔法工厂,自动化资源管理,解锁永生秘密。复古像素风格 Factorio 风格游戏。免费!',
        locale: 'zh_CN',
        url: `${SITE_URL}/zh`,
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Immortality Factory - 魔法工厂建造游戏',
        description: '建造魔法工厂,解锁永生秘密。受 Factorio 启发的自动化游戏。免费畅玩!',
      },
    },
  }

  return metadataConfig[locale] || metadataConfig.en
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // 验证 locale 是否有效
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // 启用静态渲染
  setRequestLocale(locale)
  
  // 获取对应语言的翻译
  const messages = await getMessages({ locale })

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className={`${pressStart2P.variable} ${vt323.variable}`}>
        {children}
      </div>
    </NextIntlClientProvider>
  )
}
