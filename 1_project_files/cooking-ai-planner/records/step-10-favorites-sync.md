# Step 10 执行记录：AI 推荐菜谱收藏联动

日期：2026-05-23

## 执行目标

实现 AI 推荐菜谱收藏功能：用户可以在首页 AI 推荐菜谱卡片上点击“收藏”，数据保存到 localStorage，并在“我的收藏”页面查看与取消收藏。

## localStorage key

- AI 推荐菜谱收藏：`xiaofanzhuo_favorite_recipes`
- 既有内置菜谱收藏：`cooking_ai_planner.favorites.ids.v1`

说明：内置菜谱仍沿用原来的 ID 收藏体系；AI 菜谱不是内置 catalog 的固定数据，因此单独保存完整菜谱对象，避免收藏页刷新后找不到菜谱内容。

## 修改页面

- `src/pages/HomePage.jsx`
- `src/pages/FavoritesPage.jsx`

## 新增/修改文件

- `src/services/aiFavoriteRecipeService.js`
- `src/hooks/useAIFavoriteRecipes.js`
- `src/pages/HomePage.jsx`
- `src/pages/FavoritesPage.jsx`
- `src/styles/app.css`
- `records/step-10-favorites-sync.md`
- `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-10-favorites-sync.md`
- `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-10-report.md`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-10-favorites-sync.mmd`
- `2_coding_documentation/03_git_records/commit_index.md`

## 收藏逻辑

1. 首页 AI 结果卡片渲染推荐菜谱。
2. 每张 AI 菜谱卡片显示“收藏 / 已收藏”按钮。
3. 点击收藏后，`useAIFavoriteRecipes()` 写入 `xiaofanzhuo_favorite_recipes`。
4. AI 菜谱被转换为项目 `RecipeCard` 可使用的本地菜谱结构。
5. “我的收藏”页面合并显示：
   - 内置菜谱收藏
   - AI 推荐菜谱收藏
6. 收藏页可按“AI 推荐”筛选，并支持取消收藏。

## 去重逻辑

- AI 菜谱 ID 统一加前缀：`ai-recipe:`
- 新增收藏时先移除同 ID 旧记录，再把最新记录放到最前。
- localStorage 读取时会再次 normalize 并按 ID 去重。
- 内置菜谱收藏与 AI 菜谱收藏分开存储，避免 ID 冲突。

## 异常处理

- localStorage 读取失败时回退为空数组，不白屏。
- AI 菜谱字段缺失时提供兜底标题、描述、时间、难度、图片和营养字段。
- 收藏页读取不到内置菜谱 ID 时继续过滤，不影响 AI 收藏显示。

## build 结果

命令：

```bash
npm.cmd run build
```

结果：

- build：通过
- 构建产物：
  - `dist/index.html`
  - `dist/assets/index-FuSAtrHq.css`
  - `dist/assets/index-C48CCGip.js`
- 构建耗时：约 815ms

## 建议提交信息

```text
[step-4.0-10][feat] sync ai recommended recipes to favorites
```

## 下一步建议

执行 Step 11：增加 demo 模式提示，明确无 API Key 或请求失败时当前内容来自示例数据，并保证 demo 模式不阻断收藏和待购清单操作。
