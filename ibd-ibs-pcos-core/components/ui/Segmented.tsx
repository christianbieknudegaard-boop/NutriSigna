import React from 'react'

export default function Segmented({options,value,onChange}:{options:string[],value:string,onChange:(v:string)=>void}){
  return (
    <div className="inline-flex bg-[var(--card)] rounded-full p-1" style={{border:'1px solid var(--border)'}}>
      {options.map(o=> (
        <button key={o} onClick={()=>onChange(o)} className={`px-3 py-1 rounded-full ${o===value? 'bg-[var(--accent)] text-white':'text-[var(--muted)]'}`}>{o}</button>
      ))}
    </div>
  )
}
