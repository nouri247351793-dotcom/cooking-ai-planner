# Step 04 - recipe-detail-localstorage（Prompt Log）

## 本轮输入 Prompt（原文）

请继续完成 RecipeCard 组件和 RecipeDetailPage。

要求：
1）卡片展示：
   - 图片
   - 标题
   - 2~3 个标签
   - 时间
   - 难度
   - 核心食材
2）点击卡片进入详情页；
3）详情页展示：
   - 标题
   - 图片
   - 标签
   - 时间
   - 难度
   - 食材
   - 调料
   - 步骤
   - 营养信息
   - 推荐搭配
4）详情页底部按钮：
   - 收藏
   - 加入待购清单
5）当前状态用 localStorage 管理；
6）返回逻辑正常；
7）步骤区要考虑移动端阅读体验。

技术要求：
8）抽离 recipe 数据结构类型约定，集中写在 data 或 utils 中
9）详情页数据来源优先从 mock 数据或路由参数中读取，不接后端
10）同步更新 step-04 文档，写清数据结构设计理由

特别增加一项：
11）请在本轮报告中输出“文件级改动”和“代码级改动”两张小表，便于最终整理成 pdf。

## 备注

- 本轮目标：补齐 RecipeCard + RecipeDetailPage 展示；收藏/待购清单 localStorage 化；抽离 recipe 数据结构约定
- 预计修改文件清单：
  - `1_project_files/cooking-ai-planner/src/components/home/RecipeCard.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/RecipeDetailPage.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/ShoppingListPage.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/ShoppingDetailPage.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/FavoritesPage.jsx`
  - `1_project_files/cooking-ai-planner/src/data/recipeCatalog.js`
  - `1_project_files/cooking-ai-planner/src/utils/recipeModel.js`
  - `1_project_files/cooking-ai-planner/src/store/storageKeys.js`
  - `1_project_files/cooking-ai-planner/src/services/homeRecipeAgentService.js`
  - `1_project_files/cooking-ai-planner/src/styles/app.css`
  - `2_coding_documentation/02_step_reports/step-04-report.md`
  - `2_coding_documentation/03_git_records/commit_index.md`
  - `2_coding_documentation/05_flowcharts/macro_flow.mmd`
- 风险点：
  - 详情页底部固定按钮需避免遮挡内容（移动端）
  - 刷新详情页时应能根据路由参数从本地 mock 数据恢复
- 验证方法：
  - 首页卡片展示字段完整；点击进入详情页；返回正常
  - 详情页各区块渲染正确（食材/调料/步骤/营养/搭配）
  - 收藏/加入待购写入 localStorage，切换页面后仍保留
  - `npm.cmd run dev` / `npm.cmd run build` 通过


