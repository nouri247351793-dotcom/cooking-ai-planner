# Step 06 - favorites-export（Step Report）

## 本轮目标

- FavoritesPage：实现搜索/筛选/最新优先/取消收藏渐隐
- 导出预留：新增本地 JSON 导出 service（favorites + shopping list）
- 导出入口：在收藏页与设置页提供入口（当前仅本地 JSON，不做云端）
- 同步更新归档文档与 git 记录（commit index / issue log / flowchart）

## Prompt 设计理由

- 收藏页是“学习规划”的复盘与积累入口：把练过的菜谱沉淀为可复用的学习路径
- 导出能力属于可扩展功能：先把数据结构与 service 入口定下来，后续可无痛扩展到云端/分享/提交作业素材

## AI 输出方案摘要

- 收藏页：
  - 搜索：命中菜名/核心食材/食材/调料/标签
  - 筛选：时长/难度/食材数量/标签
  - 最新优先：沿用 `favorites` 数组“头部最新”的存储顺序
  - 取消收藏：卡片渐隐（200ms）后再写入 localStorage 删除
- 导出 service：
  - `exportFavoritesToJSON()`：导出收藏 id + recipesSnapshot（便于离线查看/归档）
  - `exportShoppingListToJSON()`：导出迁移后的 `shoppingItems` 列表

## 文件级改动说明

- 新增：`1_project_files/cooking-ai-planner/src/services/exportService.js`
- 更新：`1_project_files/cooking-ai-planner/src/pages/FavoritesPage.jsx`
- 更新：`1_project_files/cooking-ai-planner/src/components/home/RecipeCard.jsx`（支持 `actionSlot`）
- 更新：`1_project_files/cooking-ai-planner/src/pages/SettingsPage.jsx`（导出入口占位）
- 更新：`1_project_files/cooking-ai-planner/src/styles/app.css`（收藏页 UI/渐隐/Toast）
- 更新归档：`2_coding_documentation/**`（本文件、commit index、issue log、flowchart）

## 代码级改动说明

- `FavoritesPage`：
  - `filtered`：按 query + filters 计算过滤结果（保持 favorites 原始顺序）
  - `removingIds`：控制渐隐动画；延迟 220ms 再 `setFavorites(prev => ...)`
  - `downloadJSON`：导出时触发浏览器下载（本地 JSON）
- `RecipeCard`：改为 `article + Link` 结构，避免把按钮嵌套进链接；支持 `actionSlot` 叠加按钮
- `exportService`：读取 localStorage 并序列化为 JSON（meta + 数据）

## 自测结果

- [x] `npm.cmd run dev` 可启动，页面非空白（HTTP 200）
- [x] 搜索/筛选可用（菜名/食材/标签）
- [x] 取消收藏渐隐并移除；刷新后仍生效
- [x] “导出我的数据”可下载 JSON（favorites / shopping-list）
- [x] `npm.cmd run build` 构建成功
- [x] 文档已归档（prompt log / step report / commit index / flowchart）

## AI 输出评估

- 可用：数据与导出入口先固化，为后续 AI core 扩展提供“可追踪、可归档”的数据出口

## 人工修正/二次指令

- 导出仅本地 JSON：避免云端依赖与权限问题，保持课堂演示稳定

## 本轮知识点与反思

- 导出能力的价值不只“备份”，更是后续扩展的接口：云端同步/分享链接/作业提交材料都可复用同一结构

## 发现的问题

- 取消收藏使用延迟写入：极端情况下快速重复操作可能需要更严格的防抖/队列（当前已用 `removingIds` 防重复点击）

## 下一轮建议

- Step 07：把 SettingsPage 的模型配置占位与 services 层连接，并引入“导出包含 aiRequestPayload 日志”的结构（仍可 mock）

## 为什么导出能力属于后续可扩展功能（本轮要求 11）

- **可迁移**：从本地 JSON → 云端同步/分享，只需要替换输出通道，数据结构保持不变
- **可归档**：便于课堂提交或汇总证据（收藏/清单可以作为过程产出）
- **可观测**：未来接 AI 生成后，可把 `source=ai_generated` 的数据单独导出做质量评估

## 建议 git commit（本轮）

- Commit message：`[step-06][feat] favorites search filter and local export`


