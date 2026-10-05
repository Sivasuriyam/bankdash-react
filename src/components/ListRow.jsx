import Icon from './Icon'

/** Coloured icon + title/subtitle + optional right-hand slot. */
export default function ListRow({ tone, icon, title, sub, square, muted, children }) {
  return (
    <div className="row">
      <span className={`ico ${square ? 'sq' : ''} c-${tone}`}><Icon name={icon} size={26} /></span>
      <div className="info">
        <b className={muted ? 'mut' : undefined}>{title}</b>
        <small>{sub}</small>
      </div>
      {children}
    </div>
  )
}
