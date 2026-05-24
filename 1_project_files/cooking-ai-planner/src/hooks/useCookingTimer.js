import { createContext, createElement, useContext, useEffect, useMemo, useState } from 'react'

export const DEFAULT_TIMER_SECONDS = 10 * 60
export const MAX_TIMER_SECONDS = 99 * 60 + 59
const TIMER_STORAGE_KEY = 'xiaofanzhuo_global_timer_v1'

function clampSeconds(seconds) {
  if (!Number.isFinite(seconds)) return DEFAULT_TIMER_SECONDS
  return Math.min(Math.max(Math.floor(seconds), 0), MAX_TIMER_SECONDS)
}

export function formatTimerSeconds(totalSeconds) {
  const safeSeconds = clampSeconds(totalSeconds)
  const minutes = Math.floor(safeSeconds / 60)
  const seconds = safeSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function parseTimerInput(value) {
  const cleanValue = String(value || '').trim()
  const match = cleanValue.match(/^(\d{1,2})(?::([0-5]?\d))?$/)
  if (!match) return null

  const minutes = Number(match[1])
  const seconds = match[2] === undefined ? 0 : Number(match[2])
  const totalSeconds = clampSeconds(minutes * 60 + seconds)
  return totalSeconds > 0 ? totalSeconds : null
}

function createInitialTimerState() {
  return {
    timerDuration: DEFAULT_TIMER_SECONDS,
    timerRemaining: DEFAULT_TIMER_SECONDS,
    timerRunning: false,
    timerStartedAt: '',
    timerCollapsed: false,
    timerVisible: false,
    timerEnded: false,
  }
}

function normalizeTimerState(input) {
  const base = createInitialTimerState()
  const merged = { ...base, ...(input || {}) }
  const duration = clampSeconds(Number(merged.timerDuration || DEFAULT_TIMER_SECONDS))
  const rawRemaining = clampSeconds(Number(merged.timerRemaining ?? duration))
  let remaining = rawRemaining
  let running = Boolean(merged.timerRunning)
  let ended = Boolean(merged.timerEnded)

  if (running && merged.timerStartedAt) {
    const startedAt = new Date(merged.timerStartedAt).getTime()
    if (Number.isFinite(startedAt)) {
      const elapsed = Math.max(0, Math.floor((Date.now() - startedAt) / 1000))
      remaining = clampSeconds(rawRemaining - elapsed)
      if (remaining <= 0) {
        remaining = 0
        running = false
        ended = true
      }
    }
  }

  return {
    timerDuration: duration,
    timerRemaining: remaining,
    timerRunning: running,
    timerStartedAt: running ? new Date().toISOString() : '',
    timerCollapsed: Boolean(merged.timerCollapsed),
    timerVisible: Boolean(merged.timerVisible) || running || ended,
    timerEnded: ended,
  }
}

function readStoredTimerState() {
  if (typeof window === 'undefined') return createInitialTimerState()
  try {
    const raw = window.localStorage.getItem(TIMER_STORAGE_KEY)
    return normalizeTimerState(raw ? JSON.parse(raw) : null)
  } catch {
    return createInitialTimerState()
  }
}

const CookingTimerContext = createContext(null)

export function CookingTimerProvider({ children }) {
  const [timer, setTimer] = useState(readStoredTimerState)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timer))
    } catch {
      // Timer should keep working in memory if localStorage is unavailable.
    }
  }, [timer])

  useEffect(() => {
    if (!timer.timerRunning) return undefined

    const timerId = window.setInterval(() => {
      setTimer((current) => {
        const remaining = Math.max(0, current.timerRemaining - 1)
        if (remaining <= 0) {
          return {
            ...current,
            timerRemaining: 0,
            timerRunning: false,
            timerStartedAt: '',
            timerVisible: true,
            timerEnded: true,
            timerCollapsed: false,
          }
        }
        return { ...current, timerRemaining: remaining }
      })
    }, 1000)

    return () => window.clearInterval(timerId)
  }, [timer.timerRunning])

  const api = useMemo(() => {
    const setDuration = (seconds) => {
      const nextSeconds = clampSeconds(seconds)
      setTimer((current) => ({
        ...current,
        timerDuration: nextSeconds,
        timerRemaining: nextSeconds,
        timerRunning: false,
        timerStartedAt: '',
        timerEnded: false,
      }))
    }

    const start = (seconds) => {
      setTimer((current) => {
        const nextDuration = clampSeconds(seconds || current.timerDuration || DEFAULT_TIMER_SECONDS)
        const nextRemaining = current.timerEnded
          ? nextDuration
          : clampSeconds(seconds || current.timerRemaining || nextDuration)
        return {
          ...current,
          timerDuration: nextDuration,
          timerRemaining: nextRemaining,
          timerRunning: true,
          timerStartedAt: new Date().toISOString(),
          timerVisible: true,
          timerCollapsed: false,
          timerEnded: false,
        }
      })
    }

    const pause = () => {
      setTimer((current) => ({
        ...current,
        timerRunning: false,
        timerStartedAt: '',
        timerVisible: true,
      }))
    }

    const reset = () => {
      setTimer((current) => ({
        ...current,
        timerDuration: DEFAULT_TIMER_SECONDS,
        timerRemaining: DEFAULT_TIMER_SECONDS,
        timerRunning: false,
        timerStartedAt: '',
        timerCollapsed: false,
        timerVisible: false,
        timerEnded: false,
      }))
    }

    const closeFloating = () => {
      setTimer((current) => ({
        ...current,
        timerVisible: false,
        timerCollapsed: false,
      }))
    }

    const toggleCollapsed = () => {
      setTimer((current) => ({
        ...current,
        timerCollapsed: !current.timerCollapsed,
        timerVisible: true,
      }))
    }

    const setCollapsed = (collapsed) => {
      setTimer((current) => ({
        ...current,
        timerCollapsed: Boolean(collapsed),
        timerVisible: true,
      }))
    }

    return {
      ...timer,
      setDuration,
      start,
      pause,
      reset,
      closeFloating,
      toggleCollapsed,
      setCollapsed,
      formattedRemaining: formatTimerSeconds(timer.timerRemaining),
      stateText: timer.timerRunning ? '计时中' : timer.timerEnded ? '时间到' : '默认 10 分钟',
    }
  }, [timer])

  return createElement(CookingTimerContext.Provider, { value: api }, children)
}

export default function useCookingTimer() {
  const context = useContext(CookingTimerContext)
  if (!context) throw new Error('useCookingTimer must be used within CookingTimerProvider')
  return context
}
