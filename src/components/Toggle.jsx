export default function Toggle({ on, onChange, children }) {
  const flip = () => onChange(!on)
  return (
    <div className={`tg ${on ? 'on' : ''}`} role="switch" aria-checked={on} tabIndex={0} onClick={flip}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), flip())}>
      <span className="sw" />{children}
    </div>
  )
}
