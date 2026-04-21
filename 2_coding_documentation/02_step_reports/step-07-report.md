# Step 07 - data-flow-refactor（Step Report）

## 本轮目标

- 用 React Context + 自定义 hooks 统一收藏/待购/首页生成器的数据流，解决跨页面“实时不刷新”的问题。
- 保持 localStorage 持久化；刷新后状态仍可恢复。
- 补齐 localStorage key 规范与旧 key 迁移兜底，避免历史数据导致报错。

## Prompt 设计理由

- Step 01~06 以页面内 `useLocalStorage` 为主，数据可持久化但“同一 Tab 内跨页面实时同步”不可靠（更新后其他页面不会自动 re-render）。
- 本轮以 Context 做“单一数据源 + 订阅更新”，并通过自定义 hooks 暴露最小 API，满足轻量、可扩展且不引入重状态库。

## AI 输出方案摘要

- 新增统一数据管理层：`AppDataProvider`（收藏、待购、首页生成器三块 Context）。
- 对外提供统一 hooks（仅暴露消费接口，不暴露实现细节）：
  - `useFavorites`
  - `useShoppingList`
  - `useRecipeGeneratorState`
- localStorage 统一 key 命名（显式版本号）+ legacy key 只读回退 + 迁移后写回规范形态。
- 页面改造为“读写统一 hooks”，从而实现收藏/待购的实时跨页面更新。

## 旧数据流 vs 新数据流

- 旧：各页面各自 `useLocalStorage(key)` 读写；同一 Tab 内“别的页面写入”不会触发本页面 state 更新（除非刷新/重新进入/偶然 re-render）。
- 新：Provider 在内存持有最新状态并写入 localStorage；各页面通过 Context 订阅同一份状态，写入后立即触发所有订阅方 re-render，实现实时更新。

## 文件级改动说明

- 新增：
  - `1_project_files/cooking-ai-planner/src/hooks/useFavorites.js`
  - `1_project_files/cooking-ai-planner/src/hooks/useShoppingList.js`
  - `1_project_files/cooking-ai-planner/src/hooks/useRecipeGeneratorState.js`
- 修改：
  - `1_project_files/cooking-ai-planner/src/store/appData.js`
  - `1_project_files/cooking-ai-planner/src/main.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/RecipeDetailPage.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/ShoppingListPage.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/ShoppingDetailPage.jsx`
  - `1_project_files/cooking-ai-planner/src/pages/FavoritesPage.jsx`
  - `1_project_files/cooking-ai-planner/src/services/exportService.js`

## 代码级改动说明

- `AppDataProvider`：
  - 收藏：统一 `favoriteIds`，并提供 `isFavorite/add/remove/toggle`。
  - 待购：统一 `shoppingItems`，并在 Provider 内通过 `migrateShoppingItems()` 做数据归一化与写回。
  - 首页生成器：把 `inputText/filters/photoResult` 持久化，把 UI 状态（loading/recipes/error）留在内存；`generate()` 内统一 `buildHomeParams()`。
- 首页：
  - 切换为 `useRecipeGeneratorState()`；并在卡片右上角提供轻量“收藏/取消收藏”入口（actionSlot）。
- 详情页 / 待购页 / 收藏页：
  - 全部切换为统一 hooks，写入后可实时同步到其他页面。
- 导出：
  - `exportService` 增加 legacy key 回退读取，避免旧数据未迁移时导出为空。

## 自测结果

- [x] 运行/构建通过：`npm run build` 通过（2026-04-17）。
- [ ] 关键交互验证：需要在浏览器里手动点一次验证（收藏实时更新、加入待购实时更新、刷新持久化）。
- [x] 文档已归档：本文件 + prompt log + issue/flow/commit 记录已更新。

## AI 输出评估

- 覆盖了要求的统一 hooks、Context 数据层、localStorage key 规范与迁移兜底；并通过页面改造达成“同一 Tab 内实时更新”的目标。

## 人工修正/二次指令

- 若后续需要更强一致性：把 `setShoppingItems`/`setFavoriteIds` 封装成更细粒度的 action（add/update/remove/toggleChecked），避免页面散落业务细节。
- 若需要多 Tab 同步：可在 Provider 中监听 `storage` 事件（当前未做，避免超出本轮范围）。

## 本轮知识点与反思

- 轻量状态同步的关键在于“共享内存状态 + 订阅更新”，localStorage 更适合作为持久化介质而不是实时状态源。
- localStorage key 显式版本号 + legacy 只读回退，可以让后续数据结构升级更安全（可逐步迁移、可回滚）。

## 发现的问题

- 端口占用：本机 `5173` 可能已被占用；启动 dev 时可改用其他端口或去掉 `--strictPort`。
- Vite 解析限制：`appData.js` 内不能直接写 JSX（`.js` 默认不启用 JSX parser），已改为 `createElement()` 返回 Provider 树以避免构建失败。

## 下一轮建议

- 增加 1 轮“最小可演示路径”手动回归（收藏/待购/刷新）并截图归档，降低重构风险。
- 再进入下一步前，可把 localStorage 的 schema version 迁移策略补充为更系统的文档（哪些字段可变、哪些不可变）。


