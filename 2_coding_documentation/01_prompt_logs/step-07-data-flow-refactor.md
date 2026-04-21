# Step 07 - data-flow-refactor（Prompt Log）

## 本轮输入 Prompt（原文）

现可以继续执行第七步，请检查并重构当前项目的数据流。

要求：
1）从首页和详情页收藏后，我的收藏要实时更新；
2）从详情页加入待购清单后，待购清单页要实时更新；
3）页面刷新后状态仍保留；
4）抽离统一的数据管理层，优先使用：
   - React Context
   - 自定义 hooks
5）不要引入 Redux、MobX 等重状态库；
6）对外提供统一 hooks：
   - useFavorites
   - useShoppingList
   - useRecipeGeneratorState
7）写清 localStorage key 规范；
8）补充数据迁移兜底逻辑，避免旧 key 导致报错

文档要求：
9）step report 里必须有“旧数据流 vs 新数据流”说明
10）issue review 里记录本轮重构可能带来的风险
11）更新 macro_flow.mmd 的状态

## 备注

- 本轮目标：用 React Context + 自定义 hooks 统一管理「收藏 / 待购清单 / 首页生成器状态」，解决跨页面实时更新并保持 localStorage 持久化。
- 预计修改文件清单：
  - `1_project_files/cooking-ai-planner/src/store/appData.js`
  - `1_project_files/cooking-ai-planner/src/store/storageKeys.js`
  - `1_project_files/cooking-ai-planner/src/hooks/useFavorites.js`
  - `1_project_files/cooking-ai-planner/src/hooks/useShoppingList.js`
  - `1_project_files/cooking-ai-planner/src/hooks/useRecipeGeneratorState.js`
  - `1_project_files/cooking-ai-planner/src/main.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/RecipeDetailPage.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/ShoppingListPage.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/ShoppingDetailPage.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/FavoritesPage.jsx`
  - `1_project_files/cooking-ai-planner/src/services/exportService.js`
- 风险点：
  - Context 重构导致页面逻辑回归（收藏/待购增删改查）或出现“局部状态不刷新”的新问题。
  - localStorage 旧 key / 旧数据形态不兼容引发 parse/渲染异常。
  - Provider 放置层级不对导致 hooks 报错（must be used within provider）。
- 验证方法：
  - `npm run build` 通过（确保无语法/依赖问题）。
  - `npm run dev` 可启动并能访问首页（HTTP 200）。
  - 手动：在首页/详情页收藏 → 立刻切到“我的收藏”可见；详情页加入待购 → 立刻切到“待购清单”可见；刷新后仍保留。


