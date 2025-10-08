export const locales = ['en', 'zh', 'ja'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

// 对于静态导出，默认语言不需要前缀
// '/' 显示英文，'/zh' 显示中文
export const localePrefix = 'as-needed' as const
