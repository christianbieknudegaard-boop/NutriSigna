import React from 'react'

export default function Chip({children, tone='default'}:{children:React.ReactNode,tone?:string}){
  const bg = tone==='good'? 'var(--good)' : tone==='warn'? 'var(--warn)' : tone==='bad'? 'var(--bad)' : 'transparent'
  const color = tone==='default'? 'var(--muted)' : '#fff'
  return <span className="inline-flex items-center px-3 py-1 rounded-full text-sm" style={{background:bg,color:color}}>{children}</span>
}
