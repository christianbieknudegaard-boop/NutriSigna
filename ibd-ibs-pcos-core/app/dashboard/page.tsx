import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';
import { dailyCoach } from '@/lib/coach';
import Link from 'next/link';

export default async function Dashboard() {
  const userId = await getUserIdFromSession();
  if (!userId) return (<div className="prose"><p>Logg inn for å se dashboard.</p></div>);

  const today = new Date().toISOString().slice(0,10);
  const symptomToday = await prisma.symptomEntry.findUnique({ where: { userId_date: { userId, date: today } } });
  const weekFrom = new Date(); weekFrom.setDate(weekFrom.getDate() - 6);
  const weekDates = [] as string[];
  for (let i=0;i<7;i++) { const d = new Date(); d.setDate(d.getDate()-i); weekDates.push(d.toISOString().slice(0,10)); }

  const weekEntries = await prisma.symptomEntry.findMany({ where: { userId, date: { in: weekDates } } });
  const weightEntries = await prisma.weightEntry.findMany({ where: { userId }, orderBy: { date: 'asc' }, take: 14 });
  const mealsCount = await prisma.mealEntry.count({ where: { userId, date: { in: weekDates } } });

  const coach = dailyCoach({ weightEntries, symptomEntries: weekEntries, goals: [] });

  return (
    <div className="container-main">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="card">
          <h3 className="font-semibold">I dag</h3>
          <p>{symptomToday ? `Overall ${symptomToday.overall} — humør ${symptomToday.mood}` : 'Ingen registrering i dag'}</p>
          <Link href="/symptoms/new" className="btn mt-3">Registrer symptomer</Link>
        </div>
        <div className="card">
          <h3 className="font-semibold">Denne uken</h3>
          <p>Registreringer: {weekEntries.length}</p>
          <p>Måltider logget: {mealsCount}</p>
        </div>
        <div className="card">
          <h3 className="font-semibold">Vekt (siste 14d)</h3>
          <p>{weightEntries.length > 0 ? `${weightEntries[weightEntries.length-1].weightKg} kg` : 'Ingen vektdata'}</p>
        </div>
      </div>

      <section className="mt-6 card">
        <h2 className="font-semibold">Coach</h2>
        {coach.tips.map((t: any, i:number) => (
          <div key={i} className="mt-2">
            <strong>{t.title}</strong>
            <p>{t.body}</p>
          </div>
        ))}
      </section>

      <section className="mt-6 flex gap-3">
        <Link href="/settings" className="btn">Innstillinger</Link>
        <Link href="/share/clinician" className="btn">Del med behandler</Link>
      </section>
    </div>
  );
}

