import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import HomeHero from '../components/home/HomeHero.jsx'
import RandomRecipeModal from '../components/home/RandomRecipeModal.jsx'
import BudgetPlanModal from '../components/home/BudgetPlanModal.jsx'
import CookingTimerCard from '../components/home/CookingTimerCard.jsx'
import RecommendedTasksPanel from '../components/home/RecommendedTasksPanel.jsx'
import { pickRandomRecipe } from '../services/homeRecipeAgentService.js'
import { askAI } from '../services/aiService.js'
import {
  mapAIShoppingListToItems,
  persistAIShoppingList,
  replaceAIShoppingItems,
} from '../services/aiShoppingListService.js'
import { useRecipeGeneratorState } from '../hooks/useRecipeGeneratorState.js'
import { useShoppingList } from '../hooks/useShoppingList.js'
import useAIFavoriteRecipes from '../hooks/useAIFavoriteRecipes.js'
import useBudgetLedger from '../hooks/useBudgetLedger.js'
import useToast from '../hooks/useToast.js'
import { playSuccessSound, primeSuccessSound } from '../services/sound/soundService.js'
import { mapAIRecipeToFavoriteRecipe } from '../services/aiFavoriteRecipeService.js'
import {
  addRandomRecipeHistory,
  clearRandomRecipeHistory,
  getRandomRecipeHistory,
} from '../services/randomRecipeHistoryService.js'

function buildHomeAIContext({ filters, photoResult, budgetStats }) {
  return {
    source: 'home',
    availableIngredients:
      photoResult && photoResult.status === 'uploaded' ? photoResult.mockRecognized?.ingredients || [] : [],
    servings: Number(filters.servings || 1),
    budget: filters.budget || 'any',
    availableTime: `${Number(filters.durationMax || 30)} 分钟内`,
    tastePreference: '',
    avoid: '',
    equipment: filters.equipmentLimit || 'any',
    photo: photoResult || null,
    monthlyBudget: budgetStats
      ? {
          hasBudget: budgetStats.hasBudget,
          monthlyBudget: budgetStats.monthlyBudget,
          spent: budgetStats.spent,
          remaining: budgetStats.remaining,
        }
      : null,
  }
}

function getAIFallbackReasonText(reason) {
  const map = {
    fetch_unavailable: '浏览器暂不支持网络请求，已自动切换到示例数据。',
    request_failed: '网络请求失败，已自动切换到示例数据。',
    timeout: 'AI 请求超时，已自动切换到示例数据。',
    invalid_json: 'AI 返回内容无法解析，已自动切换到示例数据。',
    invalid_response_shape: 'AI 返回字段不完整，已自动切换到示例数据。',
    missing_api_key: 'Vercel 尚未配置 AI_API_KEY，已使用示例数据。',
    provider_request_failed: 'AI 服务请求失败，已自动切换到示例数据。',
    provider_exception: 'AI 服务异常，已自动切换到示例数据。',
    provider_timeout: 'AI 服务响应超时，已自动切换到示例数据。',
    invalid_provider_json: 'AI 服务返回内容无法解析，已自动切换到示例数据。',
    manual_mock: '当前使用手动演示数据。',
  }
  if (!reason) return ''
  if (String(reason).startsWith('http_')) return 'AI 服务暂时不可用，已自动切换到示例数据。'
  return map[reason] || 'AI 服务暂时不可用，已自动切换到示例数据。'
}

