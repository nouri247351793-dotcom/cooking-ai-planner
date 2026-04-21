# Step 2.0-00 Report（1.0 基线留档）

日期：2026-04-18

## 本轮目标

- 按《执行手册2.0》完成 1.0 基线快照，为后续 v2 增量升级提供对照与回溯依据

## 输入 prompt 原文

见：`2_coding_documentation/08_v2_upgrade/01_prompt_logs_v2/step-2.0-00-baseline.md`

## 实际完成内容

- 新增 v2 升级归档目录：`2_coding_documentation/08_v2_upgrade/`
- 输出 1.0 基线快照文档（路由 / localStorage / 已知问题 / build / 文件树）
- 将《执行手册 2.0》PDF 页转为图片，便于在仓库内快速查看（`06_assets/manual_pages/manual-2.0/`）
- 基线截图：由于当前环境的 Edge headless 截图能力不可用，本轮先复用已有截图到 `05_assets_v2/screenshots_before/`（后续可在真实环境补齐更多页面截图）

## 验证与记录

- build：记录在 `00_v1_baseline/baseline_build_check.md`

## 下一轮建议（不在本轮执行）

- 严格按手册顺序进入 **Step 2.0-01**：先做全局网页框架（左侧导航/顶部搜索/右上入口），再逐步迁移各页面
