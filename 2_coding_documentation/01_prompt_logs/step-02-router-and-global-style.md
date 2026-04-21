# Step 02 - router-and-global-style（Prompt Log）

## 本轮输入 Prompt（原文）

请在现有项目中补充全局样式与路由，但不要改动既定技术路线。

要求：
1）接入 React Router；
2）新增页面：
   - HomePage
   - RecipeDetailPage
   - ShoppingListPage
   - ShoppingDetailPage
   - FavoritesPage
   - SettingsPage（仅用于 AI 模型配置，占位即可）
3）创建：
   - AppLayout
   - TabBar
   - PageHeader
4）新增全局设计 token：
   - 主色、辅助色、圆角、阴影、字号层级、间距体系
5）风格要求年轻、清爽、适合大学生，但不要过度装饰
6）预留一个“AI 配置入口”在首页右上角或设置页中，但此轮只做入口和占位页面
7）同步更新本轮文档与 git 记录

请按以下顺序输出：
A. 修改文件清单
B. 路由表
C. 组件职责说明
D. 代码实现
E. 本地验证方法
F. 文档归档更新
G. git 记录建议

## 备注

- 本轮目标：接入 React Router + 新页面占位 + AppLayout/TabBar/PageHeader + 全局 tokens 与清爽风格
- 预计修改文件清单：
  - `1_project_files/cooking-ai-planner/package.json`
  - `1_project_files/cooking-ai-planner/src/App.jsx`
  - `1_project_files/cooking-ai-planner/src/components/**`
  - `1_project_files/cooking-ai-planner/src/pages/**`
  - `1_project_files/cooking-ai-planner/src/styles/**`
  - `2_coding_documentation/02_step_reports/step-02-report.md`
  - `2_coding_documentation/03_git_records/commit_index.md`
  - `2_coding_documentation/05_flowcharts/macro_flow.mmd`
- 风险点：
  - 安装新依赖需要网络与权限
  - 受限环境下 `npm run dev` 可能 `spawn EPERM`（需用本机环境验证）
- 验证方法：
  - `npm.cmd install` 成功
  - `npm.cmd run dev` 可启动；主页不空白；TabBar 可切换；详情页/设置页可进可退
  - `npm.cmd run build` 通过


