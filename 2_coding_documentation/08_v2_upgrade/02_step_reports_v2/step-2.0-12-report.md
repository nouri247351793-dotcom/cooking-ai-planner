# Step 2.0-12 Report（Home + Detail Polish / P0：问题 09–13）
日期：2026-04-21  
范围：Step 2.0-12（增量修正；不重建项目；不接真实 AI；不改变 mock provider 主路线；不改业务主逻辑）

## 本轮输入 prompt 原文

见：`2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/step-2.0-12-home-detail-polish.md`

## 本轮目标（P0）

- 首页：主列/右列卡片纵向间距统一（问题 09）
- 首页：移除底部“今天的灵感”独立板块；推荐区标题统一为“今日灵感”（问题 10）
- 全站：背景统一纯色 `#faf9f5`，不使用渐变；预留浅橙波点素材位（问题 11）
- 详情页：底部“收藏/加入待购清单”操作区改为内容卡片下方的独立一栏（问题 12）
- 详情页：食材/调料选择区新增“清空当前选择”按钮（问题 13）

## 为什么要做这些修正（对齐 2.0 高保真）

- spacing 统一：避免“卡片节奏不一致”带来的廉价感，让主列与右侧辅助区的阅读节奏一致（问题 09）
- 灵感板块收束：重复表达会稀释首屏重点；统一“今日灵感”让首页信息层级更清晰（问题 10）
- 背景纯色：渐变背景更像活动页而非产品页；2.0 需要更克制的桌面网页产品感（问题 11）
- 详情页 action 区独立：浮层重叠会遮挡内容并造成滚动不稳定；独立 action section 更可控（问题 12）
- “清空”补齐选择闭环：当用户点选后需要可逆操作，且要明确是“清空当前选择”而不是清空清单（问题 13）

## 修改文件清单（按类型区分）

### 文件级改动
- 修改：`1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/pages/RecipeDetailPage.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/styles/tokens.css`
- 修改：`1_project_files/cooking-ai-planner/src/styles/global.css`
- 修改：`1_project_files/cooking-ai-planner/src/styles/app.css`
- 新增：`1_project_files/cooking-ai-planner/public/brand/bg-dots-placeholder.svg`

### 代码级改动（逻辑）
- 详情页：新增 `clearSelection()`，点击“清空”将当前页面临时选择清零（不影响已加入清单数据、不影响收藏）

### 结构级改动（布局）
- 详情页：底部操作区 `.detailActions` 改为文档流中的独立 action section（不再与内容卡片重叠）
- 首页：移除底部独立“今天的灵感”板块，推荐区标题统一为“今日灵感”

### 视觉/样式级改动
- 全站背景：`body` 背景固定为 `--c-bg`（`#faf9f5`），并提供可选装饰层（波点素材位）
- 首页间距：通过 `--home-stack-gap` 统一主列/右列模块间距
- 详情页操作区：增加上下间距，避免贴底或挤压内容
- PageHeader：背景从渐变改为半透明纯色，符合“全站背景不使用渐变”的要求

## 波点素材位说明（可安全留空）

- 变量：`1_project_files/cooking-ai-planner/src/styles/tokens.css` 中 `--bg-dots-image`
- 示例：把 `--bg-dots-image` 改为 `url('/brand/bg-dots-placeholder.svg')` 即可启用占位波点
- 真实素材替换：将自定义 `png/webp/svg` 放到 `public/brand/`，并把 `--bg-dots-image` 指向对应路径即可

## before / after 截图说明位置

- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-12-home-detail-polish/before/`
- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-12-home-detail-polish/after/`

## 最小验证（已执行）

- `npm.cmd run build`：通过（vite build 成功产出 `dist/`）
- dev server smoke check：`http://127.0.0.1:5174/` 返回 200

建议你人工快速核对（按本轮验收点）：
- 首页：模块间距节奏一致；“今日灵感”标题正确；页面底部无重复“今天的灵感”独立板块
- 全站：背景为纯色 `#faf9f5`，无大面积渐变背景
- 详情页：底部操作区不遮挡内容；“清空”按钮可清空临时选择且 badge 归零隐藏

## 已知问题 / 风险记录

- 详情页当前默认“全选”是为了便于一键加入清单；“清空”已补齐可逆操作，但仍需课堂讲解避免误解（见 issue-log）
- 自动化截图在当前受限环境不稳定：本轮继续采用手动补齐截图（已提供目录与命名建议）

## 本轮建议 git 记录

- Commit message（建议）：
  - `[step-2.0-12][style] home spacing + inspiration unify + solid bg + detail action/clear`
- 若后续初始化 git，可执行：
  - `git init`
  - `git add .`
  - `git commit -m \"[step-2.0-12][style] home/detail polish (issues 09-13)\"`

## 下一轮建议（不在本轮执行）

1) 课堂演示脚本再收敛：明确“首页只负责输入与灵感推荐，结果页负责候选对比”
2) 补齐 step-2.0-06（Shopping List Align）或将其拆成更明确的小步
3) 若要提升可维护性，再统一抽一层 `layout spacing` 工具类（但避免大重构）

