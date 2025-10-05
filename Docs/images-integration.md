# 游戏截图集成说明

## 更新日期
2025年10月5日

## 截图文件

### 📁 文件位置
`/public/screenshots/`

### 📸 截图清单

#### 1. factory-layout.png (原 1.png)
- **尺寸**: 2.9MB
- **内容**: 大规模工厂布局全景图
- **特点**: 
  - 展示复杂的生产线网络
  - 多个工厂区域互联
  - 类似 Factorio 的俯视图
  - 像素艺术风格
- **使用位置**:
  - 主页故事部分（16:9 大图）
  - 游戏特色 Feature 1（工厂建造系统）

**Alt 文本：**
- 英文: "Factory building system with Factorio-style automated production line layout"
- 中文: "工厂建造系统 - Factorio风格的自动化生产线布局"

#### 2. recipe-book.png (原 2.png)
- **尺寸**: 480KB
- **内容**: 配方书/合成界面
- **特点**:
  - 展示多个魔法材料图标
  - 网格式布局
  - 各种颜色的魔法符文
  - 右侧有工具栏
- **使用位置**:
  - 游戏特色 Feature 2（资源管理系统）

**Alt 文本：**
- 英文: "Magic resource management showing complex magical material production chains and recipe system"
- 中文: "魔法资源管理 - 复杂的魔法材料生产链和配方系统"

---

## 代码实现

### Next.js Image 组件优化

#### 主游戏截图（故事部分）
```tsx
<div className="mb-6 relative w-full aspect-video border-2 border-primary overflow-hidden">
  <Image
    src="/screenshots/factory-layout.png"
    alt={t.gameplayImageAlt}
    fill
    className="object-cover"
    priority
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
  />
</div>
```

**属性说明：**
- `fill`: 填充父容器
- `priority`: 优先加载（首屏图片）
- `object-cover`: 保持宽高比裁剪
- `sizes`: 响应式图片尺寸

#### Feature 图片（特色部分）
```tsx
<div className="relative w-full h-48 border border-primary overflow-hidden mb-2">
  <Image
    src="/screenshots/factory-layout.png"
    alt={t.factoryImageAlt}
    fill
    className="object-cover object-center"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>
```

**属性说明：**
- `h-48`: 固定高度 192px
- `object-center`: 居中裁剪
- `sizes`: 桌面端占 50% 宽度

---

## SEO 优化效果

### 1. 图片 Alt 属性
所有图片都配备了详细的 alt 描述：

✅ **描述性强**
- 不只是"游戏截图"
- 具体说明展示的内容："工厂布局"、"配方系统"

✅ **关键词自然融入**
- "Factorio-style" - 关联知名游戏
- "automated production line" - 核心玩法
- "magical material" - 游戏主题

✅ **支持图片搜索**
- Google Images 可索引
- 用户搜索"factorio like games"可能找到

### 2. 图片尺寸优化

| 图片 | 原始尺寸 | 显示位置 | 优化方案 |
|------|---------|---------|---------|
| factory-layout.png | 2.9MB | 16:9 主图 | `priority` 预加载 |
| recipe-book.png | 480KB | 方形特色图 | 懒加载（默认） |

### 3. 响应式设计

**移动端 (< 768px):**
- 图片占满宽度 (100vw)
- 保持宽高比

**平板/桌面 (> 768px):**
- 主图最大 1200px
- Feature 图各占 50%

---

## 性能考虑

### Next.js Image 优势
虽然设置了 `unoptimized: true`（静态导出需要），但仍保留：
- ✅ 响应式 `sizes` 属性
- ✅ 懒加载（非 priority 图片）
- ✅ `fill` 布局防止抖动

### 建议的图片优化（可选）
如果想进一步减小文件大小：

```bash
# 使用 ImageOptim 或命令行工具
pnpm add -D sharp
```

然后手动优化：
1. factory-layout.png: 2.9MB → 目标 < 500KB
2. recipe-book.png: 480KB → 已经很好

---

## 文件结构

```
public/
├── screenshots/          ← 所有游戏截图
│   ├── factory-layout.png   (工厂布局)
│   └── recipe-book.png      (配方书)
├── fonts/               ← 字体文件
└── game.html            ← 游戏主文件
```

---

## 测试清单

访问页面检查：
- [ ] http://localhost:3002/ - 图片加载正常
- [ ] http://localhost:3002/zh - 中文 alt 文本正确
- [ ] http://localhost:3002/en - 英文 alt 文本正确
- [ ] 移动端响应式正常
- [ ] 图片不变形、不模糊
- [ ] Alt 文本在图片未加载时显示

使用浏览器开发者工具：
- [ ] Network 面板查看图片加载
- [ ] Lighthouse 检查图片优化建议
- [ ] 检查 `<img>` 标签的 alt 属性

---

## Google Images SEO 检查

### 确保图片可被搜索引擎发现

1. **结构化数据** (可选优化)
```json
{
  "@type": "ImageObject",
  "url": "https://yourdomain.com/screenshots/factory-layout.png",
  "description": "Factory building system with Factorio-style layout",
  "contentUrl": "https://yourdomain.com/screenshots/factory-layout.png"
}
```

2. **sitemap.xml 包含图片** (可选)
```xml
<url>
  <loc>https://yourdomain.com/</loc>
  <image:image>
    <image:loc>https://yourdomain.com/screenshots/factory-layout.png</image:loc>
    <image:caption>Immortality Factory gameplay</image:caption>
  </image:image>
</url>
```

---

## 更新总结

### ✅ 完成的工作
1. 重命名文件夹: `screenshopt` → `screenshots`
2. 重命名图片为语义化名称
3. 使用 Next.js Image 组件替换占位符
4. 配置响应式 sizes 属性
5. 添加详细的 alt 文本
6. 优化首屏图片加载（priority）

### 📈 SEO 改进
- 图片 alt 属性 100% 覆盖
- 支持 Google Images 搜索
- 关键词自然融入描述
- 响应式图片优化

### 🎯 用户体验提升
- 真实游戏截图增强信任感
- 视觉化展示游戏特色
- 移动端友好显示

---

**图片集成完成** ✅

页面现在有真实的游戏截图，SEO 和用户体验都得到了显著提升！

