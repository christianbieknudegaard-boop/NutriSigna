'use client';
import { useState, useEffect } from 'react';

export default function ShareClinician() {
  const [token, setToken] = useState('');
  const [data, setData] = useState<any>(null);

  async function load() {
    if (!token) return;
    const res = await fetch('/api/share/clinician/get?token=' + encodeURIComponent(token));
    const j = await res.json();
    setData(j);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Deling for behandler</h1>
      <div className="mt-4">
        <input className="input" placeholder="Delings-token" value={token} onChange={(e) => setToken(e.target.value)} />
        <button className="btn mt-2" onClick={load}>Hent rapport</button>
        {data && <pre className="mt-3 bg-slate-50 p-3 rounded">{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  );
}
