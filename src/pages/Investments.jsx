import Section from '../components/Section'
import StatCard from '../components/StatCard'
import Icon from '../components/Icon'
import { LineChart } from '../components/Charts'

const dollars = (v) => '$' + v.toLocaleString()
const YEARS = ['2016', '2017', '2018', '2019', '2020', '2021']
const MY_INVESTMENTS = [
  { tone: 'cor', icon: 'apple', name: 'Apple Store', kind: 'E-commerce, Marketplace', value: '$54,000', ret: '+16%' },
  { tone: 'vio', icon: 'g', name: 'Samsung Mobile', kind: 'E-commerce, Marketplace', value: '$25,300', ret: '-4%' },
  { tone: 'amb', icon: 'chart', name: 'Tesla Motors', kind: 'Electric Vehicles', value: '$8,200', ret: '+25%' },
]
const STOCKS = [['Trivago', 520, 5], ['Canon', 480, 10], ['Uber Food', 350, -3], ['Nokia', 940, 2], ['Tiktok', 670, -12]]

export default function Investments() {
  return (
    <>
      <div className="grid g3e">
        <StatCard tone="pri" icon="money" label="Total Invested Amount" value="$150,000" />
        <StatCard tone="cor" icon="chart" label="Number of Investments" value="1,250" />
        <StatCard tone="vio" icon="swap" label="Rate of Return" value="+5.80%" />
      </div>
      <div className="grid gap gc">
        <Section title="Yearly Total Investment">
          <div className="card chart"><LineChart labels={YEARS} values={[6000, 24000, 16500, 37500, 21500, 30000]} color="var(--amb)" max={40000} dots l={92} fmt={dollars} /></div>
        </Section>
        <Section title="Monthly Revenue">
          <div className="card chart"><LineChart labels={YEARS} values={[11000, 20000, 12500, 33000, 21000, 28500, 24500, 15500, 35000]} color="var(--pri2)" max={40000} smooth l={92} fmt={dollars} /></div>
        </Section>
      </div>
      <div className="grid gap gd">
        <Section title="My Investment">
          {MY_INVESTMENTS.map((r) => (
            <div key={r.name} className="card row" style={{ padding: '14px 18px', marginBottom: 16, flexWrap: 'wrap' }}>
              <span className={`ico sq c-${r.tone}`}><Icon name={r.icon} size={26} /></span>
              <div className="info" style={{ minWidth: 150 }}><b>{r.name}</b><small>{r.kind}</small></div>
              <div style={{ minWidth: 100 }}><b style={{ fontWeight: 500 }}>{r.value}</b><small className="mut" style={{ display: 'block' }}>Investment Value</small></div>
              <div><b className={r.ret[0] === '-' ? 'neg' : 'pos'} style={{ fontWeight: 500 }}>{r.ret}</b><small className="mut" style={{ display: 'block' }}>Return Value</small></div>
            </div>
          ))}
        </Section>
        <Section title="Trending Stock">
          <div className="card"><div className="tw">
            <table style={{ minWidth: 300 }}>
              <thead><tr><th>SL No</th><th>Name</th><th>Price</th><th>Return</th></tr></thead>
              <tbody>
                {STOCKS.map(([name, price, ret], i) => (
                  <tr key={name} style={{ '--i': i }}><td>0{i + 1}.</td><td>{name}</td><td>${price}</td><td className={ret < 0 ? 'neg' : 'pos'}>{ret > 0 ? '+' : ''}{ret}%</td></tr>
                ))}
              </tbody>
            </table>
          </div></div>
        </Section>
      </div>
    </>
  )
}
