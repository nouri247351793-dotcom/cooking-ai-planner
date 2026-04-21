# Step 2.0-13 Report（清单/收藏/详情/最近做过 联动修正：问题 14–20）
日期：2026-04-21  
范围：Step 2.0-13（增量修正；不重建项目；不接真实 AI；不新增云端能力；保留 mock provider 主路线）

## 本轮输入 prompt 原文

见：`2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/step-2.0-13-list-favorites-detail-recent.md`

## 本轮目标

- 问题 14：待购清单首页分组卡片尺寸与对齐统一
- 问题 15：清单详情页桌面端左右分栏（左：食材；右：调料+器具）
- 问题 16：删除清单详情标题左侧重复返回按钮
- 问题 17：我的收藏页卡片尺寸与对齐统一
- 问题 18：菜谱详情页桌面端分栏优化（提升横向空间利用率）
- 问题 19：删除菜谱详情标题左侧重复返回按钮
- 问题 20：菜谱详情页新增“我做了”按钮，打通“最近做过”展示闭环

## 本轮开始前说明（执行手册要求）

### 预计修改文件
- `1_project_files/cooking-ai-planner/src/pages/ShoppingListPage.jsx`
- `1_project_files/cooking-ai-planner/src/pages/ShoppingDetailPage.jsx`
- `1_project_files/cooking-ai-planner/src/pages/FavoritesPage.jsx`
- `1_project_files/cooking-ai-planner/src/pages/RecipeDetailPage.jsx`
- `1_project_files/cooking-ai-planner/src/pages/RecentPage.jsx`
- `1_project_files/cooking-ai-planner/src/components/AppLayout.jsx`
- `1_project_files/cooking-ai-planner/src/store/appData.js`
- `1_project_files/cooking-ai-planner/src/store/storageKeys.js`
- `1_project_files/cooking-ai-planner/src/styles/app.css`

### 风险点
- 布局类改动（分栏/网格）可能带来窄屏退化问题：已用 media query 兜底为单列
- 新增 localStorage key 需要保证旧数据不报错：本轮采用“新 key + normalize”策略
- 详情页底部按钮增加后，需确保不破坏收藏/加入待购清单/badge 逻辑：本轮仅追加按钮并复用现有 toast

### 验证方法
- `npm.cmd run build`
- dev server smoke：打开 `http://127.0.0.1:5174/`
- 人工检查：
  - 待购清单首页卡片是否网格对齐
  - 清单详情页桌面端是否左右分栏（左食材；右调料+器具）
  - 详情页与清单详情页是否只保留 1 个返回入口（不重复）
  - 收藏页卡片是否更稳定对齐
  - 菜谱详情页桌面端是否双栏且不影响点选/步骤/底部 action
  - 点击“我做了”后，`/recent` 是否出现记录（且重复点击不重复插入）

## 实施方案（摘要）

1) 清单首页卡片统一：将 `groupList` 在桌面端改为稳定 2 列网格，卡片高度 `stretch`。  
2) 清单详情分栏：保留原交互（勾选/编辑/删除/来源/数量），仅把展示容器在桌面端拆为双栏。  
3) 去重返回按钮：保留 TopBar 返回；对 ShoppingDetail/RecipeDetail 关闭 PageHeader 的返回按钮（避免双返回）。  
4) 收藏卡片对齐：让卡片容器可 `stretch`，并让 `RecipeCard` 自身可填满高度（更稳定对齐）。  
5) 详情页桌面端分栏：引入 `detailGrid`（左：基础信息+食材/调料选择；右：步骤/营养/推荐搭配），窄屏退回单列。  
6) “我做了”闭环：新增 `recentCooked` 数据层（localStorage）+ `useRecent` hook；详情页写入、RecentPage 读取展示。

## 修改文件清单（按类型区分）

### 文件级改动
- 修改：`1_project_files/cooking-ai-planner/src/components/AppLayout.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/store/storageKeys.js`
- 修改：`1_project_files/cooking-ai-planner/src/store/appData.js`
- 新增：`1_project_files/cooking-ai-planner/src/hooks/useRecent.js`
- 修改：`1_project_files/cooking-ai-planner/src/pages/ShoppingDetailPage.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/pages/RecentPage.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/pages/RecipeDetailPage.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/styles/app.css`

### 结构级改动
- 清单详情页：桌面端双栏布局（左食材，右调料+器具）
- 菜谱详情页：桌面端双栏布局（左基础+选择，右步骤+信息）

### 数据联动改动
- 新增 localStorage key：`cooking_ai_planner.recent.cooked.v1`
- 记录策略：按 `recipeId` 去重；重复点击更新 `cookedAt` 并置顶；最多保留 30 条

## before / after 截图说明位置

- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-13-list-favorites-detail-recent/before/`
- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-13-list-favorites-detail-recent/after/`

## 最小验证（已执行）

- `npm.cmd run build`：通过
- dev server smoke：`http://127.0.0.1:5174/recent`、`/shopping` 返回 200

## 本轮建议 git 记录

- Commit message（建议）：
  - `[step-2.0-13][refactor] polish list/favorites/detail layout + add recent cooked flow`

## 下一轮建议（不在本轮执行）

1) 做一次“课堂演示路径”脚本：详情页点“我做了”→ 最近做过展示 → 回到收藏/清单闭环  
2) 补齐 Step 2.0-14（集成/演示打包）：统一验收清单、截图、演示讲稿  
3) 若需要更精致的对齐：再微调 `weekGrid` 的列数策略（但避免牵动首页/结果页风格）

