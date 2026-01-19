"use client";
import React, { useState } from 'react';
import { encryptJsonAESGCM, decryptJsonAESGCM } from '@/lib/crypto/aesgcm';

export default function BackupPage() {
  const [pass, setPass] = useState('');
  const [file, setFile] = useState<File | null>(null);

  async function exportData() {
    const res = await fetch('/api/backup/export');
    if (!res.ok) return alert('Kunne ikke hente data');
    const { data } = await res.json();
    const enc = await encryptJsonAESGCM(data, pass || '');
    const blob = new Blob([JSON.stringify(enc)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'backup.kmdbackup'; a.click(); URL.revokeObjectURL(url);
  }

  async function importData() {
    if (!file) return alert('Velg fil');
    const txt = await file.text();
    const payload = JSON.parse(txt);
    try {
      const obj = await decryptJsonAESGCM(payload, pass || '');
      // send to server to restore
      const res = await fetch('/api/backup/restore', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ data: obj }) });
      if (res.ok) alert('Gjenopprettet'); else alert('Feilet');
    } catch (e) { alert('Dekryptering feilet'); }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Backup & Gjenopprett</h1>
      <div className="mt-3">
        <input placeholder="Passphrase" value={pass} onChange={e=>setPass(e.target.value)} className="input" />
        <div className="mt-2"><button className="btn" onClick={exportData}>Eksporter (kryptert)</button></div>
      </div>
      <div className="mt-6">
        <h2 className="font-semibold">Importer</h2>
        <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <div className="mt-2"><button className="btn" onClick={importData}>Importer</button></div>
      </div>
    </div>
  )
}
