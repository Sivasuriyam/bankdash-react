import Icon from './Icon'
import { useUI } from './ui'

/** variant: '' (deep teal) | 't2' (bright teal) | 'lt' (white) */
export default function BankCard({ variant = '', balance = '$5,756', holder = 'Eddy Cusuma' }) {
  const { toast } = useUI()
  const select = () => toast('Card ending 1234 selected')
  return (
    <div className={`bc ${variant}`} tabIndex={0} onClick={select} onKeyDown={(e) => e.key === 'Enter' && select()}>
      <div className="top">
        <div><small>Balance</small>{balance}</div>
        <div style={{ color: variant === 'lt' ? 'var(--mute)' : '#fff' }}><Icon name="chart" size={30} /></div>
        <div><small>CARD HOLDER</small>{holder}</div>
        <div style={{ textAlign: 'left' }}><small>VALID THRU</small>12/22</div>
      </div>
      <div className="bot"><span>3778 **** **** 1234</span><span className="mc" /></div>
    </div>
  )
}
