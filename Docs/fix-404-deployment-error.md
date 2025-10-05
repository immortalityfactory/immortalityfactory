# 修复 "404 Not Found" 部署错误

## 🚨 错误信息

如果你看到以下错误:

```
Error: Creating Pages deployment failed
Error: HttpError: Not Found
Error: Failed to create deployment (status: 404)
Ensure GitHub Pages has been enabled
```

**不要慌!这是首次部署时最常见的问题,非常容易解决。**

---

## 🎯 问题原因

**GitHub Pages 功能还没有在你的仓库中启用。**

GitHub Actions 工作流运行正常,但是因为 Pages 功能未启用,所以无法创建部署。

---

## ✅ 解决方案 (5 分钟搞定)

### 步骤 1: 启用 GitHub Pages

#### 1.1 进入仓库设置

```
打开你的仓库页面
  ↓
点击顶部的 "Settings" (设置)
  ↓
在左侧菜单中找到 "Pages"
  ↓
点击进入 Pages 设置页面
```

**直接链接**: 
```
https://github.com/你的用户名/immortalityfactory/settings/pages
```

#### 1.2 配置部署源

在 "**Build and deployment**" 部分:

```
找到 "Source" 下拉菜单
  ↓
当前可能显示: "None" 或 "Deploy from a branch"
  ↓
点击下拉菜单
  ↓
选择 "GitHub Actions" ✅
  ↓
设置会自动保存
```

**重要提示**:
- ❌ **不要**选择 "Deploy from a branch"
- ✅ **必须**选择 "GitHub Actions"

#### 1.3 确认设置

设置成功后,你会看到:

```
Build and deployment
  Source: GitHub Actions ✅
```

页面上会显示一条提示:
```
Your site is ready to be published at 
https://你的用户名.github.io/immortalityfactory/
```

---

### 步骤 2: 重新触发部署

现在 Pages 已启用,你需要重新运行失败的部署。

#### 方法 A: 重新运行失败的工作流 (推荐)

```
1. 点击仓库的 "Actions" 标签页

2. 你会看到一个失败的工作流运行 (红色 ❌)

3. 点击这个失败的运行

4. 在页面右上角,点击 "Re-run failed jobs" 按钮

5. 确认重新运行
```

#### 方法 B: 推送新的提交

如果你想推送新的提交来触发部署:

```bash
# 可以创建一个空提交
git commit --allow-empty -m "Trigger deployment after enabling Pages"
git push
```

#### 方法 C: 手动触发工作流

```
1. Actions 标签页

2. 左侧选择 "Deploy to GitHub Pages"

3. 右上角点击 "Run workflow"

4. 选择 main 分支

5. 点击绿色的 "Run workflow" 按钮
```

---

### 步骤 3: 等待部署完成

```
工作流开始运行
  ↓
构建阶段 (Build) - 约 1-2 分钟
  ├─ 安装依赖
  ├─ 构建项目
  └─ 上传产物
  ↓
部署阶段 (Deploy) - 约 30 秒
  ├─ 下载产物
  └─ 部署到 Pages
  ↓
部署成功! ✅
```

**总时间**: 约 2-3 分钟

---

### 步骤 4: 验证部署成功

#### 4.1 检查 Actions 状态

```
Actions 标签页应显示:
  ✅ Build (绿色对勾)
  ✅ Deploy (绿色对勾)
```

#### 4.2 检查 Pages 状态

```
回到 Settings → Pages
  
你会看到:
  "Your site is live at https://..."
```

#### 4.3 访问你的网站

打开浏览器,访问:

```
https://你的用户名.github.io/immortalityfactory/
```

你应该能看到:
- ✅ 英文主页正常显示
- ✅ 像素风格样式正确
- ✅ 语言切换器工作
- ✅ 游戏嵌入正常

访问中文版:
```
https://你的用户名.github.io/immortalityfactory/zh
```

---

## 🔍 如果还是不行?

### 检查清单 A: 仓库设置

确认以下设置:

