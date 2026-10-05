import { useState } from 'react'
import Field from '../components/Field'
import Toggle from '../components/Toggle'
import Icon from '../components/Icon'
import { useUI } from '../components/ui'
import { PALETTES } from '../data'

const TABS = [['profile', 'Edit Profile'], ['pref', 'Preferences'], ['sec', 'Security']]
const NOTIFY = ['I send or receive digital currency', 'I receive merchant order', 'There are recommendation for my account']

export default function Settings() {
  const { toast, palette, setPalette } = useUI()
  const [tab, setTab] = useState('profile')
  const [notify, setNotify] = useState([true, false, true])
  const [twoFactor, setTwoFactor] = useState(true)
  const [pw, setPw] = useState({ current: '', next: '' })
  const save = <div style={{ textAlign: 'right', marginTop: 28 }}><button className="btn" onClick={() => toast('Changes saved')}>Save</button></div>

  const savePassword = () => {
    if (!pw.current || pw.next.length < 8) return toast('Enter your current password and a new one with 8+ characters')
    setPw({ current: '', next: '' })
    toast('Password updated')
  }

  return (
    <div className="card">
      <div className="tabs">
        {TABS.map(([k, label]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{label}</button>)}
      </div>

      {tab === 'profile' && (
        <>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', width: 118, height: 118, flex: 'none' }}>
              <div className="av" style={{ width: 118, height: 118, fontSize: 36 }}>CR</div>
              <button className="pen" aria-label="Edit photo" onClick={() => toast('Photo upload is not available in this demo')}><Icon name="pen" size={14} /></button>
            </div>
            <div className="fg" style={{ flex: 1, minWidth: 260 }}>
              <Field label="Your Name" defaultValue="Charlene Reed" />
              <Field label="User Name" defaultValue="Charlene Reed" />
              <Field label="Email" type="email" defaultValue="charlenereed@gmail.com" />
              <Field label="Password" type="password" defaultValue="**********" />
              <Field label="Date of Birth" type="date" defaultValue="1990-01-25" />
              <Field label="Present Address" defaultValue="San Jose, California, USA" />
              <Field label="Permanent Address" defaultValue="San Jose, California, USA" />
              <Field label="City" defaultValue="San Jose" />
              <Field label="Postal Code" defaultValue="45962" />
              <Field label="Country" defaultValue="USA" />
            </div>
          </div>
          {save}
        </>
      )}

      {tab === 'pref' && (
        <>
          <div className="fg">
            <Field label="Currency" as="select"><option>USD</option><option>EUR</option><option>INR</option><option>GBP</option></Field>
            <Field label="Time Zone" as="select"><option>(GMT-12:00) International Date Line West</option><option>(GMT+00:00) London</option><option>(GMT+05:30) India Standard Time</option></Field>
          </div>
          <h3 style={{ fontWeight: 500, margin: '26px 0 6px', fontSize: 16 }}>Color Theme</h3>
          <div className="pal" role="radiogroup" aria-label="Color theme">
            {PALETTES.map((p) => (
              <button key={p.id} role="radio" aria-checked={palette === p.id} className={`palbtn ${palette === p.id ? 'on' : ''}`} onClick={() => setPalette(p.id)}>
                <span className="sw3">{p.swatch.map((c) => <i key={c} style={{ background: c }} />)}</span>{p.label}
              </button>
            ))}
          </div>
          <h3 style={{ fontWeight: 500, margin: '26px 0 6px', fontSize: 16 }}>Notification</h3>
          {NOTIFY.map((label, i) => (
            <Toggle key={label} on={notify[i]} onChange={(v) => setNotify(notify.map((n, j) => (j === i ? v : n)))}>{label}</Toggle>
          ))}
          {save}
        </>
      )}

      {tab === 'sec' && (
        <>
          <h3 style={{ fontWeight: 500, fontSize: 16 }}>Two-factor Authentication</h3>
          <Toggle on={twoFactor} onChange={setTwoFactor}>Enable or disable two factor authentication</Toggle>
          <h3 style={{ fontWeight: 500, fontSize: 16, margin: '26px 0 12px' }}>Change Password</h3>
          <div style={{ maxWidth: 460, display: 'grid', gap: 18 }}>
            <Field label="Current Password" type="password" placeholder="**********" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
            <Field label="New Password" type="password" placeholder="**********" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
          </div>
          <div style={{ textAlign: 'right', marginTop: 26 }}><button className="btn" onClick={savePassword}>Save</button></div>
        </>
      )}
    </div>
  )
}
