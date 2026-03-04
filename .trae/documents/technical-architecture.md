# 技术方案：主题色变量化与全局替换

## 现状
- 项目为纯静态页面：
  - HTML：[index.html](file:///mnt/trae/file/workspace/index.html)
  - CSS：[styles.css](file:///mnt/trae/file/workspace/styles.css)
  - JS：[script.js](file:///mnt/trae/file/workspace/script.js)
- 主题色在 `styles.css` 中以多处硬编码形式出现（渐变、阴影、边框、浅底、文字色等）。

## 目标
- 通过 CSS 变量实现主题色集中配置。
- 将所有“主题相关颜色”替换为变量引用，做到可维护、可快速换肤。

## 设计原则
- 单一来源：主题色只在 `:root` 定义一次。
- 语义命名：变量按用途命名（primary/surface/border/shadow），避免按具体色值命名。
- 可扩展：允许未来新增深色模式或多主题（变量层面可覆盖）。

## 实施方案
### 1) 新增主题变量（styles.css）
在 `styles.css` 顶部增加：
- `--theme-bg-start / --theme-bg-end`：页面背景渐变
- `--theme-primary-1 / --theme-primary-2`：主渐变色两端（按钮/标题/进度条填充）
- `--theme-accent`：强调文字色（单词、统计数字、标题小节等）
- `--theme-surface-tint`：浅色块背景（example/stat-item/history-item 等）
- `--theme-border`：浅描边（卡片边框/分隔）
- `--theme-shadow`：主题阴影（卡片/按钮/hover）

说明：
- 变量值采用 PRD 中的默认方案（Aurora Teal），但允许后续按需调整。
- 中性色（`--text-strong/#333`、`--text-muted/#666`）建议保留为独立变量或沿用现状，避免主题替换影响可读性。

### 2) 颜色替换策略
将以下类别的硬编码替换为变量：
- 渐变：header、主按钮、播放按钮、进度条填充
- 主题文字：`.word`、`.stats-card h3`、`.stat-number`、`.history-section h3`、`.history-word`
- 浅底与边框：`.word-card`、`.stats-card`、`.history-section`、`.example`、`.stat-item`、`.history-item`、`.progress-bar`
- 阴影：统一引用 `--theme-shadow` 或在需要时用透明度更深的一档变量

不替换（或谨慎替换）：
- 正文文本与辅助文本的中性色（#333/#666）
- 与主题无关的纯白背景（white）可保留，除非需要整体“冷白化”

### 3) 验证方式
本地打开 `index.html`：
- 检查 Header、按钮、进度条、卡片边框/阴影、强调文字是否统一变更为新主题色。
- 检查 hover 状态（卡片上浮、按钮阴影）是否与新主题一致。
- 全局搜索旧主题色（如 `#ff69b4/#ff1493/#ffeef8/#fff5f8`）应不再用于主题用途。

## 影响范围
- 仅修改 `styles.css`（预期主要工作量集中于颜色定义与替换）。
- HTML/JS 不需要变更。

## 可选扩展（非本次必须）
- 增加 `data-theme` 或 `prefers-color-scheme` 的主题覆盖层，支持深色模式与多主题切换。

