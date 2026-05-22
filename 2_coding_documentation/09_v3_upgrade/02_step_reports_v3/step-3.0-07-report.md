# Step 3.0-07 Report - Utility And First-level Page UI Alignment

Date: 2026-05-23

## 本轮目标

整理首页右侧辅助模块与已有一级页面，使随机一道菜、做饭小贴士、待购清单、我的收藏、最近做过、新手贴士统一到 3.0 的卡片、圆角和间距规范。

## AI 输出方案摘要

- 保留随机一道菜的首页入口、弹窗、再摇一次和查看详情能力。
- 降低首页“学做饭小贴士”的信息密度，从 4 条压缩为 3 条短句。
- 为待购清单、我的收藏、最近做过、新手贴士补充统一的 3.0 页面 hero。
- 统一一级页面卡片系统：更大圆角、更一致的间距、更清晰的主/辅页面定位。
- 修复本轮触达页面中的可见中文文案，避免局部乱码影响演示。

## 文件级改动说明

- `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
  - 随机一道菜入口改为轻量工具卡；做饭小贴士减少信息密度。
- `1_project_files/cooking-ai-planner/src/components/home/RandomRecipeModal.jsx`
  - 保留随机弹窗能力并修复文案：再摇一次、查看详情、关闭。
- `1_project_files/cooking-ai-planner/src/pages/ShoppingListPage.jsx`
  - 增加 3.0 页面 hero，统一空状态和清单卡片样式。
- `1_project_files/cooking-ai-planner/src/pages/FavoritesPage.jsx`
  - 增加 3.0 页面 hero，统一搜索/筛选控制卡和空状态。
- `1_project_files/cooking-ai-planner/src/pages/RecentPage.jsx`
  - 增加 3.0 页面 hero，保持空状态和已有记录展示两种路径。
- `1_project_files/cooking-ai-planner/src/pages/TipsPage.jsx`
  - 增加 3.0 页面 hero，明确该页为辅助沉淀页。
- `1_project_files/cooking-ai-planner/src/components/tips/TipCard.jsx`
  - 修复贴士卡片中文文案。
- `1_project_files/cooking-ai-planner/src/data/tipsCatalog.js`
  - 修复贴士数据文案。
- `1_project_files/cooking-ai-planner/src/styles/app.css`
  - 新增 `v3PageHero`、`v3ControlCard`、`v3EmptyState`、`utilityCard` 等统一样式。

## 代码级改动说明

- 没有改动收藏、待购清单、最近做过的 localStorage 数据结构。
- 没有改动随机菜谱的候选池与详情跳转逻辑。
- 没有新增真实 AI 或远端能力。
- 本轮主要通过页面结构类名和样式类统一 UI，业务状态仍沿用原 hooks。

## 主流程页与辅助页说明

- 主流程页：
  - 首页：输入目标、生成菜谱、进入任务系统。
  - 菜谱结果页：查看生成结果并进入详情。
  - 菜谱详情页：学习步骤、加入待购、标记做过。
  - 任务详情页：查看小教程并领取 XP。
- 辅助页：
  - 待购清单：做饭前准备工具。
  - 我的收藏：复练和备选菜谱。
  - 最近做过：复盘记录。
  - 新手贴士：技巧沉淀。
  - 设置页：AI 配置与系统偏好。

## 新旧 UI 统一规则

- 新页面优先使用大圆角 hero + 浅底卡片。
- 一级页顶部统一使用标题、说明和右侧摘要 badge。
- 空状态统一使用 `v3EmptyState`，保持演示时的可读性。
- 首页右侧工具保持轻摘要，详细交互进入弹窗或页面。
- 主流程强调操作，辅助页强调扫读和复盘。

## 运行与验证

- `npm.cmd run build`: passed
- Vite preview 访问地址：`http://127.0.0.1:4173/cooking-ai-planner/`
- 截图状态：本轮尝试使用 headless Edge/Chrome 截图，但当前环境出现 Crashpad 权限错误且自动提权审批超时，未生成 after 截图文件。
- 可手动验证页面：
  - `http://127.0.0.1:4173/cooking-ai-planner/`
  - `http://127.0.0.1:4173/cooking-ai-planner/#/tips`
  - `http://127.0.0.1:4173/cooking-ai-planner/#/recent`

## Git 记录

Planned commit message:

```text
[step-3.0-07][style] align utility cards and first-level pages
```

## 本轮验收

- 随机一道菜入口、弹窗、再摇一次、查看详情仍保留。
- 首页做饭小贴士信息密度降低。
- 待购清单、我的收藏、最近做过、新手贴士具备统一 3.0 页面头部与卡片风格。
- 最近做过空状态可演示，已有记录路径也保留。

## 下一步建议

执行 Step 3.0-08 时，将本轮沉淀出的页面/卡片/按钮风格整理为更系统的 UI token 与组件规范。
