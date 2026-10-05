import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const UIContext = createContext(null)
export const useUI = () => useContext(UIContext)

/** App-wide toast, modal dialog and header search text. */
export function UIProvider({ children }) {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const [dialog, setDialog] = useState(null)
  const [query, setQuery] = useState('')
  const timer = useRef()
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  const [palette, setPaletteState] = useState(() => document.documentElement.dataset.palette || 'amethyst')
  const setPalette = useCallback((id) => {
    const root = document.documentElement
    root.classList.add('theme-anim')
    root.dataset.palette = id
    setPaletteState(id)
    try { localStorage.setItem('bd-palette', id) } catch { /* storage unavailable */ }
    setTimeout(() => root.classList.remove('theme-anim'), 500)
  }, [])

  const toggleTheme = useCallback(() => {
    const root = document.documentElement
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
    root.classList.add('theme-anim')
    root.dataset.theme = next
    setTheme(next)
    try { localStorage.setItem('bd-theme', next) } catch { /* storage unavailable */ }
    setTimeout(() => root.classList.remove('theme-anim'), 500)
  }, [])

  const toast = useCallback((text) => {
    setMessage(text)
    setVisible(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setVisible(false), 2400)
  }, [])
  const modal = useCallback((title, body) => setDialog({ title, body }), [])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setDialog(null)
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])

  return (
    <UIContext.Provider value={{ toast, modal, query, setQuery, theme, toggleTheme, palette, setPalette }}>
      {children}
      <div className={`modal ${dialog ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && setDialog(null)}>
        <div className="card" role="dialog" aria-modal="true">
          <h2>{dialog?.title}</h2>
          <p className="mut" style={{ marginBottom: 22 }}>{dialog?.body}</p>
          <button className="btn" onClick={() => setDialog(null)}>Close</button>
        </div>
      </div>
      <div className={`toast ${visible ? 'show' : ''}`} role="status">{message}</div>
    </UIContext.Provider>
  )
}
