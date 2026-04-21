import eggRiceSvg from '../assets/recipes/egg-rice.svg'
import broccoliSvg from '../assets/recipes/broccoli.svg'
import microwaveSvg from '../assets/recipes/microwave.svg'

export const TIPS_CATALOG = [
  {
    id: 't1',
    title: '新手先练 1 个动作',
    minutes: 2,
    tags: ['入门', '练习'],
    imageSrc: eggRiceSvg,
    summary: '切/焯/煎/调味，一次只加 1 个变量，复盘更快。',
  },
  {
    id: 't2',
    title: '焯水别过头',
    minutes: 3,
    tags: ['省时', '口感'],
    imageSrc: broccoliSvg,
    summary: '蔬菜焯水 40–60 秒最稳；捞出沥干再快炒，避免出水。',
  },
  {
    id: 't3',
    title: '宿舍微波炉分段加热',
    minutes: 4,
    tags: ['宿舍', '安全'],
    imageSrc: microwaveSvg,
    summary: '“加热 1 分钟 → 停 20 秒 → 再加热 40 秒”，防溢防炸。',
  },
]