function AIResultPanel({ status, result, error, isFavoriteRecipe, onToggleFavorite }) {
  if (status === 'idle' && !result) return null

  if (status === 'loading') {
    return (
      <section className="card aiResultCard aiResultCard--loading" aria-live="polite">
        <div className="aiResultCard__head">
          <span className="aiResultCard__icon" aria-hidden="true">
            🤖
          </span>
          <div>
            <div className="aiResultCard__eyebrow">小饭桌 AI</div>
            <h2 className="aiResultCard__title">AI 正在生成做饭建议…</h2>
          </div>
        </div>
        <div className="aiResultCard__pulse" aria-hidden="true" />
      </section>
    )
  }

  if (status === 'error') {
    return (
      <section className="card aiResultCard" aria-live="polite">
        <div className="aiResultCard__head">
          <span className="aiResultCard__icon" aria-hidden="true">
            ⚠️
          </span>
          <div>
            <div className="aiResultCard__eyebrow">生成失败</div>
            <h2 className="aiResultCard__title">{error || 'AI 暂时不可用，请稍后再试。'}</h2>
          </div>
        </div>
      </section>
    )
  }

  const recipes = Array.isArray(result?.recipes) ? result.recipes : []
  const tips = Array.isArray(result?.tips) ? result.tips : []
  const fallbackReasonText = getAIFallbackReasonText(result?.fallbackReason)

  return (
    <section className="card aiResultCard" aria-live="polite">
      <div className="aiResultCard__head">
        <span className="aiResultCard__icon" aria-hidden="true">
          🍳
        </span>
        <div>
          <div className="aiResultCard__eyebrow">小饭桌 AI 建议</div>
          <h2 className="aiResultCard__title">{result?.estimatedTime || '今日做饭方案'}</h2>
        </div>
        {result?.demoMode ? <span className="aiResultCard__badge">演示模式</span> : null}
      </div>

      {result?.demoMode ? (
        <div className="aiResultCard__demoNotice" role="note">
          当前为演示模式，AI 内容由示例数据生成。
          {fallbackReasonText ? <span>{fallbackReasonText}</span> : null}
        </div>
      ) : null}

      {result?.answer ? <p className="aiResultCard__answer">{result.answer}</p> : null}

      {recipes.length ? (
        <div className="aiRecipeGrid">
          {recipes.map((recipe) => {
            const detailRecipe = mapAIRecipeToFavoriteRecipe(recipe)
            const isFavorite = isFavoriteRecipe(recipe.id)
            return (
              <article className="aiRecipeCard" key={recipe.id}>
                <Link
                  className="aiRecipeCard__link"
                  to={`/recipes/${encodeURIComponent(detailRecipe.id)}`}
                  state={{ recipe: detailRecipe, from: '/' }}
                  aria-label={`查看 ${recipe.title} 详情`}
                >
                  <div className="aiRecipeCard__top">
                    <div>
                      <h3>{recipe.title}</h3>
                      <p>{recipe.description}</p>
                    </div>
                    <span>{recipe.estimatedTime || '快手'}</span>
                  </div>
                  <div className="aiRecipeCard__meta">
                    <span>{recipe.difficulty || '新手友好'}</span>
                    <span>点击看详情</span>
                  </div>
                  <div className="aiRecipeCard__tags">
                    {(recipe.tags || []).slice(0, 5).map((tag) => (
                      <span key={`${recipe.id}-${tag}`}>{tag}</span>
                    ))}
                  </div>
                </Link>
                <div className="aiRecipeCard__actions">
                  <button
                    type="button"
                    className={isFavorite ? 'aiRecipeCard__favorite is-active' : 'aiRecipeCard__favorite'}
                    onClick={() => onToggleFavorite(recipe)}
                  >
                    {isFavorite ? '已收藏' : '收藏'}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      ) : null}

      {tips.length ? (
        <div className="aiResultCard__bottom aiResultCard__bottom--single">
          <div className="aiMiniBlock">
            <div className="aiMiniBlock__title">小贴士</div>
            <ul>
              {tips.map((tip, tipIndex) => (
                <li key={`ai-tip-${tipIndex + 1}`}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default function HomePage() {
  const { toast, showToast } = useToast()
  const [randomOpen, setRandomOpen] = useState(false)
  const [budgetOpen, setBudgetOpen] = useState(false)
  const [aiStatus, setAiStatus] = useState('idle')
  const [aiResult, setAiResult] = useState(null)
  const [aiError, setAiError] = useState('')
  const [randomHistory, setRandomHistory] = useState(() => getRandomRecipeHistory())
  const budgetLedger = useBudgetLedger()
  const { setShoppingItems } = useShoppingList()
  const aiFavorites = useAIFavoriteRecipes()

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
    setAiStatus('loading')
    setAiError('')

    try {
      const userMessage = String(inputText || '').trim() || '我今天想做一顿简单、省钱、适合新手的饭。'
      if (!String(inputText || '').trim()) {
        showToast('未填写需求，已使用默认新手做饭需求')
      }

      const context = buildHomeAIContext({
        filters,
        photoResult,
        budgetStats: budgetLedger.stats,
      })
      const [aiResponse, mockResult] = await Promise.all([askAI(userMessage, context), generate()])
      setAiResult(aiResponse)
      setAiStatus(aiResponse.demoMode ? 'demo' : 'success')

      if (Array.isArray(aiResponse.shoppingList)) {
        const shoppingPersisted = persistAIShoppingList(aiResponse.shoppingList)
        if (!shoppingPersisted && aiResponse.shoppingList.length) {
          showToast('浏览器存储暂不可用，待购清单本次仅在当前页面生效')
        }
        const aiShoppingItems = mapAIShoppingListToItems(aiResponse.shoppingList, aiResponse.recipes)
        setShoppingItems((prev) => replaceAIShoppingItems(prev, aiShoppingItems))
      }

      if (mockResult && mockResult.status === 'error') {
        showToast('AI 已返回建议；原 mock 菜谱暂时生成失败')
      }

      playSuccessSound()
    } catch {
      setAiStatus('error')
      setAiError('AI 生成失败，请稍后再试。')
      showToast('AI 生成失败，请稍后再试')
    }
  }

  const isLoading = status === 'loading' || aiStatus === 'loading'

  const handleToggleAIFavorite = (recipe) => {
    const wasFavorite = aiFavorites.isAIFavoriteRecipe(recipe.id)
    aiFavorites.toggleAIFavoriteRecipe(recipe)
    showToast(wasFavorite ? '已取消收藏' : '已收藏到我的收藏')
  }

  const openRandomRecipe = (recipe) => {
    if (!recipe) return
    setRandomRecipe(recipe)
    setRandomHistory(addRandomRecipeHistory(recipe))
    setRandomOpen(true)
  }

  const handlePickRandomRecipe = () => {
    primeSuccessSound()
    const picked = pickRandomRecipe(randomBaseList)
    if (!picked) {
      showToast('暂无可用菜谱')
      return
    }
    openRandomRecipe(picked)
    playSuccessSound()
  }

  const handleClearRandomHistory = () => {
    setRandomRecipe(null)
    setRandomHistory(clearRandomRecipeHistory())
    showToast('已清空随机记录')
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
            isLoading={isLoading}
            onGenerate={handleGenerate}
            filters={filters}
            onFiltersChange={setFilters}
          />

          <AIResultPanel
            status={aiStatus}
            result={aiResult}
            error={aiError}
            isFavoriteRecipe={aiFavorites.isAIFavoriteRecipe}
            onToggleFavorite={handleToggleAIFavorite}
          />

          <RecommendedTasksPanel />
        </div>

        <aside className="homeV2__aside" aria-label="首页辅助区">
          <CookingTimerCard />

          <div className="card utilityCard">
            <div className="utilityCard__head">
              <div>
                <div className="titleWithIcon utilityCard__title">
                  <span className="titleWithIcon__icon" aria-hidden="true">
                    🎲
                  </span>
                  <span>随机一道菜</span>
                </div>
                <div className="utilityCard__desc">不知道做什么时，先抽一道可练习的菜。</div>
              </div>
            </div>
            <div className="actionsRow" style={{ marginTop: 10 }}>
              <button
                type="button"
                className="secondaryBtn"
                onClick={handlePickRandomRecipe}
                disabled={randomBaseList.length === 0}
              >
                随机一道菜
              </button>
              {randomHistory.length ? (
                <button type="button" className="miniBtn" onClick={handleClearRandomHistory}>
                  清空
                </button>
              ) : null}
            </div>
            {randomHistory.length ? (
              <div className="randomHistory">
                {randomHistory.map((item) => (
                  <button
                    type="button"
                    className="rightPeek randomHistory__item"
                    key={`${item.id}-${item.createdAt}`}
                    onClick={() => openRandomRecipe(item.recipe)}
                    aria-label={`重新打开 ${item.recipe.title} 详情`}
                  >
                    <div className="rightPeek__title">{item.recipe.title}</div>
                    <div className="rightPeek__meta">
                      {item.recipe.minutes ? `${item.recipe.minutes} 分钟` : item.recipe.estimatedTime || '快手'} ·{' '}
                      {item.recipe.difficulty}
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="card noteCard">
            <div className="noteCard__head">
              <div className="titleWithIcon noteCard__title">
                <span className="titleWithIcon__icon" aria-hidden="true">
                  👩‍🍳
                </span>
                <span>学做饭小贴士</span>
              </div>
              <div className="noteCard__badge">经验便签</div>
            </div>
            <ul className="noteList">
              <li>
                <span className="noteDot">🥚</span> 鸡蛋加一点水，更嫩。
              </li>
              <li>
                <span className="noteDot">🥬</span> 青菜焯水后过凉。
              </li>
              <li>
                <span className="noteDot">🔥</span> 热锅后再下食材。
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
                <div className="titleWithIcon budgetCard__title">
                  <span className="titleWithIcon__icon" aria-hidden="true">
                    💰
                  </span>
                  <span>省钱计划</span>
                </div>
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
          setRandomHistory(addRandomRecipeHistory(picked))
        }}
      />

      <BudgetPlanModal open={budgetOpen} onClose={() => setBudgetOpen(false)} budgetLedger={budgetLedger} />

      {toast ? <div className="toast">{toast}</div> : null}
    </section>
  )
}
