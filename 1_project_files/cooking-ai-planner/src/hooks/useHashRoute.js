import { useEffect, useMemo, useState } from 'react'

function getRouteKeyFromHash() {
  const hash = window.location.hash || ''
  const match = hash.match(/^#\/([a-z-]+)/i)
  return match ? match[1] : ''
}

export default function useHashRoute({ defaultRouteKey, allowedRouteKeys }) {
  const allowed = useMemo(() => new Set(allowedRouteKeys), [allowedRouteKeys])

  const [routeKey, setRouteKeyState] = useState(() => {
    const initial = getRouteKeyFromHash()
    return allowed.has(initial) ? initial : defaultRouteKey
  })

  useEffect(() => {
    const onHashChange = () => {
      const key = getRouteKeyFromHash()
      setRouteKeyState(allowed.has(key) ? key : defaultRouteKey)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [allowed, defaultRouteKey])

  const setRouteKey = (nextKey) => {
    if (!allowed.has(nextKey)) return
    window.location.hash = `#/${nextKey}`
    setRouteKeyState(nextKey)
  }

  return { routeKey, setRouteKey }
}

