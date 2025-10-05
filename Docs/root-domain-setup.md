# 设置根域名访问指南

## 目标

将网站从 `https://immortalityfactory.github.io/immortalityfactory/` 改为 `https://immortalityfactory.github.io/`

## 当前状态

- 当前仓库名: `immortalityfactory`
- 当前访问地址: `https://immortalityfactory.github.io/immortalityfactory/`
- 目标访问地址: `https://immortalityfactory.github.io/`

## 解决方案:创建用户/组织站点

GitHub Pages 有两种类型:

1. **项目站点** (当前): `https://username.github.io/project-name/`
2. **用户/组织站点** (目标): `https://username.github.io/`

### 关键区别

| 类型 | 仓库名 | 访问地址 | basePath |
|------|--------|----------|----------|
| 项目站点 | `immortalityfactory` | `https://immortalityfactory.github.io/immortalityfactory/` | 需要 `/immortalityfactory` |
| 用户站点 | `immortalityfactory.github.io` | `https://immortalityfactory.github.io/` | 不需要 |

## 实施步骤

### 步骤 1: 重命名 GitHub 仓库

1. 访问 GitHub 仓库: https://github.com/immortalityfactory/immortalityfactory
2. 点击 **Settings** (设置)
3. 在 "Repository name" 部分
4. 将仓库名改为: `immortalityfactory.github.io`
5. 点击 **Rename** 按钮

⚠️ **注意**: 
- 组织账号的用户站点仓库名必须是 `organization-name.github.io`
- 个人账号的用户站点仓库名必须是 `username.github.io`
- 您的组织名是 `immortalityfactory`,所以仓库名应该是 `immortalityfactory.github.io`

### 步骤 2: 更新本地远程仓库地址

GitHub 会自动重定向旧的仓库地址,但建议更新本地配置:

```bash
cd /Volumes/T7/DocumentT7/WebappWorspace/immortalityfactory

# 更新远程仓库地址
git remote set-url origin https://github.com/immortalityfactory/immortalityfactory.github.io.git

# 验证更新
git remote -v
```

### 步骤 3: 配置已完成

✅ `next.config.js` 已更新,移除了 basePath 配置
✅ 配置文件现在适用于根域名访问

### 步骤 4: 重新构建和部署

```bash
# 本地测试构建
pnpm build

# 提交配置更改
git add .
git commit -m "Configure for root domain deployment"

# 推送到 GitHub 触发部署
git push origin main
```

### 步骤 5: 验证 GitHub Pages 设置

1. 进入仓库的 **Settings** → **Pages**
2. 确认 "Build and deployment" 设置:
   - **Source**: GitHub Actions
3. 等待部署完成 (查看 Actions 标签页)

### 步骤 6: 访问新地址

部署成功后,网站将在以下地址可用:

- 英文主页: `https://immortalityfactory.github.io/`
- 中文页面: `https://immortalityfactory.github.io/zh/`

🎉 不再需要 `/immortalityfactory/` 子路径!

## 验证清单

部署完成后,请检查:

- [ ] 主页能正常访问: https://immortalityfactory.github.io/
- [ ] 中文页面正常: https://immortalityfactory.github.io/zh/
- [ ] 游戏嵌入正常加载
- [ ] 图片资源正常显示
- [ ] 语言切换功能正常
- [ ] 所有链接都指向正确的路径

## 故障排查

### 问题 1: 仍然显示 404

**原因**: GitHub Pages 可能需要时间更新

**解决方案**:
1. 等待 5-10 分钟让 DNS 和缓存更新
2. 清除浏览器缓存
3. 在 Settings → Pages 中检查部署状态

### 问题 2: 资源加载失败

**原因**: basePath 配置问题

**解决方案**:
1. 确认 `next.config.js` 中没有 `basePath` 或 `assetPrefix`
2. 重新构建: `pnpm build`
3. 检查 `out/` 目录中的资源路径

### 问题 3: 旧地址仍然可用

这是正常的! GitHub 会自动从旧地址重定向到新地址:
- `https://immortalityfactory.github.io/immortalityfactory/` → 自动重定向到
- `https://immortalityfactory.github.io/`

## 配置文件更改总结

### next.config.js
```javascript
// 用户站点配置 (无 basePath)
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // 不需要 basePath 和 assetPrefix
}
```

## 优势

使用用户站点的好处:

1. ✅ **更简洁的 URL**: 无需子路径
2. ✅ **更好的 SEO**: 根域名权重更高
3. ✅ **更易记**: 用户更容易记住和分享
4. ✅ **品牌一致性**: URL 直接对应组织名

## 注意事项

⚠️ **每个 GitHub 账号/组织只能有一个用户站点**

如果您需要托管多个项目:
- 用户站点 (这个项目): `immortalityfactory.github.io`
- 其他项目仍然可以作为项目站点: `immortalityfactory.github.io/other-project/`

## 回滚方案

如果需要回到项目站点配置:

1. 将仓库重命名回 `immortalityfactory`
2. 恢复 `next.config.js`:
   ```javascript
   const nextConfig = {
     basePath: '/immortalityfactory',
     assetPrefix: '/immortalityfactory',
     // ... 其他配置
   }
   ```
3. 重新构建和部署

## 相关文档

- [GitHub Pages 文档 - 用户站点](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites)
- [项目部署文档](./github-pages-deployment.md)
- [故障排查指南](./troubleshooting.md)

## 总结

完成上述步骤后,您的网站将从项目站点升级为用户站点,直接在根域名 `https://immortalityfactory.github.io/` 访问,无需子路径!

