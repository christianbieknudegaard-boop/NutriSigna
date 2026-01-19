"use client"
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function ShareAccessPage() {
  const sp = useSearchParams();
  const token = sp.get('token');
  const [data, setData] = useState<any>(null);

  useEffect(()=>{ if (!token) return; fetch(`/api/share/access/get?token=${encodeURIComponent(token)}`).then(r=>r.json()).then(setData); }, [token]);

  if (!token) return (<div className="p-4">Ingen token</div>);
  if (!data) return (<div className="p-4">Laster...</div>);
  if (!data.ok) return (<div className="p-4">Ugyldig eller utløpt lenke</div>);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Delt tilgang</h1>
      <div className="mt-3">Rolle: {data.role}</div>
      <pre className="mt-3">{JSON.stringify(data.perms, null, 2)}</pre>
    </div>
  )
}
