import { Link, useLocation } from 'react-router-dom'

export default function RecipeCard({ recipe, actionSlot }) {
  const location = useLocation()
  const from = `${location.pathname || ''}${location.search || ''}` || '/'
  const tags = (recipe.tags || []).slice(0, 3)
  const core = (recipe.coreIngredients || []).slice(0, 4).join(' · ')

  return (
    <article className="recipeCard">
      <Link to={`/recipes/${recipe.id}`} state={{ recipe, from }} className="recipeCard__link">
        <img className="recipeCard__img" src={recipe.imageSrc} alt="" loading="lazy" />

        <div className="recipeCard__body">
          <div className="recipeCard__top">
            <div className="recipeCard__title">{recipe.title}</div>
            <div className="recipeCard__meta">
              {recipe.minutes} 分钟 · {recipe.difficulty}
            </div>
          </div>

          <div className="recipeCard__tags">
            {tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>

          <div className="recipeCard__core">
            核心食材：<span className="recipeCard__coreText">{core || '—'}</span>
          </div>

          {recipe.learning ? (
            <div className="recipeCard__learn">
              <div className="recipeCard__learnTitle">学习目标：{recipe.learning.goal}</div>
              <div className="recipeCard__learnPoints">
                {recipe.learning.focus && recipe.learning.focus.length
                  ? recipe.learning.focus.slice(0, 3).map((p) => (
                      <span key={p} className="pill">
                        {p}
                      </span>
                    ))
                  : null}
              </div>
            </div>
          ) : null}
        </div>
      </Link>

      {actionSlot ? <div className="recipeCard__action">{actionSlot}</div> : null}
    </article>
  )
}

