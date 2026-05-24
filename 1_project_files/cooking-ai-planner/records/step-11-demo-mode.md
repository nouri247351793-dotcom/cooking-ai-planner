# Step 11 执行记录：demo 模式提示

日期：2026-05-23

## 执行目标

为小饭桌 4.0 增加 demo 模式提示：当后端或前端 fallback 返回 `demoMode: true` 时，页面轻量显示“当前为演示模式，AI 内容由示例数据生成。”，同时不阻断推荐菜谱、待购清单和收藏操作。

## demoMode 判断方式

- `askAI()` 返回结果中包含 `demoMode: true`。
- 首页 `HomePage.jsx` 已根据 `aiResponse.demoMode` 设置 `aiStatus` 为 `demo`。
- `AIResultPanel` 直接读取 `result?.demoMode` 决定是否显示提示。
- 有真实 API Key 且接口返回 `demoMode: false` 时不显示该提示。

## 修改文件

- `src/pages/HomePage.jsx`
- `src/styles/app.css`
- `records/step-11-demo-mode.md`
- `2_coding_documentation/10_v4_ai_upgrade/01_prompt_logs_v4/step-4.0-11-demo-mode.md`
- `2_coding_documentation/10_v4_ai_upgrade/02_step_reports_v4/step-4.0-11-report.md`
- `2_coding_documentation/10_v4_ai_upgrade/04_flowcharts_v4/step-4.0-11-demo-mode.mmd`
- `2_coding_documentation/03_git_records/commit_index.md`

## 显示位置

- 首页 AI 结果卡片内部。
- 位置在 AI 结果标题区下方、`answer` 正文上方。
- 文案为：`当前为演示模式，AI 内容由示例数据生成。`

## 交互影响

- demo 提示仅为静态说明，不弹窗、不遮挡、不禁用按钮。
- demo 模式下仍可查看推荐菜谱。
- demo 模式下仍可生成待购清单。
- demo 模式下仍可收藏 AI 推荐菜谱。

## build 结果

命令：

```bash
npm.cmd run build
```

结果：

- build：通过
- 构建产物：
  - `dist/index.html`
  - `dist/assets/index-DlhWFW_n.css`
  - `dist/assets/index-C_Wrj8gZ.js`
- 构建耗时：约 774ms

## 建议提交信息

```text
[step-4.0-11][ux] add demo mode notice
```

## 下一步建议

执行 Step 12：完整容错检查，重点检查 API 请求失败、JSON 非法、localStorage 读取失败、收藏和待购清单交互是否不白屏。
