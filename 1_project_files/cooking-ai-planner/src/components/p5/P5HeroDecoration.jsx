import { useEffect, useRef } from 'react'

function prefersReducedMotion() {
  try {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

const P5_SRC = '/vendor/p5.min.js'
let p5Loader = null

function loadP5Script() {
  if (typeof window === 'undefined') return Promise.reject(new Error('p5 load: window is undefined'))
  if (window.p5) return Promise.resolve(window.p5)
  if (p5Loader) return p5Loader

  p5Loader = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-p5-src="${P5_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(window.p5), { once: true })
      existing.addEventListener('error', () => reject(new Error('p5 load: script error')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = P5_SRC
    script.async = true
    script.dataset.p5Src = P5_SRC
    script.onload = () => resolve(window.p5)
    script.onerror = () => reject(new Error('p5 load: script error'))
    document.head.appendChild(script)
  })

  return p5Loader
}

export default function P5HeroDecoration({ height = 110, seed = 7 }) {
  const mountRef = useRef(null)
  const sketchRef = useRef(null)
  const roRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    let disposed = false
    let p5Instance = null
    const reduceMotion = prefersReducedMotion()

    const setupResizeObserver = () => {
      if (!('ResizeObserver' in window)) return
      roRef.current = new ResizeObserver((entries) => {
        if (!entries || !entries.length) return
        const cr = entries[0].contentRect
        if (!cr) return
        if (p5Instance && typeof p5Instance.resizeCanvas === 'function') {
          const w = Math.max(1, Math.floor(cr.width))
          p5Instance.resizeCanvas(w, height, true)
        }
      })
      roRef.current.observe(mount)
    }

    ;(async () => {
      const P5 = await loadP5Script()
      if (disposed) return
      if (!P5) throw new Error('p5 load: window.p5 missing')

      p5Instance = new P5((p) => {
        const palette = {
          ink: p.color(15, 23, 42, 190),
          accent: p.color(255, 124, 36, 110),
          cream: p.color(243, 243, 236, 180),
          smoke: p.color(15, 23, 42, 42),
          paper: p.color(255, 255, 255, 0),
        }

        const drawTape = (x, y, w, h, c) => {
          p.noStroke()
          p.fill(c)
          p.rect(x, y, w, h, 10)
          p.stroke(15, 23, 42, 24)
          for (let i = 0; i < 7; i += 1) {
            const yy = y + (h / 7) * i + p.random(-1.2, 1.2)
            p.line(x + 6, yy, x + w - 6, yy + p.random(-0.8, 0.8))
          }
        }

        const drawSticker = (cx, cy, r, c) => {
          p.noStroke()
          p.fill(c)
          p.circle(cx, cy, r * 2)
          p.stroke(palette.ink)
          p.strokeWeight(1.3)
          p.noFill()
          p.arc(cx, cy, r * 1.3, r * 1.3, p.radians(10), p.radians(200))
          p.arc(cx, cy, r * 1.2, r * 1.2, p.radians(220), p.radians(350))
        }

        const drawDoodle = () => {
          p.clear()
          p.pixelDensity(1)
          p.randomSeed(seed)
          p.noiseSeed(seed)

          const w = p.width
          const h = p.height

          // soft blobs
          p.noStroke()
          p.fill(palette.accent)
          p.ellipse(w * 0.18, h * 0.38, w * 0.42, h * 1.05)
          p.fill(palette.cream)
          p.ellipse(w * 0.72, h * 0.48, w * 0.56, h * 0.95)
          p.fill(palette.smoke)
          p.ellipse(w * 0.52, h * 0.22, w * 0.32, h * 0.65)

          // tape strips
          drawTape(w * 0.06, h * 0.12, w * 0.42, 22, p.color(255, 255, 255, 170))
          drawTape(w * 0.56, h * 0.72, w * 0.38, 20, p.color(255, 255, 255, 155))

          // dotted grid
          p.noStroke()
          p.fill(15, 23, 42, 28)
          for (let y = 16; y < h; y += 16) {
            for (let x = 12; x < w; x += 18) {
              if (p.random() > 0.88) p.circle(x + p.random(-2, 2), y + p.random(-2, 2), 2)
            }
          }

          // scribble line
          p.noFill()
          p.stroke(15, 23, 42, 85)
          p.strokeWeight(1.2)
          p.beginShape()
          for (let x = -8; x < w + 8; x += 10) {
            const yy = h * 0.56 + p.noise(x * 0.02) * 10 + p.random(-2.2, 2.2)
            p.curveVertex(x, yy)
          }
          p.endShape()

          // sticker badge
          drawSticker(w * 0.86, h * 0.28, 16, p.color(255, 255, 255, 180))

          // tiny sparkles
          p.stroke(255, 255, 255, 220)
          p.strokeWeight(1.4)
          const sparkle = (sx, sy) => {
            p.line(sx - 5, sy, sx + 5, sy)
            p.line(sx, sy - 5, sx, sy + 5)
          }
          sparkle(w * 0.12, h * 0.72)
          sparkle(w * 0.36, h * 0.28)
        }

        p.setup = () => {
          const w = Math.max(1, Math.floor(mount.clientWidth || 320))
          p.createCanvas(w, height)
          if (p.canvas) {
            p.canvas.classList.add('p5HeroCanvas')
          }
          p.frameRate(reduceMotion ? 1 : 18)
          drawDoodle()
          if (reduceMotion) p.noLoop()
        }

        p.draw = () => {
          if (reduceMotion) return
          // subtle drift: redraw with small seed offset
          p.randomSeed(seed + p.frameCount * 3)
          p.noiseSeed(seed + p.frameCount * 2)
          drawDoodle()
        }
      }, mount)

      sketchRef.current = p5Instance
      setupResizeObserver()
    })().catch(() => {
      // ignore: decoration should never block main UI
    })

    return () => {
      disposed = true
      if (roRef.current) {
        try {
          roRef.current.disconnect()
        } catch {
          // ignore
        }
        roRef.current = null
      }
      if (sketchRef.current) {
        try {
          sketchRef.current.remove()
        } catch {
          // ignore
        }
        sketchRef.current = null
      }
      if (p5Instance) {
        try {
          p5Instance.remove()
        } catch {
          // ignore
        }
        p5Instance = null
      }
    }
  }, [height, seed])

  return <div ref={mountRef} className="p5HeroMount" aria-hidden="true" />
}
