import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';
import { computeTriggerScores } from '@/lib/analytics/triggers';
import Link from 'next/link';

export default async function TriggersPage() {
  const userId = await getUserIdFromSession();
  if (!userId) return (<div className="prose"><p>Logg inn.</p></div>);

  const meals = await prisma.mealEntry.findMany({ where: { userId } });
  const symptoms = await prisma.symptomEntry.findMany({ where: { userId } });
  const triggers = computeTriggerScores(meals, symptoms);

  return (
    <div className="container-main">
      <h1 className="text-2xl font-bold">Mistenkte triggere</h1>
      <ul className="mt-4 space-y-3">
        {triggers.map(t => (
          <li key={t.key} className="card flex justify-between items-center">
            <div>
              <strong>{t.label}</strong>
              <div className="text-sm text-slate-600">Support: {t.support} — Score: {t.score}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Link href={`/insights/triggers/${encodeURIComponent(t.key)}`} className="btn">Detaljer</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
