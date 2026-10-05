import { useState } from 'react'
import BankCard from '../components/BankCard'
import Section from '../components/Section'
import Field from '../components/Field'
import Icon from '../components/Icon'
import { PieChart } from '../components/Charts'
import { useUI } from '../components/ui'
import { CARD_LIST } from '../data'

const BANKS = [
  { name: 'DBL Bank', value: 30, color: 'var(--sky)' }, { name: 'BRC Bank', value: 25, color: 'var(--cor)' },
  { name: 'MCP Bank', value: 25, color: 'var(--amb)' }, { name: 'ABM Bank', value: 20, color: 'var(--pri2)' },
]
const LEGEND = ['DBL Bank', 'BRC Bank', 'ABM Bank', 'MCP Bank'].map((n) => BANKS.find((b) => b.name === n))
const SETTINGS = [
  { tone: 'amb', icon: 'block', title: 'Block Card', sub: 'Instantly block your card' },
  { tone: 'vio', icon: 'lock', title: 'Change Pin Code', sub: 'Choose another pin code' },
  { tone: 'cor', icon: 'g', title: 'Add to Google Pay', sub: 'Withdraw without any card' },
  { tone: 'pri', icon: 'apple', title: 'Add to Apple Pay', sub: 'Withdraw without any card' },
  { tone: 'pri', icon: 'apple', title: 'Add to Apple Store', sub: 'Withdraw without any card' },
]

export default function CreditCards() {
  const { toast, modal } = useUI()
  const [cards, setCards] = useState(CARD_LIST)
  const [form, setForm] = useState({ type: 'Classic', name: '', number: '', expiry: '2025-01-25' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const setNumber = (e) => setForm({ ...form, number: e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim() })

  const add = () => {
    const digits = form.number.replace(/\D/g, '')
    if (!form.name.trim() || digits.length < 4) return toast('Enter a name and at least the last 4 digits of the card number')
    setCards([{ tone: 'pri', type: form.type || 'Classic', bank: 'New Bank', number: '**** **** ' + digits.slice(-4), holder: form.name.trim() }, ...cards])
    setForm({ ...form, name: '', number: '' })
    toast('Card added')
  }

  return (
    <>
      <h2>My Cards</h2>
      <div className="cards" style={{ marginBottom: 30 }}><BankCard variant="t2" /><BankCard /><BankCard variant="lt" /></div>

      <div className="grid ge">
        <Section title="Card Expense Statistics">
          <div className="card">
            <PieChart data={BANKS} donut={45} ring={12} maxWidth={240} />
            <div className="mut" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 10 }}>
              {LEGEND.map((b) => <span key={b.name}><i style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: b.color, marginRight: 10 }} />{b.name}</span>)}
            </div>
          </div>
        </Section>
        <Section title="Card List">
          {cards.map((c) => (
            <div key={c.number + c.holder} className="card row" style={{ padding: '14px 20px', marginBottom: 16, flexWrap: 'wrap', gap: '12px 22px' }}>
              <span className={`ico sq c-${c.tone}`} style={{ width: 48, height: 48 }}><Icon name="card" size={24} /></span>
              {[['Card Type', c.type], ['Bank', c.bank], ['Card Number', c.number], ['Name on Card', c.holder]].map(([k, v]) => (
                <div key={k} style={{ flex: 1, minWidth: 100 }}><b style={{ fontWeight: 500 }}>{k}</b><small className="mut" style={{ display: 'block' }}>{v}</small></div>
              ))}
              <button style={{ color: 'var(--pri)', fontWeight: 500 }} onClick={() => modal('Card details', `${c.bank} · ${c.number} · ${c.holder}`)}>View Details</button>
            </div>
          ))}
        </Section>
      </div>

      <div className="grid gap ga">
        <Section title="Add New Card">
          <div className="card">
            <p className="mut" style={{ marginBottom: 22, lineHeight: 1.7 }}>Credit Card generally means a plastic card issued by Scheduled Commercial Banks assigned to a Cardholder, with a credit limit, that can be used to purchase goods and services on credit or obtain cash advances.</p>
            <div className="fg">
              <Field label="Card Type" value={form.type} onChange={set('type')} />
              <Field label="Name On Card" placeholder="My Cards" value={form.name} onChange={set('name')} />
              <Field label="Card Number" placeholder="**** **** **** ****" inputMode="numeric" value={form.number} onChange={setNumber} />
              <Field label="Expiration Date" type="date" value={form.expiry} onChange={set('expiry')} />
            </div>
            <button className="btn" style={{ marginTop: 26 }} onClick={add}>Add Card</button>
          </div>
        </Section>
        <Section title="Card Setting">
          <div className="card list">
            {SETTINGS.map((s) => (
              <button key={s.title} className="row" style={{ width: '100%', textAlign: 'left' }} onClick={() => toast(`${s.title} — done`)}>
                <span className={`ico sq c-${s.tone}`} style={{ width: 50, height: 50 }}><Icon name={s.icon} size={24} /></span>
                <div className="info"><b>{s.title}</b><small>{s.sub}</small></div>
              </button>
            ))}
          </div>
        </Section>
      </div>
    </>
  )
}
