import { SOUND_ASSETS } from '../../utils/soundConstants.js'

let cachedAudio = null

function getAudio() {
  if (cachedAudio) {
    // If dev hot-reload or config change updated the path, keep it in sync.
    if (cachedAudio.src && !cachedAudio.src.endsWith(SOUND_ASSETS.success)) {
      cachedAudio.src = SOUND_ASSETS.success
      try {
        cachedAudio.load()
      } catch {
        // ignore
      }
    }
    return cachedAudio
  }
  const audio = new Audio(SOUND_ASSETS.success)
  audio.preload = 'auto'
  audio.volume = 0.35
  audio.addEventListener('error', () => {
    if (!(import.meta && import.meta.env && import.meta.env.DEV)) return
    console.warn('[sound] audio element error:', {
      src: audio.src,
      code: audio.error ? audio.error.code : null,
    })
  })
  cachedAudio = audio
  return cachedAudio
}

// Try to "unlock" browser audio playback on a user gesture (click/keydown).
// Call this early (e.g. on button click) to improve success sound reliability after async work.
export async function primeSuccessSound() {
  try {
    const audio = getAudio()
    audio.load()
    const prevVol = audio.volume
    const prevMuted = audio.muted
    audio.muted = true
    audio.volume = 0
    audio.currentTime = 0
    const p = audio.play()
    if (p && typeof p.then === 'function') await p
    audio.pause()
    audio.currentTime = 0
    audio.volume = prevVol
    audio.muted = prevMuted
    return true
  } catch {
    return false
  }
}

function beepFallback() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return false
    const ctx = new AudioCtx()
    if (typeof ctx.resume === 'function') {
      try {
        ctx.resume()
      } catch {
        // ignore
      }
    }
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    const now = ctx.currentTime
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, now)

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.18, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.15)
    osc.onended = () => {
      try {
        ctx.close()
      } catch {
        // ignore
      }
    }
    return true
  } catch {
    return false
  }
}

export async function playSuccessSound() {
  try {
    const audio = getAudio()
    audio.load()
    audio.muted = false
    audio.currentTime = 0
    const p = audio.play()
    if (p && typeof p.then === 'function') await p
    return true
  } catch (e) {
    if (import.meta && import.meta.env && import.meta.env.DEV) {
      console.warn('[sound] success audio play failed, fallback to beep:', e && e.name ? e.name : e)
    }
    return beepFallback()
  }
}
