import { useId, useLayoutEffect, useRef, useState } from 'react'

/** Keeps axis text ~12px on screen however much the SVG is scaled down. */
function useFontSize(ref, viewWidth) {
  const [fs, setFs] = useState(12)
  useLayoutEffect(() => {
    const el = ref.current
    const update = () => {
      const k = el.clientWidth / viewWidth
      if (k) setFs(Math.min(20, Math.max(11, 12 / k)))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, viewWidth])
  return fs
}

function Axis({ max, ticks, W, H, l, t, b, fmt, dash, fs }) {
  return Array.from({ length: ticks + 1 }, (_, i) => {
    const y = t + (H - t - b) * (1 - i / ticks)
    return (
      <g key={i}>
        <line x1={l} x2={W} y1={y} y2={y} stroke="var(--line)" strokeDasharray={dash} />
        <text className="mut2" x={l - 10} y={y + 4} textAnchor="end" style={{ fontSize: fs }}>{fmt(max * i / ticks)}</text>
      </g>
    )
  })
}
const round = (v) => Math.round(v)

export function BarChart({ labels, series, colors, max, bw = 14, ticks = 5, l = 56, fmt = round }) {
  const ref = useRef(), W = 640, H = 300, t = 10, b = 30
  const fs = useFontSize(ref, W)
  const gw = (W - l) / labels.length
  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="bars">
      <Axis {...{ max, ticks, W, H, l, t, b, fmt, fs }} />
      {labels.map((lb, i) => {
        const cx = l + gw * i + gw / 2
        return (
          <g key={lb}>
            <text className="mut2" x={cx} y={H - 8} textAnchor="middle" style={{ fontSize: fs }}>{lb}</text>
            {series.map((se, k) => {
              const h = (H - t - b) * se[i] / max
              const x = cx + (k - (series.length - 1) / 2) * (bw + 6) - bw / 2
              return <rect key={k} x={x} y={H - b - h} width={bw} height={h} rx={bw / 2} fill={colors[k]} style={{ animationDelay: `${(i * series.length + k) * 45}ms` }}><title>{`${lb}: ${se[i]}`}</title></rect>
            })}
          </g>
        )
      })}
    </svg>
  )
}

function smoothPath(pts) {
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2
    d += `C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`
  }
  return d
}

export function LineChart({ labels, values, color, max, smooth, fill, dots, l = 54, ticks = 4, fmt = round }) {
  const ref = useRef(), gid = 'g' + useId().replace(/:/g, ''), W = 640, H = 300, t = 10, b = 30
  const fs = useFontSize(ref, W)
  const n = values.length, x = (i, len) => l + (W - l - 16) * i / (len - 1)
  const pts = values.map((v, i) => [x(i, n), H - b - (H - t - b) * v / max])
  const d = smooth ? smoothPath(pts) : 'M' + pts.map((p) => p.join(',')).join('L')
  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`}>
      <Axis {...{ max, ticks, W, H, l, t, b, fmt, fs }} dash="4" />
      {labels.map((lb, i) => <text key={lb} className="mut2" x={x(i, labels.length)} y={H - 8} textAnchor="middle" style={{ fontSize: fs }}>{lb}</text>)}
      {fill && (
        <>
          <defs><linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity=".28" /><stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient></defs>
          <path className="area-in" d={`${d}L${pts[n - 1][0]},${H - b}L${pts[0][0]},${H - b}Z`} fill={`url(#${gid})`} />
        </>
      )}
      <path className="draw" pathLength="1" d={d} fill="none" stroke={color} strokeWidth="3" />
      {dots && pts.map((p, i) => <circle key={i} className="dot-in" style={{ animationDelay: `${700 + i * 90}ms` }} cx={p[0]} cy={p[1]} r="5" fill="var(--card)" stroke={color} strokeWidth="3"><title>{values[i]}</title></circle>)}
    </svg>
  )
}

/** data: [{name, value, color}] · explode: separated labelled slices · donut: inner radius · ring: radius step */
export function PieChart({ data, explode, labels, donut = 0, ring = 0, maxWidth = 340 }) {
  const R = 130, cx = 150, cy = 150, total = data.reduce((s, d) => s + d.value, 0)
  let a = -Math.PI / 2
  return (
    <svg viewBox="0 0 300 300" style={{ maxWidth, margin: '0 auto' }}>
      {data.map((d, i) => {
        const ang = d.value / total * Math.PI * 2, mid = a + ang / 2, ex = explode ? 10 : 0
        const ox = Math.cos(mid) * ex, oy = Math.sin(mid) * ex, r = R - (i % 2) * ring
        const p1 = [cx + ox + r * Math.cos(a), cy + oy + r * Math.sin(a)]
        const p2 = [cx + ox + r * Math.cos(a + ang), cy + oy + r * Math.sin(a + ang)]
        const tx = cx + ox + r * 0.62 * Math.cos(mid), ty = cy + oy + r * 0.62 * Math.sin(mid)
        a += ang
        return (
          <g key={d.name}>
            <path className="slice" style={{ animationDelay: `${i * 90}ms` }} d={`M${cx + ox},${cy + oy}L${p1}A${r},${r} 0 ${ang > Math.PI ? 1 : 0} 1 ${p2}Z`} fill={d.color}
              stroke="var(--card)" strokeWidth={explode ? 0 : 3}><title>{`${d.name}: ${d.value}%`}</title></path>
            {labels && (
              <text x={tx} y={ty} fill="#fff" textAnchor="middle" fontSize="14" fontWeight="700">
                {d.value}%<tspan x={tx} dy="16" fontSize="11">{d.name}</tspan>
              </text>
            )}
          </g>
        )
      })}
      {donut > 0 && <circle cx={cx} cy={cy} r={donut} fill="var(--card)" />}
    </svg>
  )
}
