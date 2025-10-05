# Immortality Factory - 技术设计文档

## 项目概述

使用 Next.js 开发一个部署在 GitHub Pages 上的游戏网站，主要功能是嵌入并游玩 itch.io 的 HTML5 游戏。

**访问地址**: `https://username.github.io`

---

## 技术栈

### 核心框架
- **Next.js 14+** (App Router + TypeScript)
- **React 18+**
- **pnpm** - 包管理器

### UI 样式
- **Tailwind CSS** - 基础样式框架
- **Shadcn UI** - 组件库

### 国际化
- **next-intl** - 多语言支持
- **默认语言**: 英文 (en)
- **支持语言**: 英文 (en)、中文 (zh)
- **切换方式**: 手动切换，不自动检测浏览器语言

### 部署
- **GitHub Pages** (静态导出模式)
- **GitHub Actions** (CI/CD 自动部署)

---

## 设计风格

### 视觉主题：像素/复古风格

基于游戏 `https://html-classic.itch.zone/html/14982516/index.html` 的视觉风格设计。

### 配色方案

```javascript
// Tailwind 自定义配色
colors: {
  background: '#000000',      // 纯黑背景
  foreground: '#cccccc',      // 浅灰文字
  primary: '#00ff00',         // 霓虹绿(主色/强调色)
  secondary: '#404040',       // 深灰(UI背景)
  accent: '#00ff00',          // 强调色
  muted: '#333333',           // 次要灰色
  border: '#404040',          // 边框色
}
```

### 字体建议

**主标题/游戏标题**:
- Press Start 2P (经典像素字体)
- Pixelify Sans (现代像素字体)

**正文/UI文字**:
- VT323 (复古终端字体)
- 系统等宽字体 (fallback)

---

## 项目结构

```
immortalityfactory/
├── public/                    # 静态资源
│   ├── fonts/                # 字体文件
│   └── images/               # 图片资源
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── [locale]/        # 多语言路由
│   │   │   ├── page.tsx     # 主页面
│   │   │   └── layout.tsx   # 布局
│   │   └── layout.tsx       # 根布局
│   ├── components/           # 组件
│   │   ├── ui/              # Shadcn UI 组件
│   │   ├── GameEmbed.tsx    # 游戏嵌入组件
│   │   └── LanguageSwitcher.tsx  # 语言切换器
│   ├── i18n/                # 国际化
│   │   ├── locales/
│   │   │   ├── en.json      # 英文
│   │   │   └── zh.json      # 中文
│   │   └── config.ts        # i18n 配置
│   └── lib/                 # 工具函数
│       └── utils.ts
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions 配置
├── next.config.js           # Next.js 配置
├── tailwind.config.ts       # Tailwind 配置
├── components.json          # Shadcn UI 配置
├── package.json
└── pnpm-lock.yaml
```

---

## 核心配置

### 1. Next.js 配置 (next.config.js)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // 静态导出
  images: {
    unoptimized: true,        // GitHub Pages 不支持图片优化
  },
  // 注意: 使用 username.github.io 不需要 basePath
}

module.exports = nextConfig
```

### 2. Tailwind 配置 (tailwind.config.ts)

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#cccccc',
        primary: {
          DEFAULT: '#00ff00',
          foreground: '#000000',
        },
        secondary: {
          DEFAULT: '#404040',
          foreground: '#cccccc',
        },
        muted: {
          DEFAULT: '#333333',
          foreground: '#cccccc',
        },
        accent: {
          DEFAULT: '#00ff00',
          foreground: '#000000',
        },
        border: '#404040',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        retro: ['VT323', 'monospace'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

### 3. i18n 配置

**src/i18n/config.ts**
```typescript
export const locales = ['en', 'zh'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'
```

**src/i18n/locales/en.json**
```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "language": "Language"
  },
  "game": {
    "title": "Immortality Factory",
    "loading": "Loading Game...",
    "fullscreen": "Fullscreen",
    "exitFullscreen": "Exit Fullscreen",
    "error": "Failed to load game"
  },
  "footer": {
    "poweredBy": "Powered by",
    "madeWith": "Made with"
  }
}
```

**src/i18n/locales/zh.json**
```json
{
  "nav": {
    "home": "首页",
    "about": "关于",
    "language": "语言"
  },
  "game": {
    "title": "永生工厂",
    "loading": "游戏加载中...",
    "fullscreen": "全屏",
    "exitFullscreen": "退出全屏",
    "error": "游戏加载失败"
  },
  "footer": {
    "poweredBy": "技术支持",
    "madeWith": "制作于"
  }
}
```

---

## 核心组件设计

### 1. GameEmbed 组件

```tsx
// src/components/GameEmbed.tsx
'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

