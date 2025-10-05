import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ locale }) => {
  // 对于静态导出，locale 会从路由参数中获取
  const baseLocale = locale || routing.defaultLocale

  return {
    locale: baseLocale,
    messages: (await import(`./locales/${baseLocale}.json`)).default
  }
})
