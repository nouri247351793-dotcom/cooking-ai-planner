# vibe_coding_master_outline（最终 PDF 大纲建议）

更新时间：2026-04-21  
目标：把“vibe coding 过程 + 最终成品”整理成易导出 PDF 的结构，不用再人工重排。

## 1）项目背景与目标（1 页）
- 项目名：小饭桌（大学生做饭学习规划师）
- 场景：大学生在预算/时长/设备限制下学习做饭
- 目标：形成“学习规划闭环”并可课堂演示
- 约束：纯前端、本地 mock，不接真实 AI/后端；但架构 RAG-ready

## 2）最终成品概览（1–2 页）
- 一级页面：首页/待购清单/我的收藏/最近做过/新手贴士/设置
- 二级页面/弹窗：结果页/详情页/清单详情/随机模态/省钱计划/加入待购反馈
- 数据与持久化：localStorage keys（收藏/清单/最近做过/AI 配置/生成器状态）

## 3）vibe coding 推进时间线（2–4 页）
建议使用：
- `08_v2_upgrade/04_flowcharts_v2/macro_flow_v2.mmd`
- `07_exports/vibe_process_overview.md`

按阶段叙述：
- v1：骨架 → 页面 → 数据层 → AI/RAG 占位
- v2：桌面壳 → 首页高保真 → 结果页中间层 → 详情闭环 → 体验增强 → Final QA 收口

## 4）关键 prompt 分组与作用（2–3 页）
素材来源：
- `08_v2_upgrade/01_prompt_logs_v2/`（按 step 归档）
说明建议包含：
- 每类 prompt 的目标（布局/闭环/AI 占位/体验增强/收口）
- 为什么每轮只做一个明确步骤（降低回归风险）

## 5）关键改动点（按“闭环”讲）（2–4 页）
建议以用户路径组织，而不是以文件组织：
- 首页输入卡 → 结果页 → 详情页（选择/加入待购/收藏/我做了）
- 待购清单（分组 + CRUD）→ 持久化
- 收藏/最近做过（沉淀页的价值）
- AI core / RAG-ready：为什么 mock-only 仍有意义、未来替换点在哪里

## 6）关键问题与修复策略（1–3 页）
素材来源：
- `08_v2_upgrade/03_issue_reviews_v2/issue-log-v2.md`
- `08_v2_upgrade/03_issue_reviews_v2/reflection-log-v2.md`

建议挑 3–5 个典型点：
- Windows 环境可复现性（npm.cmd/端口/构建 warning 记录）
- 响应式双栏断点选择（避免步骤区窄条）
- 音效/素材位替换踩坑（缓存/策略/文档一致性）
- final QA 收口（不加功能，只做验证/打包/材料）

## 7）最终演示脚本 + checklist（1–2 页）
- 演示脚本：`07_exports/demo_script.md`
- checklist：`07_exports/v2_final_checklist.md`
- release note：`07_exports/2.0_release_note.md`

## 8）建议的 PDF 合并顺序（可直接用）
1. `07_exports/vibe_coding_master_outline.md`
2. `07_exports/vibe_process_overview.md`
3. `08_v2_upgrade/04_flowcharts_v2/macro_flow_v2.mmd`（可截图/导出）
4. `07_exports/2.0_release_note.md`
5. `07_exports/demo_script.md`
6. `07_exports/v2_final_checklist.md`
7. `08_v2_upgrade/03_issue_reviews_v2/issue-log-v2.md`（选读）
8. `08_v2_upgrade/03_issue_reviews_v2/reflection-log-v2.md`（选读）

## 9）提交材料清单（建议放在 PDF 封底）
- 代码压缩包（见 `3_presentation/`）
- 文档 PDF（本大纲 + 关键 step report/issue/flow）
- 截图素材（`08_v2_upgrade/05_assets_v2/`）
- 小组分工表（`07_exports/group_work_division_template.md`）

