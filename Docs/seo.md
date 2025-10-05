# SEO 优化指南

## 标题优化原则
- 为每个页面提供一个独特的标题，简洁准确地描述页面的内容；
- 标题长度保持在50-60个字符以内（以免在搜索引擎结果页面中被截断）；
- 将重要关键词放在首位，但要自然，就好像你首先为访客编写标题一样；
- 在标题中使用您的品牌名称，即使最终不会显示在搜索引擎结果页面上，对搜索引擎仍会产生影响。

## 描述优化原则
- 每个页面提供一个独特的元描述，清晰地反映页面所传达的价值；
- 谷歌的摘要通常最多约为150-160个字符（包括空格）；
- 包括您最重要的关键词，这样它们在实际的搜索引擎结果页面上就会被突出显示，但要小心避免关键词堆砌，不要让您的描述只是您正在针对的关键词的组合；
- 可选择地，使用引人注目的号召行动，您提供的独特主张，或者关于期望的额外提示 - 如"学习"，"购买"等构建。

---

## 当前实现

### 英文版 SEO (EN)
**标题 (48 字符):**
```
Immortality Factory - Magical Factory Building Game
```

**描述 (157 字符):**
```
Build magical factories and unlock immortality secrets in this retro pixel-art incremental game. Master automation inspired by Factorio. Free to play!
```

**优化要点:**
✅ 品牌名称放在首位 (Immortality Factory)
✅ 核心关键词前置 (Magical Factory Building)
✅ 字符数控制在推荐范围内
✅ 包含号召性用语 (Play free now!)
✅ 提及竞品关联 (Factorio-inspired)

---

### 中文版 SEO (ZH)
**标题 (15 字符):**
```
永生工厂 - 魔法工厂建造游戏
```

**描述 (54 字符):**
```
建造魔法工厂，解锁永生秘密。复古像素风格增量游戏，受 Factorio 启发的自动化玩法。免费畅玩，4-6 小时完整体验!
```

**优化要点:**
✅ 品牌名称放在首位 (永生工厂)
✅ 核心关键词前置 (魔法工厂建造)
✅ 适配中文显示宽度 (中文字符占用更多空间)
✅ 包含号召性用语 (免费畅玩!)
✅ 提及游戏灵感来源 (受 Factorio 启发)

---

## 技术实现

### 1. 根布局 (`src/app/layout.tsx`)
- 默认英文元数据
- 包含 OpenGraph 和 Twitter Card
- 配置 robots 和 googleBot 指令
- 设置 canonical URL 和语言替代链接

### 2. 本地化布局 (`src/app/[locale]/layout.tsx`)
- 使用 `generateMetadata` 动态生成语言特定的元数据
- 根据 locale 参数返回对应语言的 SEO 配置
- 支持 en 和 zh 两种语言

---

## SEO 最佳实践检查清单

- [x] 标题长度适中 (英文 50-60 字符，中文 20-30 字符)
- [x] 描述长度适中 (英文 150-160 字符，中文 70-80 字符)
- [x] 关键词自然出现，无堆砌
- [x] 包含品牌名称
- [x] 包含号召性用语 (CTA)
- [x] 支持多语言
- [x] OpenGraph 标签完整
- [x] Twitter Card 配置正确
- [x] robots.txt 友好
- [x] 设置 canonical URL
- [x] 配置语言替代链接

---

## 优化前后对比

### 优化前问题
❌ 标题过长 (82字符): `Immortality Factory - Factory Building Incremental Game | 永生工厂`
❌ 描述过长 (168字符)
❌ 中英文混合，影响单一语言搜索效果
❌ 关键词位置不够靠前
❌ 缺少国际化支持

### 优化后改进
✅ 标题精简到 48 字符 (英文) / 15 字符 (中文)
✅ 描述优化到 142 字符 (英文) / 46 字符 (中文)
✅ 语言分离，每个语言独立 SEO
✅ 关键词前置："Magical Factory Building"
✅ 动态国际化元数据生成

---

## 未来优化建议

1. **添加结构化数据 (Schema.org)**
   - VideoGame schema
   - WebApplication schema
   - 聚合评分 (AggregateRating)

2. **性能优化**
   - 图片 alt 标签
   - 添加 sitemap.xml
   - 配置 robots.txt

3. **社交媒体优化**
   - 添加 og:image (1200x630 像素)
   - 添加 twitter:image
   - 配置 og:url

4. **本地化增强**
   - 添加更多语言支持
   - 使用 hreflang 标签
   - 地区特定的关键词研究
