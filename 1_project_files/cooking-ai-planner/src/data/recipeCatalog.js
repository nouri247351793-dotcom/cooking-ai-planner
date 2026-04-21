import vegBowlSvg from '../assets/recipes/veg-bowl.svg'
import eggRiceSvg from '../assets/recipes/egg-rice.svg'
import broccoliSvg from '../assets/recipes/broccoli.svg'
import microwaveSvg from '../assets/recipes/microwave.svg'

/** @type {import('../utils/recipeModel.js').Recipe[]} */
export const RECIPE_CATALOG = [
  {
    id: 'r1',
    title: '番茄鸡蛋盖饭（练手版）',
    imageSrc: eggRiceSvg,
    minutes: 15,
    difficulty: '新手',
    tags: ['快手', '低预算', '下饭'],
    coreIngredients: ['鸡蛋', '番茄', '米饭'],
    ingredients: [
      { name: '鸡蛋', amount: '2 个' },
      { name: '番茄', amount: '1-2 个' },
      { name: '米饭', amount: '1 碗' },
    ],
    condiments: [
      { name: '盐', amount: '适量' },
      { name: '生抽', amount: '1 小勺' },
      { name: '白糖', amount: '1/2 小勺（可选）' },
      { name: '食用油', amount: '1 小勺' },
    ],
    steps: [
      { title: '备菜', detail: '番茄切小块；鸡蛋加一撮盐打匀。', minutes: 3 },
      { title: '炒蛋', detail: '中火热锅下油，蛋液下锅快速划散，凝固就盛出。', minutes: 3 },
      { title: '出汁', detail: '同锅少量油，下番茄炒软出汁；加盐/生抽，想更顺口可加一点糖。', minutes: 5 },
      { title: '合炒', detail: '倒回鸡蛋翻匀 30 秒；浇在米饭上即可。', minutes: 2 },
    ],
    nutrition: { kcal: 560, proteinG: 22, carbsG: 70, fatG: 22 },
    pairings: ['清炒时蔬', '紫菜蛋花汤', '水果（橙子/苹果）'],
    learning: {
      goal: '学会基础炒制与“出汁”',
      focus: ['火候：蛋别炒老', '番茄炒到出汁', '盐/生抽用量与味道平衡'],
    },
    budget: 'low',
    equipment: ['stove', 'pan'],
    servings: 1,
  },
  {
    id: 'r2',
    title: '蒜蓉西兰花（清爽版）',
    imageSrc: broccoliSvg,
    minutes: 12,
    difficulty: '新手',
    tags: ['健康', '简单', '清爽'],
    coreIngredients: ['西兰花', '蒜'],
    ingredients: [
      { name: '西兰花', amount: '1 颗（小）' },
      { name: '蒜', amount: '2-3 瓣' },
    ],
    condiments: [
      { name: '盐', amount: '适量' },
      { name: '生抽', amount: '1 小勺（可选）' },
      { name: '食用油', amount: '1 小勺' },
    ],
    steps: [
      { title: '切洗', detail: '西兰花掰小朵，淡盐水泡 5 分钟后冲洗。', minutes: 3 },
      { title: '焯水', detail: '水开加少许盐，西兰花焯 40-60 秒捞出沥干。', minutes: 2 },
      { title: '蒜香', detail: '小火下油，蒜末轻轻煸香（别焦）。', minutes: 2 },
      { title: '快炒', detail: '下西兰花大火翻 1-2 分钟，加盐调味即可。', minutes: 3 },
    ],
    nutrition: { kcal: 180, proteinG: 10, carbsG: 18, fatG: 8 },
    pairings: ['米饭', '煎鸡胸/煮蛋', '酸奶'],
    learning: {
      goal: '掌握焯水与快速翻炒',
      focus: ['焯水时间控制', '蒜香不糊', '收汁不出水'],
    },
    budget: 'low',
    equipment: ['stove', 'pot', 'pan'],
    servings: 1,
  },
  {
    id: 'r3',
    title: '鸡胸肉蔬菜沙拉（高蛋白）',
    imageSrc: vegBowlSvg,
    minutes: 18,
    difficulty: '进阶',
    tags: ['轻食', '高蛋白', '备餐'],
    coreIngredients: ['鸡胸肉', '生菜', '小番茄'],
    ingredients: [
      { name: '鸡胸肉', amount: '1 块（约 150g）' },
      { name: '生菜', amount: '1 把' },
      { name: '小番茄', amount: '6-8 个' },
    ],
    condiments: [
      { name: '盐', amount: '适量' },
      { name: '黑胡椒', amount: '适量' },
      { name: '橄榄油', amount: '1 小勺（可选）' },
      { name: '柠檬汁/醋', amount: '1 小勺（可选）' },
    ],
    steps: [
      { title: '处理鸡胸', detail: '鸡胸拍松，撒盐/黑胡椒。', minutes: 2 },
      { title: '煮/煎', detail: '水煮 8-10 分钟或小火煎熟；放凉后切片。', minutes: 10 },
      { title: '拌沙拉', detail: '生菜洗净沥干，小番茄对半；与鸡胸拌匀。', minutes: 4 },
      { title: '调味', detail: '橄榄油+柠檬汁（或醋）少量即可。', minutes: 1 },
    ],
    nutrition: { kcal: 420, proteinG: 45, carbsG: 18, fatG: 18 },
    pairings: ['全麦面包', '水果', '无糖气泡水'],
    learning: {
      goal: '学会“备菜效率”与清爽调味',
      focus: ['鸡胸不柴', '蔬菜沥干', '酱汁少量够味'],
    },
    budget: 'mid',
    equipment: ['stove', 'pot'],
    servings: 1,
  },
  {
    id: 'r4',
    title: '微波炉蒸蛋（零油烟）',
    imageSrc: microwaveSvg,
    minutes: 10,
    difficulty: '新手',
    tags: ['宿舍', '无明火', '快手'],
    coreIngredients: ['鸡蛋', '温水'],
    ingredients: [
      { name: '鸡蛋', amount: '1-2 个' },
      { name: '温水', amount: '蛋液的 1.5 倍' },
    ],
    condiments: [
      { name: '盐', amount: '少许' },
      { name: '生抽', amount: '几滴（可选）' },
      { name: '香油', amount: '几滴（可选）' },
    ],
    steps: [
      { title: '调蛋液', detail: '蛋液+盐打散，加入温水（约 1:1.5），过筛更细腻。', minutes: 3 },
      { title: '盖盖', detail: '碗上盖盘子或保鲜膜扎孔，防止表面干。', minutes: 1 },
      { title: '分段加热', detail: '中火 1 分钟→停 20 秒→再 40 秒；根据微波炉功率微调。', minutes: 3 },
      { title: '点缀', detail: '滴几滴生抽/香油即可。', minutes: 1 },
    ],
    nutrition: { kcal: 160, proteinG: 12, carbsG: 2, fatG: 11 },
    pairings: ['清淡蔬菜', '米饭', '牛奶'],
    learning: {
      goal: '练“比例 + 分段加热”',
      focus: ['蛋液:水≈1:1.5', '过筛更细腻', '分段加热防蜂窝'],
    },
    budget: 'low',
    equipment: ['microwave'],
    servings: 1,
  },
]

export function getRecipeById(recipeId) {
  return RECIPE_CATALOG.find((r) => r.id === recipeId) || null
}

