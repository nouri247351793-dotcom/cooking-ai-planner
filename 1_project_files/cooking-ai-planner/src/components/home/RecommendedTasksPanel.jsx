import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  getAvailableTaskCount,
  getDifficultyMeta,
  getRecommendedTasks,
  TASK_DIFFICULTIES,
} from '../../data/taskCatalog.js'
import useTaskProgress from '../../hooks/useTaskProgress.js'

export default function RecommendedTasksPanel() {
  const [difficulty, setDifficulty] = useState('easy')
  const [refreshSeed, setRefreshSeed] = useState(0)
  const { progress, stats, isTaskCompleted } = useTaskProgress()

  const activeTab = useMemo(() => getDifficultyMeta(difficulty), [difficulty])
  const availableTaskCount = useMemo(
    () => getAvailableTaskCount({ completedTaskIds: progress.completedTaskIds }),
    [progress.completedTaskIds],
  )
  const tasks = useMemo(
    () =>
      getRecommendedTasks({
        difficulty,
        completedTaskIds: progress.completedTaskIds,
        limit: 2,
        seed: refreshSeed,
      }),
    [difficulty, progress.completedTaskIds, refreshSeed],
  )

  const refreshTasks = () => {
    setRefreshSeed((seed) => seed + 1)
  }

  const handleDifficultyChange = (nextDifficulty) => {
    setDifficulty(nextDifficulty)
    setRefreshSeed((seed) => seed + 1)
  }

  const emptyText = availableTaskCount
    ? '已完成今日训练，可以继续挑战新的练习任务。'
    : '暂时没有可推荐任务，请稍后再试。'

  return (
    <section className="taskPanel" aria-labelledby="recommended-tasks-title">
      <div className="taskPanel__head">
        <div className="taskPanel__titleWrap">
          <span className="taskPanel__icon" aria-hidden="true">
            🧑‍🍳
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
              onClick={() => handleDifficultyChange(tab.key)}
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

      {tasks.length ? (
        <div className="taskPanel__list">
          {tasks.map((task) => {
            const completed = isTaskCompleted(task.id)
            const taskMeta = getDifficultyMeta(task.difficulty)
            return (
              <article className={completed ? 'taskCard is-completed' : 'taskCard'} key={task.id}>
                <div className="taskCard__top">
                  <div className="taskCard__title">{task.title}</div>
                  <span className="taskCard__xp">{completed ? '已完成' : `+${taskMeta.xp} XP`}</span>
                </div>
                <p className="taskCard__desc">{task.desc}</p>
                <div className="taskCard__meta">
                  <span>{taskMeta.label}</span>
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
      ) : (
        <div className="taskPanel__empty" role="status">
          <div className="taskPanel__emptyTitle">今日训练已完成</div>
          <p className="taskPanel__emptyText">{emptyText}</p>
          <div className="taskPanel__emptyMeta">
            <span>{activeTab.label}</span>
            <span>Lv.{stats.level}</span>
            <span>{stats.stageName}</span>
          </div>
          <button
            type="button"
            className="taskPanel__refreshBtn"
            onClick={refreshTasks}
            disabled={!availableTaskCount}
          >
            刷新推荐任务
          </button>
        </div>
      )}
    </section>
  )
}
