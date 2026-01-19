import { getUserIdFromSession } from '@/lib/server/session'
import { prisma } from '@/lib/prisma'
import dynamic from 'next/dynamic'

const LifestyleForm = dynamic(() => import('@/components/LifestyleForm'), { ssr: false })

export default async function LifestylePage() {
  const userId = await getUserIdFromSession();
  if (!userId) return (<div className="p-4">Logg inn for å se livsstil.</div>);
  const rows = await prisma.lifestyleEntry.findMany({ where: { userId }, orderBy: { date: 'desc' }, take: 30 });
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Søvn & Aktivitet</h1>
      <div className="mt-3"><LifestyleForm /></div>
      <ul className="mt-3">{rows.map((r:any)=><li key={r.id}>{r.date} sleep:{r.sleepQuality} hrs:{r.sleepHours} act:{r.activityMin}</li>)}</ul>
    </div>
  )
}
