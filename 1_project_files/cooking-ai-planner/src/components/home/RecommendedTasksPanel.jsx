import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDifficultyMeta, getTasksByDifficulty, TASK_DIFFICULTIES } from '../../data/taskCatalog.js'
import useTaskProgress from '../../hooks/useTaskProgress.js'

export default function RecommendedTasksPanel() {
  const [difficulty, setDifficulty] = useState('easy')
  const { stats, isTaskCompleted } = useTaskProgress()

  const activeTab = useMemo(() => getDifficultyMeta(difficulty), [difficulty])
  const tasks = getTasksByDifficulty(difficulty)

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
          {TASK_DIFFICULTIES.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={tab.key === difficulty ? 'taskPanel__tab is-active' : 'taskPanel__tab'}
              onClick={() => setDifficulty(tab.key)}
            >
              {tab.shortLabel}
            </button>
          ))}
        </div>
      </div>

      <div className="taskPanel__progressCard">
        <div>
          <div className="taskPanel__level">Lv.{stats.level}</div>
          <div className="taskPanel__stage">{stats.stageName}</div>
        </div>
        <div className="taskPanel__progressWrap">
          <div className="taskPanel__xpText">
            {stats.currentLevelXp}/{stats.nextLevelXp} XP
          </div>
          <div className="taskPanel__progressBar" aria-label={`经验进度 ${stats.progressPercent}%`}>
            <div className="taskPanel__progressFill" style={{ width: `${stats.progressPercent}%` }} />
          </div>
        </div>
      </div>

      <div className="taskPanel__list">
        {tasks.map((task) => {
          const completed = isTaskCompleted(task.id)
          return (
            <article className={completed ? 'taskCard is-completed' : 'taskCard'} key={task.id}>
              <div className="taskCard__top">
                <div className="taskCard__title">{task.title}</div>
                <span className="taskCard__xp">{completed ? '已完成' : `+${activeTab.xp} XP`}</span>
              </div>
              <p className="taskCard__desc">{task.desc}</p>
              <div className="taskCard__meta">
                <span>{activeTab.label}</span>
                <span>{task.time}</span>
                <span>{task.stage}</span>
              </div>
              <Link className="taskCard__link" to={`/tasks/${task.id}`}>
                查看小教程
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}
