import StatCard from '../components/StatCard'
import Icon from '../components/Icon'
import { useUI } from '../components/ui'

const HIGHLIGHTS = [
  { tone: 'vio', icon: 'shield', label: 'Unlimited protection', value: 'Life Insurance' },
  { tone: 'amb', icon: 'bag', label: 'Buy. Think. Grow.', value: 'Shopping' },
  { tone: 'pri', icon: 'shield', label: 'We are your allies', value: 'Safety' },
]
const SERVICES = [
  { tone: 'cor', icon: 'loan', name: 'Business loans' }, { tone: 'amb', icon: 'brief', name: 'Checking accounts' },
  { tone: 'cor', icon: 'chart', name: 'Savings accounts' }, { tone: 'vio', icon: 'user', name: 'Debit and credit cards' },
  { tone: 'pri', icon: 'shield', name: 'Life Insurance' }, { tone: 'cor', icon: 'loan', name: 'Business loans' },
]

export default function Services() {
  const { modal } = useUI()
  return (
    <>
      <div className="grid g3e">
        {HIGHLIGHTS.map((h) => (
          <div key={h.value} className="card stat row">
            <span className={`ico c-${h.tone}`} style={{ width: 64, height: 64 }}><Icon name={h.icon} size={30} /></span>
            <div><b style={{ fontSize: 19 }}>{h.value}</b><small>{h.label}</small></div>
          </div>
        ))}
      </div>
      <h2 className="gap">Bank Services List</h2>
      {SERVICES.map((s, i) => (
        <div key={i} className="svc">
          <div className="row">
            <span className={`ico sq c-${s.tone}`} style={{ width: 52, height: 52 }}><Icon name={s.icon} size={24} /></span>
            <div className="info"><b>{s.name}</b><small>It is a long established</small></div>
          </div>
          {[1, 2, 3].map((n) => (
            <div key={n} className={n === 3 ? 'c4' : ''}><b style={{ fontWeight: 500, display: 'block' }}>Lorem Ipsum</b><small className="mut">Many publishing</small></div>
          ))}
          <button className="ob" onClick={() => modal(s.name, 'It is a long established service. Our team can walk you through fees, limits and eligibility.')}>View Details</button>
        </div>
      ))}
    </>
  )
}
