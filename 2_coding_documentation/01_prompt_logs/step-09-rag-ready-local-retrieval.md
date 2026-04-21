# Step 09 - rag-ready-local-retrieval（Prompt Log）

## 本轮输入 Prompt（原文）

请为本项目增加 RAG 占位方案，但不要引入真实数据库或云端知识库。

要求：
1）在 src/data/knowledge/ 下建立本地知识库 mock：
   - cooking_basics.json
   - ingredient_tips.json
   - equipment_limits.json
   - budget_rules.json
2）每条知识包含字段：
   - id
   - title
   - category
   - tags
   - content
   - applicableScenes
3）实现 retrievalService 的本地检索逻辑：
   - 先用关键词匹配
   - 再按 tags 和 filter 二次筛选
4）返回 retrievedDocs 给 promptBuilder
5）promptBuilder 负责把：
   - 用户输入
   - 筛选参数
   - 检索结果摘要
   - 输出格式要求
   组织成统一 prompt
6）generateRecipes() 当前仍然只走 mock 输出，但输出中要体现“参考了哪些知识点”
7）在页面上可以不直接展示完整 prompt，但至少在开发模式下可以 console 输出调试信息

文档要求：
8）本轮 step report 中必须说明：
   - 这不是完整 RAG，只是 RAG-ready 架构
   - 为什么这样做适合课堂 MVP
   - 真实 RAG 上线时需替换哪些模块
9）issue log 中增加“本地检索的局限性”反思

