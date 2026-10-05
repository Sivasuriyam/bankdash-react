import { Link } from 'react-router-dom'
import BankCard from '../components/BankCard'
import Section from '../components/Section'
import StatCard from '../components/StatCard'
import ListRow from '../components/ListRow'
import { BarChart } from '../components/Charts'
import Icon from '../components/Icon'
import { money } from '../data'

const LAST = [
  { tone: 'pri', icon: 'swap', name: 'Spotify Subscription', type: 'Shopping', status: 'Pending', amount: -150 },
  { tone: 'vio', icon: 'tools', name: 'Mobile Service', type: 'Service', status: 'Completed', amount: -340 },
  { tone: 'cor', icon: 'user', name: 'Emily Wilson', type: 'Transfer', status: 'Completed', amount: 780 },
]
const INVOICES = [
  { tone: 'pri', icon: 'apple', name: 'Apple Store', when: '5h ago', amount: 450 },
  { tone: 'amb', icon: 'user', name: 'Michael', when: '2 days ago', amount: 160 },
  { tone: 'vio', icon: 'g', name: 'Playstation', when: '5 days ago', amount: 1085 },
  { tone: 'cor', icon: 'user', name: 'William', when: '10 days ago', amount: 90 },
]

export default function Accounts() {
  return (
    <>
      <div className="grid g4">
        <StatCard tone="amb" icon="money" label="My Balance" value="$12,750" />
        <StatCard tone="vio" icon="loan" label="Income" value="$5,600" />
        <StatCard tone="cor" icon="tx" label="Expense" value="$3,460" />
        <StatCard tone="pri" icon="pig" label="Total Saving" value="$7,920" />
      </div>
      <div className="grid gap ga">
        <Section title="Last Transaction">
          <div className="card list">
            {LAST.map((r) => (
              <ListRow key={r.name} tone={r.tone} icon={r.icon} title={r.name} sub="25 Jan 2021" square>
                <span className="mut hm" style={{ width: 90 }}>{r.type}</span>
                <span className="mut hm">1234 ****</span>
                <span className="mut hm" style={{ width: 84, flex: 'none' }}>{r.status}</span>
                <b className={r.amount < 0 ? 'neg' : 'pos'} style={{ fontWeight: 500, textAlign: 'right', flex: 'none' }}>{money(r.amount)}</b>
              </ListRow>
            ))}
          </div>
        </Section>
        <Section title="My Card" action={<Link to="/cards">See All</Link>}>
          <div className="cards"><BankCard variant="t2" /></div>
        </Section>
      </div>
      <div className="grid gap ga">
        <Section title="Debit & Credit Overview">
          <div className="card chart">
            <div className="lg" style={{ justifyContent: 'space-between' }}>
              <span><b style={{ color: 'var(--ink)', fontWeight: 500 }}>$7,560</b> Debited &amp; <b style={{ color: 'var(--ink)', fontWeight: 500 }}>$5,420</b> Credited in this Week</span>
              <span style={{ display: 'flex', gap: 20 }}><span><i style={{ background: 'var(--pri)' }} />Debit</span><span><i style={{ background: 'var(--amb)' }} />Credit</span></span>
            </div>
            <BarChart labels={['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']} colors={['var(--pri)', 'var(--amb)']} max={600} bw={18} l={6} fmt={() => ''}
              series={[[300, 220, 210, 380, 320, 340, 410], [520, 380, 310, 290, 470, 240, 460]]} />
          </div>
        </Section>
        <Section title="Invoices Sent">
          <div className="card list">
            {INVOICES.map((r) => (
              <ListRow key={r.name} tone={r.tone} icon={r.icon} title={r.name} sub={r.when} square muted>
                <span className="mut">${r.amount}</span>
              </ListRow>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
