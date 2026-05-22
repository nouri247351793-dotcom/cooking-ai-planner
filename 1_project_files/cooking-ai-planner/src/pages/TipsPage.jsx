import TipCard from '../components/tips/TipCard.jsx'
import { TIPS_CATALOG } from '../data/tipsCatalog.js'

export default function TipsPage() {
  return (
    <section className="page v3Page">
      <div className="v3PageHero">
        <div>
          <div className="v3PageHero__eyebrow">辅助沉淀页</div>
          <h1 className="v3PageHero__title">新手贴士</h1>
          <p className="v3PageHero__desc">把常用做饭技巧做成可复习的小卡片。它不是主流程，但能帮助你少踩坑。</p>
        </div>
        <div className="v3PageHero__badge">{TIPS_CATALOG.length} 条</div>
      </div>

      <div className="tipsGrid v3CardGrid">
        {TIPS_CATALOG.map((tip) => (
          <TipCard key={tip.id} tip={tip} />
        ))}
      </div>
    </section>
  )
}
