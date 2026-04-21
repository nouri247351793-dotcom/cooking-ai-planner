# Step 2.0-11 Report（首页聚焦修正 + 导航残留清理 + 随机弹窗标准化 / P0）

日期：2026-04-21  
范围：Step 2.0-11（增量修正；不重建项目；不改 mock provider 主路线；不新增业务功能）

## 本轮输入 prompt 原文

见：`2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/step-2.0-11-home-structure-cleanup.md`

## 本轮目标（P0）

- 首页聚焦修正：移除首页顶部冗余信息，让首屏更快聚焦到 Hero 主输入卡  
- 全站导航残留清理：彻底移除旧底部导航残留，一级页面跳转只通过左侧导航  
- 随机弹窗标准化：把“随机一道菜”改成更标准的网页 modal（暗化、位置、按钮精简）

## 为什么首页顶部搜索与重复标题要删除

- 顶部搜索目前是占位/无主流程价值，会抢走首屏注意力并造成“可用性幻觉”（看似能搜索但不产生结果）。  
- “大学生做饭学习规划师”标题条与 Hero 标题重复，导致信息冗余与首屏层级不清晰。  
- 删除后首屏会更“网页产品感”：用户进来更直接看到输入框与 CTA。

## 为什么快捷标签与更多筛选要并入 Hero 卡片

- 2.0 首页的核心任务是“输入 + 约束条件 → 生成”，把条件拆到卡片外会造成断层与视线跳跃。  
- 合并后 Hero 成为一张完整的“输入主操作卡”，更符合桌面网页的任务卡结构，也更利于课堂演示讲解。

## 为什么底部导航在 2.0 必须彻底移除

- 2.0 已升级为桌面网页 IA（左侧固定导航 + 主内容区 + 右侧辅助区），底部导航属于旧移动端信息架构残留。  
- 双导航体系会造成“入口重复/状态不同步”的维护风险；删除后用户路径更单一，页面收敛更明显。

## 为什么“装饰：开/关”属于伪功能入口

- 该入口不属于用户任务路径（输入/生成/浏览/收藏/清单），且属于“开发阶段的可选装饰开关”，放在主输入区会分散注意力。  
- 2.0 更需要聚焦主 CTA 与条件约束，不应在首屏放伪功能入口。

## 为什么随机一道菜弹窗要改成标准 modal

- 标准 modal 的暗化与位置能够更清晰地表达“当前是一个临时聚焦层”，避免误以为是页面某个普通卡片。  
- 精简按钮（去掉底部关闭按钮）能减少重复操作，保留右上角关闭 + 两个主动作即可。

## 修改文件清单（按类型区分）

### 文件级改动
- 修改：`1_project_files/cooking-ai-planner/src/components/AppLayout.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/components/TopBar.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/components/SideNav.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/components/home/HomeHero.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/components/home/FiltersPanel.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/components/home/RandomRecipeModal.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/pages/HomePage.jsx`
- 修改：`1_project_files/cooking-ai-planner/src/store/storageKeys.js`
- 修改：`1_project_files/cooking-ai-planner/src/styles/app.css`
- 新增：`1_project_files/cooking-ai-planner/public/brand/logo-placeholder.svg`
- 删除：`1_project_files/cooking-ai-planner/src/components/TabBar.jsx`

### 代码级改动（逻辑）
- Home：移除 p5 装饰开关相关的 localStorage state/props（仅保留装饰本身，不作为用户入口）
- Layout：首页不再渲染 TopBar/PageHeader（移除搜索与重复标题）
- SideNav：品牌区改为 logo 素材位（优先加载 `/brand/logo.png`，失败回退到 placeholder）

### 结构级改动（布局/组织）
- Hero：把快捷胶囊 + “更多筛选”嵌入 Hero 主卡内部，形成“输入 + 条件”一体卡
- 全站：移除底部 TabBar 挂载与样式残留，页面底部留白重新对齐

### 交互级改动（体验）
- 随机弹窗：去掉底部“关闭”按钮；保留右上角关闭、“再摇一次”、“查看详情”
- modal：弹窗位置调整为“居中偏上”（overlay 仍全页暗化）

## before / after 截图说明位置

- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-11-home-structure-cleanup/before/`
- `2_coding_documentation/08_v2_upgrade/05_assets_v2/step-2.0-11-home-structure-cleanup/after/`

## 最小验证（已执行）

- `npm.cmd run build`：通过  
- dev server smoke check：`http://127.0.0.1:5174/` 返回 200（含 `#root`）  

建议你人工快速核对（按 prompt 验证点）：  
- 首页顶部不再出现搜索框与重复标题条  
- 左侧顶部品牌区为 logo 素材位（`/brand/logo.png` 可替换）  
- Hero 卡内部包含快捷筛选 + “更多筛选”  
- 全站不再出现底部导航栏  
- Hero “装饰：开/关”入口消失  
- 随机弹窗：全页暗化、位置偏上、无底部关闭按钮、再摇一次/查看详情仍可用

## 本轮建议 git commit message

`[step-2.0-11][refactor] home focus cleanup + remove bottom nav + standardize random modal`

