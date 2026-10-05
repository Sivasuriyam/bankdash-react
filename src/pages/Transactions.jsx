import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import BankCard from '../components/BankCard'
import Section from '../components/Section'
import Icon from '../components/Icon'
import { useUI } from '../components/ui'
import { TRANSACTIONS, money } from '../data'

const TABS = ['All', 'Income', 'Expense']
const MONTHS = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan']
const BAR_HEIGHTS = [62, 90, 70, 40, 88, 66]
const PER_PAGE = 5

export default function Transactions() {
  const { toast, query } = useUI()
  const [tab, setTab] = useState('All')
  const [page, setPage] = useState(1)
  const [month, setMonth] = useState(4)

  useEffect(() => setPage(1), [tab, query])

  const list = useMemo(() => TRANSACTIONS.filter((t) =>
    (tab === 'All' || (tab === 'Income' ? t.amount > 0 : t.amount < 0)) &&
    t.desc.toLowerCase().includes(query.trim().toLowerCase())), [tab, query])
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const current = Math.min(page, pages)
  const rows = list.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  return (
    <>
      <div className="grid ga">
        <Section title="My Cards" action={<Link to="/cards">+ Add Card</Link>}>
          <div className="cards"><BankCard /><BankCard variant="lt" /></div>
        </Section>
        <Section title="My Expense">
          <div className="card" style={{ padding: '20px 14px 12px', height: 'calc(100% - 50px)', overflow: 'hidden' }}>
            <div className="exb" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 170, gap: 8 }}>
              {MONTHS.map((m, i) => (
                <button key={m} onClick={() => setMonth(i)} style={{ flex: 1, textAlign: 'center' }}>
                  <div className="mut" style={{ fontWeight: 600, color: 'var(--ink)', height: 18 }}>{i === month ? '$12,500' : ''}</div>
                  <div style={{ height: BAR_HEIGHTS[i], borderRadius: 12, background: i === month ? 'var(--pri2)' : 'var(--soft)', margin: `${140 - BAR_HEIGHTS[i]}px 4px 6px`, animationDelay: `${i * 70}ms` }} />
                  <small className="mut">{m}</small>
                </button>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <h2 className="gap">Recent Transactions</h2>
      <div className="tabs">
        {TABS.map((t) => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t === 'All' ? 'All Transactions' : t}</button>)}
      </div>
      <div className="card">
        <div className="tw" id="txt">
          <table>
            <thead><tr><th>Description</th><th>Transaction ID</th><th>Type</th><th>Card</th><th>Date</th><th>Amount</th><th>Receipt</th></tr></thead>
            <tbody>
              {rows.map((t, i) => (
                <tr key={t.id} style={{ '--i': i }}>
                  <td>
                    <span className="row" style={{ gap: 14 }}>
                      <span style={{ width: 30, height: 30, border: '1px solid var(--mute)', borderRadius: '50%', display: 'grid', placeItems: 'center', color: 'var(--mute)' }}>
                        <Icon name={t.amount < 0 ? 'up' : 'down'} size={16} />
                      </span>
                      <span>{t.desc}<small className="dm mut">{t.date}</small></span>
                    </span>
                  </td>
                  <td>{t.id}</td><td>{t.type}</td><td>{t.card}</td><td>{t.date}</td>
                  <td className={t.amount < 0 ? 'neg' : 'pos'}>{money(t.amount)}</td>
                  <td><button className="ob pri" onClick={() => toast(`Receipt ${t.id} downloaded`)}>Download</button></td>
                </tr>
              ))}
              {!rows.length && <tr><td colSpan="7" className="mut">No transactions match. Clear the search or switch tabs.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <div className="pg">
        <button className="w" disabled={current === 1} onClick={() => setPage(current - 1)}>‹ Previous</button>
        {Array.from({ length: pages }, (_, i) => <button key={i} className={current === i + 1 ? 'on' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>)}
        <button className="w" disabled={current === pages} onClick={() => setPage(current + 1)}>Next ›</button>
      </div>
    </>
  )
}
