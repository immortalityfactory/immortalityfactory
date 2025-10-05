# Immortality Factory

一个像素/复古风格的游戏网站,嵌入并游玩 itch.io 的 HTML5 游戏。

## 🚀 快速开始

**部署到 GitHub Pages**: 查看 [快速部署指南 (QUICKSTART.md)](QUICKSTART.md)

**详细文档**:
- 📖 [完整部署教程](Docs/github-pages-deployment.md)
- ✅ [部署检查清单](DEPLOYMENT_CHECKLIST.md)
- 🔧 [故障排查指南](Docs/troubleshooting.md) ⚠️ 遇到问题先看这里
- 🏗️ [技术设计文档](Docs/TECH_DESIGN.md)

## 技术栈

- **Next.js 15** (App Router + TypeScript)
- **React 19**
- **Tailwind CSS 3** - 像素风格主题
- **next-intl** - 多语言支持 (en/zh)
- **pnpm** - 包管理器

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建静态站点
pnpm build

# 检查代码
pnpm lint
```

## 部署到 GitHub Pages

项目已配置为静态导出模式,可直接部署到 GitHub Pages。

### 自动部署步骤:

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. **启用 GitHub Pages**
   - 进入你的 GitHub 仓库
   - 点击 Settings → Pages
   - 在 "Build and deployment" 部分:
     - Source: 选择 "GitHub Actions"
   - 保存设置

3. **等待部署完成**
   - 访问 Actions 标签页查看部署进度
   - 构建完成后,你的网站将在 `https://<username>.github.io/<repository-name>` 上线

### 配置自定义域名 (可选):

如果你有自定义域名:

1. 在 GitHub Pages 设置中添加你的域名
2. 在你的域名提供商处配置 DNS:
   - 添加 CNAME 记录指向 `<username>.github.io`
   - 或添加 A 记录指向 GitHub Pages IP

### 手动部署:

如果你想手动部署:

```bash
# 构建项目
pnpm build

# out/ 目录包含所有静态文件
# 可以将其上传到任何静态托管服务
```

### 注意事项:

- 首次部署可能需要几分钟
- 后续推送到 main 分支会自动触发重新部署
- 确保 `next.config.js` 中保持 `output: 'export'` 配置
- 如果仓库名不是 `<username>.github.io`,需要在项目访问时加上仓库名路径

## 项目结构

```
src/
├── app/
│   ├── [locale]/        # 多语言路由
│   ├── layout.tsx       # 根布局
│   └── globals.css      # 全局样式
├── components/
│   ├── GameEmbed.tsx    # 游戏嵌入组件
│   └── LanguageSwitcher.tsx  # 语言切换器
├── i18n/
│   ├── locales/         # 翻译文件 (en.json, zh.json)
│   ├── config.ts        # i18n 配置
│   └── request.ts       # next-intl 请求配置
└── lib/
    └── utils.ts         # 工具函数
```

## 配置说明

- **像素风格配色**: 黑色背景 + 霓虹绿主色
- **字体**: Press Start 2P (标题) + VT323 (正文)
- **多语言**: 英文 (默认) + 中文
  - 路由: `/en` (英文), `/zh` (中文)
  - 使用 `next-intl` 中间件自动处理语言检测和路由
- **游戏源**: itch.io HTML5 游戏

详细设计文档: [Docs/TECH_DESIGN.md](Docs/TECH_DESIGN.md)

## 多语言支持

项目使用 `next-intl` 实现国际化:

- **路由结构**: 
  - 根路径 `/` - 英文页面（默认语言，无需前缀）
  - 中文页面 `/zh` - 需要语言前缀
- **翻译文件**: 位于 `src/i18n/locales/` 目录
- **语言切换**: 通过 `LanguageSwitcher` 组件实现
- **静态导出**: 使用 `output: 'export'` 模式，适合部署到 GitHub Pages

访问示例:
- 英文主页: `http://localhost:3000/`
- 中文页面: `http://localhost:3000/zh`
