# Step 2.0-14 Report（详情页布局精修 + 轻量氛围点缀：问题 21–24）
日期：2026-04-21  
范围：Step 2.0-14（增量修正；不重建项目；不新增业务功能；不接真实 AI/云端能力；保留 mock provider 主路线）

## 本轮输入 prompt 原文

见：`2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/step-2.0-14-detail-layout-polish.md`

## 本轮目标（问题 21–24）

- 21：详情页双栏整体重新对齐，减少无意义留白
- 22：修复窗口缩放后的响应式异常（不允许只压一边/把步骤压成细长条）
- 23：营养信息移动到左栏，放在“食材/调料”之后
- 24：适度增加 emoji / 轻符号，增强食欲感与生活气息（不杂乱、不儿童化）

## 为什么当前详情页双栏仍然“不对齐”（问题 21）

- 之前双栏在较小桌面宽度下仍强行保持双栏，叠加侧边栏占位会导致主内容区变窄，从而出现“右栏步骤区被挤成窄条”的观感。
- 左右栏宽度策略不够弹性，缩放时更容易出现“某一栏被挤压更明显”的错觉。

## 我如何重新定义双栏布局关系（问题 21/22）

### 容器与对齐策略
- 详情页主体使用 `detailGrid` 统一承载左右栏，左右栏均为 `min-width:0`，避免内容溢出导致某列无法收缩。
- 底部 `detailActions` 保持在主体内容之后，天然与主体宽度对齐（同处 `.page` 容器内）。

### breakpoint 与布局切换策略（写清规则）

- `<1120px`：单列（避免侧边栏 + 内容区过窄导致步骤区被压成细长条）
- `>=1120px`：双栏（左右按比例共同收缩）  
  - `grid-template-columns: 0.92fr 1.08fr`（右栏略宽，保证步骤阅读宽度）
  - `gap: var(--sp-16)`

对应实现：`1_project_files/cooking-ai-planner/src/styles/app.css` 的 `.detailGrid` 媒体查询。

## 为什么营养信息移动到左栏更合理（问题 23）

- 左栏承载“准备与理解”：基础信息 → 食材/调料 → 营养信息（更像备菜与决策区）。
- 右栏承载“执行与操作”：步骤为主，阅读连续性更强。

## emoji / 轻符号点缀策略（问题 24）

原则：一块区域最多 1 个，不改正文段落，只点缀标题；优先用“做饭相关”符号。

本轮已增加的位置：
- 首页 Hero 标题：`🍳 今天想吃点什么？`（`src/components/home/HomeHero.jsx`）
- 首页模块标题：`✨ 今日灵感`、`🎲 随机一道菜`、`🧑‍🍳 学做饭小贴士`、`💰 省钱计划`（`src/pages/HomePage.jsx`）
- 随机弹窗标题：`🎲 随机一道菜`（`src/components/home/RandomRecipeModal.jsx`）
- 空状态/辅助页标题：收藏 `⭐ 我的收藏`、最近做过 `🍽️ 最近做过`、待购空状态 `🧾 还没有待购清单`、贴士 `📌 新手贴士`（对应页面文件）
- 菜谱详情页区块标题：`🍱 核心食材`、`🥦 食材`、`🧂 调料`、`🥗 营养信息`、`📝 步骤`、`🍵 推荐搭配`（`src/pages/RecipeDetailPage.jsx`）

## 修改文件清单（按类型区分）

### 文件级改动
- 修改：`1_project_files/cooking-ai-planner/src/pages/RecipeDetailPage.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/styles/app.css`
- 修改：`1_project_files/cooking-ai-planner/src/components/home/HomeHero.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/components/home/RandomRecipeModal.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/pages/ShoppingListPage.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/pages/FavoritesPage.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/pages/RecentPage.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/pages/TipsPage.jsx`

### 布局级改动
- `.detailGrid`：双栏规则重定（断点/比例/gap）
- 详情页：营养信息从右栏移动到左栏

### 响应式改动
- 详情页：`<1120px` 单列，`>=1120px` 双栏（共同收缩）

### 视觉点缀改动
- 多处标题增加轻量 emoji（按“每块 1 个”原则）

## before / after 截图说明位置

- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-14-detail-layout-polish/before/`
- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-14-detail-layout-polish/after/`

## 最小验证（已执行）

- `npm.cmd run build`：通过
- dev server smoke：`http://127.0.0.1:5174/`、`/recipes/1` 返回 200

建议你人工核对（对应验收点）：
- 桌面端详情页：双栏顶部对齐、无大块无意义空白
- 缩放窗口：在 1120px 左右切换策略符合预期；步骤区不被压成窄条
- 营养信息：位于左栏且在食材/调料之后
- emoji：适量、整洁、不影响阅读

## 本轮建议 git 记录

- Commit message（建议）：
  - `[step-2.0-14][style] polish recipe detail responsive grid + move nutrition + add light emoji accents`

## 下一轮建议（不在本轮执行）

1) 做 Step 2.0-15 集成/演示打包：验收清单、截图、课堂演示脚本  
2) 若还需更“食欲感”：优先用小图标/插画素材位替代继续堆 emoji  

