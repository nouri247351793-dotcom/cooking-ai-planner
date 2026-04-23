# 小饭桌（cooking-ai-planner）

面向大学生的「做饭学习规划师」前端项目：你给一个目标（省钱 / 快手 / 宿舍设备受限 / 想练刀工等），它会用 **mock 数据**生成一组可练的菜谱，并把练习过程拆成「选菜 → 备料 → 执行 → 复盘」的节奏。

当前版本为 **2.0**：只做本地演示与交付归档，不接入真实 AI / 后端服务。

## 核心功能（What it does）

- 生成菜谱（mock）：首页输入目标 + 筛选（时长/预算/设备/份数），生成并跳转到结果页
- 菜谱结果页：显示条件摘要、支持重新生成、进入菜谱详情
- 菜谱详情页：食材/调料可点选；支持加入待购清单；支持收藏；支持「我做了」记录到最近做过
- 待购清单：按菜谱分组；分组详情支持勾选完成、手动新增、编辑/删除；进度条展示完成度
- 收藏：搜索 + 快捷筛选；支持导出本地 JSON（收藏与待购清单）
- 最近做过：按最近记录展示（本地 `localStorage`）
- 新手贴士：技巧卡片页（用于课堂/演示时快速讲解）
- 轻量演示入口：首页包含「随机一道菜」弹窗与「省钱计划」弹窗（内容为 mock）
- 设置页（占位）：AI 配置只做本地保存；除 `mock provider` 外的选项仅保留接口，不会发起网络请求

## 技术栈（Tech Stack）

- Vite + React（纯前端）
- React Router（`HashRouter`，便于静态部署避免刷新 404）
- ESLint
- p5（首页轻量装饰效果，失败不阻塞主 UI）

## 项目结构（Structure）

本仓库同时包含应用代码与过程归档：

```text
.
├─ 1_project_files/
│  └─ cooking-ai-planner/        # 应用工程（Vite）
├─ 2_coding_documentation/       # 研发过程归档（prompt / report / flow / git record / exports）
├─ 3_presentation/               # 交付物与演示相关文件
├─ 4_certs/                      # 证书与说明
└─ scripts/                      # 打包/辅助脚本
```

应用工程内部（节选）：

```text
1_project_files/cooking-ai-planner/src/
├─ pages/        # Home/Results/RecipeDetail/Shopping/Favorites/Recent/Tips/Settings
├─ components/   # 布局、卡片、弹窗、表单、p5 装饰等
├─ services/     # mock 生成/本地检索（RAG-ready）/导出/音效/购物清单
├─ data/         # 菜谱目录、贴士目录、本地知识库 JSON
├─ store/        # AppDataProvider（localStorage 持久化）
└─ styles/       # tokens 与全局样式
```

## 安装与运行（Install & Run）

在应用目录执行：

```bash
cd 1_project_files/cooking-ai-planner
npm install
npm run dev
```

如果你的环境是 PowerShell 且 `npm` 被脚本策略影响，可改用：

```bash
npm.cmd install
npm.cmd run dev
```

常用命令：

- `npm run build`：生产构建
- `npm run preview`：本地预览构建产物
- `npm run lint`：代码检查

## 当前版本说明（v2.0）

- 2.0 主要聚焦：桌面端壳（左侧 SideNav + 顶部栏）、演示路径完整、交付文档与归档齐全
- AI 相关逻辑为 **mock-only**：`openai-compatible/custom` 仅保留接口与配置项，不会进行真实网络调用
- 图片上传为占位入口：当前不做食材识别
- 数据持久化仅使用浏览器 `localStorage`（收藏/待购/最近做过/生成器输入与筛选/AI 配置）

## 后续规划（v3.0 设想）

- 接入真实模型：实现 `openai-compatible` provider（通过环境变量/密钥配置，允许真实网络请求）
- 完善「拍照识别食材」链路：把上传入口升级为可用的识别与建议（仍保持可降级）
- RAG 从“本地 JSON”升级为可扩展方案：更清晰的知识库管理与检索策略
- 数据能力增强：导入/导出更完善、以及更清晰的练习记录与复盘视图

## 说明

- 本仓库更像“可演示的产品原型 + 过程归档”，相关过程材料在 `2_coding_documentation/`。
- License：目前未添加（如准备对外开源发布，建议补充合适的 License）。
