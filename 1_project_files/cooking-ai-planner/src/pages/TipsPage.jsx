import TipCard from '../components/tips/TipCard.jsx'
import { TIPS_CATALOG } from '../data/tipsCatalog.js'

export default function TipsPage() {
  return (
    <section className="page">
      <div className="card">
        <div className="cardHeadRow">
          <div>
            <div className="card__title">📌 新手贴士</div>
            <div className="muted" style={{ marginTop: 6 }}>
              这是“辅助沉淀页”：把常用技巧做成可复习的小卡片，方便课堂演示与日常练习。
            </div>
          </div>
        </div>

        <div className="tipsGrid" style={{ marginTop: 10 }}>
          {TIPS_CATALOG.map((t) => (
            <TipCard key={t.id} tip={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
