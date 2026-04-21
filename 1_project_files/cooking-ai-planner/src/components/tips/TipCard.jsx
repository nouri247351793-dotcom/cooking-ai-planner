export default function TipCard({ tip }) {
  if (!tip) return null

  return (
    <article className="tipCard">
      <div className="tipCard__media">
        <img className="tipCard__img" src={tip.imageSrc} alt="" loading="lazy" />
      </div>
      <div className="tipCard__body">
        <div className="tipCard__title">{tip.title}</div>
        <div className="tipCard__meta">{tip.minutes} 分钟 · 适合快速复习</div>
        <div className="tipCard__tags">
          {(tip.tags || []).slice(0, 4).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        {tip.summary ? <div className="tipCard__summary">{tip.summary}</div> : null}
      </div>
    </article>
  )
}

