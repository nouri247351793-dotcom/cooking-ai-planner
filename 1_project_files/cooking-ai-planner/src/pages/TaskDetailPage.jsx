import { Link, useParams } from 'react-router-dom'
import { getDifficultyMeta, getTaskById } from '../data/taskCatalog.js'
import useTaskProgress, { deriveTaskStats } from '../hooks/useTaskProgress.js'
import useToast from '../hooks/useToast.js'

export default function TaskDetailPage() {
  const { taskId } = useParams()
  const task = getTaskById(taskId)
  const { progress, stats, isTaskCompleted, completeTask } = useTaskProgress()
  const { toast, showToast } = useToast()

  if (!task) {
    return (
      <section className="page">
        <div className="card">
          <div className="card__title">未找到任务</div>
          <p className="muted">这个任务可能已经被移除，请返回首页重新选择。</p>
          <div className="actionsRow">
            <Link className="ghostBtn isPrimary" to="/">
              返回首页
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const difficulty = getDifficultyMeta(task.difficulty)
  const completed = isTaskCompleted(task.id)

  const handleComplete = () => {
    const result = completeTask({ ...task, xp: difficulty.xp })
    if (!result.completed) {
      showToast('这个任务已经领取过经验')
      return
    }

    const nextStats = deriveTaskStats(result.progress)
    showToast(`已领取 +${difficulty.xp} XP，当前 Lv.${nextStats.level}`)
  }

  return (
    <section className="page taskDetailPage">
      <div className="taskDetailHero">
        <div>
          <div className="taskDetailHero__eyebrow">小任务教程</div>
          <h1 className="taskDetailHero__title">{task.title}</h1>
          <p className="taskDetailHero__desc">{task.desc}</p>
        </div>
        <div className="taskDetailHero__badge">+{difficulty.xp} XP</div>
      </div>

      <div className="taskDetailGrid">
        <div className="taskDetailCol">
          <div className="card">
            <div className="sectionTitle">任务信息</div>
            <div className="taskInfoGrid">
              <div className="taskInfo">
                <div className="taskInfo__k">难度</div>
                <div className="taskInfo__v">{difficulty.label}</div>
              </div>
              <div className="taskInfo">
                <div className="taskInfo__k">XP 奖励</div>
                <div className="taskInfo__v">+{difficulty.xp}</div>
              </div>
              <div className="taskInfo">
                <div className="taskInfo__k">所属阶段</div>
                <div className="taskInfo__v">{task.stage}</div>
              </div>
              <div className="taskInfo">
                <div className="taskInfo__k">预计时间</div>
                <div className="taskInfo__v">{task.time}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="sectionTitle">任务目标</div>
            <p className="taskDetailText">{task.objective}</p>
          </div>

          <div className="card">
            <div className="sectionTitle">完成标准</div>
            <ul className="bulletList">
              {task.completionCriteria.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="taskDetailCol">
          <div className="card">
            <div className="sectionTitle">教程步骤</div>
            <ol className="stepList">
              {task.tutorialSteps.map((step, index) => (
                <li key={step} className="step">
                  <div className="step__head">
                    <div className="step__title">步骤 {index + 1}</div>
                  </div>
                  <div className="step__detail">{step}</div>
                </li>
              ))}
            </ol>
          </div>

          <div className="taskCompleteCard">
            <div className="taskCompleteCard__title">{completed ? '任务已完成' : '完成后领取经验'}</div>
            <div className="taskCompleteCard__desc">
              当前等级 Lv.{stats.level} · {stats.stageName} · 总经验 {progress.totalXp} XP
            </div>
            <button type="button" className="primaryBtn" onClick={handleComplete} disabled={completed}>
              {completed ? '已领取 XP' : '我做了'}
            </button>
            <Link className="ghostBtn" to="/">
              返回推荐任务
            </Link>
          </div>
        </div>
      </div>

      {toast ? <div className="toast">{toast}</div> : null}
    </section>
  )
}
