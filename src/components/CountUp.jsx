import { useEffect, useState } from 'react'

const parse = (v) => {
  const m = /^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/.exec(v)
  return m ? { pre: m[1], num: parseFloat(m[2].replace(/,/g, '')), dec: (m[2].split('.')[1] || '').length, post: m[3] } : null
}

/** Animates "$12,750", "1,250" or "+5.80%" from 0; other text is shown as is. */
export default function CountUp({ value, duration = 900 }) {
  const p = typeof value === 'string' ? parse(value) : null
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!p) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(p.num)
    let raf, t0
    const step = (t) => {
      t0 ??= t
      const k = Math.min(1, (t - t0) / duration)
      setN(p.num * (1 - Math.pow(1 - k, 3)))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps
  if (!p) return value
  return p.pre + n.toLocaleString(undefined, { minimumFractionDigits: p.dec, maximumFractionDigits: p.dec }) + p.post
}
