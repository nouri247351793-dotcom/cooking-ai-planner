# vibe process overview（1.0 → 2.0 演进概览）

更新时间：2026-04-21  
项目：小饭桌（大学生做饭学习规划师）— Vite + React（mock-only / RAG-ready）

## 1）一句话定位
把“大学生做饭学习规划”做成可课堂演示的网页产品：输入目标与限制 → 生成候选 → 进入详情学习 → 加入待购/收藏/最近做过形成学习闭环。

## 2）阶段与时间线（关键节点）

### v1（1.0）阶段：移动端 MVP 骨架 → 数据流 → AI/RAG 占位
- Step 01：Vite+React 工程骨架 + 目录规范
- Step 02：Router + 全局样式 token + 页面壳
- Step 03：HomePage（mock 生成/随机/状态机）
- Step 04：RecipeCard + RecipeDetailPage（收藏/加入待购，localStorage）
- Step 05：ShoppingList/Detail（分组 + CRUD + source 字段预留）
- Step 06：FavoritesPage + export service（JSON 导出占位）
- Step 07：统一数据层（Context + hooks：`useFavorites/useShoppingList/useRecipeGeneratorState`）
- Step 08：AI core 配置层（Settings + services/ai 抽象，mock-only）
- Step 09：RAG-ready（本地知识库 JSON + retrieval + promptBuilder，占位可替换）

### v2（2.0）阶段：桌面网页化 + 高保真对齐 + 趣味增强 + 收口
- 2.0-00：v1 baseline snapshot（为 2.0 增量升级留基线）
- 2.0-01：桌面壳（SideNav + TopBar），建立网页信息架构
- 2.0-02：首页 Hero 高保真对齐（输入主卡 + 胶囊 + 右侧辅助区）
- 2.0-03：新增结果页（把 loading/空/错/列表/再生成收敛到中间层）
- 2.0-04：随机一道菜模态 + 成功提示音（可替换素材位）
- 2.0-05：详情页 PRD2（选择→badge→加入待购反馈弹窗；不破坏收藏）
- 2.0-07：收藏/最近/贴士页面 demo-ready（空状态完整）
- 2.0-09：轻量 UX polish（toast/skeleton/modal 动效/空状态占位）
- 2.0-10：全站主题与宽度重定向（P0）
- 2.0-11：首页结构清理 + 去底部导航残留 + 模态标准化（P0）
- 2.0-12：Home/Detail polish（spacing/背景纯色/详情 action 区/清空选择）（P0）
- 2.0-13：清单/收藏/详情/最近做过联动修正（“我做了”闭环）
- 2.0-14：详情页双栏对齐与响应式修复 + 轻量 emoji 点缀
- 2.0-15：首页右侧辅助卡改版 + “省钱计划”弹窗（mock）
- 2.0-16：随机弹窗一次性彩带/纸屑庆祝动效（不遮挡交互）
- 2.0-17：Final QA（build/lint/打包/文档对齐）

## 3）关键页面与功能是怎么搭起来的（架构要点）
- **数据层**：Context Provider 统一维护收藏/待购/最近做过/生成器状态（localStorage 持久化）
- **AI core**：`services/ai/` 只走 mock provider，但 params/prompt/retrieval 接口已抽象，便于替换真实服务
- **RAG-ready**：本地 JSON 知识库 + 关键词检索 + tags/filters 二次筛选，产出 retrievedDocs 供 promptBuilder 组装
- **UI**：桌面端左侧导航为主入口；结果页承接列表展示与再生成；详情页承接学习与闭环操作

## 4）关键 prompt 分组说明（用于答辩/复盘）
- 架构搭建：目录规范、router/layout/tokens、context+hooks 数据层
- 学习闭环：结果页、详情页选择→加入待购反馈、“我做了”→最近做过
- AI 占位：settings 配置、provider 抽象、RAG-ready 本地检索与 prompt 组装
- 体验增强：toast/skeleton/modal 动效、成功音效、随机弹窗彩带
- 收口交付：final QA、打包导出、提交材料与脚本

## 5）关键问题修复脉络（示例）
- Windows 环境可复现性：`npm.cmd`、端口占用、构建警告记录、脚本打包排除 `.git/node_modules/dist`
- 响应式异常：把详情页双栏断点调到更合理区间，避免步骤区被压成窄条
- 音效替换踩坑：统一 constants 与文档，补充硬刷新/清缓存说明

