import { createPhotoResultFromFile } from '../../services/homeRecipeAgentService.js'

export default function PhotoUploadButton({ photoResult, onPhotoResultChange, disabled }) {
  const inputId = 'home-photo-upload'

  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null
    if (!file) return
    onPhotoResultChange(createPhotoResultFromFile(file))
  }

  const label = photoResult.status === 'uploaded' ? '已上传' : '拍照/上传'

  return (
    <div className="photoBtnWrap">
      <input
        id={inputId}
        className="fileInput"
        type="file"
        accept="image/*"
        capture="environment"
        disabled={disabled}
        onChange={onFileChange}
      />
      <label className="secondaryBtn" htmlFor={inputId} aria-disabled={disabled ? 'true' : 'false'}>
        {label}
      </label>
    </div>
  )
}
