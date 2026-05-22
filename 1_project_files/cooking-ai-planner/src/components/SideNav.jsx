import { NavLink } from 'react-router-dom'
import { useFavorites } from '../hooks/useFavorites.js'
import { useShoppingList } from '../hooks/useShoppingList.js'

function Badge({ value, ariaLabel }) {
  const count = typeof value === 'number' ? value : 0
  if (!count) return null

  return (
    <span className="badge" aria-label={ariaLabel || `数量 ${count}`}>
      {count > 99 ? '99+' : count}
    </span>
  )
}

export default function SideNav() {
  const { favoriteIds } = useFavorites()
  const { shoppingItems } = useShoppingList()
  const baseUrl = import.meta.env.BASE_URL || '/'
  const logoSrc = `${baseUrl}brand/logo.png`
  const logoFallbackSrc = `${baseUrl}brand/logo-placeholder.svg`
  const shoppingTodo = shoppingItems.filter((item) => !item.checked).length

  const items = [
    { to: '/', label: '开始做饭', icon: '🍳' },
    { to: '/shopping', label: '待购清单', icon: '🧺', badge: shoppingTodo, badgeLabel: '未完成待购数量' },
    { to: '/favorites', label: '我的收藏', icon: '⭐', badge: favoriteIds.length, badgeLabel: '收藏数量' },
    { to: '/recent', label: '最近做过', icon: '🕘' },
    { to: '/tips', label: '新手贴士', icon: '💡' },
  ]

  return (
    <nav className="sideNav" aria-label="左侧主导航">
      <a className="sideNav__brand" href="#/" aria-label="小饭桌首页">
        <img
          className="sideNav__logo"
          src={logoSrc}
          alt="小饭桌"
          loading="eager"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = logoFallbackSrc
          }}
        />
      </a>

      <div className="sideNav__items">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => (isActive ? 'sideNav__item is-active' : 'sideNav__item')}
            aria-label={item.label}
            title={item.label}
          >
            <span className="sideNav__icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="sideNav__label">{item.label}</span>
            <Badge value={item.badge} ariaLabel={item.badgeLabel} />
          </NavLink>
        ))}
      </div>

      <div className="sideNav__footRow">
        <div className="sideNav__foot">3.0</div>
        <NavLink to="/settings" className="sideNav__settings" aria-label="设置" title="设置">
          <span aria-hidden="true">⚙️</span>
          <span className="sideNav__settingsLabel">设置</span>
        </NavLink>
      </div>
    </nav>
  )
}
