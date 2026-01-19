import React from 'react'

export default function StatTile({label,value,trend}:{label:string,value:string,trend?:number}){
  return (
    <div className="w-40 p-3 rounded-lg bg-[var(--card)] border" style={{borderColor:'var(--border)'}}>
      <div className="text-sm text-[var(--muted)]">{label}</div>
      <div className="text-2xl font-semibold">{value} {trend? <span className={`text-${trend>0?'green':'red'}-500`}>{trend>0? '▲':'▼'}</span>:null}</div>
    </div>
  )
}
