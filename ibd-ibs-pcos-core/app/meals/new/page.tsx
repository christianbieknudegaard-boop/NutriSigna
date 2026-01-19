"use client";

import { useState, useEffect } from 'react';
import { enqueueRequest, registerSync } from '@/lib/offlineOutbox';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import SyncStatus from '@/components/SyncStatus';
import { useRouter } from 'next/navigation';

export default function NewMealPage() {
  const [title, setTitle] = useState('');
  const [mealType, setMealType] = useState('breakfast');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onOnline = () => { setStatus('Online — forsøker å sende kø'); };
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { type: 'meal', payload: { title, mealType, date } };
    if (navigator.onLine) {
      try {
        const res = await fetch('/api/meals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload.payload) });
        if (res.ok) {
          setStatus('Lagt til');
          router.push('/meals');
          return;
        }
      } catch (e) {
        // fallthrough to enqueue
      }
    }

    try {
      await enqueueRequest({ url: '/api/meals', method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload.payload) })
      await registerSync().catch(()=>{})
      setStatus('Offline: lagret i kø. Synkroniserer når online.');
      router.push('/meals');
    } catch (err) {
      setStatus('Feil ved lagring lokalt');
    }
  }

  return (
    <div className="container-main">
      <ServiceWorkerRegister />
      <h1 className="text-2xl font-bold mb-3">Logg måltid</h1>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <div>
          <label className="text-sm">Tittel</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="input" />
        </div>
        <div>
          <label className="text-sm">Type</label>
          <select value={mealType} onChange={e => setMealType(e.target.value)} className="input">
            <option value="breakfast">Frokost</option>
            <option value="lunch">Lunsj</option>
            <option value="dinner">Middag</option>
            <option value="snack">Snack</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Dato</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" />
        </div>

        <div>
          <button className="btn" type="submit">Lagre</button>
        </div>
        <div className="mt-2"><SyncStatus /></div>
        {status && <div className="text-sm text-slate-600">{status}</div>}
      </form>
    </div>
  );
}

