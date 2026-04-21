import PhotoUploadButton from './PhotoUploadButton.jsx'

export default function AgentComposer({
  inputText,
  onInputTextChange,
  photoResult,
  onPhotoResultChange,
  onGenerate,
  isLoading,
}) {
  return (
    <div className="card agentCard">
      <div className="agentCard__title">告诉我你的做饭学习目标</div>
      <textarea
        className="textarea"
        value={inputText}
        name="home_learning_goal"
        onChange={(e) => onInputTextChange(e.target.value)}
        placeholder="例：我只有 20 分钟，想学 1 道下饭菜；预算不高，最好能顺便练刀工。"
        rows={4}
      />

      <div className="agentCard__row">
        <PhotoUploadButton
          photoResult={photoResult}
          onPhotoResultChange={onPhotoResultChange}
          disabled={isLoading}
        />
        <button type="button" className="primaryBtn" onClick={onGenerate} disabled={isLoading}>
          {isLoading ? '生成中…' : '生成菜谱'}
        </button>
      </div>

      {photoResult.status === 'uploaded' ? (
        <div className="agentCard__hint">
          已上传：{photoResult.fileName}（本轮仅占位，不做真实识别）
        </div>
      ) : (
        <div className="agentCard__hint">也可以拍照上传食材图（先占位，后续接识别/RAG）。</div>
      )}
    </div>
  )
}
