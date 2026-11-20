import { useEffect, useRef, useState } from 'react'

/**
 * Animated topographic contour map (marching squares over drifting Perlin noise).
 * The cursor raises a "peak" the contour lines bend around. A small readout maps the
 * cursor onto a Karakoram bounding box, a nod to the KaraGLOF research.
 */

// ---- Perlin noise ----
const perm = new Uint8Array(512)
{
  const p = Array.from({ length: 256 }, (_, i) => i)
  let seed = 7
  for (let i = 255; i > 0; i--) {
    seed = (seed * 16807) % 2147483647
    const j = seed % (i + 1)
    ;[p[i], p[j]] = [p[j], p[i]]
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]
}
const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
const grad = (h: number, x: number, y: number) => {
  const g = h & 3
  return (g & 1 ? -x : x) + (g & 2 ? -y : y)
}
function perlin(x: number, y: number) {
  const xi = Math.floor(x) & 255
  const yi = Math.floor(y) & 255
  const xf = x - Math.floor(x)
  const yf = y - Math.floor(y)
  const u = fade(xf)
  const v = fade(yf)
  const aa = perm[perm[xi] + yi]
  const ab = perm[perm[xi] + yi + 1]
  const ba = perm[perm[xi + 1] + yi]
  const bb = perm[perm[xi + 1] + yi + 1]
  const x1 = grad(aa, xf, yf) + u * (grad(ba, xf - 1, yf) - grad(aa, xf, yf))
  const x2 = grad(ab, xf, yf - 1) + u * (grad(bb, xf - 1, yf - 1) - grad(ab, xf, yf - 1))
  return x1 + v * (x2 - x1)
}

// Karakoram box for the readout (Hunza–Shigar)
const LAT = [36.95, 35.6]
const LON = [74.2, 76.0]

export default function ContourField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [readout, setReadout] = useState<{ lat: string; lon: string; elev: string } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let cell = 14
    let cols = 0
    let rows = 0
    let field = new Float32Array(0)
    let raf = 0
    let visible = true
    let last = 0
    const t0 = performance.now()
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, strength: 0, target: 0 }
    let color = '45 212 191'

    const readColor = () => {
      color = getComputedStyle(document.documentElement).getPropertyValue('--contour').trim() || color
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cell = w < 640 ? 16 : 13
      cols = Math.ceil(w / cell) + 1
      rows = Math.ceil(h / cell) + 1
      field = new Float32Array(cols * rows)
    }

    const sample = (t: number) => {
      const s = 0.0028
      const drift = t * 0.000035
      const sigma = Math.min(w, h) * 0.16
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * cell
          const y = j * cell
          let v =
            perlin(x * s + drift, y * s - drift * 0.6) * 0.65 +
            perlin(x * s * 2.1 - drift * 1.4, y * s * 2.1 + 13.7) * 0.25 +
            perlin(x * s * 4.3 + 41.2, y * s * 4.3 + drift) * 0.1
          if (mouse.strength > 0.001) {
            const dx = x - mouse.x
            const dy = y - mouse.y
            v += mouse.strength * 0.55 * Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma))
          }
          field[j * cols + i] = v
        }
      }
    }

    const LEVELS = 16
    const draw = (t: number) => {
      sample(t)
      ctx.clearRect(0, 0, w, h)
      ctx.lineJoin = 'round'
      for (let l = 0; l < LEVELS; l++) {
        const iso = -0.55 + (l / (LEVELS - 1)) * 1.2
        const major = l % 4 === 0
        ctx.beginPath()
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const a = field[j * cols + i]
            const b = field[j * cols + i + 1]
            const c = field[(j + 1) * cols + i + 1]
            const d = field[(j + 1) * cols + i]
            const idx = (a > iso ? 8 : 0) | (b > iso ? 4 : 0) | (c > iso ? 2 : 0) | (d > iso ? 1 : 0)
            if (idx === 0 || idx === 15) continue
            const x = i * cell
            const y = j * cell
            const top = () => [x + ((iso - a) / (b - a)) * cell, y]
            const right = () => [x + cell, y + ((iso - b) / (c - b)) * cell]
            const bottom = () => [x + ((iso - d) / (c - d)) * cell, y + cell]
            const left = () => [x, y + ((iso - a) / (d - a)) * cell]
            const seg = (p: number[], q: number[]) => {
              ctx.moveTo(p[0], p[1])
              ctx.lineTo(q[0], q[1])
            }
            switch (idx) {
              case 1: case 14: seg(left(), bottom()); break
              case 2: case 13: seg(bottom(), right()); break
              case 3: case 12: seg(left(), right()); break
              case 4: case 11: seg(top(), right()); break
              case 6: case 9: seg(top(), bottom()); break
              case 7: case 8: seg(left(), top()); break
              case 5: seg(left(), top()); seg(bottom(), right()); break
              case 10: seg(top(), right()); seg(left(), bottom()); break
            }
          }
        }
        const high = l / (LEVELS - 1)
        ctx.strokeStyle = `rgb(${color} / ${major ? 0.38 : 0.13 + high * 0.1})`
        ctx.lineWidth = major ? 1.1 : 0.7
        ctx.stroke()
      }
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (!visible || now - last < 33) return
      last = now
      mouse.x += (mouse.tx - mouse.x) * 0.12
      mouse.y += (mouse.ty - mouse.y) * 0.12
      mouse.strength += (mouse.target - mouse.strength) * 0.06
      draw(now - t0)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (x < 0 || y < 0 || x > r.width || y > r.height) {
        mouse.target = 0
        setReadout(null)
        return
      }
      if (mouse.x < -999) {
        mouse.x = x
        mouse.y = y
      }
      mouse.tx = x
      mouse.ty = y
      mouse.target = 1
      const i = Math.min(cols - 1, Math.max(0, Math.round(x / cell)))
      const j = Math.min(rows - 1, Math.max(0, Math.round(y / cell)))
      const v = field[j * cols + i] ?? 0
      setReadout({
        lat: (LAT[0] + (y / r.height) * (LAT[1] - LAT[0])).toFixed(3),
        lon: (LON[0] + (x / r.width) * (LON[1] - LON[0])).toFixed(3),
        elev: Math.round(2400 + ((v + 0.6) / 1.4) * 5600).toLocaleString('en-US'),
      })
    }

    readColor()
    resize()
    if (reduce) {
      draw(0)
    } else {
      raf = requestAnimationFrame(loop)
      window.addEventListener('pointermove', onMove, { passive: true })
    }

    const ro = new ResizeObserver(() => {
      resize()
      if (reduce) draw(0)
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)
    const mo = new MutationObserver(() => {
      readColor()
      if (reduce) draw(0)
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onScheme = () => {
      readColor()
      if (reduce) draw(0)
    }
    mq.addEventListener('change', onScheme)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      mq.removeEventListener('change', onScheme)
    }
  }, [])

  return (
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className={`pointer-events-none absolute top-20 right-4 hidden rounded-md border border-line bg-paper/80 px-3 py-2 font-mono text-[10.5px] leading-4 text-muted backdrop-blur transition-opacity duration-300 sm:block ${
          readout ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div>
          LAT <span className="text-ink">{readout?.lat ?? '—'}°N</span>
        </div>
        <div>
          LON <span className="text-ink">{readout?.lon ?? '—'}°E</span>
        </div>
        <div>
          ELEV <span className="text-accent">{readout?.elev ?? '—'} m</span>
        </div>
      </div>
    </div>
  )
}
