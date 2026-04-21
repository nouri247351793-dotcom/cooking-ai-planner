import { NavLink } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites.js'
import { useShoppingList } from '../hooks/useShoppingList.js'

function Badge({ value, ariaLabel }) {
  const n = typeof value === 'number' ? value : 0
  if (!n) return null
  return (
    <span className="badge" aria-label={ariaLabel || `count ${n}`}>
      {n > 99 ? '99+' : n}
    </span>
  )
}

export default function SideNav() {
  const { favoriteIds } = useFavorites()
  const { shoppingItems } = useShoppingList()

  const shoppingTodo = shoppingItems.filter((x) => !x.checked).length

  const items = [
    { to: '/', label: '开始做饭' },
    { to: '/shopping', label: '待购清单', badge: shoppingTodo, badgeLabel: '未完成待购项数量' },
    { to: '/favorites', label: '我的收藏', badge: favoriteIds.length, badgeLabel: '收藏数量' },
    { to: '/recent', label: '最近做过' },
    { to: '/tips', label: '新手贴士' },
  ]

  return (
    <nav className="sideNav" aria-label="左侧导航">
      <a className="sideNav__brand" href="#/" aria-label="brand">
        <img
          className="sideNav__logo"
          src="/brand/logo.png"
          alt="Logo"
          loading="eager"
          onError={(e) => {
            e.currentTarget.onerror = null
            e.currentTarget.src = '/brand/logo-placeholder.svg'
          }}
        />
      </a>
      <div className="sideNav__items">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.to === '/'}
            className={({ isActive }) => (isActive ? 'sideNav__item is-active' : 'sideNav__item')}
          >
            <span className="sideNav__label">{it.label}</span>
            <Badge value={it.badge} ariaLabel={it.badgeLabel} />
          </NavLink>
        ))}
      </div>
      <div className="sideNav__footRow">
        <div className="sideNav__foot">v2 incremental</div>
        <NavLink to="/settings" className="sideNav__settings" aria-label="settings">
          Settings
        </NavLink>
      </div>
    </nav>
  )
}
