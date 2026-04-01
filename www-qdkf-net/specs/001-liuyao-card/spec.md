# Feature Specification: 六爻预测卡片

**Feature Branch**: `001-liuyao-card`  
**Created**: 2026-04-01  
**Status**: Draft  
**Input**: User description: "在项目中添加六爻预测卡片，链接 https://yao.qdkf.net"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 查看六爻预测卡片 (Priority: P1)

用户访问项目页面时，能够看到一个展示六爻预测的卡片组件，点击卡片可跳转到六爻预测网站进行占卜。

**Why this priority**: 这是核心功能，用户添加卡片的主要目的就是在项目中集成六爻预测入口。

**Independent Test**: 可以独立测试卡片的显示和跳转功能，验证点击后是否正确跳转到 https://yao.qdkf.net

**Acceptance Scenarios**:

1. **Given** 用户访问包含六爻卡片的页面, **When** 页面加载完成, **Then** 六爻预测卡片正确显示，包含标题和简介
2. **Given** 用户看到六爻预测卡片, **When** 用户点击卡片, **Then** 在新标签页打开 https://yao.qdkf.net

---

### User Story 2 - 卡片样式适配 (Priority: P2)

六爻预测卡片应该与项目现有设计风格保持一致，具有美观的视觉效果。

**Why this priority**: 视觉一致性影响用户体验，但可以先实现基础功能再优化样式。

**Independent Test**: 可以独立测试卡片在不同屏幕尺寸下的显示效果

**Acceptance Scenarios**:

1. **Given** 用户在桌面端访问, **When** 页面渲染完成, **Then** 卡片显示正常，比例协调
2. **Given** 用户在移动端访问, **When** 页面渲染完成, **Then** 卡片自适应屏幕宽度，显示正常

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系统 MUST 在项目页面中显示六爻预测卡片组件
- **FR-002**: 卡片 MUST 包含六爻预测的标题和简要描述
- **FR-003**: 用户 MUST 能够通过点击卡片跳转到 https://yao.qdkf.net
- **FR-004**: 卡片链接 MUST 在新标签页打开（target="_blank"）
- **FR-005**: 卡片 MUST 响应式设计，适配桌面端和移动端

### Key Entities

- **六爻预测卡片**: 页面UI组件，包含标题、描述和跳转链接
  - 标题：六爻预测
  - 描述：传统周易六爻占卜
  - 链接：https://yao.qdkf.net
  - 打开方式：新标签页

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 用户能够在3秒内找到并识别六爻预测卡片
- **SC-002**: 卡片点击后100%成功跳转到 https://yao.qdkf.net
- **SC-003**: 卡片在主流浏览器（Chrome、Firefox、Safari、Edge）中显示正常
- **SC-004**: 卡片在移动端屏幕（宽度360px以上）显示正常，不出现水平滚动条

## Assumptions

- 项目使用现代前端框架（如Next.js、React、Vue等），支持组件化开发
- 项目已有响应式设计基础，卡片可以复用现有样式系统
- 卡片将被添加到项目首页或导航页面等明显位置
- 六爻预测网站 https://yao.qdkf.net 稳定可访问
