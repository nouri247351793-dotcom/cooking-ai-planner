import { useMemo, useState } from 'react'

const difficultyTabs = [
  { key: 'easy', label: '易', xp: 5 },
  { key: 'medium', label: '中', xp: 10 },
  { key: 'hard', label: '难', xp: 15 },
]

const placeholderTasks = {
  easy: [
    {
      title: '练一次番茄切块',
      desc: '把番茄切成大小接近的小块，重点练稳定下刀。',
      time: '5 分钟',
    },
    {
      title: '完成一份热锅热油观察',
      desc: '不急着下菜，先观察油纹和锅温变化。',
      time: '3 分钟',
    },
  ],
  medium: [
    {
      title: '做一次鸡蛋滑嫩练习',
      desc: '控制小火和离火时间，记录口感变化。',
      time: '12 分钟',
    },
    {
      title: '完成一锅青菜焯水',
      desc: '练习水开后下锅、快速捞出、过凉定色。',
      time: '10 分钟',
    },
  ],
  hard: [
    {
      title: '完成一道 20 分钟双步骤菜',
      desc: '同时练备菜节奏、火候切换和出锅复盘。',
      time: '20 分钟',
    },
    {
      title: '复盘一次失败菜',
      desc: '写下失败原因、下一次调整点和可复用技巧。',
      time: '8 分钟',
    },
  ],
}

function getStageName(level) {
  if (level <= 10) return '小试灶台'
  if (level <= 20) return '渐入佳境'
  return '熟能生巧'
}

export default function RecommendedTasksPanel() {
  const [difficulty, setDifficulty] = useState('easy')
  const level = 3
  const currentXp = 35
  const nextLevelXp = 50
  const stageName = getStageName(level)
  const progress = Math.round((currentXp / nextLevelXp) * 100)

  const activeTab = useMemo(() => {
    return difficultyTabs.find((tab) => tab.key === difficulty) || difficultyTabs[0]
  }, [difficulty])

  const tasks = placeholderTasks[difficulty] || placeholderTasks.easy

  return (
    <section className="taskPanel" aria-labelledby="recommended-tasks-title">
      <div className="taskPanel__head">
        <div className="taskPanel__titleWrap">
          <span className="taskPanel__icon" aria-hidden="true">
            🧭
          </span>
          <div>
            <div className="taskPanel__eyebrow">成长任务</div>
            <h2 id="recommended-tasks-title" className="taskPanel__title">
              推荐任务
            </h2>
          </div>
        </div>

        <div className="taskPanel__difficulty" aria-label="任务难度">
          {difficultyTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={tab.key === difficulty ? 'taskPanel__tab is-active' : 'taskPanel__tab'}
              onClick={() => setDifficulty(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="taskPanel__progressCard">
        <div>
          <div className="taskPanel__level">Lv.{level}</div>
          <div className="taskPanel__stage">{stageName}</div>
        </div>
        <div className="taskPanel__progressWrap">
          <div className="taskPanel__xpText">
            {currentXp}/{nextLevelXp} XP
          </div>
          <div className="taskPanel__progressBar" aria-label={`经验进度 ${progress}%`}>
            <div className="taskPanel__progressFill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="taskPanel__list">
        {tasks.map((task) => (
          <article className="taskCard" key={task.title}>
            <div className="taskCard__top">
              <div className="taskCard__title">{task.title}</div>
              <span className="taskCard__xp">+{activeTab.xp} XP</span>
            </div>
            <p className="taskCard__desc">{task.desc}</p>
            <div className="taskCard__meta">
              <span>{activeTab.label}难度</span>
              <span>{task.time}</span>
              <span>教程下一步接入</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
