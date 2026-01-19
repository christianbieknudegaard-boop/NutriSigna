import CycleForm from '@/components/CycleForm'
import { prisma } from '@/lib/prisma'
import { getUserIdFromSession } from '@/lib/server/session'

export default async function CyclePage() {
  const userId = await getUserIdFromSession();
  if (!userId) return (<div className="p-4">Logg inn for å se syklusloggen.</div>);
  const rows = await prisma.cycleEntry.findMany({ where: { userId }, orderBy: { date: 'desc' }, take: 60 });
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Syklus</h1>
      <div className="mt-3"><CycleForm /></div>
      <ul className="mt-3 space-y-2">{rows.map((r:any)=><li key={r.id}>{r.date} - {r.phase} - flow:{r.flow} mood:{r.mood}</li>)}</ul>
    </div>
  )
}