- [ ] Settings → Pages → Source: "GitHub Actions" ✅
- [ ] 仓库是 **Public** (Settings → General)
- [ ] Actions 已启用 (Settings → Actions → General)
- [ ] Workflow permissions: "Read and write permissions"

### 检查清单 B: 文件和配置

确认以下文件存在且正确:

```bash
# 检查工作流文件
ls -la .github/workflows/deploy.yml

# 检查构建配置
cat next.config.js | grep "output: 'export'"

# 检查 package.json
cat package.json | grep packageManager
```

### 检查清单 C: 路径问题

如果 Actions 显示成功但网站显示 404:

**情况 1**: 仓库名是 `immortalityfactory`

需要配置 basePath:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  basePath: '/immortalityfactory',     // 添加
  assetPrefix: '/immortalityfactory',  // 添加
  images: { unoptimized: true },
  trailingSlash: true,
}
```

**情况 2**: 仓库名是 `username.github.io`

不需要 basePath (保持现有配置)

---

## 📸 视觉指南

### Settings → Pages 正确配置截图说明:

**应该看到**:
```
┌─────────────────────────────────────────┐
│ Build and deployment                    │
├─────────────────────────────────────────┤
│                                         │
│ Source                                  │
│ ┌─────────────────────┐                │
│ │ GitHub Actions    ▼ │ ← 必须是这个    │
│ └─────────────────────┘                │
│                                         │
│ GitHub Actions builds and deploys      │
│ your site from your repository.        │
│                                         │
└─────────────────────────────────────────┘
```

**不应该是**:
```
┌─────────────────────────────────────────┐
│ Source                                  │
│ ┌─────────────────────┐                │
│ │ Deploy from a branch▼│ ← 不对!       │
│ └─────────────────────┘                │
└─────────────────────────────────────────┘
```

---

## 🎓 为什么会出现这个错误?

**技术原因**:

1. GitHub Pages 有两种部署模式:
   - **传统模式**: Deploy from a branch (从分支部署)
   - **现代模式**: GitHub Actions (工作流部署)

2. 默认情况下,新仓库的 Pages 功能是**未启用**的

3. 我们的项目使用 GitHub Actions 工作流部署

4. 工作流运行时,它会尝试调用 GitHub Pages API 创建部署

5. 如果 Pages 未启用,API 返回 404 错误

6. 启用 Pages 并选择 "GitHub Actions" 后,API 就可以正常工作了

---

## 💡 预防措施

**下次部署新项目时,记得**:

1. ✅ 先创建仓库
2. ✅ **立即**启用 Pages (选择 GitHub Actions)
3. ✅ 然后推送代码
4. ✅ 工作流会自动部署成功

这样就不会遇到 404 错误了!

---

## 🚀 成功部署后的样子

当一切正常时,你应该看到:

### Actions 标签页:
```
✅ Deploy to GitHub Pages
   ✅ build
   ✅ deploy
   
   Deployed in 2m 34s
```

### Settings → Pages:
```
✅ Your site is live at 
   https://username.github.io/immortalityfactory/
   
   Visit site → [按钮]
```

### 浏览器:
```
┌──────────────────────────────────────┐
│ 🏭 Immortality Factory               │
│                                      │
│ [像素风格的游戏界面]                   │
│                                      │
│ [🌐 English | 中文]                  │
└──────────────────────────────────────┘
```

---

## 📚 延伸阅读

- [完整故障排查指南](troubleshooting.md) - 解决其他常见问题
- [GitHub Pages 部署教程](github-pages-deployment.md) - 详细配置说明
- [快速开始指南](../QUICKSTART.md) - 3 步快速部署

---

## 🎉 总结

**解决 404 错误只需 3 步**:

1. ⚙️ Settings → Pages → Source → GitHub Actions
2. 🔄 Actions → Re-run failed jobs
3. ⏱️ 等待 2-3 分钟 → 完成!

**就是这么简单!** 🚀

如果还有问题,查看 [troubleshooting.md](troubleshooting.md) 获取更多帮助。

---

**最后更新**: 2024-10-05  
**适用版本**: GitHub Pages + Next.js 15 + GitHub Actions