export function GameEmbed() {
  const t = useTranslations('game')
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const gameUrl = 'https://html-classic.itch.zone/html/14982516/index.html'

  const toggleFullscreen = () => {
    const iframe = document.querySelector('iframe')
    if (!document.fullscreenElement) {
      iframe?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div className="relative w-full aspect-video bg-secondary rounded-lg overflow-hidden border-2 border-primary">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="font-pixel text-primary animate-pulse">{t('loading')}</p>
        </div>
      )}
      <iframe
        src={gameUrl}
        className="w-full h-full"
        onLoad={() => setIsLoading(false)}
        allow="fullscreen"
      />
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-4 bg-primary text-background px-4 py-2 font-pixel text-xs hover:opacity-80 transition-opacity"
      >
        {isFullscreen ? t('exitFullscreen') : t('fullscreen')}
      </button>
    </div>
  )
}
```

### 2. LanguageSwitcher 组件

```tsx
// src/components/LanguageSwitcher.tsx
'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: Locale) => {
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPathname)
  }

  return (
    <div className="flex gap-2">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={`px-3 py-1 font-pixel text-xs transition-colors ${
            locale === loc
              ? 'bg-primary text-background'
              : 'bg-secondary text-foreground hover:bg-muted'
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
```

---

## 部署方案

### GitHub Pages 部署 (方案 A)

**仓库要求**:
- 仓库名: `username.github.io`
- 访问地址: `https://username.github.io`

### GitHub Actions 自动部署

**`.github/workflows/deploy.yml`**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v2
        with:
          version: 8

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 部署步骤

1. **创建仓库**: `username.github.io`
2. **配置 GitHub Pages**:
   - 进入仓库 Settings > Pages
   - Source: GitHub Actions
3. **推送代码**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin git@github.com:username/username.github.io.git
   git push -u origin main
   ```
4. **自动部署**: GitHub Actions 会自动构建并部署

---

## 初始化项目命令

```bash
# 1. 创建 Next.js 项目
pnpm create next-app@latest . --typescript --tailwind --app --use-pnpm

# 2. 安装 Shadcn UI
pnpm dlx shadcn@latest init

# 3. 安装多语言依赖
pnpm add next-intl

# 4. 安装字体 (Google Fonts)
pnpm add @next/font

# 5. 添加常用 Shadcn 组件
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add select
pnpm dlx shadcn@latest add card
```

---

## 功能清单

### MVP (最小可行产品)
- [x] 游戏 iframe 嵌入
- [x] 响应式布局
- [x] 像素/复古风格 UI
- [x] 英文/中文切换
- [x] 全屏模式
- [x] 加载状态

### 扩展功能 (可选)
- [ ] 多个游戏支持
- [ ] 游戏列表/画廊
- [ ] 游戏说明/介绍页面
- [ ] 关于页面
- [ ] 深色模式切换 (可选，当前已是深色主题)
- [ ] 游戏存档提示
- [ ] 分享功能
- [ ] SEO 优化

---

## 注意事项

### iframe 嵌入限制
- itch.io 允许 iframe 嵌入
- 需要测试是否有 X-Frame-Options 限制
- 可能需要使用 itch.io 官方嵌入代码

### GitHub Pages 限制
- 只支持静态文件
- 每月流量限制: 100GB
- 仓库大小建议: < 1GB
- 不支持服务端 API

### 性能优化
- 使用 Next.js 静态导出
- 图片使用 WebP 格式
- 字体文件本地托管
- 代码分割和懒加载

### 浏览器兼容性
- 现代浏览器 (Chrome, Firefox, Safari, Edge)
- 不支持 IE11
- Fullscreen API 需要用户交互触发

---

## 开发流程

1. **初始化项目**
2. **配置 Tailwind + Shadcn UI**
3. **设置 i18n (next-intl)**
4. **开发核心组件**
   - Layout
   - GameEmbed
   - LanguageSwitcher
5. **样式调整** (像素风格)
6. **测试多语言**
7. **配置 GitHub Actions**
8. **部署到 GitHub Pages**

---

## 参考资源

- [Next.js Static Exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Shadcn UI](https://ui.shadcn.com)
- [next-intl](https://next-intl-docs.vercel.app)
- [GitHub Pages](https://pages.github.com)
- [Press Start 2P Font](https://fonts.google.com/specimen/Press+Start+2P)
- [VT323 Font](https://fonts.google.com/specimen/VT323)

---

**文档版本**: 1.0
**最后更新**: 2025-10-05
