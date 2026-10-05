import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import BankCard from '../components/BankCard'
import Section from '../components/Section'
import ListRow from '../components/ListRow'
import Icon from '../components/Icon'
import { BarChart, LineChart, PieChart } from '../components/Charts'
import { useUI } from '../components/ui'
import { PEOPLE, AVATAR_COLORS, money } from '../data'

const RECENT = [
  { tone: 'amb', icon: 'card', title: 'Deposit from my Card', date: '28 January 2021', amount: -850 },
  { tone: 'vio', icon: 'money', title: 'Deposit Paypal', date: '25 January 2021', amount: 2500 },
  { tone: 'pri', icon: 'user', title: 'Jemi Wilson', date: '21 January 2021', amount: 5400 },
]
const EXPENSES = [
  { name: 'Entertainment', value: 30, color: 'var(--slice)' }, { name: 'Bill Expense', value: 15, color: 'var(--amb)' },
  { name: 'Others', value: 35, color: 'var(--pri)' }, { name: 'Investment', value: 20, color: 'var(--sec)' },
]

export default function Dashboard() {
  const { toast } = useUI()
  const [selected, setSelected] = useState(0)
  const [amount, setAmount] = useState('525.50')
  const strip = useRef()

  const send = () => {
    const v = parseFloat(amount)
    toast(v > 0 ? `Sent $${v.toFixed(2)} to ${PEOPLE[selected].name}` : 'Enter an amount greater than 0')
  }

  return (
    <>
      <div className="grid g3">
        <Section title="My Cards" action={<Link to="/cards">See All</Link>}>
          <div className="cards"><BankCard /><BankCard variant="lt" /></div>
        </Section>
        <Section title="Recent Transaction">
          <div className="card list">
            {RECENT.map((r) => (
              <ListRow key={r.title} tone={r.tone} icon={r.icon} title={r.title} sub={r.date}>
                <b className={r.amount < 0 ? 'neg' : 'pos'} style={{ fontWeight: 500 }}>{money(r.amount)}</b>
              </ListRow>
            ))}
          </div>
        </Section>
      </div>

      <div className="grid g3 gap">
        <Section title="Weekly Activity">
          <div className="card chart">
            <div className="lg"><span><i style={{ background: 'var(--pri)' }} />Deposit</span><span><i style={{ background: 'var(--cor)' }} />Withdraw</span></div>
            <BarChart labels={['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']} colors={['var(--pri)', 'var(--cor)']} max={500}
              series={[[480, 350, 320, 480, 150, 380, 380], [240, 130, 260, 370, 240, 240, 340]]} />
          </div>
        </Section>
        <Section title="Expense Statistics">
          <div className="card"><PieChart data={EXPENSES} explode labels /></div>
        </Section>
      </div>

      <div className="grid gap gb">
        <Section title="Quick Transfer">
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <div className="qt" ref={strip}>
                {PEOPLE.map((p, i) => (
                  <button key={p.name} className={`pp ${i === selected ? 'on' : ''}`} onClick={() => setSelected(i)}>
                    <div className="av" style={{ background: AVATAR_COLORS[i] }}>{p.initial}</div>
                    <b style={{ fontWeight: 500 }}>{p.name}</b><small>{p.role}</small>
                  </button>
                ))}
              </div>
              <button className="rnd" aria-label="Next contacts" onClick={() => strip.current.scrollBy({ left: 200, behavior: 'smooth' })}
                style={{ background: 'var(--card)', boxShadow: '0 4px 14px rgba(var(--glow),.25)' }}><Icon name="chev" size={20} /></button>
            </div>
            <div className="amt">
              <span className="mut" style={{ fontSize: 14 }}>Write Amount</span>
              <div className="f">
                <input inputMode="decimal" value={amount} onChange={(e) => setAmount(e.target.value)} aria-label="Amount" />
                <button className="btn" onClick={send}>Send <Icon name="send" size={18} /></button>
              </div>
            </div>
          </div>
        </Section>
        <Section title="Balance History">
          <div className="card chart">
            <LineChart labels={['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']} color="var(--sec)" max={800} smooth fill
              values={[100, 330, 250, 450, 800, 220, 570, 250, 640, 600]} />
          </div>
        </Section>
      </div>
    </>
  )
}
