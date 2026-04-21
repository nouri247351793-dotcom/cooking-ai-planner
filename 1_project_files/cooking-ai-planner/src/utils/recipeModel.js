/**
 * Recipe 数据结构约定（前端 mock / 本地数据 / 路由 state 共用）
 *
 * 设计理由：
 * - 用同一份结构把「推荐卡片」「详情页」「收藏/待购」串起来，避免各页面字段各写各的
 * - 便于后续接 AI：可直接把该结构映射成 prompt / tool input，并能作为 RAG 检索与回填的载体
 */

/**
 * @typedef {Object} RecipeIngredient
 * @property {string} name
 * @property {string} amount
 */

/**
 * @typedef {Object} RecipeStep
 * @property {string} title
 * @property {string} detail
 * @property {number=} minutes
 */

/**
 * @typedef {Object} RecipeNutrition
 * @property {number} kcal
 * @property {number} proteinG
 * @property {number} carbsG
 * @property {number} fatG
 */

/**
 * @typedef {Object} RecipeLearning
 * @property {string} goal
 * @property {string[]} focus
 */

/**
 * @typedef {Object} Recipe
 * @property {string} id
 * @property {string} title
 * @property {string} imageSrc
 * @property {number} minutes
 * @property {string} difficulty
 * @property {string[]} tags
 * @property {string[]} coreIngredients
 * @property {RecipeIngredient[]} ingredients
 * @property {RecipeIngredient[]} condiments
 * @property {RecipeStep[]} steps
 * @property {RecipeNutrition} nutrition
 * @property {string[]} pairings
 * @property {RecipeLearning} learning
 *
 * // For filters / planning constraints
 * @property {'low'|'mid'|'any'} budget
 * @property {string[]} equipment
 * @property {number} servings
 */

export {}

