# 🚀 GitHub Pages 快速部署指南

本指南帮助你在 5 分钟内将项目部署到 GitHub Pages。

## 📋 前提条件

- ✅ 已安装 Git
- ✅ 有 GitHub 账号
- ✅ 项目可以本地运行

## 🎯 快速部署 (3 步)

### 1️⃣ 创建 GitHub 仓库

在 GitHub 上创建新仓库:
- 访问: https://github.com/new
- 仓库名: `immortalityfactory` (或任意名字)
- 设为 Public
- **不要**勾选任何初始化选项
- 点击 "Create repository"

### 2️⃣ 推送代码

在项目目录打开终端,执行:

```bash
# 添加远程仓库 (替换 YOUR_USERNAME 为你的 GitHub 用户名)
git remote add origin https://github.com/YOUR_USERNAME/immortalityfactory.git

# 推送代码
git add .
git commit -m "Initial deployment"
git push -u origin main
```

### 3️⃣ 启用 GitHub Pages ⚠️ **重要!必须先完成这步**

1. 进入仓库页面
2. 点击 **Settings** (设置) → **Pages**
3. 找到 "Build and deployment" 部分
4. 在 "Source" 下拉菜单中:
   - ❌ **不要**选择 "Deploy from a branch"
   - ✅ **必须**选择 "**GitHub Actions**"
5. 选择后会自动保存

⚠️ **注意**: 如果不先启用 Pages,部署会失败并显示 404 错误!

**完成! 🎉**

等待 2-3 分钟,你的网站将在以下地址上线:

```
https://YOUR_USERNAME.github.io/immortalityfactory/
```

## 🔄 更新网站

每次修改后:

```bash
# 方法 1: 一键部署脚本
./deploy.sh "更新说明"

# 方法 2: 手动推送
git add .
git commit -m "更新说明"
git push
```

推送后会自动触发重新部署。

## 🛠️ 本地测试

部署前建议本地测试:

```bash
# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 📍 访问你的网站

部署成功后:

- **英文主页**: `https://YOUR_USERNAME.github.io/immortalityfactory/`
- **中文页面**: `https://YOUR_USERNAME.github.io/immortalityfactory/zh`

## 🐛 常见问题

### Q: 部署失败,显示 "Not Found" 或 404 错误?

**A**: 这是最常见的问题!原因是 GitHub Pages 还没启用。

**解决方案**:
1. ⚠️ 进入 Settings → Pages
2. ⚠️ 确保 Source 设为 "**GitHub Actions**" (不是 "Deploy from a branch")
3. 等待设置生效 (约 10 秒)
4. 在 Actions 标签页点击 "Re-run failed jobs"
5. 或推送一个新的提交触发重新部署

详细解决方案: [Docs/troubleshooting.md](Docs/troubleshooting.md)

### Q: 网站部署成功但访问显示 404?

**A**: 可能是路径配置问题:

1. 检查 Actions 标签页确认部署成功
2. 如果仓库名不是 `username.github.io`,需要配置 basePath
3. 清除浏览器缓存重试

### Q: 资源加载失败?

**A**: 如果仓库名不是 `username.github.io`,需要配置 basePath:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  basePath: '/immortalityfactory',  // 你的仓库名
  assetPrefix: '/immortalityfactory',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}
```

然后重新构建和推送。

### Q: 如何查看部署状态?

**A**: 
1. 进入仓库的 **Actions** 标签页
2. 查看最新的工作流运行
3. 点击查看详细日志

### Q: 如何使用自定义域名?

**A**: 
1. 在 Pages 设置添加域名
2. 在域名提供商添加 CNAME 记录
3. 在 `public/` 目录创建 `CNAME` 文件,内容为你的域名

详见: `Docs/github-pages-deployment.md`

## 📚 更多资源

- **完整部署指南**: [`Docs/github-pages-deployment.md`](Docs/github-pages-deployment.md)
- **部署检查清单**: [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md)
- **技术文档**: [`Docs/TECH_DESIGN.md`](Docs/TECH_DESIGN.md)

## 💡 有用的命令

```bash
# 查看 Git 状态
git status

# 查看提交历史
git log --oneline

# 查看远程仓库
git remote -v

# 强制推送 (谨慎使用)
git push -f origin main

# 回滚最后一次提交
git revert HEAD
```

## 🎯 下一步

部署成功后,你可以:

1. ✅ 添加 Google Analytics
2. ✅ 优化 SEO 元数据
3. ✅ 添加更多语言
4. ✅ 自定义域名
5. ✅ 添加更多内容

## 📞 需要帮助?

- 查看 [GitHub Pages 文档](https://docs.github.com/en/pages)
- 查看 [Next.js 部署指南](https://nextjs.org/docs/deployment)
- 检查仓库的 Issues

---

**祝部署顺利! 🚀**

有问题随时查看完整文档或 Actions 日志。

