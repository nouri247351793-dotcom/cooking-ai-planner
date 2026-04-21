# Step 11 - p5-hero-decoration（Step Report）

## 本轮目标

- 在首页增加轻量 p5.js 装饰模块（手账感、年轻），不遮挡输入区与主按钮、不影响主功能与移动端交互。
- 装饰组件可独立开关，并提供“一键卸载”脚本。

## 修改文件清单

- 新增：
  - `1_project_files/cooking-ai-planner/src/components/p5/P5HeroDecoration.jsx`
  - `1_project_files/cooking-ai-planner/public/vendor/p5.min.js`
  - `scripts/uninstall-p5-hero.ps1`
  - `2_coding_documentation/01_prompt_logs/step-11-p5-hero-decoration.md`
  - `2_coding_documentation/02_step_reports/step-11-report.md`
- 修改：
  - `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
  - `1_project_files/cooking-ai-planner/src/styles/app.css`
  - `1_project_files/cooking-ai-planner/src/store/storageKeys.js`
  - `1_project_files/cooking-ai-planner/package.json`
  - `1_project_files/cooking-ai-planner/package-lock.json`

## 设计说明

### 为什么 p5.js 只做增强，不做主结构

- 主结构必须稳定：输入/筛选/生成/收藏/待购是课堂 MVP 的核心路径，不能被视觉模块绑架或影响可用性。
- p5 的价值是“氛围与记忆点”：用于课堂演示更吸引人，但必须可随时关闭/卸载，确保功能优先。
- 降低风险：把 p5 作为独立组件与可选模块，后续出现性能/兼容性问题可快速移除，不影响业务代码。

### 性能与交互保证

- 不遮挡：装饰区在首页顶部独立卡片内，Canvas `pointer-events: none`，不抢触控。
- 懒加载：p5 以 `public/vendor/p5.min.js` 脚本方式按需加载，不打进主 bundle。
- 低负载：帧率较低、画面简单，且支持 `prefers-reduced-motion`。

### 独立开关

- 首页提供开关：
  - 关闭：顶部卡片右上角 `✕`
  - 关闭后会显示“装饰已关闭 / 开启装饰”小条，可随时恢复
- 持久化：
  - localStorage key：`cooking_ai_planner.ui.p5_hero.enabled.v1`

## 如何卸载这一模块（一键卸载）

在仓库根目录运行（PowerShell）：

`powershell -ExecutionPolicy Bypass -File scripts/uninstall-p5-hero.ps1`

脚本会执行：
- `npm.cmd uninstall p5`
- 删除 `src/components/p5/`
- 删除 `public/vendor/p5.min.js`
- 从 `HomePage.jsx` 移除装饰区（通过标记块 `p5-hero-decoration:start/end`）
- 从 `storageKeys.js` 移除 `p5HeroEnabled` key（如存在）

## 它对课堂展示有什么帮助

- 强化“vibe coding”氛围：把同学的注意力先抓住，再讲核心的数据流与 RAG-ready 链路。
- 视觉记忆点：让首页更像一个“学习规划工具”而不是表单页，但不牺牲可用性。
- 可控演示：可一键关闭/卸载，保证课堂现场不会因为动画或设备差异影响主流程。

## 自测结果

- [x] `npm run build` 通过
- [x] 首页加载后不遮挡输入区与主按钮，点击/滚动交互正常
- [x] 关闭装饰后不会加载 p5 脚本（装饰组件不渲染）

