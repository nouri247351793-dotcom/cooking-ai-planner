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
            <div className="homeHero__eyebrow">小饭桌今日主操作</div>
            <h1 className="homeHero__title">今天想吃点什么？</h1>
          </div>
        </div>

        <p className="homeHero__desc">
          告诉我你的时间、预算、设备和想练的技能，我会先用 2.0 mock 规则生成一组适合新手练习的菜谱。
        </p>

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
          placeholder="例如：我只有 10 分钟，想吃点热的，预算 <10 元，最好能练切菜。"
          rows={5}
          disabled={isLoading}
        />

        <div className="homeHero__hint">Enter 发送 · Shift+Enter 换行 · 当前版本不接真实 AI</div>

        <div className="homeHero__actions">
          <PhotoUploadButton photoResult={photoResult} onPhotoResultChange={onPhotoResultChange} disabled={isLoading} />
          <button type="button" className="primaryBtn homeHero__primary" onClick={onGenerate} disabled={isLoading}>
            {isLoading ? '生成中…' : '生成菜谱'}
          </button>
        </div>

        {photoResult.status === 'uploaded' ? (
          <div className="homeHero__photoHint">已上传：{photoResult.fileName}（本轮仅占位，不做识别）</div>
        ) : (
          <div className="homeHero__photoHint">也可以上传食材照片；3.0 后续步骤再接入识别或 RAG。</div>
        )}

        <div className="homeHero__filters">
          <FiltersPanel filters={filters} onChange={onFiltersChange} embedded />
        </div>
      </div>
    </div>
  )
}
