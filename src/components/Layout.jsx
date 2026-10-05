import { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Icon from './Icon'
import { useUI } from './ui'
import { NAV } from '../data'

const NOTIFICATIONS = [
  ['Payment received', '+$5,400 from Jemi Wilson'],
  ['Card alert', 'Spotify charged $150'],
  ['Loan reminder', 'Installment due in 3 days'],
]

export default function Layout({ children }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { query, setQuery, theme, toggleTheme } = useUI()
  const [menu, setMenu] = useState(false)
  const [pop, setPop] = useState(false)
  const [unread, setUnread] = useState(true)
  const current = NAV.find((n) => pathname.startsWith('/' + n.path)) || NAV[0]

  useEffect(() => {
    setMenu(false)
    window.scrollTo(0, 0)
    document.title = 'BankDash · ' + current.title
  }, [pathname, current.title])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenu(false)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!pop) return
    const close = (e) => !e.target.closest('.bellwrap') && setPop(false)
    addEventListener('click', close)
    return () => removeEventListener('click', close)
  }, [pop])

  const onSearch = (v) => {
    setQuery(v)
    if (v.trim() && pathname !== '/transactions') navigate('/transactions')
  }
  const searchBox = (cls) => (
    <label className={`search ${cls}`} style={cls ? undefined : { margin: 0 }}>
      <Icon name="search" size={20} />
      <input value={query} onChange={(e) => onSearch(e.target.value)} placeholder="Search for something" aria-label="Search transactions" />
    </label>
  )

  return (
    <>
      <aside className={menu ? 'open' : ''}>
        <div className="logo"><Icon name="card" size={34} />BankDash.</div>
        <nav>
          {NAV.map((n) => (
            <NavLink key={n.path} to={'/' + n.path} className={({ isActive }) => (isActive ? 'on' : '')}>
              <Icon name={n.icon} />{n.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className={`scrim ${menu ? 'open' : ''}`} onClick={() => setMenu(false)} />
      <main>
        <header>
          <button className="rnd burger" onClick={() => setMenu(true)} aria-label="Open menu"><Icon name="menu" /></button>
          <h1>{current.title}</h1>
          {searchBox('')}
          <button className="rnd theme" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={theme === 'dark' ? 'Light mode' : 'Night mode'}>
            <Icon key={theme} name={theme === 'dark' ? 'sun' : 'moon'} size={22} />
          </button>
          <button className="rnd" onClick={() => navigate('/settings')} aria-label="Settings"><Icon name="gear" size={22} /></button>
          <div className="bellwrap" style={{ position: 'relative' }}>
            <button className="rnd b" aria-label="Notifications" onClick={() => { setPop(!pop); setUnread(false) }}>
              <Icon name="bell" size={22} />{unread && <span className="dot" />}
            </button>
            <div className={`pop ${pop ? 'open' : ''}`}>
              {NOTIFICATIONS.map(([t, s]) => <p key={t}><b>{t}</b><small>{s}</small></p>)}
            </div>
          </div>
          <div className="av" title="Charlene Reed">CR</div>
        </header>
        {searchBox('msearch')}
        <div className="wrap"><div className="page" key={pathname}>{children}</div></div>
      </main>
    </>
  )
}
