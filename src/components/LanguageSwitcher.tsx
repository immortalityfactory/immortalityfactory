'use client'

import { useRouter, usePathname } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import { routing } from '@/i18n/routing'
import { useEffect, useState } from 'react'

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [currentLocale, setCurrentLocale] = useState<Locale>('en')

  // 根据当前路径判断语言
  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean)
    const firstSegment = segments[0]
    
    if (locales.includes(firstSegment as Locale)) {
      // 如果第一段是语言代码
      setCurrentLocale(firstSegment as Locale)
    } else {
      // 根路径，使用默认语言
      setCurrentLocale(routing.defaultLocale as Locale)
    }
  }, [pathname])

  const switchLocale = (newLocale: Locale) => {
    // 获取当前路径（去除语言前缀）
    const segments = pathname.split('/').filter(Boolean)
    const isCurrentLocaleInPath = locales.includes(segments[0] as Locale)
    const pathWithoutLocale = isCurrentLocaleInPath ? segments.slice(1).join('/') : segments.join('/')
    
    // 构建新路径
    // 默认语言（en）可以使用根路径，其他语言使用前缀
    if (newLocale === routing.defaultLocale) {
      router.push(`/${pathWithoutLocale}`)
    } else {
      router.push(`/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`)
    }
  }

  const getLanguageName = (loc: Locale) => {
    const names: Record<Locale, string> = {
      en: 'EN',
      zh: '中文'
    }
    return names[loc] || loc.toUpperCase()
  }

  return (
    <div className="flex gap-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-3 py-1 font-pixel text-xs transition-colors ${
            currentLocale === loc
              ? 'bg-primary text-background'
              : 'bg-secondary text-foreground hover:bg-muted'
          }`}
          aria-label={`Switch to ${loc}`}
        >
          {getLanguageName(loc)}
        </button>
      ))}
    </div>
  )
}
