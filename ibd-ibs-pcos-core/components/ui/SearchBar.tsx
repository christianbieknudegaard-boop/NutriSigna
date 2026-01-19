import React from 'react'

export default function SearchBar({value,onChange,placeholder='Søk...'}:any){
  return (
    <div className="p-3">
      <div className="flex items-center gap-2 bg-[var(--card)] rounded-xl p-2" style={{border:'1px solid var(--border)'}}>
        <input value={value} onChange={(e:any)=>onChange(e.target.value)} placeholder={placeholder} className="flex-1 bg-transparent outline-none" />
        {value? <button onClick={()=>onChange('')} className="p-2">✕</button>: null}
      </div>
    </div>
  )
}
