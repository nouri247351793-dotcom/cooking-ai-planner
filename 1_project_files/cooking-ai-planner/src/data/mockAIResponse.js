/** @type {import('../services/aiTypes.js').AIResponse} */
export const mockAIResponse = {
  answer:
    '可以先做一份番茄鸡蛋盖饭，再配一个蒜蓉青菜。整体适合宿舍或普通厨房，食材少、出餐快，预算控制在十几元内。',
  recipes: [
    {
      id: 'mock-ai-tomato-egg-rice',
      title: '番茄鸡蛋盖饭',
      description: '新手友好的快手主食，用番茄出汁拌饭，适合一人晚餐。',
      ingredients: ['鸡蛋 2 个', '番茄 1-2 个', '米饭 1 碗', '生抽 1 小勺', '盐 少许'],
      steps: [
        '番茄切小块，鸡蛋打散备用。',
        '热锅少油，先把鸡蛋炒到刚凝固后盛出。',
        '同锅下番茄，加少许盐炒到出汁。',
        '倒回鸡蛋，加生抽调味，盖在米饭上。',
      ],
      estimatedTime: '15 分钟',
      difficulty: '新手',
      tags: ['快手', '低预算', '下饭'],
    },
    {
      id: 'mock-ai-garlic-greens',
      title: '蒜蓉青菜',
      description: '补充蔬菜的一道小菜，步骤简单，和盖饭搭配不腻。',
      ingredients: ['青菜 1 把', '蒜 2 瓣', '盐 少许', '食用油 1 小勺'],
      steps: ['青菜洗净沥干，蒜切末。', '小火炒香蒜末。', '下青菜转大火快炒。', '青菜变软后加盐出锅。'],
      estimatedTime: '8 分钟',
      difficulty: '新手',
      tags: ['蔬菜', '快手', '清淡'],
    },
  ],
  shoppingList: [
    { id: 'mock-shop-egg', name: '鸡蛋', amount: '2 个', category: '食材', checked: false },
    { id: 'mock-shop-tomato', name: '番茄', amount: '1-2 个', category: '食材', checked: false },
    { id: 'mock-shop-greens', name: '青菜', amount: '1 把', category: '食材', checked: false },
    { id: 'mock-shop-garlic', name: '蒜', amount: '2 瓣', category: '调味', checked: false },
  ],
  cookingSteps: [
    '先把米饭准备好，番茄、青菜和蒜都洗净切好。',
    '先炒番茄鸡蛋，保证主菜和汤汁完成。',
    '利用同一个锅快速炒青菜，减少洗锅时间。',
    '最后装盘，把番茄鸡蛋盖在米饭上，青菜放旁边。',
  ],
  estimatedTime: '约 25 分钟',
  tips: ['如果只有电煮锅，也可以先炒蛋再煮番茄汁。', '预算紧张时可以只买鸡蛋和番茄，青菜换成现有蔬菜。', '番茄出汁后再放鸡蛋，口感更嫩。'],
}

export default mockAIResponse
