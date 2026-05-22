# Step 3.0-01 Report - Dashboard Shell And Icon Navigation

Date: 2026-05-22

## 本轮目标

把当前 2.0 页面壳升级为 3.0 dashboard 结构：大圆角外层容器、更窄的左侧图标导航、中间主操作区、右侧工具区，并保持原有路由不破坏。

## AI 输出方案摘要

- 将 `v2Frame/v2Sidebar/v2Body` 页面壳替换为 `dashboardFrame/dashboardNavRail/dashboardBody`。
- 将左侧导航从宽文字列表改成窄竖向 icon rail，并保留当前页高亮、收藏/待购数量 badge。
- 首页继续复用现有 `homeV2__main` 与 `homeV2__aside`，作为 3.0 中间主操作区和右侧工具区的基础。
- 统一外层容器、卡片、Hero、左右区间距，使布局更透气。

## 文件级改动说明

- `1_project_files/cooking-ai-planner/src/components/AppLayout.jsx`
  - 重写全局页面壳为 dashboard 命名结构。
  - 修复布局元信息中的中文标题，保留所有原有路由。
- `1_project_files/cooking-ai-planner/src/components/SideNav.jsx`
  - 左侧导航改为图标化竖向导航。
  - 使用 `import.meta.env.BASE_URL` 拼接 logo 路径，适配 GitHub Pages 子路径部署。
  - 保留待购/收藏 badge 与当前页高亮。
- `1_project_files/cooking-ai-planner/src/components/TopBar.jsx`
  - 修复非首页顶部栏中文文本，保持二级页面返回与快捷入口。
- `1_project_files/cooking-ai-planner/src/styles/app.css`
  - 新增 dashboard 外层容器、窄导航栏、主内容圆角容器和首页左右分栏间距。
  - 调整卡片、Hero、首页 grid 的圆角和留白。
- `1_project_files/cooking-ai-planner/index.html`
  - 修复页面标题为“小饭桌”。
- `1_project_files/cooking-ai-planner/public/brand/logo.png`
  - 纳入版本管理，作为导航品牌标识。
- `2_coding_documentation/09_v3_upgrade/...`
  - 新增本轮 prompt log、step report、after 截图和 dashboard flowchart。

## 产品级改动说明

- 旧布局：左侧为较宽的文字导航，主内容像传统内容页。
- 新布局：左侧为窄 icon rail，中间为主要做饭/生成操作区，右侧为辅助工具区。
- 用户进入首页后，视觉焦点更集中：导航、主操作区、右侧工具区的层级更清晰。
- 本轮不新增计时器、成长任务、预算记账等 3.0 功能，只为后续步骤搭好全局页面壳。

## 代码级改动说明

- 没有改动 recipe generation、shopping list、favorites、recent、tips 的业务数据逻辑。
- 主要改动集中在 React layout 组件和 CSS layout/styling。
- 导航结构仍使用 `NavLink`，因此当前页高亮由 React Router 自动维护。
- Logo 路径使用 Vite base URL，避免 GitHub Pages 部署在 `/cooking-ai-planner/` 子路径时图片找不到。

## 运行与验证

- `npm.cmd run build`: passed
- Vite preview 页面可访问：`http://127.0.0.1:4173/cooking-ai-planner/`
- 已保存 after 截图：
  - `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_after/step-3.0-01-home.png`

## 本轮验收

- 整体页面壳已变成 dashboard 布局。
- 左侧导航已图标化，并保留品牌 logo / 开始做饭 / 待购清单 / 我的收藏 / 最近做过 / 新手贴士 / 设置入口。
- 页面层级更清楚：左侧导航、中间主操作区、右侧工具区。
- 原有路由未删除，build 通过。

## Git 记录

Planned commit message:

```text
[step-3.0-01][layout] upgrade dashboard shell and icon nav
```

## 下一步建议

执行 Step 3.0-02：重构首页中间输入主面板，收起默认筛选 chips，并将“更多筛选”统一为“筛选”入口。

