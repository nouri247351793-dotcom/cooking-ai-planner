import PhotoUploadButton from './PhotoUploadButton.jsx'
import FiltersPanel from './FiltersPanel.jsx'
import P5HeroDecoration from '../p5/P5HeroDecoration.jsx'

export default function HomeHero({
  inputText,
  onInputTextChange,
  photoResult,
  onPhotoResultChange,
  onGenerate,
  isLoading,
  filters,
  onFiltersChange,
}) {
  return (
    <div className="homeHero homeHero--v3">
      <div className="homeHero__p5" aria-hidden="true">
        <P5HeroDecoration />
      </div>

      <div className="homeHero__content">
        <div className="homeHero__titleRow">
          <span className="homeHero__iconSlot" aria-hidden="true">
            🔍
          </span>
          <div>
            <h1 className="homeHero__title">今天想吃点什么？</h1>
          </div>
        </div>

        <textarea
          className="textarea homeHero__input"
          value={inputText}
          name="home_user_input"
          onChange={(event) => onInputTextChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return
            if (event.shiftKey) return
            event.preventDefault()
            onGenerate()
          }}
          rows={5}
          disabled={isLoading}
        />

        <div className="homeHero__actions">
          <PhotoUploadButton photoResult={photoResult} onPhotoResultChange={onPhotoResultChange} disabled={isLoading} />
          <button type="button" className="primaryBtn homeHero__primary" onClick={onGenerate} disabled={isLoading}>
            {isLoading ? '生成中…' : '生成菜谱'}
          </button>
        </div>

        {photoResult.status === 'uploaded' ? (
          <div className="homeHero__photoHint">已上传：{photoResult.fileName}</div>
        ) : null}

        <div className="homeHero__filters">
          <FiltersPanel filters={filters} onChange={onFiltersChange} embedded />
        </div>
      </div>
    </div>
  )
}
