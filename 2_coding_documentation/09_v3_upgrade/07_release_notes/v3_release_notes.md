# 小饭桌 3.0 Release Notes

Date: 2026-05-23

## Release Summary

小饭桌 3.0 将 2.0 的菜谱工具升级为更完整的“新手做饭 dashboard”：首页有主输入、右侧工具、推荐任务、XP 成长、预算账本和统一后的辅助页面。

## 主要新增

- Dashboard shell：左侧 icon nav、大圆角外壳、主内容区与右侧工具区。
- 首页主输入区：深底主操作卡、拍照入口、生成菜谱按钮、折叠筛选。
- 右侧计时器：支持 MM:SS 编辑、开始、暂停、重置、结束态。
- 推荐任务系统：按简单 / 中等 / 困难展示任务。
- 任务详情页：小教程、目标、步骤、完成标准、“我做了”。
- XP 成长：任务完成后发放 XP，自动推导等级与阶段。
- 省钱计划：本月预算、本月已花、开支记录、使用比例。
- 一级辅助页统一：待购清单、我的收藏、最近做过、新手贴士。
- UI 规范：新增 `ui-spec-v3.md`，整理 token、按钮层级和卡片变体。

## 保留能力

- mock 菜谱生成。
- 菜谱结果页。
- 菜谱详情页。
- 收藏。
- 待购清单。
- 最近做过。
- 设置页 AI 配置占位。
- GitHub Pages 子路径兼容。

## 不包含

- 不接真实 AI。
- 不接真实图片识别。
- 不接真实支付、银行或外部账单。
- 不做云端同步。
- 不做真实任务完成检测。

## 已知限制

- 任务完成依赖用户手动点击“我做了”。
- 预算账本为本地 localStorage 手动记录。
- 计时器不做持久化，刷新后会重置。
- 当前环境 headless browser 截图存在 Crashpad 权限问题，部分后期截图未生成。

## 验证

- `npm.cmd run build`: passed
- Vite preview root：HTTP 200
- 当前本地分支：`main`
- 当前状态：本地 commits 尚未全部 push 到 `origin/main`

## 推荐发布信息

- Git tag：`v3.0-final`
- GitHub release title：`小饭桌 3.0 final`
- Commit message：`[step-3.0-10][docs] finalize v3 qa release records`
