"use client"
import React, { useState } from 'react'

const KINDS = ['coffee','energy','soda','carbonated','sweetener','alcohol','other'] as const

export default function SnacksPage() {
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [kind, setKind] = useState('coffee');
  const [amount, setAmount] = useState('1 cup');

  async function save() {
    await fetch('/api/snacks/upsert', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ date, kind, amount }) });
    window.location.reload();
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Snacks & Drikke</h1>
      <div className="mt-3">
        <div className="flex gap-2 flex-wrap">{KINDS.map(k=><button key={k} className="btn" onClick={()=>setKind(k)}>{k}</button>)}</div>
        <div className="mt-2"><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="input" /></div>
        <div className="mt-2"><input value={amount} onChange={e=>setAmount(e.target.value)} className="input" /></div>
        <div className="mt-2"><button className="btn" onClick={save}>Logg</button></div>
      </div>
    </div>
  )
}
