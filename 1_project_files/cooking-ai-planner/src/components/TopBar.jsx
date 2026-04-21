import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites.js'
import { useShoppingList } from '../hooks/useShoppingList.js'
import { useMemo } from 'react'

function PillLink({ to, label, countText, ariaLabel }) {
  return (
    <NavLink to={to} className="pillLink" aria-label={ariaLabel}>
      <span className="pillLink__label">{label}</span>
      {countText ? <span className="pillLink__count">{countText}</span> : null}
    </NavLink>
  )
}

export default function TopBar({ title, showBack, backTo }) {
  const navigate = useNavigate()
  const { favoriteIds } = useFavorites()
  const { shoppingItems } = useShoppingList()
  const counts = useMemo(() => {
    const fav = favoriteIds.length
    const todo = shoppingItems.filter((x) => !x.checked).length
    return { fav, todo }
  }, [favoriteIds.length, shoppingItems])

  return (
    <header className="topBar" role="banner">
      <div className="topBar__left">
        {showBack ? (
          <button className="iconBtn" type="button" onClick={() => navigate(backTo || -1)} aria-label="返回">
            ←
          </button>
        ) : (
          <div className="topBar__title">{title || '小饭桌'}</div>
        )}
      </div>

      <div className="topBar__right">
        <PillLink to="/shopping" label="待购" countText={String(counts.todo)} ariaLabel="打开待购清单" />
        <PillLink to="/favorites" label="收藏" countText={String(counts.fav)} ariaLabel="打开我的收藏" />
        <Link className="iconBtn" to="/settings" aria-label="AI 配置">
          ⚙
        </Link>
      </div>
    </header>
  )
}

