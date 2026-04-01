# Tasks: 六爻预测卡片

**Input**: Design documents from `/specs/001-liuyao-card/`
**Prerequisites**: plan.md, spec.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)

---

## Phase 1: 用户故事 1 - 查看六爻预测卡片 (Priority: P1) 🎯 MVP

**Goal**: 在页面中添加六爻预测卡片，支持点击跳转到 https://yao.qdkf.net

**Independent Test**: 打开页面能看到六爻预测卡片，点击后正确跳转

### Implementation for User Story 1

- [ ] T001 [US1] 在 index.html "我的项目" 区块添加六爻预测卡片 HTML 结构
- [ ] T002 [US1] 验证卡片使用正确的 `.link-card` 样式类
- [ ] T003 [US1] 设置链接目标为 https://yao.qdkf.net，在新标签页打开
- [ ] T004 [US1] 桌面端浏览器测试（Chrome/Firefox/Safari）

**Checkpoint**: 用户故事 1 完成 - 卡片显示正常且可点击跳转

---

## Phase 2: 用户故事 2 - 卡片样式适配 (Priority: P2)

**Goal**: 确保卡片在移动端和桌面端都有良好的显示效果

**Independent Test**: 在不同屏幕尺寸下卡片显示正常

### Implementation for User Story 2

- [ ] T005 [US2] 移动端浏览器测试（手机/平板尺寸）
- [ ] T006 [US2] 验证响应式 grid 布局工作正常
- [ ] T007 [US2] 检查卡片与其他项目的对齐和间距

**Checkpoint**: 所有用户故事完成 - 卡片在各种设备上显示正常

---

## Phase 3: 最终验证

- [ ] T008 完整功能回归测试
- [ ] T009 代码提交到 Git 仓库

---

## Dependencies & Execution Order

### 执行顺序

1. **Phase 1**: T001 → T002 → T003 → T004 (顺序执行)
2. **Phase 2**: T005 → T006 → T007 (顺序执行)
3. **Phase 3**: T008 → T009 (顺序执行)

### 任务依赖

- T002 依赖 T001
- T003 依赖 T002
- T004 依赖 T003
- T005 依赖 T004
- T006 依赖 T005
- T007 依赖 T006
- T008 依赖 T007
- T009 依赖 T008

---

## Implementation Strategy

### 简单顺序执行

本功能简单，按顺序执行所有任务即可：
1. 添加 HTML 卡片代码
2. 桌面端测试
3. 移动端测试
4. 提交代码
