# GitHub Pages 部署完整指南

本文档提供将 Immortality Factory 项目部署到 GitHub Pages 的详细步骤。

## 前置条件

- GitHub 账号
- Git 已安装并配置
- 项目代码已准备好推送

## 部署流程

### 第一步: 创建 GitHub 仓库

1. 登录 GitHub
2. 点击右上角的 "+" → "New repository"
3. 填写仓库信息:
   - Repository name: `immortalityfactory` (或你喜欢的名字)
   - Description: 项目描述
   - 选择 Public (GitHub Pages 免费版需要公开仓库)
4. **不要**初始化 README、.gitignore 或 license (我们已经有了)
5. 点击 "Create repository"

### 第二步: 推送代码到 GitHub

在项目根目录打开终端,执行以下命令:

```bash
# 初始化 git 仓库 (如果还没有)
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Add Next.js project with i18n"

# 添加远程仓库 (替换 YOUR_USERNAME 和 YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 推送到 main 分支
git push -u origin main
```

### 第三步: 配置 GitHub Pages

1. 在 GitHub 仓库页面,点击 **Settings** (设置)
2. 在左侧菜单中,点击 **Pages**
3. 在 "Build and deployment" 部分:
   - **Source**: 选择 "GitHub Actions"
   - 这将允许使用我们的自定义工作流
4. 点击 **Save** (保存)

### 第四步: 触发部署

部署会在以下情况自动触发:

1. **自动触发**: 每次推送到 `main` 分支
2. **手动触发**: 
   - 进入仓库的 Actions 标签页
   - 选择 "Deploy to GitHub Pages" 工作流
   - 点击 "Run workflow" → "Run workflow"

### 第五步: 检查部署状态

1. 点击仓库的 **Actions** 标签页
2. 查看最新的工作流运行状态
3. 点击工作流查看详细日志
4. 等待两个任务完成:
   - ✅ build (构建项目)
   - ✅ deploy (部署到 Pages)

### 第六步: 访问你的网站

部署成功后,你的网站将在以下地址可用:

```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

例如:
- 英文主页: `https://YOUR_USERNAME.github.io/YOUR_REPO/`
- 中文页面: `https://YOUR_USERNAME.github.io/YOUR_REPO/zh`

## 特殊配置: 用户/组织站点

如果你的仓库名是 `YOUR_USERNAME.github.io`,那么:

1. 网站将直接在 `https://YOUR_USERNAME.github.io` 上线
2. 不需要仓库名路径
3. 不需要修改 `next.config.js` 的 `basePath`

## 自定义域名配置

### 使用自定义域名:

1. **在 GitHub 设置域名**:
   - Settings → Pages
   - 在 "Custom domain" 输入你的域名 (如 `www.example.com`)
   - 保存

2. **配置 DNS** (在你的域名提供商):
   
   **选项 A: 使用 CNAME (推荐子域名)**
   ```
   类型: CNAME
   名称: www
   值: YOUR_USERNAME.github.io
   ```
   
   **选项 B: 使用 A 记录 (适用于根域名)**
   ```
   类型: A
   名称: @
   值: 185.199.108.153
   值: 185.199.109.153
   值: 185.199.110.153
   值: 185.199.111.153
   ```

3. **添加 CNAME 文件**:
   
   在项目的 `public/` 目录创建 `CNAME` 文件:
   ```
   www.example.com
   ```

4. **重新部署**:
   ```bash
   git add public/CNAME
   git commit -m "Add custom domain"
   git push
   ```

5. **启用 HTTPS**:
   - DNS 生效后 (可能需要 24-48 小时)
   - 在 GitHub Pages 设置中勾选 "Enforce HTTPS"

## 故障排查

### 问题 1: 404 错误

**原因**: 资源路径不正确

**解决方案**: 如果仓库名不是 `username.github.io`,需要配置 `basePath`:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  basePath: '/YOUR_REPO_NAME',
  assetPrefix: '/YOUR_REPO_NAME',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}
```

### 问题 2: 部署失败

**检查清单**:
1. 查看 Actions 日志找到错误信息
2. 确保 `pnpm-lock.yaml` 已提交
3. 确保 `package.json` 中的依赖版本正确
4. 本地运行 `pnpm build` 确保能成功构建

### 问题 3: 多语言路由不工作

**原因**: 静态导出限制

**当前配置**: 
- 英文 (默认): `/` → `https://site/`
- 中文: `/zh` → `https://site/zh`

这种配置已针对静态导出优化。

### 问题 4: 字体或资源加载失败

**检查**:
1. 确保所有资源在 `public/` 目录中
2. 检查资源路径是否使用了正确的 basePath
3. 查看浏览器控制台的网络请求

## 更新部署

每次代码更新后:

```bash
# 修改代码...

# 提交更改
git add .
git commit -m "Update: description of changes"

# 推送触发自动部署
git push
```

部署会自动开始,通常 2-5 分钟完成。

## 回滚到之前的版本

如果需要回滚:

```bash
# 查看提交历史
git log --oneline

# 回滚到特定提交 (替换 COMMIT_HASH)
git revert COMMIT_HASH

# 推送触发重新部署
git push
```

## 性能优化建议

1. **图片优化**: 使用 WebP 格式,压缩图片
2. **代码分割**: Next.js 已自动处理
3. **缓存策略**: GitHub Pages 自动设置缓存头
4. **CDN**: GitHub Pages 使用全球 CDN

## 监控和分析

推荐添加:

1. **Google Analytics**: 跟踪访问数据
2. **Sentry**: 错误监控
3. **Lighthouse**: 性能分析

可以在 `src/app/layout.tsx` 中添加分析脚本。

## 安全注意事项

1. ⚠️ **不要提交敏感信息**:
   - API 密钥
   - 密码
   - 私钥
   - `.env` 文件

2. ✅ **已配置 .gitignore** 排除:
   - `node_modules/`
   - `.env*.local`
   - 构建输出

## 成本

- GitHub Pages 对公开仓库**完全免费**
- 包含 100GB/月 带宽
- 包含 1GB 存储空间
- 超出限额可升级到 GitHub Pro

## 相关资源

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [Next.js 静态导出文档](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [next-intl 静态导出指南](https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering)

## 获取帮助

如果遇到问题:

1. 检查 [GitHub Status](https://www.githubstatus.com/)
2. 查看仓库的 Issues 标签页
3. 搜索 [GitHub Community](https://github.com/orgs/community/discussions)
4. 查看 Actions 日志获取详细错误信息

