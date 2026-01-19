import { prisma } from '@/lib/db';
import Link from 'next/link';
import { getUserIdFromSession } from '@/lib/server/session';
import { computeTriggerScores } from '@/lib/analytics/triggers';

export default async function SymptomDay({ params }: { params: { date: string } }) {
  const userId = await getUserIdFromSession();
  if (!userId) return (<div className="prose"><p>Logg inn for å se denne registreringen.</p></div>);

  const entry = await prisma.symptomEntry.findUnique({ where: { userId_date: { userId, date: params.date } } });
  const meals = await prisma.mealEntry.findMany({ where: { userId, date: params.date } });
  const triggers = computeTriggerScores(meals, entry ? [entry] : []);

  if (!entry) return (<div className="prose"><p>Ingen registrering for denne datoen.</p><Link href="/symptoms/new">Lag ny</Link></div>);

  return (
    <div className="container-main">
      <h1 className="text-2xl font-bold">Symptom {entry.date}</h1>
      <p>Overall: {entry.overall}</p>
      <p>Humør: {entry.mood}</p>
      <p>Smerte: {entry.pain}</p>
      <p>Oppblåsthet: {entry.bloating}</p>
      <p>Avføring: {entry.stool}</p>
      <p>Energi: {entry.energy}</p>
      <p>Notater: {entry.notes}</p>
      <section className="mt-4">
        <h3 className="font-semibold">Måltider denne dagen</h3>
        <ul className="mt-2 space-y-2">
          {meals.map(m => (<li key={m.id} className="card">{m.mealType} — {m.title}</li>))}
        </ul>
      </section>

      <section className="mt-4">
        <h3 className="font-semibold">Mistenkte triggere denne dagen</h3>
        <ul className="mt-2">
          {triggers.slice(0,5).map(t => (<li key={t.key} className="text-sm">{t.label} — score {t.score}</li>))}
        </ul>
      </section>
      <Link href="/symptoms">Tilbake</Link>
    </div>
  );
}
