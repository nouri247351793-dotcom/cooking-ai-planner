# cooking-ai-planner（大学生做饭学习规划师）

技术栈：`Vite + React + JavaScript`

UI 约束：移动端优先，内容最大宽度 `430px`（见 `src/styles/tokens.css` 的 `--maxw`）。

路由：React Router（使用 `HashRouter`，避免静态部署/刷新 404 的问题）。

## 启动

在本目录（`1_project_files/cooking-ai-planner`）执行：

```bash
npm install
npm run dev
```

如遇到 PowerShell 脚本策略导致 `npm` 命令被拦截，可改用：

```bash
npm.cmd install
npm.cmd run dev
```

启动后默认访问：

- `http://localhost:5173/`

## 页面框架（Step 01）

底部导航 3 个页面占位：

- 开始做饭（mock 学习计划 + 演示菜谱）
- 待购清单（演示数据）
- 我的收藏（非空白空状态）

详情/设置页面占位：

- 菜谱详情：`#/recipes/:recipeId`
- 清单详情：`#/shopping/:itemId`
- AI 配置：`#/settings`（入口在首页右上角）

## 目录约定

```
src/components
src/pages
src/data
src/styles
src/hooks
src/services
src/store
src/utils
```
