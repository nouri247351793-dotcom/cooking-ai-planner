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
