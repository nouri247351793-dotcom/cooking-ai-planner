export function buildMockPlan({ skillLevel }) {
  const base = [
    '选 1 道快手菜练手（10–15 分钟）',
    '备齐 3 种基础调味（盐 / 生抽 / 食用油）',
    '做完记录：哪里翻车、下次怎么改',
  ]

  if (skillLevel === 'beginner') {
    return { steps: base }
  }

  return {
    steps: [
      ...base,
      '尝试 1 个新技巧：焯水 / 勾芡 / 计时控火',
    ],
  }
}

