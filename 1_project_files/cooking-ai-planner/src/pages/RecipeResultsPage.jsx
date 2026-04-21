import { Link, useNavigate } from 'react-router-dom'
import RecipeCard from '../components/home/RecipeCard.jsx'
import { useRecipeGeneratorState } from '../hooks/useRecipeGeneratorState.js'

function formatBudget(budget) {
  if (budget === 'low') return '<10 元'
  if (budget === 'mid') return '中预算'
  return '不限'
}

function formatEquipmentLimit(limit) {
  if (limit === 'microwaveOnly') return '仅微波炉'
  if (limit === 'dormPot') return '仅宿舍小锅'
  if (limit === 'airfryer') return '空气炸锅'
  if (limit === 'noOven') return '无烤箱'
  if (limit === 'noStove') return '无明火'
  return '不限'
}

export default function RecipeResultsPage() {
  const navigate = useNavigate()
  const { status, recipes, inputText, filters, errorMsg, generate } = useRecipeGeneratorState()

  const safeFilters = filters || { durationMax: '30', budget: 'any', equipmentLimit: 'any', servings: '1' }
  const summaryParts = [
    inputText ? `目标：${inputText}` : '目标：未填写',
    `时长：≤ ${safeFilters.durationMax} 分钟`,
    `预算：${formatBudget(safeFilters.budget)}`,
    `设备：${formatEquipmentLimit(safeFilters.equipmentLimit)}`,
    `人数：${safeFilters.servings} 人份`,
  ]

  return (
    <section className="page">
      <div className="card">
        <div className="cardHeadRow" style={{ marginBottom: 10 }}>
          <div>
            <div className="card__title">菜谱结果</div>
            <div className="muted" style={{ marginTop: 6 }}>
              {summaryParts.join(' · ')}
            </div>
          </div>

          <div className="actionsRow" style={{ marginTop: 0 }}>
            <Link to="/" className="ghostBtn">
              返回修改条件
            </Link>
            <button type="button" className="secondaryBtn" onClick={generate} disabled={status === 'loading'}>
              {status === 'loading' ? '生成中…' : '重新生成'}
            </button>
          </div>
        </div>

        {status === 'loading' ? (
          <div className="skeletonList">
            <div className="skeletonCard" />
            <div className="skeletonCard" />
            <div className="skeletonCard" />
          </div>
        ) : null}

        {status === 'error' ? (
          <div className="notice error">
            <div className="notice__title">生成失败</div>
            <div className="notice__desc">{errorMsg}</div>
          </div>
        ) : null}

        {status === 'empty' ? (
          <div className="notice">
            <div className="notice__title">没有找到合适的结果</div>
            <div className="notice__desc">返回首页调整条件，或点击“重新生成”。</div>
          </div>
        ) : null}

        {status === 'idle' ? (
          <div className="notice subtle">
            <div className="notice__title">还没有结果</div>
            <div className="notice__desc">请从首页点击“生成菜谱”，成功后会跳转到这里。</div>
            <div className="actionsRow">
              <button type="button" className="ghostBtn" onClick={() => navigate('/')}>
                去首页
              </button>
            </div>
          </div>
        ) : null}

        {status === 'success' && recipes && recipes.length ? (
          <div className="weekGrid" style={{ marginTop: 10 }}>
            {recipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

