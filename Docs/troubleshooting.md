# GitHub Pages 部署故障排查

## ❌ 错误: "Not Found" / "Failed to create deployment (status: 404)"

### 错误信息示例:
```
Error: Creating Pages deployment failed
Error: HttpError: Not Found
Error: Failed to create deployment (status: 404)
Ensure GitHub Pages has been enabled
```

### 🔍 原因:
GitHub Pages 功能还没有在仓库中启用。这是首次部署时最常见的问题。

### ✅ 解决方案:

#### 步骤 1: 启用 GitHub Pages

1. **访问仓库设置**
   - 打开你的 GitHub 仓库页面
   - 网址格式: `https://github.com/你的用户名/immortalityfactory`

2. **进入 Pages 设置**
   - 点击顶部的 **Settings** (设置) 标签
   - 在左侧菜单中找到并点击 **Pages**
   
3. **配置 Build and deployment**
   - 找到 "Build and deployment" 部分
   - 在 **Source** 下拉菜单中:
     - ⚠️ **不要**选择 "Deploy from a branch"
     - ✅ **必须**选择 "**GitHub Actions**"
   
4. **保存设置**
   - 选择后会自动保存
   - 等待几秒钟让设置生效

#### 步骤 2: 重新触发部署

有两种方法:

**方法 A: 手动触发工作流 (推荐)**
1. 进入仓库的 **Actions** 标签页
2. 在左侧选择 "Deploy to GitHub Pages" 工作流
3. 点击右上角的 "Run workflow" 按钮
4. 选择 `main` 分支
5. 点击绿色的 "Run workflow" 按钮

**方法 B: 推送新的提交**
```bash
git commit --allow-empty -m "Trigger deployment"
git push
```

#### 步骤 3: 验证部署

1. **查看 Actions 进度**
   - Actions 标签页会显示新的工作流运行
   - 等待构建和部署完成 (约 2-3 分钟)
   - 确保两个任务都显示绿色 ✅

2. **访问你的网站**
   - 部署成功后,在 Settings → Pages 可以看到网站 URL
   - 格式: `https://你的用户名.github.io/immortalityfactory/`

---

## ❌ 错误: "Permissions" / "403 Forbidden"

### 错误信息:
```
Error: HttpError: Resource not accessible by integration
```

### 🔍 原因:
GitHub Actions 没有部署到 Pages 的权限。

### ✅ 解决方案:

1. **检查仓库是否为 Public**
   - Settings → General
   - 页面底部 "Danger Zone"
   - 如果是 Private,需要 GitHub Pro 或将其改为 Public

2. **检查 Actions 权限**
   - Settings → Actions → General
   - "Workflow permissions" 部分
   - 选择 "Read and write permissions"
   - 勾选 "Allow GitHub Actions to create and approve pull requests"
   - 点击 Save

3. **检查 Pages 环境权限**
   - Settings → Environments
   - 如果有 `github-pages` 环境,点击进入
   - 确保没有部署分支限制,或 `main` 在允许列表中

---

## ❌ 错误: 404 页面未找到 (部署成功后)

### 症状:
- Actions 显示部署成功 ✅
- 但访问网站时看到 404 错误

### 🔍 原因:
资源路径配置问题,通常是 `basePath` 设置不正确。

### ✅ 解决方案:

#### 情况 A: 仓库名不是 `username.github.io`

如果你的仓库名是 `immortalityfactory`,你需要配置 basePath:

**修改 `next.config.js`:**
```javascript
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/immortalityfactory',        // 添加这行
  assetPrefix: '/immortalityfactory',     // 添加这行
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = withNextIntl(nextConfig)
```

**然后重新部署:**
```bash
git add next.config.js
git commit -m "Fix: Add basePath for GitHub Pages"
git push
```

#### 情况 B: 仓库名是 `username.github.io`

如果你的仓库名就是 `username.github.io`,不需要 basePath:

**保持 `next.config.js` 当前配置即可** (不要添加 basePath)

---

## ❌ 错误: 资源加载失败 (CSS/JS/图片)

### 症状:
- 页面加载但没有样式
- 浏览器控制台显示 404 错误
- 图片无法显示

### 🔍 原因:
资源路径配置与 basePath 不匹配。

### ✅ 解决方案:

1. **确认 basePath 配置正确** (见上面的 404 解决方案)

2. **检查 public/ 文件引用**
   - 确保使用相对路径,不要以 `/` 开头
   - 或使用 Next.js 的 `basePath` 帮助函数

