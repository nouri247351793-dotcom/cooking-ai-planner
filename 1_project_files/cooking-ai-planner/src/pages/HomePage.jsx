import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import HomeHero from '../components/home/HomeHero.jsx'
import RandomRecipeModal from '../components/home/RandomRecipeModal.jsx'
import BudgetPlanModal from '../components/home/BudgetPlanModal.jsx'
import CookingTimerCard from '../components/home/CookingTimerCard.jsx'
import RecommendedTasksPanel from '../components/home/RecommendedTasksPanel.jsx'
import { pickRandomRecipe } from '../services/homeRecipeAgentService.js'
import { useRecipeGeneratorState } from '../hooks/useRecipeGeneratorState.js'
import useBudgetLedger from '../hooks/useBudgetLedger.js'
import useToast from '../hooks/useToast.js'
import { playSuccessSound, primeSuccessSound } from '../services/sound/soundService.js'

export default function HomePage() {
  const navigate = useNavigate()
  const { toast, showToast } = useToast()
  const [randomOpen, setRandomOpen] = useState(false)
  const [budgetOpen, setBudgetOpen] = useState(false)
  const budgetLedger = useBudgetLedger()

  const {
    defaultRecipes,
    inputText,
    filters,
    photoResult,
    setInputText,
    setFilters,
    setPhotoResult,
    status,
    recipes,
    randomRecipe,
    setRandomRecipe,
    generate,
  } = useRecipeGeneratorState()

  const randomBaseList = useMemo(() => {
    if (recipes && recipes.length) return recipes
    return defaultRecipes
  }, [defaultRecipes, recipes])

  const handleGenerate = async () => {
    primeSuccessSound()
    const res = await generate()
    if (res && res.status === 'success') {
      playSuccessSound()
      navigate('/results')
      return
    }

    if (res && (res.status === 'empty' || res.status === 'error')) {
      navigate('/results')
      return
    }

    navigate('/results')
  }

  return (
    <section className="page homeV2">
      <div className="homeV2__grid">
        <div className="homeV2__main">
          <HomeHero
            inputText={inputText}
            onInputTextChange={setInputText}
            photoResult={photoResult}
            onPhotoResultChange={setPhotoResult}
            isLoading={status === 'loading'}
            onGenerate={handleGenerate}
            filters={filters}
            onFiltersChange={setFilters}
          />

          <RecommendedTasksPanel />
        </div>

        <aside className="homeV2__aside" aria-label="首页辅助区">
          <CookingTimerCard />

          <div className="card">
            <div className="card__title">🎲 随机一道菜</div>
            <div className="muted" style={{ marginTop: 6 }}>
              这是轻量入口：优先从“最近生成”里随机；没有生成时从任务练习菜谱里随机。
            </div>
            <div className="actionsRow" style={{ marginTop: 10 }}>
              <button
                type="button"
                className="secondaryBtn"
                onClick={() => {
                  primeSuccessSound()
                  const picked = pickRandomRecipe(randomBaseList)
                  if (!picked) {
                    showToast('暂无可用菜谱')
                    return
                  }
                  setRandomRecipe(picked)
                  setRandomOpen(true)
                  playSuccessSound()
                }}
                disabled={randomBaseList.length === 0}
              >
                随机一道菜
              </button>
              {randomRecipe ? (
                <button type="button" className="miniBtn" onClick={() => setRandomRecipe(null)}>
                  清空
                </button>
              ) : null}
            </div>
            {randomRecipe ? (
              <div className="rightPeek">
                <div className="rightPeek__title">{randomRecipe.title}</div>
                <div className="rightPeek__meta">
                  {randomRecipe.minutes} 分钟 · {randomRecipe.difficulty}
                </div>
              </div>
            ) : null}
          </div>

          <div className="card noteCard">
            <div className="noteCard__head">
              <div className="noteCard__title">👩‍🍳 学做饭小贴士</div>
              <div className="noteCard__badge">经验便签</div>
            </div>
            <ul className="noteList">
              <li>
                <span className="noteDot">🥚</span> 鸡蛋入锅前加一点水，成品更嫩
              </li>
              <li>
                <span className="noteDot">🥬</span> 焯水后过凉，青菜不黄不苦
              </li>
              <li>
                <span className="noteDot">🔥</span> 空气炸锅预热 2 分钟，出色更稳定
              </li>
              <li>
                <span className="noteDot">🛒</span> 买鸡翅选表皮紧致、无渗血更新鲜
              </li>
            </ul>
          </div>

          <button
            type="button"
            className="card budgetCard"
            onClick={() => setBudgetOpen(true)}
            aria-label="打开本月省钱计划"
          >
            <div className="budgetCard__head">
              <div>
                <div className="budgetCard__title">💰 省钱计划</div>
                <div className="budgetCard__sub">本月做饭开支摘要 · 点开记录</div>
              </div>
              <div className="budgetCard__tag">本月</div>
            </div>

            <div className="budgetCard__grid budgetCard__grid--summary">
              <div className="budgetMini">
                <div className="budgetMini__k">本月预算</div>
                <div className="budgetMini__v">
                  {budgetLedger.stats.hasBudget ? `¥${budgetLedger.stats.monthlyBudget}` : '未设置'}
                </div>
              </div>
              <div className="budgetMini">
                <div className="budgetMini__k">本月已花</div>
                <div className="budgetMini__v">¥{budgetLedger.stats.spent}</div>
              </div>
            </div>

            <div className="progressBar" aria-hidden="true" style={{ marginTop: 10 }}>
              <div className="progressBar__fill" style={{ width: `${budgetLedger.stats.usagePercent}%` }} />
            </div>
          </button>
        </aside>
      </div>

      <RandomRecipeModal
        open={randomOpen}
        recipe={randomRecipe}
        onClose={() => setRandomOpen(false)}
        onReroll={() => {
          const picked = pickRandomRecipe(randomBaseList)
          if (!picked) return
          setRandomRecipe(picked)
        }}
      />

      <BudgetPlanModal open={budgetOpen} onClose={() => setBudgetOpen(false)} budgetLedger={budgetLedger} />

      {toast ? <div className="toast">{toast}</div> : null}
    </section>
  )
}
