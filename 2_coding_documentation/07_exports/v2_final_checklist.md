# v2 最终提交检查清单（目录/构建/演示/压缩）

更新时间：2026-04-21

## 1）目录完整性
- [ ] `1_project_files/` 存在且包含 `cooking-ai-planner/`
- [ ] `2_coding_documentation/` 存在且包含：
  - [ ] `08_v2_upgrade/`
  - [ ] `07_exports/`（本目录导出文档齐全）
- [ ] `3_presentation/` 存在（演示脚本、checklist、release note、最终 zip）
- [ ] `4_certs/` 存在（如老师要求证书/声明/成员信息）

## 2）构建与本地运行
- [ ] `cd 1_project_files/cooking-ai-planner`
- [ ] `npm.cmd install` 成功
- [ ] `npm.cmd run build` 成功（`dist/` 生成）
- [ ] `npm.cmd run dev` 成功（可访问 `http://localhost:5173/#/`）

## 3）关键页面可进入（至少点一遍）
- [ ] 首页 `#/`
- [ ] 待购清单 `#/shopping`
- [ ] 我的收藏 `#/favorites`
- [ ] 最近做过 `#/recent`
- [ ] 新手贴士 `#/tips`
- [ ] 设置 `#/settings`

## 4）关键交互可演示（最小闭环）
- [ ] 首页“生成菜谱”→ 跳转结果页 `#/results`
- [ ] 结果页点击卡片 → 进入详情页 `#/recipes/:id`
- [ ] 详情页点选食材/调料 → badge 数字变化
- [ ] 点击“加入待购清单”→ 出现结果反馈弹窗 → 可跳转到清单
- [ ] 清单详情：新增（FAB）/勾选/编辑/删除可用；刷新后仍保留
- [ ] 收藏：详情页收藏 → 收藏页实时更新
- [ ] “我做了”：详情页点击 → 最近做过页出现记录
- [ ] 随机一道菜：模态能打开/关闭，“再摇一次”“查看详情”可用，彩带动效不遮挡按钮
- [ ] 省钱计划：可打开弹窗并关闭

## 5）音效与素材位（可选，但建议检查）
- [ ] 成功提示音在“生成成功跳转/随机弹窗成功打开”时触发（若被浏览器策略拦截，至少不报错）
- [ ] 音效替换说明：`1_project_files/cooking-ai-planner/public/sounds/README.md`
- [ ] 背景波点素材位：可显示/可留空（不影响可读性）

## 6）导出文档齐全（本目录）
- [ ] `coding_documentation_index.md`
- [ ] `vibe_process_overview.md`
- [ ] `group_work_division_template.md`
- [ ] `demo_script.md`
- [ ] `v2_final_checklist.md`
- [ ] `2.0_release_note.md`
- [ ] `vibe_coding_master_outline.md`

## 7）最终 zip 与命名（提交用）
- [ ] 已生成 zip（不包含 `.git/node_modules/dist/.vite-cache`）：
  - [ ] `3_presentation/xiaofanzhuo_v2_delivery_2026-04-21.zip`
- [ ] zip 命名建议（按老师要求微调）：
  - `小饭桌_2.0_演示版_YYYY-MM-DD.zip`
  - 或 `组号_项目名_2.0_YYYY-MM-DD.zip`

## 8）如果需要“公开演示链接”
- [ ] 已部署并拿到 URL（Vercel/Netlify）
- [ ] 若未部署：按 `08_v2_upgrade/02_step_reports_v2/final_deploy_report.md` 的 Netlify Drop 路径获取 URL

