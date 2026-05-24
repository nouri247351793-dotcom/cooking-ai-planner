export const TASK_DIFFICULTIES = [
  { key: 'easy', shortLabel: '易', label: '简单', xp: 5 },
  { key: 'medium', shortLabel: '中', label: '中等', xp: 10 },
  { key: 'hard', shortLabel: '难', label: '困难', xp: 15 },
]

export const TASK_CATALOG = [
  {
    id: 'tomato-cubes',
    difficulty: 'easy',
    title: '练一次番茄切块',
    desc: '把番茄切成大小接近的小块，重点练稳定下刀。',
    time: '5 分钟',
    stage: '小试灶台',
    objective: '掌握基础握刀姿势和番茄切块节奏，让食材大小更稳定。',
    tutorialSteps: [
      '把番茄洗净，去掉蒂部，先从中间切成两半。',
      '把切面朝下放稳，先切条，再横向切成小块。',
      '观察每块大小是否接近，挑出过大的块再补一刀。',
    ],
    completionCriteria: ['完成 1 个番茄切块', '切块大小基本接近', '记录一个下次想改进的点'],
  },
  {
    id: 'hot-pan-observe',
    difficulty: 'easy',
    title: '完成一份热锅热油观察',
    desc: '不急着下菜，先观察油纹和锅温变化。',
    time: '3 分钟',
    stage: '小试灶台',
    objective: '建立“先观察锅温再下菜”的习惯，减少粘锅和糊锅。',
    tutorialSteps: [
      '锅擦干后开中小火，等待 30 秒。',
      '倒入少量油，观察油面是否出现流动纹路。',
      '把手放在锅上方感受热气，不触碰锅面。',
    ],
    completionCriteria: ['能说出油温变化', '没有直接大火空烧', '知道什么时候适合下菜'],
  },
  {
    id: 'soft-egg-practice',
    difficulty: 'medium',
    title: '做一次鸡蛋滑嫩练习',
    desc: '控制小火和离火时间，记录口感变化。',
    time: '12 分钟',
    stage: '小试灶台',
    objective: '练习小火、推炒和离火余温，减少鸡蛋变老。',
    tutorialSteps: [
      '鸡蛋打散后加入一小勺水，搅拌均匀。',
      '锅热后转小火倒油，再倒入蛋液。',
      '蛋液半凝固时轻推，仍有少量湿润时离火。',
    ],
    completionCriteria: ['鸡蛋没有明显焦边', '口感比上次更嫩', '记录火力和时间'],
  },
  {
    id: 'green-blanch',
    difficulty: 'medium',
    title: '完成一锅青菜焯水',
    desc: '练习水开后下锅、快速捞出、过凉定色。',
    time: '10 分钟',
    stage: '小试灶台',
    objective: '理解焯水对颜色和口感的影响，避免青菜发黄发苦。',
    tutorialSteps: [
      '水烧开后加入少量盐和几滴油。',
      '青菜下锅 20-40 秒，颜色变亮后捞出。',
      '快速过凉或摊开放凉，再进行后续调味。',
    ],
    completionCriteria: ['青菜颜色保持鲜亮', '没有长时间煮烂', '知道下次如何调整时间'],
  },
  {
    id: 'two-step-dish',
    difficulty: 'hard',
    title: '完成一道 20 分钟双步骤菜',
    desc: '同时练备菜节奏、火候切换和出锅复盘。',
    time: '20 分钟',
    stage: '小试灶台',
    objective: '把备菜、预处理和正式烹饪串起来，训练完整做菜节奏。',
    tutorialSteps: [
      '先列出所有食材和步骤，按使用顺序摆好。',
      '完成切配或焯水等预处理，再开始正式下锅。',
      '出锅后记录哪个环节最慢，下一次优先优化。',
    ],
    completionCriteria: ['20 分钟内完成一道菜', '至少包含两个连续步骤', '写下一个复盘结论'],
  },
  {
    id: 'failure-review',
    difficulty: 'hard',
    title: '复盘一次失败菜',
    desc: '写下失败原因、下一次调整点和可复用技巧。',
    time: '8 分钟',
    stage: '小试灶台',
    objective: '把失败变成可复用经验，建立持续进步的做饭记录。',
    tutorialSteps: [
      '写下这道菜哪里不满意：味道、火候、口感或时间。',
      '从火力、时间、调味、切配中选一个主要原因。',
      '写出下一次只改一个变量的具体计划。',
    ],
    completionCriteria: ['写出失败原因', '写出下一次调整方案', '保留一条可复用技巧'],
  },
]

export function getTaskById(taskId) {
  return TASK_CATALOG.find((task) => task.id === taskId) || null
}

export function getTasksByDifficulty(difficulty) {
  return TASK_CATALOG.filter((task) => task.difficulty === difficulty)
}

function rotateTasks(tasks, seed) {
  if (!tasks.length) return []
  const offset = Math.abs(Number(seed || 0)) % tasks.length
  return [...tasks.slice(offset), ...tasks.slice(0, offset)]
}

export function getAvailableTaskCount({ completedTaskIds = [] } = {}) {
  const completedSet = new Set(Array.isArray(completedTaskIds) ? completedTaskIds : [])
  return TASK_CATALOG.filter((task) => !completedSet.has(task.id)).length
}

export function getRecommendedTasks({ difficulty = 'easy', completedTaskIds = [], limit = 2, seed = 0 } = {}) {
  const completedSet = new Set(Array.isArray(completedTaskIds) ? completedTaskIds : [])
  const sameDifficultyTasks = getTasksByDifficulty(difficulty).filter((task) => !completedSet.has(task.id))
  const fallbackTasks = TASK_CATALOG.filter((task) => task.difficulty !== difficulty && !completedSet.has(task.id))
  const recommended = sameDifficultyTasks.length ? sameDifficultyTasks : fallbackTasks

  return rotateTasks(recommended, seed).slice(0, limit)
}

export function getDifficultyMeta(difficulty) {
  return TASK_DIFFICULTIES.find((item) => item.key === difficulty) || TASK_DIFFICULTIES[0]
}
