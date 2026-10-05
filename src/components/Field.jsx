import { useId } from 'react'

export default function Field({ label, as: Tag = 'input', children, ...props }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <Tag id={id} className="in" {...props}>{children}</Tag>
    </div>
  )
}
