# Implementation Plan: 六爻预测卡片

**Branch**: `001-liuyao-card` | **Date**: 2026-04-01 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-liuyao-card/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

在项目中添加六爻预测卡片组件，用户点击卡片可跳转到 https://yao.qdkf.net 进行在线六爻占卜。该功能是一个简单的静态HTML卡片组件，复用现有的卡片样式系统。

## Technical Context

**Language/Version**: HTML5, CSS3  
**Primary Dependencies**: N/A (纯静态页面)  
**Storage**: N/A  
**Testing**: 手动测试 (浏览器兼容性测试)  
**Target Platform**: Web (桌面端 + 移动端)  
**Project Type**: static-website  
**Performance Goals**: 首屏加载 < 1s  
**Constraints**: 响应式设计，移动端宽度 >= 360px  
**Scale/Scope**: 单页面添加一个卡片组件

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Simplicity**: 功能简单直接，无需过度设计
- [x] **Responsive Design**: 复用现有响应式卡片网格系统
- [x] **External Link Safety**: 使用 target="_blank" 和 rel="noopener noreferrer"
- [x] **No Breaking Changes**: 纯新增功能，不影响现有代码

## Project Structure

### Documentation (this feature)

```text
specs/001-liuyao-card/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
/root/workspaces/www-qdkf-net/
├── index.html           # 主页面 - 添加六爻预测卡片
└── (其他静态资源)
```

**Structure Decision**: 项目为简单静态网站，所有内容都在 index.html 中，无需复杂目录结构。

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
