import MedSuppForm from '@/components/MedSuppForm'
import { prisma } from '@/lib/prisma'
import { getUserIdFromSession } from '@/lib/server/session'

export default async function MedsPage() {
  const userId = await getUserIdFromSession();
  if (!userId) return (<div className="p-4">Logg inn for å se medisiner og tilskudd.</div>);
  const meds = await prisma.medicationEntry.findMany({ where: { userId }, orderBy: { date: 'desc' }, take: 200 });
  const supps = await prisma.supplementEntry.findMany({ where: { userId }, orderBy: { date: 'desc' }, take: 200 });
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Medisiner & Tilskudd</h1>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold">Medisiner</h3>
          <div className="p-3 bg-white/60 rounded-lg border border-slate-100">
            <MedSuppForm type="meds" />
            {meds.length === 0 ? (
              <div className="text-sm text-slate-500 mt-3">Ingen medisiner registrert.</div>
            ) : (
              <ul className="mt-2 space-y-2">{meds.map((m:any)=>(<li key={m.id} className="text-sm">{m.date} — {m.name} {m.dose ? `• ${m.dose}` : ''}</li>))}</ul>
            )}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Tilskudd</h3>
          <div className="p-3 bg-white/60 rounded-lg border border-slate-100">
            <MedSuppForm type="supps" />
            {supps.length === 0 ? (
              <div className="text-sm text-slate-500 mt-3">Ingen tilskudd registrert.</div>
            ) : (
              <ul className="mt-2 space-y-2">{supps.map((s:any)=>(<li key={s.id} className="text-sm">{s.date} — {s.name} {s.dose ? `• ${s.dose}` : ''}</li>))}</ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
