# 小饭桌 3.0 Final Checklist

Date: 2026-05-23

## 项目目录

- [x] `1_project_files/`
- [x] `2_coding_documentation/`
- [x] `3_presentation/`
- [x] `4_certs/`

## 构建检查

- [x] `npm.cmd run build` 通过
- [x] Vite preview 根地址 HTTP 200
- [x] Git 工作区提交前已检查

## 首页模块

- [x] Dashboard shell
- [x] 左侧 icon nav
- [x] 主输入区
- [x] 折叠筛选入口
- [x] 右侧计时器
- [x] 随机一道菜入口
- [x] 做饭小贴士
- [x] 省钱计划摘要
- [x] 推荐任务面板

## 一级页面

- [x] 首页 `/`
- [x] 生成结果 `/results`
- [x] 菜谱详情 `/recipes/:recipeId`
- [x] 待购清单 `/shopping`
- [x] 待购详情 `/shopping/:itemId`
- [x] 我的收藏 `/favorites`
- [x] 最近做过 `/recent`
- [x] 新手贴士 `/tips`
- [x] 任务详情 `/tasks/:taskId`
- [x] 设置 `/settings`

## 关键弹窗

- [x] 随机一道菜弹窗
- [x] 省钱计划弹窗
- [x] 首页筛选展开面板
- [x] 预算首次设置状态
- [x] 预算记录状态

## 关键状态

- [x] 收藏 localStorage
- [x] 待购清单 localStorage
- [x] 最近做过 localStorage
- [x] 任务 XP localStorage
- [x] 预算账本 localStorage
- [x] AI 配置 localStorage
- [ ] 计时器持久化：未做，当前定位为轻运行工具

## 归档

- [x] prompt logs 覆盖 Step 3.0-00 至 3.0-10
- [x] step reports 覆盖 Step 3.0-00 至 3.0-10
- [x] issue log 已更新
- [x] reflection log 已更新
- [x] macro flow 已更新
- [x] current status 已更新
- [x] export plan 已生成
- [x] file tree 已生成

## 已知限制

- 当前 3.0 不接真实 AI。
- 任务完成为用户手动确认。
- 预算账本为本地手动记录。
- Step 3.0-07 / 3.0-08 的截图受本机 headless browser 权限限制未生成。

## Git 建议

- Commit message：`[step-3.0-10][docs] finalize v3 qa release records`
- Tag：`v3.0-final`
- Release title：`小饭桌 3.0 final`
- Push 前不要 force push。
