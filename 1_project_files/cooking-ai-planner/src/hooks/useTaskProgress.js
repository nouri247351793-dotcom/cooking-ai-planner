import useLocalStorage from './useLocalStorage.js'
import { STORAGE_KEYS } from '../store/storageKeys.js'

export const XP_PER_LEVEL = 50

const initialTaskProgress = {
  totalXp: 35,
  completedTaskIds: [],
  level: 1,
  currentLevelXp: 35,
  updatedAt: '',
}

export function getStageName(level) {
  if (level <= 10) return '小试灶台'
  if (level <= 20) return '渐入佳境'
  return '熟能生巧'
}

export function deriveTaskStats(progress) {
  const totalXp = Math.max(0, Number(progress && progress.totalXp ? progress.totalXp : 0))
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1
  const currentLevelXp = totalXp % XP_PER_LEVEL
  const progressPercent = Math.round((currentLevelXp / XP_PER_LEVEL) * 100)

  return {
    totalXp,
    level,
    stageName: getStageName(level),
    currentLevelXp,
    nextLevelXp: XP_PER_LEVEL,
    progressPercent,
    xpToNextLevel: XP_PER_LEVEL - currentLevelXp,
  }
}

export default function useTaskProgress() {
  const [progress, setProgress] = useLocalStorage(STORAGE_KEYS.taskProgress, initialTaskProgress)
  const safeProgress = {
    ...initialTaskProgress,
    ...(progress || {}),
    totalXp: Math.max(0, Number(progress && progress.totalXp ? progress.totalXp : 0)),
    completedTaskIds: Array.isArray(progress && progress.completedTaskIds) ? progress.completedTaskIds : [],
  }

  const completeTask = (task) => {
    if (!task || !task.id) return { completed: false, reason: 'missing_task' }
    if (safeProgress.completedTaskIds.includes(task.id)) {
      return { completed: false, reason: 'already_completed', progress: safeProgress }
    }

    const previousStats = deriveTaskStats(safeProgress)
    const nextTotalXp = safeProgress.totalXp + Math.max(0, Number(task.xp || 0))
    const nextStats = deriveTaskStats({ totalXp: nextTotalXp })
    const nextProgress = {
      ...safeProgress,
      totalXp: nextTotalXp,
      level: nextStats.level,
      currentLevelXp: nextStats.currentLevelXp,
      completedTaskIds: [...safeProgress.completedTaskIds, task.id],
      updatedAt: new Date().toISOString(),
    }

    setProgress(nextProgress)
    return {
      completed: true,
      progress: nextProgress,
      previousStats,
      nextStats,
      leveledUp: nextStats.level > previousStats.level,
    }
  }

  return {
    progress: safeProgress,
    stats: deriveTaskStats(safeProgress),
    isTaskCompleted: (taskId) => safeProgress.completedTaskIds.includes(taskId),
    completeTask,
  }
}
