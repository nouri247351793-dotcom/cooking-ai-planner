# Step 2.0-05 Report（RecipeDetailPage 对齐 PRD 2.0）

日期：2026-04-20  
范围：Step 2.0-05（详情页体验/交互对齐，不接真实 AI / 不接后端）

## 本轮输入 prompt 原文

见：`2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/step-2.0-05-recipe-detail-prd2.md`

## AI 输出方案摘要

- 保留详情页原有信息结构，同时增强为 2.0 交互：
  - 食材/调料支持逐项点选（高亮）
  - 底部“加入待购清单”显示已选数量 badge
  - 加入后弹出结果反馈弹窗（含去待购清单入口）
- 关键步骤（前 2 步）加入辅助图片占位块，提升移动端阅读节奏（后续可替换为真实步骤图）
- 不影响收藏逻辑；待购清单仍存 localStorage

## 文件级改动

| 类型 | 文件 | 说明 |
|---|---|---|
| 新增 | `1_project_files/cooking-ai-planner/src/components/recipe/AddToShoppingResultModal.jsx` | “加入待购清单结果”反馈弹窗 |
| 重构 | `1_project_files/cooking-ai-planner/src/pages/RecipeDetailPage.jsx` | 详情页 2.0：点选/合并/角标/结果弹窗/步骤图占位/价格展示 |
| 修改 | `1_project_files/cooking-ai-planner/src/styles/app.css` | 点选高亮样式、步骤图片占位样式、底部按钮 badge 样式 |

## 代码级改动

- 选择态
  - 用 `Set` 保存已选条目（`ingredient:<name>` / `condiment:<name>`）
  - 默认“全选”（打开详情页即可看到可加入数量 badge）
- 合并逻辑
  - 以 `category + name` 为同名合并键
  - 数量合并：能解析出数字且单位一致则求和；否则使用字符串拼接兜底（`a + b`）
- 结果反馈
  - 加入清单后弹出 modal：显示“加入数量 + 菜谱名”，提供“查看待购清单 / 继续浏览”

## 交互级改动

- 食材/调料逐项点击：条目高亮（紫色边框/底色），再次点击取消
- “加入待购清单”按钮角标：随选中数量实时变化；为 0 时隐藏
- 加入后结果弹窗：不离开详情页即可确认结果；可一键进入待购清单
- 步骤区关键步骤图片占位：前 2 步显示占位块（更接近 PRD 2.0 的信息密度）

## 自测建议

1) 进入任意详情页：检查标题/图/标签/时间/价格/难度/营养/搭配都显示  
2) 点选食材/调料：高亮变化，底部角标数量同步变化  
3) 点击“加入待购清单”：
   - 弹出结果弹窗，数量与菜谱名正确
   - 点击“查看待购清单”跳转 `/shopping`
4) 重复加入同名条目：待购清单中同名项数量被合并（非数字数量走兜底合并）
5) 收藏按钮：仍可正常收藏/取消收藏

## 截图归档

路径：
- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-05-recipe-detail/before/`
- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-05-recipe-detail/after/`
