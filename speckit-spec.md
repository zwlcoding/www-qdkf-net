# 六爻预测项目添加规格

## 任务概述
在 www-qdkf-net 项目的 index.html 中添加「六爻预测」项目展示卡片。

## 修改位置
文件：`/root/workspaces/www-qdkf-net/index.html`

## 具体修改内容

### 添加位置
在「我的项目」区域的 `<ul class="link-card-grid">` 列表中，在「我的博客」卡片之后添加新的项目卡片。

### 新增卡片 HTML 结构
```html
<li class="link-card">
    <a href="https://yao.qdkf.net">
        <h2>
            六爻预测
            <span>&rarr;</span>
        </h2>
        <p>
            基于六爻的在线预测工具
        </p>
    </a>
</li>
```

## 样式要求
- 使用现有的 `.link-card` 类样式
- 保持与「我的博客」卡片完全一致的风格
- 包括悬停效果、渐变动画、箭头图标等

## 项目信息
- 项目名称：六爻预测
- 访问地址：https://yao.qdkf.net
- 简短描述：基于六爻的在线预测工具

## 验收标准
- [ ] 新卡片正确显示在「我的博客」之后
- [ ] 链接指向 https://yao.qdkf.net
- [ ] 样式与现有卡片完全一致
- [ ] 悬停效果正常工作