3. **清除浏览器缓存**
   - 按 Ctrl+Shift+R (Windows/Linux)
   - 或 Cmd+Shift+R (Mac)
   - 强制刷新页面

---

## ❌ 错误: 构建失败

### 错误信息示例:
```
Error: Build failed
npm ERR! code ELIFECYCLE
```

### ✅ 解决方案:

#### 1. 本地测试构建

```bash
# 清理缓存
rm -rf .next out node_modules

# 重新安装依赖
pnpm install

# 本地构建测试
pnpm build
```

如果本地构建失败,修复错误后再推送。

#### 2. 检查依赖版本

确保 `package.json` 中的依赖版本兼容:
```bash
pnpm audit
pnpm update
```

#### 3. 检查 Node.js 版本

工作流使用 Node.js 20,确保你本地也使用兼容版本:
```bash
node --version  # 应该是 v18+ 或 v20+
```

---

## ❌ 错误: pnpm 相关错误

### 错误信息:
```
Error: No pnpm version is specified
```

### ✅ 解决方案:

确保 `package.json` 包含 packageManager 字段:
```json
{
  "packageManager": "pnpm@10.11.0"
}
```

如果缺失,添加后重新提交:
```bash
git add package.json
git commit -m "Add packageManager field"
git push
```

---

## ❌ 错误: 部署超时

### 症状:
工作流运行超过 10 分钟并超时。

### ✅ 解决方案:

1. **检查构建输出大小**
```bash
pnpm build
du -sh out/
```

如果 `out/` 目录过大 (>100MB),考虑:
- 压缩图片
- 移除未使用的依赖
- 检查是否有大文件被误包含

2. **优化依赖缓存**
工作流已配置缓存,通常第二次运行会快很多。

---

## ❌ 错误: 多语言路由不工作

### 症状:
- `/zh` 页面显示 404
- 语言切换不起作用

### 🔍 原因:
静态导出模式下的路由配置问题。

### ✅ 解决方案:

1. **检查路由配置**

**`src/i18n/routing.ts`:**
```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'zh'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'  // 重要!
});
```

2. **检查构建输出**
```bash
pnpm build
ls -la out/
# 应该看到 en/ 和 zh/ 目录
```

3. **检查 middleware 配置**

确保 `src/middleware.ts` (如果有) 配置正确。

---

## 🔧 通用调试步骤

### 1. 查看详细的 Actions 日志

1. Actions 标签页
2. 点击失败的工作流运行
3. 点击失败的任务 (build 或 deploy)
4. 展开每个步骤查看详细输出
5. 复制错误信息搜索解决方案

### 2. 本地模拟生产构建

```bash
# 构建
pnpm build

# 预览构建结果
npx serve@latest out

# 在浏览器访问 http://localhost:3000
```

### 3. 检查 Git 配置

```bash
# 查看远程仓库
git remote -v

# 确认在正确的分支
git branch

# 查看最近的提交
git log --oneline -5
```

### 4. 验证 GitHub 设置

**必须检查的设置:**
- ✅ Settings → Pages → Source: "GitHub Actions"
- ✅ Settings → Actions → General → Workflow permissions: "Read and write"
- ✅ 仓库必须是 Public (或有 GitHub Pro)
- ✅ Actions 功能已启用

---

## 📞 获取更多帮助

### 1. 查看 GitHub 状态
访问 [https://www.githubstatus.com/](https://www.githubstatus.com/) 确认 GitHub 服务正常。

### 2. 搜索类似问题
- [GitHub Community Discussions](https://github.com/orgs/community/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/github-pages)

### 3. 联系支持
- [GitHub Support](https://support.github.com/)

### 4. 本项目 Issues
如果问题仍未解决,在项目仓库创建 Issue,包含:
- 完整的错误信息
- Actions 日志截图
- 你已尝试的解决方案

---

## ✅ 快速检查清单

部署前确保:

- [ ] 仓库是 Public (或有 Pro)
- [ ] Settings → Pages → Source 设为 "GitHub Actions"
- [ ] Actions 权限设为 "Read and write"
- [ ] 本地 `pnpm build` 成功
- [ ] `next.config.js` 包含 `output: 'export'`
- [ ] basePath 配置正确 (如需要)
- [ ] `pnpm-lock.yaml` 已提交
- [ ] `.github/workflows/deploy.yml` 存在且正确
- [ ] Git 推送到 `main` 分支

---

**大部分问题都可以通过启用 GitHub Pages 和正确配置 basePath 解决!** 🎉

