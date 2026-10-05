import { useState } from 'react'
import StatCard from '../components/StatCard'
import { useUI } from '../components/ui'
import { LOANS } from '../data'

const fmt = (n) => '$' + n.toLocaleString()

export default function Loans() {
  const { toast, modal } = useUI()
  const [repaid, setRepaid] = useState([])
  const active = (i) => !repaid.includes(i)
  const totals = LOANS.reduce((t, l, i) => ({
    money: t.money + l.money,
    left: t.left + (active(i) ? l.left : 0),
    monthly: t.monthly + (active(i) ? l.monthly : 0),
  }), { money: 0, left: 0, monthly: 0 })

  return (
    <>
      <div className="grid g4">
        <StatCard tone="vio" icon="user" label="Personal Loans" value="$50,000" />
        <StatCard tone="amb" icon="brief" label="Corporate Loans" value="$100,000" />
        <StatCard tone="cor" icon="chart" label="Business Loans" value="$500,000" />
        <StatCard tone="pri" icon="tools" label="Custom Loans" value="Choose Money"
          onClick={() => modal('Custom loan', 'Choose an amount and duration — a loan advisor will contact you.')} />
      </div>
      <h2 className="gap">Active Loans Overview</h2>
      <div className="card"><div className="tw">
        <table>
          <thead><tr><th>SL No</th><th>Loan Money</th><th>Left to repay</th><th>Duration</th><th>Interest rate</th><th>Installment</th><th>Repay</th></tr></thead>
          <tbody>
            {LOANS.map((l, i) => (
              <tr key={i} style={{ '--i': i }}>
                <td>0{i + 1}.</td><td>{fmt(l.money)}</td><td>{fmt(active(i) ? l.left : 0)}</td>
                <td>{l.months} Months</td><td>{l.rate}%</td><td>{fmt(l.monthly)} / month</td>
                <td><button className={`ob ${active(i) ? '' : 'done'}`} onClick={() => { setRepaid([...repaid, i]); toast('Loan repaid') }}>{active(i) ? 'Repay' : 'Repaid'}</button></td>
              </tr>
            ))}
            <tr style={{ color: 'var(--cor)' }}>
              <td>Total</td><td>{fmt(totals.money)}</td><td>{fmt(totals.left)}</td><td /><td /><td>{fmt(totals.monthly)} / month</td><td />
            </tr>
          </tbody>
        </table>
      </div></div>
    </>
  )
}
