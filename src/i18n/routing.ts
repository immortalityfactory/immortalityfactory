import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  // 支持的所有语言
  locales: ['en', 'zh'],
  
  // 默认语言
  defaultLocale: 'en',
  
  // 语言前缀策略：
  // - 根路径 '/' 显示英文内容（无需跳转）
  // - '/en' 显示英文内容
  // - '/zh' 显示中文内容
  localePrefix: 'as-needed'
})

// 创建类型安全的导航辅助函数
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)

