import type { MetadataRoute } from 'next'
import { routing } from '@/i18n/routing'
import { SITE_URL } from '@/lib/constants'

export const dynamic = 'force-static'

const LAST_MODIFIED = new Date('2025-01-01')

const createAlternates = () => {
  const entries = routing.locales.map((locale) => {
    const path = locale === routing.defaultLocale ? '/' : `/${locale}/`

    return [locale, `${SITE_URL}${path}`] as const
  })

  return Object.fromEntries([
    ['x-default', `${SITE_URL}/`],
    ...entries,
  ]) as Record<string, string>
}

const collectPaths = () => {
  const paths = new Set<string>(['/'])

  routing.locales.forEach((locale) => {
    const path = locale === routing.defaultLocale ? '/' : `/${locale}/`
    paths.add(path)

    if (locale === routing.defaultLocale) {
      paths.add(`/${locale}/`)
    }
  })

  return Array.from(paths)
}

export default function sitemap(): MetadataRoute.Sitemap {
  const alternates = createAlternates()

  return collectPaths().map((pathname) => ({
    url: `${SITE_URL}${pathname}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: 'weekly',
    priority: pathname === '/' ? 1 : 0.8,
    alternates: {
      languages: alternates,
    },
  }))
}
