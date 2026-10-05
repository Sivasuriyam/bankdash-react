export default function Section({ title, action, className, children }) {
  return (
    <section className={className}>
      <h2>{title}{action}</h2>
      {children}
    </section>
  )
}
