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
    <div className="homeHero">
      <div className="homeHero__p5" aria-hidden="true">
        <P5HeroDecoration />
      </div>

      <div className="homeHero__content">
        <div className="homeHero__title">🍳 今天想吃点什么？</div>
        <div className="homeHero__desc">
          告诉我你的目标（比如想练刀工、想省钱、想在宿舍快手解决），我会按时长/预算/设备给你一组可练的菜谱。
        </div>

        <textarea
          className="textarea homeHero__input"
          value={inputText}
          name="home_user_input"
          onChange={(e) => onInputTextChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return
            if (e.shiftKey) return
            e.preventDefault()
            onGenerate()
          }}
          placeholder="例如：我只有 10 分钟，想吃点热的，预算 <10 元；最好能练切菜。"
          rows={4}
          disabled={isLoading}
        />

        <div className="homeHero__hint">Enter 发送 · Shift+Enter 换行</div>

        <div className="homeHero__actions">
          <PhotoUploadButton
            photoResult={photoResult}
            onPhotoResultChange={onPhotoResultChange}
            disabled={isLoading}
          />
          <button type="button" className="primaryBtn homeHero__primary" onClick={onGenerate} disabled={isLoading}>
            {isLoading ? '生成中…' : '生成菜谱'}
          </button>
        </div>

        {photoResult.status === 'uploaded' ? (
          <div className="homeHero__photoHint">已上传：{photoResult.fileName}（本轮仅占位，不做识别）</div>
        ) : (
          <div className="homeHero__photoHint">也可以拍照上传食材图（先占位，后续接识别/RAG）。</div>
        )}


        <div className="homeHero__divider" aria-hidden="true" />
        <div className="homeHero__filters">
          <FiltersPanel filters={filters} onChange={onFiltersChange} embedded />
        </div>
      </div>
    </div>
  )
}
