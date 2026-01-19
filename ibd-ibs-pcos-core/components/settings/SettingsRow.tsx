import React from 'react'

export default function SettingsRow({label,value,children, onClick}:{label:string,value?:string,children?:React.ReactNode,onClick?:()=>void}){
  return (
    <div onClick={onClick} className="flex items-center justify-between p-4 rounded-lg hover:bg-[var(--card)]">
      <div>
        <div className="font-medium">{label}</div>
        {value && <div className="text-sm text-[var(--muted)]">{value}</div>}
      </div>
      <div>{children || <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}</div>
    </div>
  )
}
