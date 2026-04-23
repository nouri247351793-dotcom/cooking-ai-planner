# Issue Log（v2）

> v2 增量升级期间的问题与风险清单，避免与 1.0 step 混在一起。

| Date | Step | Title | Severity | Status | Notes |
|---|---:|---|---|---|---|
| 2026-04-18 | 2.0-00 | Baseline build 在受限环境出现 `spawn EPERM` | medium | open | 部分环境下打包/加载配置会触发权限问题；需要记录可复现命令与规避方案 |
| 2026-04-18 | 2.0-00 | 历史文档存在乱码风险（编码/编辑器设置） | low | open | v2 新增文档尽量统一 UTF-8；必要时用工具批量修复 |
| 2026-04-18 | 2.0-00 | Edge headless 自动截图不可用/不稳定 | low | open | 截图改为手动补齐，README 中写清命名与路径 |
| 2026-04-18 | 2.0-01 | 桌面壳与移动壳共存的回归风险 | medium | open | 需要人工回归：移动端 header/tabbar、桌面端 sidebar/topbar 是否遮挡与可达 |
| 2026-04-18 | 2.0-01 | 当前目录未初始化 git，无法执行提交 | medium | open | `git status` 报错 not a git repository；需先初始化再按 `commit_index.md` 提交 |
| 2026-04-18 | 2.0-02 | “空气炸锅”快捷筛选缺少 mock 数据支撑 | low | open | 当前作为占位（不做硬过滤），避免出现空结果影响课堂演示 |
| 2026-04-18 | 2.0-02 | 首页不再承载完整结果列表带来的引导风险 | medium | closed | 已在 Step 2.0-03 补齐结果页与跳转链路 |
| 2026-04-18 | 2.0-02 | after 截图需要手动补齐 | low | open | 已留 `after/README.md` 提示命名与建议截图页 |
| 2026-04-20 | 2.0-03 | Vite/rolldown 在当前环境 build 清空 dist 触发 EPERM | medium | open | 通过 `vite.config.js` 设置 `build.emptyOutDir=false` 规避；风险是 `dist` 可能残留旧产物（hash 产物仍可用） |
| 2026-04-20 | 2.0-03 | Vite 默认 configLoader=bundle 在当前环境可能触发 spawn EPERM | medium | open | 通过脚本增加 `--configLoader native` 规避（`npm.cmd run build/dev/preview`） |
| 2026-04-20 | 2.0-03 | 本机端口 5173 可能被占用导致 dev 启动失败 | low | open | 使用 `npm.cmd run dev -- --port 5174` 或关闭占用进程 |
| 2026-04-20 | 2.0-04 | 浏览器音效可能受自动播放策略影响 | low | open | 已在“用户点击触发”时播放；若仍被拦截，需先与页面产生交互或降低音量/改为 WebAudio |
| 2026-04-20 | 2.0-04 | 音效素材需要可替换且可缺省 | low | closed | 默认提供 `public/sounds/success-pop.mp3`，并在播放失败时 fallback beep；替换路径与硬刷新建议写入文档 |
| 2026-04-20 | 2.0-05 | 待购数量合并存在非数字单位的歧义 | low | open | 数字+同单位则求和；否则使用 `a + b` 兜底，后续可引入更强的数量解析规则 |
| 2026-04-20 | 2.0-05 | 详情页默认全选可能影响“没有选择不显示 badge”的理解 | low | open | 当前采用默认全选以保持“加入待购”顺手；若需严格 0 初始，可改为默认不选并提示引导 |
| 2026-04-20 | 2.0-07 | Tips 为本地 mock，内容覆盖有限 | low | open | 当前为课堂演示与信息架构占位；后续可扩展为按场景/设备/预算的技巧库 |
| 2026-04-20 | 2.0-09 | notice 插画占位适用于空/错提示，但可能增加信息密度 | low | open | 当前为轻量视觉增强；如需更克制，可只对 empty 状态启用（加 class） |
| 2026-04-20 | 2.0-09 | 自动截图在当前环境仍可能失败（Edge headless 权限问题） | low | open | 建议手动截图；若需自动化，优先在本机非受限环境使用 Playwright/浏览器截图 |
| 2026-04-21 | 2.0-10 | 2.0 视觉主色重定向 + 桌面布局/首页 Hero 加宽（P0） | high | closed | tokens 统一为 `#faf9f5/#f3f3ec/#ff7c24`；主 CTA/当前态/badge/focus ring 统一橙色且克制使用；桌面端壳加宽、首页主列加宽且右侧栏不挤压主内容 |
| 2026-04-21 | 2.0-11 | Home 聚焦修正 + 移除底部导航残留 + 随机弹窗标准化（P0） | high | closed | 首页移除顶部搜索/重复标题；SideNav 品牌区改 logo 素材位（`/brand/logo.png` 可替换，失败回退 placeholder）；Hero 合并快捷筛选+更多筛选；全站移除 TabBar；随机弹窗移除底部关闭按钮并调整为更标准 modal（全页暗化、位置偏上） |
| 2026-04-21 | 2.0-12 | Home/Detail polish：spacing/灵感收束/纯色背景/action 区/清空选择（问题 09–13） | high | closed | 首页主列/右列模块间距通过 token 统一；移除底部“今天的灵感”重复板块并统一标题为“今日灵感”；全站背景固定纯色 `#faf9f5`，并预留 `--bg-dots-image` 装饰素材位；详情页底部操作区改为独立 action section 不遮挡内容；新增“清空当前选择”按钮（不影响已加入清单与收藏） |
| 2026-04-21 | 2.0-13 | List/Favorites/Detail/Recent 联动修正（问题 14–20） | high | closed | 清单首页分组卡片桌面端网格对齐；清单详情页桌面端左右分栏（左食材，右调料+器具）；清单详情与菜谱详情去掉重复返回按钮（保留 TopBar 返回）；收藏页卡片对齐更稳定；菜谱详情页桌面端双栏（左基础+选择，右步骤+信息）；新增“我做了”按钮写入 `recentCooked`，RecentPage 展示记录并按最近排序 |
| 2026-04-21 | 2.0-14 | RecipeDetail 双栏对齐/缩放修复 + 营养信息左移 + 轻量 emoji 点缀（问题 21–24） | high | closed | 详情页双栏响应式策略重定：`<1120px` 单列避免步骤窄条，`>=1120px` 双栏按比例共同收缩；营养信息移动到左栏并位于食材/调料之后；首页/弹窗/空状态/详情页标题加入适量 emoji（每块最多 1 个）提升生活气息 |
| 2026-04-21 | 2.0-15 | Home 氛围与辅助卡片增强（问题 24/26/27） | medium | closed | 首页右侧“学做饭小贴士”改为便签卡（短句+小图标更易扫读）；“省钱计划”改为学生生活预算卡（预算/已用/预计还能省+进度条）；点击预算卡弹出“本月省钱计划”轻量 modal（遮罩/ESC/关闭按钮），内容为 mock 展示不接后端 |
| 2026-04-21 | 2.0-16 | RandomModal 轻量彩带/纸屑庆祝动效（随机一道菜） | low | closed | 弹窗出现与“再摇一次”触发一次性 confetti burst（约 1.45s 自动消失），不循环；动效层 `pointer-events:none` 且限制在上半区，不遮挡按钮；`prefers-reduced-motion` 自动降级 |
| 2026-04-21 | 2.0-17 | Final QA：`npm run lint` 扫描 `.vite-cache` 导致 vendor 噪音 | low | closed | 通过 eslint ignores 排除 `.vite-cache/**`，并对动画类 effect 做规则兜底（避免 final polish 期引入重构风险） |
| 2026-04-21 | 2.0-17 | Final QA：音效素材位文档与默认 mp3 不一致 | low | closed | 对齐 `public/sounds/README.md` 与 `SOUND_ASSETS.success`，补充硬刷新/清缓存说明，降低替换踩坑 |
| 2026-04-21 | 2.0-17 | 当前环境 `.git` 写入被拒绝，无法 `git add/commit` | medium | open | `git add -A` 报 `.git/index.lock Permission denied`；本轮只做打包与提交命令建议，需在可写环境完成真实提交 |
| 2026-04-21 | 2.0-18 | 最终提交材料分散，缺少统一导出索引与大纲 | medium | closed | 已补齐 `07_exports/`（索引/过程概览/分工模板/演示脚本/checklist/release note/总大纲），并生成交付 zip（见 `3_presentation/`） |
