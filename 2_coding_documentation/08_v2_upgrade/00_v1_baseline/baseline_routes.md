# 1.0 路由表（基线）

路由实现：`HashRouter`（`react-router-dom`）

| Path | Page | 入口/说明 |
|---|---|---|
| `/` | `HomePage` | 默认首页（开始做饭） |
| `/recipes/:recipeId` | `RecipeDetailPage` | 从菜谱卡片进入详情 |
| `/shopping` | `ShoppingListPage` | 底部导航“待购清单” |
| `/shopping/:itemId` | `ShoppingDetailPage` | 待购清单卡片进入详情 |
| `/favorites` | `FavoritesPage` | 底部导航“我的收藏” |
| `/settings` | `SettingsPage` | 首页右上角齿轮入口 |
| `*` | `Navigate -> /` | 兜底重定向 |

