/**
 * ShoppingItem 数据结构约定（localStorage / mock / AI 生成共用）
 *
 * 设计要点：
 * - 能表达“手动添加 / 菜谱生成 / AI 生成”的来源（source），便于后续 AI core 做可追踪、可回滚的自动化
 * - 能按分类渲染（食材/调料/器具），并支持 CRUD 与完成勾选
 */

/**
 * @typedef {'ingredient'|'condiment'|'equipment'} ShoppingCategory
 */

/**
 * @typedef {'manual'|'recipe_generated'|'ai_generated'} ShoppingSource
 */

/**
 * @typedef {Object} ShoppingItem
 * @property {string} id
 * @property {string} name
 * @property {string} qty
 * @property {ShoppingCategory} category
 * @property {ShoppingSource} source
 * @property {string} fromRecipeId
 * @property {boolean} checked
 * @property {string} createdAt
 * @property {string} updatedAt
 */

export {}

