import { useCallback, useEffect, useRef, useState } from 'react'

export default function useToast({ durationMs = 1400 } = {}) {
  const [toast, setToast] = useState('')
  const timerRef = useRef(null)

  const clearToast = useCallback(() => {
    setToast('')
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const showToast = useCallback(
    (msg) => {
      const text = String(msg || '').trim()
      if (!text) return
      setToast(text)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setToast(''), durationMs)
    },
    [durationMs],
  )

  useEffect(() => clearToast, [clearToast])

  return { toast, showToast, clearToast }
}

