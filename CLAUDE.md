# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Immortality Factory (永生工厂) - 一个部署在 GitHub Pages 的像素/复古风格游戏网站,主要功能是嵌入并游玩 itch.io 的 HTML5 游戏。

**技术栈**: Next.js 14+ (App Router) + TypeScript + Tailwind CSS + Shadcn UI + next-intl + pnpm

**部署目标**: GitHub Pages (静态导出)

## 常用命令

### 开发环境
```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建静态站点
pnpm build

# 预览构建结果
pnpm start
```

### 项目初始化 (如果尚未初始化)
```bash
# 创建 Next.js 项目
pnpm create next-app@latest . --typescript --tailwind --app --use-pnpm

# 安装 Shadcn UI
pnpm dlx shadcn@latest init

# 安装多语言依赖
pnpm add next-intl

# 添加常用组件
pnpm dlx shadcn@latest add button select card
```

## 架构设计

### 核心配置要求

**Next.js 配置** (`next.config.js`):
- 必须使用 `output: 'export'` 进行静态导出
- 必须设置 `images: { unoptimized: true }` (GitHub Pages 限制)

**i18n 配置**:
- 使用 next-intl 实现多语言
- 支持语言: en (默认), zh
- 路由模式: `/[locale]/...`
- **重要**: 手动切换语言,不自动检测浏览器语言

### 目录结构

```
src/
├── app/
│   ├── [locale]/          # 多语言路由
│   │   ├── page.tsx       # 主页面
│   │   └── layout.tsx     # 布局
│   └── layout.tsx         # 根布局
├── components/
│   ├── ui/                # Shadcn UI 组件
│   ├── GameEmbed.tsx      # 游戏嵌入组件
│   └── LanguageSwitcher.tsx  # 语言切换器
├── i18n/
│   ├── locales/
│   │   ├── en.json        # 英文翻译
│   │   └── zh.json        # 中文翻译
│   └── config.ts          # i18n 配置
└── lib/
    └── utils.ts           # 工具函数
```

### 设计风格

**视觉主题**: 像素/复古风格 (基于 https://html-classic.itch.zone/html/14982516/index.html)

**配色方案**:
- 背景: `#000000` (纯黑)
- 文字: `#cccccc` (浅灰)
- 主色/强调色: `#00ff00` (霓虹绿)
- 次要背景: `#404040` (深灰)
- 边框: `#404040`

**字体**:
- 主标题: Press Start 2P (像素字体)
- 正文: VT323 (复古终端字体)

### 核心组件

**GameEmbed 组件** (`src/components/GameEmbed.tsx`):
- 负责嵌入 itch.io 游戏的 iframe
- 提供加载状态、全屏功能
- 游戏 URL: `https://html-classic.itch.zone/html/14982516/index.html`

**LanguageSwitcher 组件** (`src/components/LanguageSwitcher.tsx`):
- 手动语言切换按钮 (EN/ZH)
- 使用 useLocale, useRouter, usePathname hooks
- 像素风格按钮设计

## 重要约束

### GitHub Pages 限制
- 仅支持静态文件 (无服务端 API)
- 流量限制: 100GB/月
- 仓库大小: < 1GB
- 需要用 Next.js 静态导出模式

### iframe 嵌入
- itch.io 允许 iframe 嵌入
- 可能存在 X-Frame-Options 限制,需测试
- Fullscreen API 需要用户交互触发

### 代码规范
- 单文件不超过 500 行 (如果超过则拆分)
- 使用 TypeScript 严格模式
- 组件优先使用 'use client' 客户端组件
- 遵循 Next.js App Router 最佳实践

## 部署配置

**GitHub Actions** (`.github/workflows/deploy.yml`):
- 触发: push to main 或手动触发
- 构建: pnpm install → pnpm build
- 部署目录: `./out`
- 使用 actions/deploy-pages@v4

**仓库要求**:
- 仓库名应为: `username.github.io`
- GitHub Pages Source: GitHub Actions
- 访问地址: `https://username.github.io`

## 翻译文件结构

**en.json / zh.json** 应包含以下命名空间:
- `nav`: 导航栏 (home, about, language)
- `game`: 游戏相关 (title, loading, fullscreen, exitFullscreen, error)
- `footer`: 页脚 (poweredBy, madeWith)

所有翻译文本必须同时在 en.json 和 zh.json 中存在对应键值。

## 开发参考

详细设计文档: `Docs/TECH_DESIGN.md`

主要依赖:
- Next.js 14+ (App Router)
- React 18+
- Tailwind CSS + tailwindcss-animate
- Shadcn UI
- next-intl
- pnpm (必须使用 pnpm 而非 npm/yarn)
