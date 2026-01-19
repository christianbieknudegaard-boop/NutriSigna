import React from 'react'

export function Input({label,helper,error,...props}:any){
  return (
    <label className="block">
      {label && <div className="text-sm mb-1">{label}</div>}
      <input className="w-full px-3 py-2 rounded-md border" style={{borderColor:'var(--border)'}} {...props} />
      {helper && <div className="text-xs text-[var(--muted)] mt-1">{helper}</div>}
      {error && <div className="text-xs text-[var(--bad)] mt-1">{error}</div>}
    </label>
  )
}

export function TextArea(props:any){
  return <textarea className="w-full px-3 py-2 rounded-md border" style={{borderColor:'var(--border)'}} {...props} />
}

export default Input
