export const money = (n) => (n < 0 ? '-' : '+') + '$' + Math.abs(n).toLocaleString()

export const NAV = [
  { path: 'dashboard', label: 'Dashboard', title: 'Overview', icon: 'home' },
  { path: 'transactions', label: 'Transactions', title: 'Transactions', icon: 'tx' },
  { path: 'accounts', label: 'Accounts', title: 'Accounts', icon: 'user' },
  { path: 'investments', label: 'Investments', title: 'Investments', icon: 'inv' },
  { path: 'cards', label: 'Credit Cards', title: 'Credit Cards', icon: 'card' },
  { path: 'loans', label: 'Loans', title: 'Loans', icon: 'loan' },
  { path: 'services', label: 'Services', title: 'Services', icon: 'tools' },
  { path: 'privileges', label: 'My Privileges', title: 'My Privileges', icon: 'bulb' },
  { path: 'settings', label: 'Setting', title: 'Setting', icon: 'gear' },
]

export const PALETTES = [
  { id: 'amethyst', label: 'Amethyst', swatch: ['#6D28D9', '#8B5CF6', '#0D9488'] },
  { id: 'teal', label: 'Teal', swatch: ['#0F766E', '#14B8A6', '#7C3AED'] },
  { id: 'ember', label: 'Ember', swatch: ['#C2410C', '#FB923C', '#0F766E'] },
  { id: 'slate', label: 'Slate', swatch: ['#334155', '#64748B', '#7C3AED'] },
]

export const PEOPLE = [
  { name: 'Livia Bator', role: 'CEO', initial: 'L' },
  { name: 'Randy Press', role: 'Director', initial: 'R' },
  { name: 'Workman', role: 'Designer', initial: 'W' },
  { name: 'Ana Cruz', role: 'Manager', initial: 'A' },
  { name: 'Tom Lee', role: 'Analyst', initial: 'T' },
]
export const AVATAR_COLORS = ['#6D28D9', '#0D9488', '#D97706', '#E11D48', '#0284C7']

const BASE = [
  ['Spotify Subscription', 'Shopping', -2500], ['Freepik Sales', 'Transfer', 750],
  ['Mobile Service', 'Service', -150], ['Wilson', 'Transfer', -1050], ['Emilly', 'Transfer', 840],
]
const DATES = ['28 Jan, 12.30 AM', '25 Jan, 10.40 PM', '20 Jan, 10.40 PM', '15 Jan, 03.29 PM', '14 Jan, 10.40 PM']
export const TRANSACTIONS = Array.from({ length: 20 }, (_, i) => {
  const [desc, type, amount] = BASE[i % 5]
  const date = DATES[i % 5].replace(/^\d+/, (d) => Math.max(1, +d - Math.floor(i / 5) * 3))
  return { desc, type, amount, date, id: '#' + (12548796 + i * 7), card: '1234 ****' }
})

// [loan money, left to repay, duration (months), interest %, installment / month]
export const LOANS = [
  [100000, 40500, 8, 12, 2000], [500000, 250000, 36, 10, 8000], [900000, 40500, 12, 12, 5000],
  [50000, 40500, 25, 5, 2000], [50000, 40500, 5, 16, 10000], [80000, 25500, 14, 8, 2000],
  [12000, 5500, 9, 13, 500], [160000, 100800, 3, 12, 900],
].map(([money, left, months, rate, monthly]) => ({ money, left, months, rate, monthly }))

export const CARD_LIST = [
  { tone: 'vio', type: 'Secondary', bank: 'DBL Bank', number: '**** **** 5600', holder: 'William' },
  { tone: 'cor', type: 'Secondary', bank: 'BRC Bank', number: '**** **** 4300', holder: 'Michel' },
  { tone: 'amb', type: 'Secondary', bank: 'ABM Bank', number: '**** **** 7560', holder: 'Edward' },
]
