'use client';
import { useState } from 'react';
import { enqueueRequest, registerSync } from '@/lib/offlineOutbox';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';

export default function NewWeight() {
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');

  async function handleSave() {
    const payload = { date, weight: Number(weight), waist: waist ? Number(waist) : undefined };
    if (navigator.onLine) {
      const res = await fetch('/api/weight/upsert', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
      if (res.ok) { window.location.href = '/weight'; return; }
    }

    try {
      await enqueueRequest({ url: '/api/weight/upsert', method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      await registerSync().catch(()=>{});
      window.location.href = '/weight';
    } catch (e) {
      alert('Feilet ved lokal lagring');
    }
  }

  return (
    <div className="p-6">
      <ServiceWorkerRegister />
      <h1 className="text-2xl font-bold">Ny vektmåling</h1>
      <div className="mt-4 space-y-3">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
        <input type="number" step="0.1" placeholder="Vekt (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="input" />
        <input type="number" step="0.1" placeholder="Midje (cm) valgfritt" value={waist} onChange={(e) => setWaist(e.target.value)} className="input" />
        <button onClick={handleSave} className="btn">Lagre</button>
      </div>
    </div>
  );
}
