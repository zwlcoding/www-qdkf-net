# PRD 文档：渊渟集团官网导航与性能优化

**项目名称**：渊渟集团官网导航与性能优化  
**版本**：1.0  
**日期**：2026-04-02  
**状态**：待评审

---

## 1. 需求概述

渊渟集团官网（www.qdkf.net）自上线以来，运行稳定，但在移动端体验和性能方面存在优化空间。本次需求聚焦于以下三个优化点：

| 需求编号 | 需求名称 | 优先级 | 预计工时 |
|---------|---------|-------|---------|
| REQ-001 | 导航栏滚动背景渐变 | P1 | 0.5d |
| REQ-002 | 移动端菜单按钮修复 | P1 | 0.5d |
| REQ-003 | Google 字体替换 | P2 | 0.5d |

### 1.1 背景

渊渟集团官网采用东方禅意极简风格，当前技术栈为纯 HTML/CSS/JS，无前端框架依赖。网站部署于 Cloudflare Pages，内容存储于 GitHub 仓库。

### 1.2 目标用户

- **主要用户**：移动端访问者（约占 60% 流量）
- **次要用户**：桌面端访问者

---

## 2. 功能详细说明

### 2.1 REQ-001：导航栏滚动背景渐变

#### 2.1.1 现状分析

**当前行为**：
- 导航栏在所有页面状态下始终保持透明（`background-color: transparent`）
- 页面滚动时，`.navbar.is-scrolled` 类被添加，瞬间切换背景色为 `rgba(250, 248, 245, 0.98)`
- 这种切换是 abrupt（突变）的，缺乏过渡效果

**问题**：
- 滚动时文字与 Hero 区内容重叠，可读性差
- 背景切换过于生硬，影响视觉体验

#### 2.1.2 期望行为

1. **初始状态**：导航栏完全透明
2. **滚动触发**：当 `window.scrollY > 50px` 时，开始应用背景
3. **过渡效果**：背景从 `rgba(250, 248, 245, 0)` 平滑过渡到 `rgba(250, 248, 245, 0.98)`
4. **过渡时长**：约 300ms，使用 ease-out 缓动函数

#### 2.1.3 交互逻辑

```
┌─────────────────────────────────────────────────────────────┐
│                      页面滚动事件                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ scrollY > 50px? │
                    └─────────────────┘
                     /             \
                  是                否
                 /                   \
        ┌───────────────┐     ┌───────────────┐
        │ 添加 .is-     │     │ 移除 .is-     │
        │ scrolled 类   │     │ scrolled 类   │
        └───────────────┘     └───────────────┘
                │                     │
                ▼                     ▼
        ┌─────────────────────────────────┐
        │ CSS transition 自动处理平滑过渡  │
        └─────────────────────────────────┘
```

#### 2.1.4 视觉规范

| 状态 | 背景色 | 过渡时间 | 缓动函数 |
|-----|-------|---------|---------|
| 页面顶部（scrollY ≤ 50） | `rgba(250, 248, 245, 0)` | - | - |
| 滚动中（scrollY > 50） | `rgba(250, 248, 245, 0.98)` | 300ms | `cubic-bezier(0.22, 1, 0.36, 1)` |

**CSS 变更范围**（`styles/navbar.css`）：

```css
/* 修改前 */
.navbar.is-scrolled {
  background-color: rgba(250, 248, 245, 0.98);
}

/* 修改后 */
.navbar {
  background-color: rgba(250, 248, 245, 0);
  transition: background-color 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.navbar.is-scrolled {
  background-color: rgba(250, 248, 245, 0.98);
  /* 保留原有的 backdrop-filter 和 box-shadow */
}
```

---

### 2.2 REQ-002：移动端菜单按钮修复

#### 2.2.1 现状分析

**当前代码结构**（已存在）：
- `index.html` 第 42-48 行：汉堡按钮（`.navbar-toggle`）
- `index.html` 第 50-51 行：遮罩层（`.navbar-overlay`）
- `index.html` 第 27-37 行：导航菜单（`.navbar-nav`）
- `scripts/navbar.js`：事件绑定逻辑

