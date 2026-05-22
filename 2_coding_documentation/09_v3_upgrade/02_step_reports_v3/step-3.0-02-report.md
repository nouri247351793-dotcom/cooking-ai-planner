# Step 3.0-02 Report - Input Panel And Filter Entry

Date: 2026-05-22

## 本轮目标

重构首页中间输入主面板，让它成为 3.0 dashboard 的最强视觉中心，并把原先默认外露的筛选 chips 收纳到统一“筛选”入口。

## AI 输出方案摘要

- 将 `HomeHero` 改为深底主操作卡，标题行由图标位 + “今天想吃点什么？”组成。
- 保留大输入框、辅助说明、拍照上传和生成菜谱按钮。
- 将 `FiltersPanel` 从“快捷 chips + 更多筛选”改为默认折叠的单一“筛选”面板。
- 修复 `PhotoUploadButton` 中文标签，明确“拍照上传”为次按钮。

## 文件级改动说明

- `1_project_files/cooking-ai-planner/src/components/home/HomeHero.jsx`
  - 重写首页输入主面板结构。
  - 新增标题图标位、说明文字、大输入框、操作按钮区和统一筛选入口。
- `1_project_files/cooking-ai-planner/src/components/home/FiltersPanel.jsx`
  - 移除默认展示的全部筛选 chips。
  - 将时长、预算、设备、人份统一放入“筛选”折叠面板。
  - 增加当前筛选项数量提示和“恢复默认筛选”按钮。
- `1_project_files/cooking-ai-planner/src/components/home/PhotoUploadButton.jsx`
  - 更新按钮文案为“拍照上传 / 已上传”。
  - 为深底主卡增加专用按钮 class。
- `1_project_files/cooking-ai-planner/src/styles/app.css`
  - 新增深底主操作卡视觉、输入区留白、按钮尺寸、筛选面板深色样式。
  - 修正 embedded filter 旧样式对 v3 筛选入口的覆盖。
- `2_coding_documentation/09_v3_upgrade/...`
  - 新增本轮 prompt log、step report、flowchart、after 截图，并更新 issue/reflection/current status。

## 产品级改动说明

- 旧体验：用户进入首页先看到一整排筛选 chips，输入主操作区视觉焦点被分散。
- 新体验：默认只展示“筛选”入口，首页主焦点回到“我想吃什么”的输入与生成动作。
- 筛选依然可用，但从主路径退到辅助路径，符合 3.0 “首页更聚焦”的目标。

## 代码级改动说明

- 没有改动菜谱生成、筛选参数 shape、localStorage、购物清单、收藏等业务逻辑。
- `FiltersPanel` 仍使用 `durationMax / budget / equipmentLimit / servings` 四个字段。
- 筛选项收起的原因：默认 chips 会把用户注意力从“输入需求”转移到“先选条件”，不利于主流程聚焦。
- “筛选”统一入口更清晰的原因：用户只需要记住一个入口，展开后再看到完整条件，不会在首页默认状态下产生过多选择负担。

## 运行与验证

- `npm.cmd run build`: passed
- Vite preview 页面可访问：`http://127.0.0.1:4173/cooking-ai-planner/`
- 已保存 after 截图：
  - `2_coding_documentation/09_v3_upgrade/05_assets_v3/screenshots_after/step-3.0-02-home.png`

## 本轮验收

- 首页默认不再展示筛选 chips。
- “更多筛选”已变成统一“筛选”入口。
- 中间输入区使用深底主操作卡，视觉层级高于下方推荐卡和右侧工具卡。
- 原有生成菜谱、拍照上传占位、筛选字段仍保留。

## Git 记录

Planned commit message:

```text
[step-3.0-02][feat] refactor homepage input panel and filter entry
```

## 下一步建议

执行 Step 3.0-03：重构右侧工具区，并优先实现可编辑计时器模块。

