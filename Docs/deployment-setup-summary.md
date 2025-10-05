# GitHub Pages 部署配置总结

本文档说明了为项目配置 GitHub Pages 自动部署所做的所有更改。

## 📦 已添加的文件

### 1. GitHub Actions 工作流
**文件**: `.github/workflows/deploy.yml`

自动化部署工作流,包含:
- ✅ 自动触发: 每次推送到 `main` 分支
- ✅ 手动触发: 可在 Actions 页面手动运行
- ✅ 使用 pnpm 10.11.0
- ✅ 缓存依赖以加快构建
- ✅ 构建 Next.js 静态站点
- ✅ 自动部署到 GitHub Pages

### 2. 部署脚本
**文件**: `deploy.sh`

一键部署脚本,功能:
- 自动添加和提交更改
- 推送到 GitHub
- 显示部署进度链接
- 显示最终访问 URL

使用方法:
```bash
./deploy.sh "你的提交信息"
```

### 3. 文档文件

#### `QUICKSTART.md`
快速开始指南,包含:
- 3 步快速部署流程
- 常见问题解答
- 快速故障排查

#### `DEPLOYMENT_CHECKLIST.md`
详细的部署检查清单,包含:
- 部署前检查项 (代码、配置、内容等)
- 分步部署指导
- 部署后验证清单
- 性能、安全、SEO 检查
- 响应式和可访问性检查

#### `Docs/github-pages-deployment.md`
完整的部署教程,包含:
- 详细的分步说明
- 自定义域名配置
- 故障排查指南
- 性能优化建议
- 安全注意事项
- 相关资源链接

#### `Docs/deployment-setup-summary.md` (本文件)
配置总结和说明

## 🔧 已修改的文件

### 1. `package.json`
添加了新的脚本命令:
```json
{
  "scripts": {
    "export": "next build",           // 导出静态站点
    "preview": "pnpm build && npx serve@latest out",  // 本地预览
    "deploy": "pnpm build && git add . && git commit -m 'Deploy' && git push"  // 快速部署
  }
}
```

### 2. `README.md`
添加了:
- 🚀 快速开始部分
- 指向所有部署文档的链接
- 更详细的部署说明

## ✅ 已存在的正确配置

以下配置已经正确,支持静态导出:

### `next.config.js`
```javascript
{
  output: 'export',              // 静态导出模式
  images: { unoptimized: true }, // 图片不优化 (静态导出要求)
  trailingSlash: true,           // URL 尾部斜杠
}
```

### `.gitignore`
已正确配置,排除:
- `node_modules/`
- `out/` (构建输出)
- `.env*.local`
- 其他临时文件

## 🎯 部署流程说明

### 自动部署流程:

1. **开发者推送代码**
   ```
   git push origin main
   ```

2. **GitHub Actions 触发**
   - 检测到 main 分支有新推送
   - 自动启动工作流

3. **构建阶段** (build job)
   - 检出代码
   - 安装 Node.js 20
   - 安装 pnpm 10.11.0
   - 恢复依赖缓存 (如有)
   - 安装依赖 (`pnpm install --frozen-lockfile`)
   - 构建项目 (`pnpm build`)
   - 上传 `out/` 目录作为 artifact

4. **部署阶段** (deploy job)
   - 等待构建完成
   - 下载构建产物
   - 部署到 GitHub Pages
   - 更新网站

5. **完成**
   - 网站在 2-5 分钟内更新
   - 可在 Actions 页面查看进度

### 目录结构:

构建后的 `out/` 目录包含:
```
out/
├── _next/              # Next.js 资源 (JS, CSS)
│   └── static/
├── en/                 # 英文页面
│   └── index.html
├── zh/                 # 中文页面
│   └── index.html
├── fonts/              # 字体文件
├── screenshots/        # 截图
├── index.html          # 根页面 (英文)
├── 404.html            # 404 页面
└── game.html           # 游戏文件
```

## 🌐 URL 结构

### 标准仓库 (非用户页面)
仓库名: `immortalityfactory`

- 网站根: `https://username.github.io/immortalityfactory/`
- 英文主页: `https://username.github.io/immortalityfactory/`
- 中文页面: `https://username.github.io/immortalityfactory/zh`

### 用户/组织页面
仓库名: `username.github.io`

- 网站根: `https://username.github.io/`
- 英文主页: `https://username.github.io/`
- 中文页面: `https://username.github.io/zh`

## 🔄 更新流程

### 日常更新:
```bash
# 1. 修改代码...

# 2. 使用部署脚本
./deploy.sh "更新说明"

# 或手动
git add .
git commit -m "更新说明"
git push
```

### 重大更新:
```bash
# 1. 创建新分支
git checkout -b feature/new-feature

# 2. 开发和测试
pnpm dev
pnpm build

# 3. 合并到 main
git checkout main
git merge feature/new-feature

# 4. 推送触发部署
git push
```

## 🐛 故障排查

### 检查构建状态:
```bash
# 本地测试构建
pnpm build

# 查看输出
ls -la out/
```

### 检查部署状态:
1. GitHub → Actions 标签页
2. 点击最新的工作流运行
3. 查看详细日志

### 常见问题:

#### 1. 404 错误
**原因**: basePath 配置问题

**解决**: 如果仓库不是 `username.github.io`,添加:
```javascript
// next.config.js
basePath: '/仓库名',
assetPrefix: '/仓库名',
```

#### 2. 构建失败
**检查**:
- Actions 日志中的错误信息
- 本地 `pnpm build` 是否成功
- 依赖版本是否兼容

#### 3. 资源加载失败
**检查**:
- 资源路径是否正确
- basePath 配置
- 浏览器控制台网络请求

#### 4. 语言路由问题
**确认**:
- `src/i18n/routing.ts` 配置
- 静态导出限制
- 生成的 HTML 文件结构

## 📊 性能优化

已实现的优化:
- ✅ 静态生成 (SSG)
- ✅ 代码分割
- ✅ 资源压缩
- ✅ 字体优化
- ✅ CSS 内联

可选优化:
- 图片 WebP 格式
- 使用 CDN
- 添加 Service Worker
- 启用 Brotli 压缩

## 🔐 安全考虑

已配置:
- ✅ `.gitignore` 排除敏感文件
- ✅ 不提交 `.env` 文件
- ✅ 使用 `--frozen-lockfile` 确保依赖一致

建议:
- 定期运行 `pnpm audit`
- 更新依赖修复漏洞
- 审查第三方脚本

## 📈 监控和分析

建议添加:
- Google Analytics
- Sentry 错误跟踪
- Lighthouse CI
- Uptime 监控

## 🎉 下一步

部署成功后:

1. **测试网站**
   - 功能测试
   - 性能测试
   - SEO 检查

2. **优化内容**
   - SEO 元数据
   - 图片优化
   - 内容更新

3. **推广**
   - 社交媒体
   - 搜索引擎提交
   - 社区分享

4. **维护**
   - 定期更新
   - 监控性能
   - 收集反馈

## 📚 相关资源

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [Next.js 静态导出](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [next-intl 静态导出](https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering)

## 📝 变更历史

- **2024-10-05**: 初始配置
  - 添加 GitHub Actions 工作流
  - 创建部署脚本和文档
  - 更新 README

---

**配置完成! 项目现在可以自动部署到 GitHub Pages。** 🎉

