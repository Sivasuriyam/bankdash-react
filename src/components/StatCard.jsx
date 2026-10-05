import Icon from './Icon'
import CountUp from './CountUp'

export default function StatCard({ tone, icon, label, value, onClick, big }) {
  const Tag = onClick ? 'button' : 'div'
  return (
    <Tag className="card stat row" onClick={onClick} style={onClick ? { textAlign: 'left' } : undefined}>
      <span className={`ico c-${tone}`} style={big ? { width: 64, height: 64 } : undefined}><Icon name={icon} size={big ? 30 : 28} /></span>
      <div>
        <small>{label}</small>
        <b style={big ? { fontSize: 19 } : undefined}><CountUp value={value} /></b>
      </div>
    </Tag>
  )
}
