import { Link } from 'react-router-dom'

export default function PageHeader({ title, subtitle, showBack, backTo, rightSlot }) {
  return (
    <header className="pageHeader">
      <div className="pageHeader__left">
        {showBack ? (
          <Link className="iconBtn" to={backTo || '/'} aria-label="返回">
            ←
          </Link>
        ) : (
          <span className="pageHeader__spacer" aria-hidden="true" />
        )}
      </div>

      <div className="pageHeader__center">
        <div className="pageHeader__title">{title}</div>
        {subtitle ? <div className="pageHeader__subtitle">{subtitle}</div> : null}
      </div>

      <div className="pageHeader__right">{rightSlot}</div>
    </header>
  )
}

