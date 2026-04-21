# Step 05 - shopping-group-crud（Prompt Log）

## 本轮输入 Prompt（原文）

请实现 ShoppingListPage 和 ShoppingDetailPage。

要求：
1）待购清单页按菜谱分组显示清单卡片；
2）卡片显示：
   - 菜谱名称
   - 缩略图
   - 物品总数
   - 完成进度
3）点击卡片进入清单详情页；
4）详情页按以下分类显示：
   - 食材
   - 调料
   - 器具
5）支持：
   - 新增
   - 编辑
   - 删除
   - 勾选完成
6）右下角有悬浮新增按钮；
7）空状态友好；
8）所有状态先保存在 localStorage。

技术要求：
9）清单项数据结构要支持后续“AI 自动生成待购清单”
10）新增 item 时预留 source 字段：
   - manual
   - recipe_generated
   - ai_generated
11）文档中说明为什么要预留 source 字段，以及它如何帮助后续 AI core 扩展

本轮结束后请：
- 自测新增/删除/勾选/刷新持久化
- 更新 issue-log 中可能的边界问题
- 输出 git commit 建议

## 备注

- 本轮目标：购物清单按菜谱分组 + 详情 CRUD + source 字段预留 + 全部 localStorage 持久化
- 预计修改文件清单：
  - `1_project_files/cooking-ai-planner/src/pages/ShoppingListPage.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/ShoppingDetailPage.jsx`
  - `1_project_files/cooking-ai-planner/src/services/shoppingService.js`
  - `1_project_files/cooking-ai-planner/src/utils/shoppingModel.js`
  - `1_project_files/cooking-ai-planner/src/pages/RecipeDetailPage.jsx`（加入待购时写入 category/source）
  - `1_project_files/cooking-ai-planner/src/styles/app.css`
  - `2_coding_documentation/02_step_reports/step-05-report.md`
  - `2_coding_documentation/03_git_records/commit_index.md`
  - `2_coding_documentation/04_issue_reviews/issue-log.md`
  - `2_coding_documentation/05_flowcharts/macro_flow.mmd`
- 风险点：
  - localStorage 结构变更需要迁移（旧数据缺少 category/source/updatedAt）
  - 手动清单与菜谱清单分组逻辑（manual group）
- 验证方法：
  - 待购清单页显示分组卡片（标题/缩略图/总数/进度）
  - 详情页分类显示 + CRUD（新增/编辑/删除/勾选）+ 悬浮新增按钮
  - 刷新页面后 localStorage 持久化仍在


