# Step 2.0-09 After Screenshots

目标：用于“体验增强（UX only）”的 before/after 对比截图归档。

## 现状说明（重要）

当前仓库内的 `home-after.png`、`recipe-detail-after.png` 是“占位截图”（图片内有提示文案），原因是：
- 受当前环境策略影响，headless 浏览器自动截图会报 `CreateFile: 拒绝访问 (0x5)`，无法稳定产出真实截图；
- 不影响业务功能，仅影响“自动化留档”。

建议你在本机浏览器手动截图后，直接覆盖同名文件即可。

## 建议截图清单（移动端 430px）

- `home-after.png`：`http://localhost:5173/#/`
- `recipe-detail-after.png`：`http://localhost:5173/#/recipes/r1`
- （可选）`results-after.png`：`http://localhost:5173/#/results`
- （可选）`tips-after.png`：`http://localhost:5173/#/tips`

## 截图方式（手动）

1) 启动：在 `1_project_files/cooking-ai-planner` 执行 `npm run dev`
2) 浏览器打开对应页面（建议用开发者工具切换到 430px 宽度）
3) 截图并覆盖本目录同名文件
