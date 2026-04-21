# Issue Log

| Date | Step | Title | Severity | Status | Notes |
|---|---:|---|---|---|---|
| 2026-04-17 | 00 | Workspace 初始化为空，需手动脚手架 | medium | open | 后续 Step 01 处理 |
| 2026-04-17 | 02 | 受限环境下 dev server 可能 spawn EPERM | low | mitigated | 在本机环境验证 `npm.cmd run dev`；必要时用允许权限执行 |
| 2026-04-17 | 03 | 生成菜谱详情页刷新可能丢失数据 | low | open | 当前通过 `Link state` 传递；后续可 localStorage/store 持久化 |
| 2026-04-17 | 04 | 待购清单 demo 与本地状态共存逻辑 | low | mitigated | 有本地数据优先本地，无则 fallback demo |
| 2026-04-17 | 05 | 待购分组 recipeId 不存在的显示策略 | low | mitigated | `recipeCatalog` 找不到则按 placeholder 渲染，不阻塞清单操作 |
| 2026-04-17 | 05 | 详情页新增项重复与合并策略 | low | open | 当前以 `id` 去重；后续可做“同名合并/数量累加”规则 |
| 2026-04-17 | 06 | 导出下载受浏览器策略影响 | low | open | 若下载被拦截，可提示用户允许下载或改为单文件导出 |
| 2026-04-17 | 06 | favorites 导出包含 recipesSnapshot 体积增长 | low | open | 后续可提供“仅导出 ids”选项或分页导出 |
| 2026-04-17 | 06-review | 手动验收未在 CLI 内完成 | medium | open | 建议按“3分钟演示路径”在浏览器逐项点击并截图存证 |
| 2026-04-17 | 07 | Context 数据流重构回归风险 | medium | open | 需回归：首页/详情收藏→收藏页实时更新；详情加入待购→待购页实时更新；刷新持久化；legacy key 回退 |
| 2026-04-18 | 08 | AI provider 配置与 mock-only 行为易误解 | low | open | 选择非 mock provider 时首页生成会报“暂不支持”；可在 UI 上更明确禁用/提示，避免用户误解为已接入真模型 |
| 2026-04-18 | 09 | 本地检索的局限性（RAG-ready 反思） | low | open | 仅关键词/标签匹配，无向量召回与重排；语义召回弱、易漏召回/误召回；语料更新需重新构建；仅适合课堂 MVP 的可控演示 |
| 2026-04-18 | 10 | 移动端动效兼容性风险 | low | open | 不引入动画库，改用 CSS 动效；需关注低性能机与“减少动态效果”设置（prefers-reduced-motion） |
| 2026-04-18 | 11 | p5 装饰模块性能/兼容性风险 | low | open | 已做成可选模块+懒加载+pointer-events none；若出现卡顿可一键卸载（脚本），并保留主功能稳定 |
| 2026-04-18 | 12 | ESLint 扫描 vendor/min.js 导致 lint 失败 | low | mitigated | 已在 `eslint.config.js` 忽略 `public/vendor/**` 与 `*.min.js`，lint 通过 |
| 2026-04-18 | 12 | AI 调试日志使用 console.debug 容易被默认级别隐藏 | low | mitigated | 已改为 `console.log('[ai][mock] ...')`，更容易在默认 Console 看到 |
| 2026-04-18 | 12 | 部分表单控件缺少 name/id 引发浏览器 Issues 警告 | low | mitigated | 已为主要 input/select/textarea 增加 `name` 属性（不影响功能） |
| 2026-04-18 | 12 | 截图目录残留测试文件 edge-wait-test2.png | low | open | 位于 `2_coding_documentation/06_assets/screenshots/step-10-mobile-ux-enhance/before/edge-wait-test2.png`；如影响归档可手动删除或重建目录 |
