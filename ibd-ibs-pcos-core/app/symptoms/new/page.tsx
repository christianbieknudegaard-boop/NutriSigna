"use client";

import { useState, useEffect } from 'react';
import { enqueueRequest, registerSync } from '@/lib/offlineOutbox';
import { flushQueue } from '@/lib/offline/syncClient';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import { useRouter } from 'next/navigation';

export default function NewSymptomPage() {
  const [overall, setOverall] = useState('none');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const onOnline = () => { flushQueue().then(r => { if (r.ok) setStatus(`Synkronisert ${r.sent} items`); }); };
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { url: '/api/symptoms', method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ date, overall, notes }) };
    if (navigator.onLine) {
      try {
        const res = await fetch('/api/symptoms', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ date, overall, notes }) });
        if (res.ok) { setStatus('Lagt til'); router.push('/symptoms'); return; }
      } catch (e) {
        // fallthrough to enqueue
      }
    }
    try {
      await enqueueRequest(payload);
      setStatus('Offline: lagret i kø. Synkroniserer når online.');
      // try to register a background sync to flush later
      registerSync().catch(() => {});
      router.push('/symptoms');
    } catch (err) {
      setStatus('Feil ved lagring lokalt');
    }
  }

  return (
    <div className="container-main">
      <ServiceWorkerRegister />
      <h1 className="text-2xl font-bold mb-3">Logg symptomer</h1>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <div>
          <label className="text-sm">Dato</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input" />
        </div>
        <div>
          <label className="text-sm">Overordnet</label>
          <select value={overall} onChange={e => setOverall(e.target.value)} className="input">
            <option value="none">Ingen</option>
            <option value="mild">Mild</option>
            <option value="moderate">Moderat</option>
            <option value="severe">Sterk</option>
          </select>
        </div>
        <div>
          <label className="text-sm">Notater</label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} className="input" />
        </div>

        <div>
          <button className="btn" type="submit">Lagre</button>
        </div>
        {status && <div className="text-sm text-slate-600">{status}</div>}
      </form>
    </div>
  );
}

