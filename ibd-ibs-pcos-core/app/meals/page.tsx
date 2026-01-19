import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export default async function MealsPage() {
  const userId = await getUserIdFromSession();
  if (!userId) return (<div className="prose"><p>Logg inn for å se måltider.</p></div>);

  const entries = await prisma.mealEntry.findMany({ where: { userId }, orderBy: { date: 'desc' }, take: 50 });
  // prefetch next-day symptoms for quick chip
  const datesNext = entries.map(e => { const d=new Date(e.date); d.setDate(d.getDate()+1); return d.toISOString().slice(0,10); });
  const symptoms = await prisma.symptomEntry.findMany({ where: { userId, date: { in: datesNext } } });
  const symptomsMap = new Map(symptoms.map(s => [s.date, s]));

  return (
    <div className="container-main">
      <h1 className="text-2xl font-bold">Måltider</h1>
      <div className="mt-3"><Link href="/meals/new" className="btn">Logg måltid</Link></div>
      <ul className="mt-4 space-y-3">
        {entries.map(e => {
          const nextDate = new Date(e.date); nextDate.setDate(nextDate.getDate()+1); const nd = nextDate.toISOString().slice(0,10);
          const s = symptomsMap.get(nd);
          return (
            <li key={e.id} className="card flex justify-between items-center">{e.date} - {e.mealType} - {e.title}
              <div>{s ? <span className="text-sm text-red-600">Symptomer neste dag: {s.overall}</span> : <span className="text-sm text-slate-500">Ingen</span>}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
