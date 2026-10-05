import { ICONS } from '../icons'

export default function Icon({ name, size }) {
  return (
    <svg className="ic" viewBox="0 0 24 24" style={size ? { width: size, height: size } : undefined}
      aria-hidden="true" dangerouslySetInnerHTML={{ __html: ICONS[name] }} />
  )
}