**预期行为**：
- 点击汉堡按钮 → 菜单从右侧滑入
- 点击遮罩层 → 菜单关闭
- 点击导航链接 → 菜单关闭
- 按 ESC 键 → 菜单关闭

**实际行为**：汉堡按钮点击无反应

#### 2.2.2 问题诊断

基于代码审查，可能的问题原因：

1. **JavaScript 初始化时机**：脚本加载于页面底部，但 `DOMContentLoaded` 事件监听可能存在竞态条件
2. **事件委托缺失**：直接绑定到 `navbarToggle` 元素，可能在某些移动端浏览器中失效
3. **CSS 层级问题**：`.navbar-toggle` 的 z-index 可能被覆盖

#### 2.2.3 修复方案

**方案 A：增强型事件绑定（推荐）**

```javascript
// 在 scripts/navbar.js 中增强事件绑定
function init() {
  // 滚动监听
  // ... 现有代码保持不变 ...
  
  // 移动端菜单切换 - 使用事件委托 + 直接绑定双重保障
  if (navbarToggle) {
    // 直接绑定
    navbarToggle.addEventListener('click', toggleMenu, { passive: true });
    
    // 触摸事件兼容（针对某些移动端浏览器）
    navbarToggle.addEventListener('touchend', function(e) {
      e.preventDefault();
      toggleMenu();
    }, { passive: false });
  }
}
```

**方案 B：CSS 修复**

```css
/* styles/responsive.css - 确保按钮层级正确 */
.navbar-toggle {
  display: flex;
  z-index: calc(var(--z-fixed) + 10);  /* 从 +1 提升到 +10 */
  position: relative;
}
```

#### 2.2.4 验收标准

| 序号 | 测试场景 | 预期结果 | 测试方法 |
|-----|---------|---------|---------|
| 2.1 | iOS Safari 点击汉堡按钮 | 菜单从右侧滑入 | 手动测试 |
| 2.2 | Android Chrome 点击汉堡按钮 | 菜单从右侧滑入 | 手动测试 |
| 2.3 | 点击遮罩层 | 菜单平滑关闭 | 手动测试 |
| 2.4 | 点击导航链接 | 菜单关闭，页面滚动到对应区域 | 手动测试 |
| 2.5 | 按 ESC 键 | 菜单关闭 | 手动测试 |
| 2.6 | 旋转设备（横屏） | 菜单正确显示，关闭后布局恢复 | 手动测试 |

---

### 2.3 REQ-003：Google 字体替换

#### 2.3.1 现状分析

**当前实现**（`index.html` 第 10-13 行）：
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**问题**：
- Google Fonts 在中国大陆无法稳定访问
- 字体加载失败或超时导致页面渲染延迟
- 影响 Core Web Vitals 中的 LCP（Largest Contentful Paint）指标

#### 2.3.2 期望行为

1. 移除所有 Google Fonts 外部链接
2. 使用系统字体栈作为主字体方案
3. 保持现有的衬线字体风格（Noto Serif SC 风格）
4. 确保中西文混排时的字体一致性

#### 2.3.3 技术方案

**字体栈设计**（按优先级排列）：

```css
/* styles/variables.css - 修改字体变量 */
--font-serif: 'Noto Serif SC', 'Source Han Serif CN', 'Songti SC', 'SimSun', 'STSong', serif;
```

**CSS 优先级说明**：

| 优先级 | 字体名称 | 平台/来源 | 字重支持 |
|-------|---------|----------|---------|
| 1 | Noto Serif SC | 用户系统（如已安装） | 400-700 |
| 2 | Source Han Serif CN | Adobe / 思源宋体（系统可能预装） | 400-700 |
| 3 | Songti SC | macOS 中文系统默认 | 400-700 |
| 4 | SimSun | Windows 宋体 | 400（仅 normal） |
| 5 | STSong | 旧版 macOS | 400 |

