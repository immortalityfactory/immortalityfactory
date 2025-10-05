# 🚀 GitHub Pages 部署检查清单

在部署到 GitHub Pages 之前,请完成以下检查项:

## ✅ 部署前检查

### 1. 代码质量
- [ ] 本地运行 `pnpm dev` 确认应用正常工作
- [ ] 运行 `pnpm build` 确认构建成功
- [ ] 运行 `pnpm lint` 修复所有 linting 错误
- [ ] 检查浏览器控制台没有错误

### 2. 配置检查
- [ ] `next.config.js` 包含 `output: 'export'`
- [ ] `next.config.js` 包含 `images.unoptimized: true`
- [ ] `.gitignore` 已正确配置
- [ ] `package.json` 版本号已更新 (可选)

### 3. 内容检查
- [ ] 所有文本内容已翻译 (中英文)
- [ ] 图片已优化并放在 `public/` 目录
- [ ] SEO 元数据已配置 (title, description, OG tags)
- [ ] favicon 已添加

### 4. Git 检查
- [ ] 所有更改已提交
- [ ] 提交信息清晰描述了更改
- [ ] 没有提交敏感信息 (.env 文件等)
- [ ] Git remote 已正确配置

## 📋 部署步骤

### 首次部署

1. **创建 GitHub 仓库**
   ```bash
   # 在 GitHub 网站创建新仓库
   # 不要初始化 README
   ```

2. **连接远程仓库**
   ```bash
   git remote add origin https://github.com/USERNAME/REPO.git
   # 或如果已存在,更新 URL:
   # git remote set-url origin https://github.com/USERNAME/REPO.git
   ```

3. **推送代码**
   ```bash
   git push -u origin main
   ```

4. **配置 GitHub Pages**
   - Settings → Pages
   - Source: GitHub Actions
   - Save

5. **检查部署**
   - Actions → 查看工作流状态
   - 等待构建和部署完成

### 后续更新

```bash
# 方法 1: 使用部署脚本
./deploy.sh "更新描述"

# 方法 2: 使用 npm 脚本
pnpm deploy

# 方法 3: 手动部署
git add .
git commit -m "更新描述"
git push
```

## 🔍 部署后验证

- [ ] 访问 GitHub Pages URL 确认网站可访问
- [ ] 测试英文版主页 (`/`)
- [ ] 测试中文版页面 (`/zh`)
- [ ] 测试语言切换功能
- [ ] 测试游戏嵌入是否正常工作
- [ ] 测试响应式布局 (手机、平板、桌面)
- [ ] 检查浏览器控制台是否有错误
- [ ] 使用 Google PageSpeed Insights 测试性能
- [ ] 使用 Lighthouse 检查 SEO 和可访问性

## 🐛 常见问题解决

### 问题: 404 页面未找到

**解决方案**:
1. 检查仓库名是否需要 basePath
2. 如果仓库名不是 `username.github.io`,添加:
   ```javascript
   // next.config.js
   basePath: '/仓库名',
   assetPrefix: '/仓库名',
   ```

### 问题: 资源加载失败

**检查**:
- 资源是否在 `public/` 目录
- 路径是否使用了 basePath
- 浏览器控制台的网络请求

### 问题: 语言路由不工作

**确认**:
- `src/i18n/routing.ts` 配置正确
- `middleware.ts` 已正确设置
- 静态导出模式下路由限制

### 问题: 构建失败

**调试步骤**:
1. 查看 Actions 日志详细错误
2. 本地运行 `pnpm build` 重现问题
3. 检查依赖版本兼容性
4. 确认 `pnpm-lock.yaml` 已提交

## 📊 性能优化检查

- [ ] 图片已压缩和优化
- [ ] 使用 WebP 格式 (可选)
- [ ] 字体文件已优化
- [ ] 未使用的依赖已移除
- [ ] 代码已进行 tree-shaking
- [ ] CSS 已压缩
- [ ] JavaScript 已分块加载

## 🔐 安全检查

- [ ] 没有硬编码的 API 密钥
- [ ] 没有提交 `.env` 文件
- [ ] 敏感信息使用环境变量
- [ ] 依赖包没有安全漏洞 (`pnpm audit`)

## 📈 SEO 优化检查

- [ ] 每个页面都有唯一的 title
- [ ] Meta description 已设置
- [ ] Open Graph 标签已配置
- [ ] Twitter Card 已配置
- [ ] 结构化数据 (Schema.org) 已添加 (可选)
- [ ] sitemap.xml 已生成 (可选)
- [ ] robots.txt 已配置 (可选)

## 🌐 多语言检查

- [ ] 所有语言版本都能正常访问
- [ ] 语言切换器工作正常
- [ ] hreflang 标签已设置 (可选)
- [ ] 语言检测正确
- [ ] URL 结构符合预期

## 📱 响应式设计检查

测试设备:
- [ ] iPhone (375px)
- [ ] iPad (768px)
- [ ] Desktop (1024px+)
- [ ] 超宽屏 (1920px+)

测试项目:
- [ ] 布局不破碎
- [ ] 文字可读
- [ ] 按钮可点击
- [ ] 图片自适应
- [ ] 游戏嵌入自适应

## 🎨 视觉检查

- [ ] 配色方案一致
- [ ] 字体加载正确
- [ ] 像素风格保持一致
- [ ] 动画流畅
- [ ] 加载状态友好

## ♿ 可访问性检查

- [ ] 键盘导航可用
- [ ] ARIA 标签已添加
- [ ] 对比度符合 WCAG 标准
- [ ] 替代文本已添加到图片
- [ ] 表单标签正确

## 🚀 准备发布

最终检查:
- [ ] 所有上述项目已完成
- [ ] 团队已审查代码 (如适用)
- [ ] 文档已更新
- [ ] 更新日志已记录 (可选)
- [ ] 版本号已更新

**准备好了? 开始部署! 🎉**

```bash
./deploy.sh "v1.0.0: Initial release"
```

## 📞 获取帮助

如果遇到问题:
1. 查看 `Docs/github-pages-deployment.md` 详细文档
2. 检查 GitHub Actions 日志
3. 搜索相关 Issue
4. 联系团队成员

---

**部署日期**: _____________
**部署人**: _____________
**版本**: _____________
**部署 URL**: _____________
**备注**: _____________

