# Step 2.0-10 Report（视觉与布局修正 / P0）

日期：2026-04-21  
范围：Step 2.0-10（不重建、不推翻技术路线；不改业务逻辑；仅做视觉与布局修正）

## 本轮输入 prompt 原文

见：`2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/step-2.0-10-visual-layout-adjust.md`

## AI 输出方案摘要

目标分三块做“全站统一、只改样式/布局、不改业务”：
1) 全局色彩重定向：把主强调色统一为橙色 `#ff7c24`（仅用于 CTA / 当前态 / badge 等），背景与次级底色按规范改为 `#faf9f5` / `#f3f3ec`，并用 CSS variables 管理，避免散落硬编码。  
2) 桌面布局加宽：提升桌面端整体框架可用宽度，使主内容区看起来不再像“窄屏拉宽”。  
3) 首页 Hero 输入区加宽：通过“首页宽版壳 + 首页主列宽度”加宽 Hero 所在主列，且不挤压右侧辅助区。

## 为什么要做全局色彩重定向（P0）

- 2.0 的高保真需要“统一的主强调色”来承载 CTA、选中态与关键反馈；当前站点仍残留紫色体系，导致品牌感与产品感不一致。  
- 用 tokens 收敛颜色可以降低后续迭代成本，避免跨页面出现不同色值的“漂移”。

## 为什么首页 Hero 区要放大（P0）

- Hero 是 2.0 首屏主任务入口（输入目标 → 生成），宽度与视觉权重不足会削弱“桌面网页产品感”和引导效率。  
- 放大 Hero（主列加宽）能让输入更舒展、CTA 更集中，同时保留右侧辅助区而不互相挤压。

## 旧布局 vs 新布局（差异说明）

- 旧：桌面端整体最大宽度与主内容壳偏窄，主页主列宽度不足，Hero 的“网页端焦点”不突出。  
- 新：提升 `v2Frame` 最大宽度；增加桌面端 `appShell` 常规页面宽度；主页 `appShell--wide` 与 `homeV2__grid` 主列显著加宽，右侧栏保持固定宽度不压缩主列。

## 旧色彩 vs 新色彩（差异说明）

- 旧：以紫色作为主强调，背景偏冷；多个交互态与 focus ring 使用紫色硬编码。  
- 新：背景统一为 `#faf9f5`，次级浅底块为 `#f3f3ec`；主强调统一为 `#ff7c24`，并通过 `--c-primary/--c-primary-rgb` 统一驱动：主 CTA、导航选中态、badge、弹窗主按钮、关键 hover/active 反馈等；正文/边框保持克制中性。

## 文件级改动（File-level）

| 类型 | 文件 | 说明 |
|---|---|---|
| 修改 | `1_project_files/cooking-ai-planner/src/styles/tokens.css` | 新增/重定向全局 tokens：背景、次级底色、主强调橙（含 rgb 变量） |
| 修改 | `1_project_files/cooking-ai-planner/src/styles/global.css` | 全站背景基调调整为 `#faf9f5` + 克制渐变点缀（不大面积橙） |
| 修改 | `1_project_files/cooking-ai-planner/src/styles/app.css` | 替换旧紫色硬编码为 tokens；主 CTA/导航当前态/badge/关键 focus ring 统一橙色；桌面端壳加宽、首页主列加宽 |
| 修改 | `1_project_files/cooking-ai-planner/src/components/p5/P5HeroDecoration.jsx` | 装饰模块颜色与 2.0 主强调色对齐（仍可独立开关） |
| 新增 | `2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/step-2.0-10-visual-layout-adjust.md` | 本轮 prompt log |
| 新增 | `2_coding_documentation/08_v2_upgrade/02_step_reports_v2/step-2.0-10-report.md` | 本轮 step report |

## 代码级改动（Code-level）

- 仅样式与 tokens/布局参数调整；未改动业务逻辑、数据结构、mock AI 链路与路由结构。

## 视觉/样式级改动（Visual-level）

- 背景基调：`#faf9f5`  
- 次级浅底块：`#f3f3ec`（secondary/ghost 类型按钮）  
- 主强调色：`#ff7c24`（主 CTA、当前态、badge、弹窗主按钮、关键 focus ring 等）  
- 桌面整体加宽 + 首页 Hero 主列显著加宽（约为原主列宽度的 1.5 倍级别）

## before / after 截图说明位置

- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-10-visual-layout-adjust/before/`
- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-10-visual-layout-adjust/after/`

> 注：当前环境 headless 自动截图受限，建议在本机浏览器手动截图覆盖同名文件（README 会写清路径与建议页面）。

## 运行与验证（最小验证）

- `npm.cmd run build`：通过  
- dev server：使用 `npm.cmd run dev -- --host 127.0.0.1 --port 5174` 启动后，HTTP 访问 `http://127.0.0.1:5174/` 返回 200 且含 `#root`（说明首页可打开）  
- 人工检查要点（建议你打开浏览器确认）：  
  - 首页 Hero 区是否明显变宽（桌面端）  
  - 主 CTA、导航选中态、badge 是否为橙色强调  
  - 页面背景是否为 `#faf9f5` 基调  
  - 页面跳转与既有交互不受影响

## 已知问题 / 风险记录（与本轮相关）

- 风险：全局 tokens 重定向可能导致少量组件对比度变化；已通过统一 focus ring/选中态颜色兜底，但仍建议快速人工回归关键页面。  
- 环境限制：当前环境不便自动化截图（headless 报权限拒绝），本轮仅提供截图目录与手动补齐说明。

## 本轮建议 git commit message

`[step-2.0-10][style] unify orange accent + widen desktop shell + enlarge home hero`

