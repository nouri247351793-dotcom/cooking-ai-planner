# Step 01 - project-init（Prompt Log）

## 本轮输入 Prompt（原文）

在 `1_project_files/cooking-ai-planner` 中初始化项目骨架。

要求：
1）使用 Vite + React + JavaScript；
2）移动端优先，最大内容宽度 430px；
3）创建基础目录：
   `src/components`
   `src/pages`
   `src/data`
   `src/styles`
   `src/hooks`
   `src/services`
   `src/store`
   `src/utils`
4）先搭建底部导航框架：
   - 开始做饭
   - 待购清单
   - 我的收藏
5）暂不接后端；
6）生成 README，写清启动方式；
7）同步更新：
   - step-01 prompt log
   - step-01 step report
   - commit_index.md
   - macro_flow.mmd 的状态
8）输出完整文件树、安装命令、启动命令、验证方法。

特别要求：
本轮完成后请检查：
- npm install 是否成功
- npm run dev 是否可启动
- 页面是否非空白
- 文档是否已归档

## 备注

- 本轮目标：初始化前端骨架 + 移动端布局 + 底部导航（3 页占位）
- 预计修改文件清单：
  - `1_project_files/cooking-ai-planner/**`
  - `2_coding_documentation/02_step_reports/step-01-report.md`
  - `2_coding_documentation/03_git_records/commit_index.md`
  - `2_coding_documentation/05_flowcharts/macro_flow.mmd`
- 风险点：
  - npm 依赖安装需要网络与缓存写入权限
  - dev server 启动在受限沙盒里可能失败（需要在本机环境验证）
- 验证方法：
  - `npm install` 成功（或 `npm.cmd install`）
  - `npm run dev` 可启动并可访问 `http://127.0.0.1:5173/`
  - 页面首屏非空白、底部导航可切换 3 个页面


