# 1.0 localStorage Key（基线）

规范：`cooking_ai_planner.<feature>.<type>.v<schemaVersion>`

| Key | 存储内容（概要） |
|---|---|
| `cooking_ai_planner.favorites.ids.v1` | 收藏菜谱 id 数组（最新在前） |
| `cooking_ai_planner.shopping.items.v1` | 待购清单 items 数组（支持后续 AI 生成） |
| `cooking_ai_planner.recipe_generator.state.v1` | 首页生成器持久化：`inputText / filters / photoResult` |
| `cooking_ai_planner.ai.config.v1` | 模型配置：provider/model/temperature/maxTokens/systemPrompt 等 |
| `cooking_ai_planner.ui.p5_hero.enabled.v1` | p5 装饰模块开关（boolean） |

## legacy key 兜底（只读迁移）

| 新 key | legacy keys（读取兜底） |
|---|---|
| `cooking_ai_planner.favorites.ids.v1` | `cooking_ai_planner.favorites.v1` |
| `cooking_ai_planner.shopping.items.v1` | `cooking_ai_planner.shopping_items.v1` |

