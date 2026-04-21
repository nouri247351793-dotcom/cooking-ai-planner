# Step 06 - favorites-export（Prompt Log）

## 本轮输入 Prompt（原文）

请实现 FavoritesPage，并增加基础本地导出能力的结构预留。

页面要求：
1）顶部标题“我的收藏”；
2）有搜索框，可搜索菜名、食材、标签；
3）有筛选框，支持时长、难度、食材数量、标签；
4）收藏列表按最新收藏优先；
5）卡片样式与首页一致；
6）支持取消收藏，取消后卡片渐隐消失；
7）无收藏时显示空状态，引导回首页。

导出预留要求：
8）新增 export service 占位：
   - exportFavoritesToJSON()
   - exportShoppingListToJSON()
9）暂时只导出为本地 JSON，不做云端
10）在设置页或收藏页预留“导出我的数据”入口占位

文档要求：
11）本轮说明“为什么导出能力属于后续可扩展功能”
12）本轮同步更新归档文档与 commit_index

## 备注

- 本轮目标：收藏页搜索/筛选/取消收藏（渐隐）+ 本地 JSON 导出结构预留 + 导出入口
- 预计修改文件清单：
  - `1_project_files/cooking-ai-planner/src/pages/FavoritesPage.jsx`
  - `1_project_files/cooking-ai-planner/src/services/exportService.js`
  - `1_project_files/cooking-ai-planner/src/components/home/RecipeCard.jsx`（支持 actionSlot）
  - `1_project_files/cooking-ai-planner/src/pages/SettingsPage.jsx`（导出入口占位）
  - `1_project_files/cooking-ai-planner/src/styles/app.css`
  - `2_coding_documentation/02_step_reports/step-06-report.md`
  - `2_coding_documentation/03_git_records/commit_index.md`
  - `2_coding_documentation/04_issue_reviews/issue-log.md`
  - `2_coding_documentation/05_flowcharts/macro_flow.mmd`
- 风险点：
  - 导出文件下载依赖浏览器权限/策略
  - 取消收藏动画为延迟写入 localStorage，极端情况下可能与快速操作冲突
- 验证方法：
  - 搜索/筛选能命中菜名/食材/标签
  - 取消收藏触发渐隐并从列表移除；刷新后仍生效
  - 点击“导出我的数据”可下载 JSON（favorites / shopping-list）


