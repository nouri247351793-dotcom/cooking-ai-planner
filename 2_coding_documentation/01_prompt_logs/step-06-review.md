# Step 06 - Review（Prompt Log）

## 本轮输入 Prompt（原文）

你现在是本项目的 vibe coding 开发代理，项目名称为“大学生做饭学习规划师”。

当前进度：项目已完成到 Step 6。
本轮不要继续开发 Step 7 及之后的新功能，不要接入真实 AI、真实后端、真实数据库，也不要处理 OpenClaw。
本轮唯一目标是：检查当前搭建结果、进行简单测试、输出阶段性验收结论，并同步更新归档文档。

硬性规则：
1. 不要大改项目结构。
2. 优先做“查看、运行、验证、记录”，不是继续扩展功能。
3. 如发现阻塞运行的严重问题，可以做最小改动修复；如不是阻塞问题，只记录，不重构。
4. 本轮结束后，必须同步更新以下文档到 2_coding_documentation：
   - 01_prompt_logs/step-06-review.md
   - 02_step_reports/step-06-review-report.md
   - 03_git_records/commit_index.md
   - 04_issue_reviews/issue-log.md
   - 05_flowcharts/macro_flow.mmd（标注当前已完成至 Step 6，并增加“阶段性验收”节点）
5. step report 中必须包含：
   - 本轮输入 prompt 原文
   - 当前项目完成范围
   - 实际测试项目
   - 文件级检查结果
   - 代码级检查结果
   - 自测结果
   - 已知问题
   - 下一轮建议
6. 若环境允许，请执行 git status；若本轮有修复，再执行 git add / git commit；若没有修复，只输出建议 commit message 并写入 commit_index.md。
7. 除非我明确要求，否则不要进入 Step 7 的统一状态管理重构。

请严格按以下任务执行：

【任务 A：先盘点当前项目结果】
1）输出当前文件树，至少覆盖：
   - src/components
   - src/pages
   - src/data
   - src/services
   - src/hooks
   - src/styles
   - 2_coding_documentation
2）输出当前路由表。
3）输出当前已完成页面与功能清单，按 Step 1 ~ Step 6 分组说明：
   - Step 1：项目骨架
   - Step 2：路由、全局样式、页面壳
   - Step 3：HomePage
   - Step 4：RecipeCard + RecipeDetailPage
   - Step 5：ShoppingListPage + ShoppingDetailPage
   - Step 6：FavoritesPage + export service 占位
4）明确指出哪些功能是“已完成可演示”，哪些只是“结构预留”。

【任务 B：运行与构建验证】
5）执行并记录以下检查：
   - npm install（如已完成可跳过并说明）
   - npm run dev
   - npm run build
6）记录结果：
   - dev server 是否启动成功
   - 首页是否能打开
   - build 是否成功
   - 是否有 warning / error
7）如果运行失败，优先做最小改动修复，并说明原因。

【任务 C：做一轮简单手动测试】
请按“最小可演示路径”测试以下内容，并逐项给出：
- 测试动作
- 预期结果
- 实际结果
- 是否通过
- 涉及文件
- 是否需要修复

测试项至少包括：
1）底部导航切换：
   - 开始做饭
   - 待购清单
   - 我的收藏

2）HomePage：
   - 输入框可输入
   - 筛选项可切换
   - 点击“生成菜谱”后是否出现 mock 结果
   - 点击“随机一道菜”是否弹出随机结果
   - 默认态 / 加载态 / 无结果态 / 错误态 是否至少具备基本结构

3）RecipeCard / RecipeDetailPage：
   - 点击卡片能否进入详情页
   - 详情页信息是否完整显示
   - 收藏按钮是否可点击
   - 加入待购清单按钮是否可点击
   - 返回逻辑是否正常

4）ShoppingListPage / ShoppingDetailPage：
   - 是否按菜谱分组显示
   - 是否能进入清单详情
   - 是否能新增条目
   - 是否能编辑条目
   - 是否能删除条目
   - 是否能勾选完成
   - 刷新后数据是否仍在

5）FavoritesPage：
   - 是否能显示已收藏内容
   - 搜索是否有效
   - 筛选是否有效
   - 取消收藏是否生效
   - 空状态是否合理
   - 导出入口或导出函数占位是否存在

【任务 D：localStorage 与导出占位检查】
8）检查当前 localStorage 使用情况，输出：
   - 用到了哪些 key
   - 分别存什么数据
   - 刷新后哪些状态能保留
   - 哪些状态仍然不稳定
9）检查 export service：
   - 是否已经存在 exportFavoritesToJSON()
   - 是否已经存在 exportShoppingListToJSON()
   - 当前是完整可用还是占位实现

【任务 E：给我一份“我现在可以怎么自己看”的说明】
10）输出一份给非程序员的简单查看说明：
   - 我在本地应该运行什么命令
   - 浏览器打开哪个地址
   - 我先点哪里看首页
   - 再点哪里看详情页
   - 再点哪里看待购清单
   - 再点哪里看收藏页
11）给出一条“3分钟课堂演示路径”。

【任务 F：问题清单与下一步建议】
12）输出当前已知问题，按优先级分为：
   - P0：阻塞运行/展示
   - P1：影响主要交互
   - P2：可后续优化
13）明确说明当前项目是否已经达到“可做一次基础课堂展示”的程度。
14）给出下一轮最推荐做的 3 件事，但不要直接开始做。

【任务 G：归档更新】
15）更新：
   - 01_prompt_logs/step-06-review.md
   - 02_step_reports/step-06-review-report.md
   - 03_git_records/commit_index.md
   - 04_issue_reviews/issue-log.md
   - 05_flowcharts/macro_flow.mmd
16）在 step-06-review-report.md 中加入以下固定小节：
   - Prompt 设计理由
   - AI 输出评估
   - 人工修正/二次指令建议
   - 本轮知识点与反思

请按以下顺序输出：
A. 本轮目标
B. 当前文件树
C. 当前路由与完成度盘点
D. 运行与构建验证结果
E. 简单测试结果表
F. localStorage / export 检查
G. 给非程序员的本地查看说明
H. 当前问题分级
I. 是否已达到基础展示标准
J. 文档归档更新
K. git 记录建议
L. 下一轮建议

