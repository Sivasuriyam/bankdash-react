import Icon from '../components/Icon'

// The design kit has no screen for this menu item, so this is a placeholder.
export default function Privileges() {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
      <span className="ico c-vio" style={{ margin: '0 auto 18px', width: 72, height: 72 }}><Icon name="bulb" size={34} /></span>
      <h2 style={{ justifyContent: 'center', marginBottom: 8 }}>My Privileges</h2>
      <p className="mut">This page is not part of the supplied design kit, so it has no content yet.</p>
    </div>
  )
}