**HTML 修改**：

```html
<!-- 删除以下代码（index.html 第 10-13 行） -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**备选方案：字节跳动国内 CDN（如主方案不可行）**：

如需保留部分自定义字体，可使用国内 CDN：

```html
<!-- 仅作为备选，不推荐使用 -->
<link href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.css.loli.net/ajax/libs/noto-serif-sc/1.0.0/noto-serif-sc.min.css" rel="stylesheet">
```

**注意**：备选方案引入外部依赖，不推荐使用。

---

## 3. 技术建议

### 3.1 代码变更范围

| 文件 | 变更类型 | 说明 |
|-----|---------|------|
| `index.html` | 删除 | 移除 Google Fonts 链接（第 10-13 行） |
| `styles/navbar.css` | 修改 | 添加 transition 到 `.navbar` |
| `styles/variables.css` | 修改 | 更新 `--font-serif` 变量 |
| `scripts/navbar.js` | 修改 | 增强移动端按钮事件绑定 |

### 3.2 性能优化预期

| 指标 | 当前值（预估） | 优化后（预期） | 说明 |
|-----|---------------|---------------|------|
| LCP | ~3.2s | ~1.8s | 移除字体阻塞渲染 |
| FCP | ~2.1s | ~1.5s | 减少外部请求 |
| 网络请求数 | 8 | 5 | 移除 3 个 Google Fonts 请求 |

### 3.3 兼容性建议

- iOS Safari 12+
- Android Chrome 80+
- 桌面端 Chrome/Edge/Firefox/Safari 最近两个大版本

---

## 4. 验收标准

### 4.1 REQ-001 验收

- [ ] 页面顶部（未滚动）时，导航栏完全透明
- [ ] 向下滚动超过 50px 时，背景开始渐变显现
- [ ] 继续滚动，背景过渡平滑，无闪烁
- [ ] 向上滚动回到顶部，背景平滑消失
- [ ] 过渡时间约 300ms，视觉感受自然

### 4.2 REQ-002 验收

- [ ] iOS Safari 点击汉堡按钮，菜单从右侧滑入
- [ ] Android Chrome 点击汉堡按钮，菜单从右侧滑入
- [ ] 菜单内容包含：首页、理念、管理、产品、联系
- [ ] 点击遮罩层，菜单关闭
- [ ] 点击导航链接，菜单关闭且页面滚动正常
- [ ] 按 ESC 键，菜单关闭

### 4.3 REQ-003 验收

- [ ] `index.html` 中不包含 `fonts.googleapis.com` 链接
- [ ] 页面在无网络环境下可正常显示字体（使用系统字体）
- [ ] 中文字体保持衬线风格，与原设计一致
- [ ] 西文字符使用衬线字体（Georgia 或 Times New Roman）

### 4.4 回归测试

- [ ] 桌面端导航栏样式正常
- [ ] 移动端导航栏样式正常
- [ ] 各区块锚点跳转功能正常
- [ ] 页面在各主流浏览器中无明显样式差异

---

## 5. 交付物清单

| 交付物 | 文件路径 | 说明 |
|-------|---------|------|
| 修改后的 `index.html` | `/index.html` | 删除 Google Fonts 链接 |
| 修改后的 `styles/navbar.css` | `/styles/navbar.css` | 添加过渡效果 |
| 修改后的 `styles/variables.css` | `/styles/variables.css` | 更新字体栈 |
| 修改后的 `scripts/navbar.js` | `/scripts/navbar.js` | 增强事件绑定 |

---

## 6. 风险与限制

| 风险 | 等级 | 应对措施 |
|-----|-----|---------|
| 移动端浏览器兼容性问题 | 中 | 使用事件委托 + 直接绑定双重保障 |
| 系统字体显示效果不一致 | 低 | 字体栈覆盖主流系统，仍有差异属可接受范围 |
| 回归测试遗漏 | 中 | 建议在发布前进行完整页面遍历测试 |

---

**文档结束**