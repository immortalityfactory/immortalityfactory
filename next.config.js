const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 为静态导出生成干净的 URL
  trailingSlash: true,
  // 用户站点不需要 basePath
  // 如果仓库名是 username.github.io 则直接访问根路径
}

module.exports = withNextIntl(nextConfig)
