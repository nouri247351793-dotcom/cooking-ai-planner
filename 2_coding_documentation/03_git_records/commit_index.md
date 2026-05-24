# Commit Index

> 若当前环境未执行 git 提交，也要把可执行命令与拟定 message 记录在这里。

| Date | Step | Branch | Commit Message | Notes |
|---|---:|---|---|---|
| 2026-04-17 | 00 | main | `[step-00][docs] scaffold archive system` | 初始化归档骨架与模板（待提交/或已提交后补 hash） |
| 2026-04-17 | 01 | main | `[step-01][feat] init vite react app shell` | 初始化 Vite+React 工程、移动端布局、底部导航 3 页（待提交/或已提交后补 hash） |
| 2026-04-17 | 02 | main | `[step-02][feat] add router layout and tokens` | React Router + AppLayout/TabBar/PageHeader + 设计 tokens + 新页面占位（待提交/或已提交后补 hash） |
| 2026-04-17 | 03 | main | `[step-03][feat] implement home agent and mock recipes` | HomePage：Agent 输入/上传占位/筛选/生成/随机 + services mock（待提交/或已提交后补 hash） |
| 2026-04-17 | 04 | main | `[step-04][feat] recipe card detail and localStorage` | RecipeCard/RecipeDetailPage 补齐 + 收藏/待购 localStorage + recipe model/catalog（待提交/或已提交后补 hash） |
| 2026-04-17 | 05 | main | `[step-05][feat] shopping grouped list and crud` | 待购清单按菜谱分组 + 详情 CRUD + source 字段预留（待提交/或已提交后补 hash） |
| 2026-04-17 | 06 | main | `[step-06][feat] favorites search filter and local export` | 收藏页搜索/筛选/取消收藏渐隐 + 本地 JSON 导出 service + 导出入口占位（待提交/或已提交后补 hash） |
| 2026-04-17 | 06-review | main | `[step-06][docs] stage acceptance review` | 阶段性验收：盘点/运行构建验证/测试清单/归档更新（建议提交） |
| 2026-04-17 | 07 | main | `[step-07][refactor] unify app data flow with context hooks` | Context + hooks：收藏/待购/首页生成器统一管理 + localStorage key 规范 + legacy 迁移兜底 |
| 2026-04-18 | 08 | main | `[step-08][feat] add ai config and ai service abstractions (mock-only)` | SettingsPage 支持本地模型配置 + services/ai 抽象层（provider/retrieval/prompt/generation），仍为 mock-only |
| 2026-04-18 | 09 | main | `[step-09][feat] add local knowledge retrieval (rag-ready)` | 本地 JSON 知识库 + retrieval/prompt 组装 + mock 输出附带 knowledgeRefs + dev console 调试输出 |
| 2026-04-18 | 10 | main | `[step-10][ux] polish mobile interactions and micro-animations` | 点击反馈/卡片缩放/弹窗动效/toast/空状态插画占位/滚动顺滑（不引入复杂动画库）+ 截图归档 |
| 2026-04-18 | 11 | main | `[step-11][feat] add optional p5 hero decoration (toggle + uninstall)` | 首页 p5 手账风装饰（不遮挡、可开关、懒加载）+ 一键卸载说明 |
| 2026-04-18 | 12 | main | `[step-12][chore] project health check fixes (lint + forms + logs)` | lint 兜底（忽略 vendor/min.js）+ 表单 name 补齐 + AI debug 日志规范化 |
| 2026-04-18 | 2.0-00 | main | `[step-2.0-00][docs] snapshot v1 baseline before v2 upgrade` | 执行手册2.0：新增 `08_v2_upgrade` 基线快照文档与 v2 流程图（建议打 tag：`v1-baseline-before-v2`） |
| 2026-04-18 | 2.0-01 | main | `[step-2.0-01][feat] add desktop layout shell (side nav + top bar)` | v2 框架：桌面端左侧固定导航 + 顶部搜索占位 + 右上状态入口；新增 recent/tips 占位页；移动端保持原壳 |
| 2026-04-18 | 2.0-01 | main | `[step-2.0-01][style] warm neutral desktop shell` | PRD2.0 视觉：桌面端暖中性色（奶油白/暖灰白）背景与边框变量；不改业务逻辑 |
| 2026-04-18 | 2.0-02 | main | `[step-2.0-02][feat] refactor home hero capsules and right rail` | 首页高保真对齐：移除“今日练习氛围”，Hero 重构（Enter/Shift+Enter），快捷胶囊一排，推荐区改为本周网格，右侧辅助区模块化；保留 mock 生成与 params 结构 |
| 2026-04-20 | 2.0-03 | main | `[step-2.0-03][feat] add recipe results page and generation redirect` | 新增 `RecipeResultsPage`；首页生成后跳转结果页；结果页支持条件摘要/重新生成/卡片进入详情；返回首页保留输入与筛选（localStorage） |
| 2026-04-20 | 2.0-03 | main | `[step-2.0-03][chore] make vite build/dev stable on windows` | 脚本加 `--configLoader native`；`vite.config.js` 设置 `build.emptyOutDir=false` 规避 EPERM |
| 2026-04-20 | 2.0-04 | main | `[step-2.0-04][ux] random recipe modal + success sound` | 首页“随机一道菜”中心模态：再摇一次/查看详情；生成成功跳转结果页与弹窗成功弹出时播放一次提示音（可替换素材） |
| 2026-04-20 | 2.0-05 | main | `[step-2.0-05][feat] prd2 recipe detail selection + add-to-shopping feedback` | 详情页支持食材/调料逐项点选高亮；“加入待购清单”显示选中数 badge；加入后结果弹窗；同名条目数量合并（兜底） |
| 2026-04-20 | 2.0-07 | main | `[step-2.0-07][feat] fill favorites recent and tips pages for v2 demo` | 收藏页 2.0：标题/数量/搜索/胶囊筛选/网格；最近做过完整空状态；新手贴士 3 张 mock 技巧卡网格 |
| 2026-04-20 | 2.0-09 | main | `[step-2.0-09][ux] lightweight polish (buttons/cards/skeleton/toast/modal/empty/ai-badge)` | 不改结构：补齐 TipCard hover/press、notice 插画占位、Hero AI 徽标动画与 reduced-motion 兜底；保持暖中性色基调 |
| 2026-04-21 | 2.0-10 | main | `[step-2.0-10][style] unify orange accent + widen desktop shell + enlarge home hero` | P0：全站 tokens 重定向（`#faf9f5/#f3f3ec/#ff7c24`）+ 桌面端主内容区加宽 + 首页 Hero 主列约 1.5x 加宽（不改业务逻辑） |
| 2026-04-21 | 2.0-11 | main | `[step-2.0-11][refactor] home focus cleanup + remove bottom nav + standardize random modal` | P0：移除首页顶部搜索/重复标题；SideNav 品牌区改 logo 素材位（`/brand/logo.png`）；Hero 合并快捷筛选+更多筛选；全站移除 TabBar；随机弹窗标准化并移除底部关闭按钮（不改业务逻辑） |
| 2026-04-21 | 2.0-12 | main | `[step-2.0-12][style] home/detail polish (issues 09-13)` | P0：首页 spacing 统一；移除底部“今天的灵感”并统一为“今日灵感”；全站背景纯色 `#faf9f5` + 波点装饰素材位；详情页 action 区独立成栏不重叠；新增“清空当前选择”按钮（不改业务主逻辑） |
| 2026-04-21 | 2.0-13 | main | `[step-2.0-13][refactor] list/favorites/detail polish + recent cooked flow` | 清单页：分组卡片网格对齐；清单详情：桌面端左右分栏并去重返回；收藏页：卡片对齐更稳定；详情页：桌面端双栏+新增“我做了”写入 recent；RecentPage：从 localStorage 展示记录（去重+置顶） |
| 2026-04-21 | 2.0-14 | main | `[step-2.0-14][style] recipe detail responsive grid + nutrition left + light emoji accents` | 详情页：重定双栏断点（`<1120px` 单列、`>=1120px` 双栏共同收缩）+ 营养信息移动到左栏；首页/弹窗/空状态/详情页标题增加适量 emoji 点缀（不影响业务逻辑） |
| 2026-04-21 | 2.0-15 | main | `[step-2.0-15][ux] redesign home aside cards + add budget plan modal (mock)` | 首页右侧贴士卡改“经验便签卡”（短句+小图标）；省钱计划改“学生预算卡”（预算/已用/预计还能省+进度条）；新增“本月省钱计划”弹窗（轻量 modal，可关闭，内容为 mock） |
| 2026-04-21 | 2.0-16 | main | `[step-2.0-16][ux] add lightweight confetti burst for random modal` | 随机一道菜弹窗出现/再摇一次时触发一次性彩带/纸屑下落动效（约 1.45s 自动消失）；动效层不拦截交互且限制在弹窗上半区；`prefers-reduced-motion` 降级 |
| 2026-04-21 | 2.0-17 | main | `[step-2.0-17][chore] final QA packaging docs + lint/sound docs alignment` | Final QA：build/dev/lint 验证；补齐 `3_presentation` 交付文档（demo 脚本/checklist/release note）+ 打包 `xiaofanzhuo_v2_delivery_2026-04-21.zip`（排除 `.git/node_modules/dist`）；修复 eslint 扫描 `.vite-cache` 噪音与音效素材位文档不一致（当前环境 `.git` 写入被拒绝，git add/commit 需在可写环境执行） |
| 2026-04-21 | deploy | main | `[deploy][docs] final deploy report (blocked: missing vercel/netlify cli)` | 仅做部署准备与记录：build 通过、dist 产物存在；本机未安装 Vercel/Netlify CLI 且无登录态，未能生成公开网址；已输出 CLI 与 Netlify Drop 的最短操作路径（`08_v2_upgrade/02_step_reports_v2/final_deploy_report.md`） |
| 2026-04-21 | 2.0-18 | main | `[step-2.0-18][docs] final submission exports and master outline` | 最终整理与导出：补齐 `07_exports`（索引/过程概览/分工模板/演示脚本/最终 checklist/release note/总大纲），更新 v2 flow/issue；生成可提交 zip（`3_presentation/xiaofanzhuo_v2_delivery_2026-04-21.zip`） |
| 2026-04-23 | 2.0-git-publish | main | `[v2-release][chore] publish current xiaofanzhuo 2.0 progress` | 已推送到 GitHub `origin/main`（publish commit: `266e567`）；push 过程中遇到 connection reset，使用 `http.version=HTTP/1.1` 重试成功；详见 `08_v2_upgrade/02_step_reports_v2/step-2.0-git-publish-report.md` |
| 2026-05-22 | 3.0-00 | main | `[step-3.0-00][docs] archive v2 baseline before v3 upgrade` | 3.0 升级前基线留档：新增 `09_v3_upgrade` 目录、记录当前 2.0 路由/组件/localStorage/build/已知问题/文件树，并保存 before 截图；本轮不主动改业务功能 |
| 2026-05-22 | 3.0-01 | main | `[step-3.0-01][layout] upgrade dashboard shell and icon nav` | 3.0 dashboard 页面壳：新增大圆角外层容器、左侧图标导航、品牌 logo、首页主操作区/右侧工具区布局基础；保留原有路由与业务逻辑 |
| 2026-05-22 | 3.0-02 | main | `[step-3.0-02][feat] refactor homepage input panel and filter entry` | 3.0 首页输入主面板：深底主操作卡、标题图标位、大输入框、拍照上传/生成菜谱操作区；默认收起筛选 chips，统一为“筛选”入口 |
| 2026-05-22 | 3.0-03 | main | `[step-3.0-03][feat] add right rail timer tool` | 3.0 右侧工具区：新增深底计时器主工具，支持 MM:SS 编辑、开始/暂停、重置、结束态；随机菜/贴士/省钱计划维持浅底辅助卡层级 |
| 2026-05-22 | 3.0-04 | main | `[step-3.0-04][feat] add recommended task panel framework` | 3.0 推荐任务面板框架：替换首页下方推荐菜谱区，新增等级/阶段/XP 进度头部、易/中/难切换和占位任务卡；完整任务详情与 XP 闭环留到 Step 3.0-05 |
| 2026-05-22 | 3.0-05 | main | `[step-3.0-05][feat] implement task tutorial page and XP flow` | 3.0 推荐任务闭环：新增任务目录、任务详情/小教程页、手动完成确认、XP 发放、等级/阶段推导与 localStorage 进度保存 |
| 2026-05-23 | 3.0-06 | main | `[step-3.0-06][feat] add monthly budget modal and expense record logic` | 3.0 省钱计划账本：首页只显示预算摘要；弹窗支持首次设置预算、修改预算、新增做饭开支、本月记录列表和 localStorage 统计 |
| 2026-05-23 | 3.0-07 | main | `[step-3.0-07][style] align utility cards and first-level pages` | 3.0 UI 对齐：保留随机一道菜能力，降低首页贴士密度，统一待购/收藏/最近/贴士一级页 hero、空状态和卡片风格 |
| 2026-05-23 | 3.0-08 | main | `[step-3.0-08][style] normalize v3 ui tokens and component rules` | 3.0 UI 规范化：扩展 spacing/radius/color/button/badge/motion tokens，统一卡片与按钮层级，新增 `ui-spec-v3.md` |
| 2026-05-23 | 3.0-09 | main | `[step-3.0-09][docs] review v3 archive and export plan` | 3.0 自归档复查：补齐 baseline flow/current status markdown/archive audit/export plan，记录截图证据缺口和最终导出建议 |
| 2026-05-23 | 3.0-10 | main | `[step-3.0-10][docs] finalize v3 qa release records` | 3.0 最终 QA 与交付整理：build 通过；新增 final checklist、release notes、demo script、最终文件树和发布/tag 建议 |
| 2026-05-23 | 3.0-11 | main | `[step-3.0-11][style] retune v3 warm light UI tokens` | 3.0 UI token 复调：按浅暖灰白规范统一页面/容器/首页主面板/输入框/计时器/按钮三态/圆角/间距，并将首页右侧标题改为独立图标位 |
| 2026-05-23 | 4.0-01 | main | `[step-4.0-01][docs] record v4 project structure check` | 4.0 AI 接入前结构检查：确认 Vite+React、首页/待购/收藏页、mock 菜谱生成、现有 AI 抽象层和后续修改文件建议；build 通过 |
| 2026-05-23 | 4.0-02 | main | `[step-4.0-02][chore] harden gitignore and secret checks` | 4.0 GitHub/Vercel 上传前安全检查：补齐应用子项目 `.env` 忽略规则，确认 `.env`、`node_modules`、`dist` 不会提交，未发现真实 API Key；build 通过 |
| 2026-05-23 | 4.0-03 | main | `[step-4.0-03][feat] add ai response schema and mock fallback data` | 4.0 AI 数据结构：新增 `aiTypes.js` 与 `mockAIResponse.js`，统一 answer/recipes/shoppingList/cookingSteps/estimatedTime/tips 数据合同；build 通过 |
| 2026-05-23 | 4.0-04 | main | `[step-4.0-04][feat] add frontend ai service fallback layer` | 4.0 前端 AI 服务层：新增 `askAI(userMessage, context)`，默认 POST `/api/ai`，支持超时、请求失败、非法 JSON、非法结构时回退 `mockAIResponse`；build 通过 |
| 2026-05-23 | 4.0-05 | main | `[step-4.0-05][feat] add vercel ai serverless endpoint` | 4.0 Vercel Serverless API：新增 `api/ai.js`，服务端读取 `AI_API_KEY/AI_MODEL/AI_BASE_URL`，无 Key 或 provider 异常时回退 mock/demo；build 与语法检查通过 |
| 2026-05-23 | 4.0-06 | main | `[step-4.0-06][chore] add ai env example` | 4.0 环境变量示例：新增 `.env.example`，说明 `AI_API_KEY/AI_MODEL/AI_BASE_URL`，补充根 `.gitignore` 反忽略规则以允许提交示例文件；build 通过 |
| 2026-05-23 | 4.0-07 | main | `[step-4.0-07][feat] strengthen ai planning prompt` | 4.0 AI Prompt：强化 `api/ai.js` 系统提示，约束大学生做饭场景、结构化 JSON schema、默认假设、tips 和购物清单字段，并加入 `response_format`；build 与语法检查通过 |
| 2026-05-23 | 4.0-08 | main | `[step-4.0-08][feat] hook home page to ai service` | 4.0 首页 AI 接入：`HomePage` 调用 `askAI` 并展示 loading、answer、recipes、cookingSteps、tips 与演示模式标签，同时保留原 mock generate 状态；build 通过 |
| 2026-05-23 | 4.0-09 | main | `[step-4.0-09][feat] sync ai shopping list to local storage` | 4.0 待购清单联动：AI `shoppingList` 保存到 `xiaofanzhuo_ai_shopping_list`，并映射进既有待购清单数据流；支持 AI 分组、勾选、删除和清空全部；build 通过 |
| 2026-05-23 | 4.0-10 | main | `[step-4.0-10][feat] sync ai recommended recipes to favorites` | 4.0 收藏联动：AI 推荐菜谱可在首页收藏，保存到 `xiaofanzhuo_favorite_recipes`，收藏页合并展示内置收藏与 AI 收藏，支持去重和取消收藏；build 通过 |
| 2026-05-23 | 4.0-11 | main | `[step-4.0-11][ux] add demo mode notice` | 4.0 demo 模式提示：`demoMode: true` 时在首页 AI 结果卡片显示“当前为演示模式，AI 内容由示例数据生成。”；提示不阻断推荐菜谱、待购清单和收藏；build 通过 |
| 2026-05-23 | 4.0-12 | main | `[step-4.0-12][chore] harden ai error handling fallbacks` | 4.0 容错检查：补强 fallbackReason 透传、provider 超时/非 JSON/字段不完整回退、空输入默认需求、AI shopping localStorage 写入失败兜底；build 与 askAI fallback 检查通过 |
| 2026-05-23 | 4.0-13 | main | `feat: add AI integration for xiaofanzhuo 4.0` | 4.0 Git 提交前检查：确认当前为 Git 仓库、分支 `main`、remote 已配置；`.env/.env.local/node_modules/dist` 已忽略；未发现真实 API Key；build 通过；本步未提交未推送 |
| 2026-05-23 | 4.0-14 | main | `feat: add AI integration for xiaofanzhuo 4.0` | 4.0 上传前最终检查：build 通过；未发现真实 API Key；README 已补充本地运行、Vercel 环境变量、AI demo 模式说明；`vite.config.js` 已兼容 Vercel 根路径；本步未提交未推送 |
| 2026-05-24 | 4.0-15 | main | `docs: add vercel deployment guide for xiaofanzhuo 4.0` | 4.0 Vercel 部署说明：新增 `docs/vercel-deployment-guide.md`，记录 GitHub 导入、Root Directory、Vite 构建配置、AI 环境变量、密钥安全、demo 模式和部署后测试路径；build 通过；本步未提交未推送 |
| 2026-05-24 | 4.0-16 | main | `docs: add ai deployment test checklist for xiaofanzhuo 4.0` | 4.0 上线后测试清单：新增 `docs/ai-deployment-test-checklist.md`，覆盖首页、AI loading/answer、recipes、shoppingList、收藏、demo 模式、真实 AI、localStorage、移动端和控制台检查；build 通过；本步未提交未推送 |
