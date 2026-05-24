# Step 9 执行记录：AI 待购清单同步

日期：2026-05-23

## 执行目标

实现 AI 结果与“待购清单”页面联动：当 `askAI()` 返回 `shoppingList` 后，自动保存到 localStorage，并同步为现有待购清单页面可读取、可勾选、可删除、可清空的数据。

## localStorage key

- AI 原始购物清单快照：`xiaofanzhuo_ai_shopping_list`
- 应用既有待购清单数据：`cooking_ai_planner.shopping.items.v1`

说明：本步骤保留手册建议的 `xiaofanzhuo_ai_shopping_list` 作为 AI 原始结果记录，同时把数据转换为项目现有 shopping item 结构，写入既有待购清单数据流，避免另起一套页面读取逻辑。

## 修改文件

- `src/services/aiShoppingListService.js`
- `src/services/shoppingService.js`
- `src/pages/HomePage.jsx`
- `src/pages/ShoppingListPage.jsx`
- `src/pages/ShoppingDetailPage.jsx`
- `records/step-09-shopping-list-sync.md`
- `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-09-shopping-list-sync.md`
- `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-09-report.md`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-09-shopping-list-sync.mmd`
- `2_coding_documentation/03_git_records/commit_index.md`

## 数据同步逻辑

1. 首页调用 `askAI(inputText, context)` 后，读取返回值中的 `shoppingList`。
2. `persistAIShoppingList()` 将原始 AI `shoppingList` 保存到 `xiaofanzhuo_ai_shopping_list`。
3. `mapAIShoppingListToItems()` 将 AI 项转换为现有待购清单 item：
   - `name` ← AI `name`
   - `qty` ← AI `amount`
   - `category` ← 映射为 `ingredient | condiment | equipment`
   - `source` ← `ai_generated`
   - `fromRecipeId` ← `ai-generated`
4. `replaceAIShoppingItems()` 替换旧的 AI 分组项目，并保留用户手动清单和菜谱清单。
5. 待购清单页通过现有 `useShoppingList()` 数据流读取同步后的项目。

## 异常处理

- `shoppingList` 不是数组时不写入。
- localStorage 只在浏览器环境中写入，避免非浏览器环境报错。
- 分类无法识别时默认归入 `ingredient`。
- AI 分组读取不到菜谱时显示为 `AI 生成清单`，不再误显示为手动清单。
- 待购清单为空时保留原有空状态。

## 交互支持

- AI 生成清单支持勾选 / 取消勾选。
- 支持删除单项。
- 新增当前分组“清空全部”操作。
- 保持当前待购清单页面风格和既有 CRUD 结构。

## 验证结果

命令：

```bash
npm.cmd run build
```

结果：

- build：通过
- 构建产物：
  - `dist/index.html`
  - `dist/assets/index-Cr9N7Gq8.css`
  - `dist/assets/index-DMyO16Uh.js`
- 构建耗时：约 799ms

## 建议提交信息

```text
[step-4.0-09][feat] sync ai shopping list to local storage
```

## 当前状态

Step 9 已完成。AI/demo 返回的 `shoppingList` 可以进入待购清单页，并支持基础清单操作。下一步可执行 Step 10：把 AI 推荐菜谱联动到“我的收藏”。
