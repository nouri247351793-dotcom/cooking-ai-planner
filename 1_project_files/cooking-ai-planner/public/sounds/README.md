# Sounds（本地音效素材位）

本项目的「成功提示音」默认读取：
- `public/sounds/success-pop.mp3`

## 替换方式
1) 直接用你自己的音效文件覆盖同名文件；或
2) 修改 `src/utils/soundConstants.js` 中的 `SOUND_ASSETS.success` 指向新文件名（例如 `'/sounds/my-success.mp3'`）。

## 注意事项（很重要）
- 浏览器通常要求「用户手势」才能播放音频：请通过点击按钮触发（例如首页「生成菜谱」「随机一道菜」）。
- 如果你替换了文件但听到的还是旧声音：请做一次硬刷新（Windows：`Ctrl+F5` / macOS：`Cmd+Shift+R`），或在 DevTools 中清空缓存后重试。
- 音效建议：短促提示音（不是背景音乐），推荐时长 ≤ 0.5s，音量适中，避免打扰。
