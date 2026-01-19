'use client';
import { useState } from 'react';

export default function AddFood() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [barcode, setBarcode] = useState('');

  async function save() {
    const res = await fetch('/api/foods/custom/upsert', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, brand, barcode }) });
    if (res.ok) window.location.href = '/foods';
    else alert('Feilet');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Legg til produkt</h1>
      <div className="mt-4 space-y-3">
        <input className="input" placeholder="Navn" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="input" placeholder="Merke" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input className="input" placeholder="Strekkode" value={barcode} onChange={(e) => setBarcode(e.target.value)} />
        <button className="btn" onClick={save}>Lagre</button>
      </div>
    </div>
  );
}
