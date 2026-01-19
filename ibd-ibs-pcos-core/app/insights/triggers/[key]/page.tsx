import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';
import { computeTriggerScores } from '@/lib/analytics/triggers';

export default async function TriggerDetail({ params }: { params: { key: string } }) {
  const userId = await getUserIdFromSession();
  if (!userId) return (<div className="prose"><p>Logg inn.</p></div>);

  const meals = await prisma.mealEntry.findMany({ where: { userId } });
  const symptoms = await prisma.symptomEntry.findMany({ where: { userId } });
  const triggers = computeTriggerScores(meals, symptoms);
  const t = triggers.find(x => x.key === params.key);
  if (!t) return (<div className="prose"><p>Trigger ikke funnet.</p></div>);

  return (
    <div className="container-main">
      <h1 className="text-2xl font-bold">{t.label}</h1>
      <div className="mt-3 card">
        <div>Score: <strong>{t.score}</strong></div>
        <div>Support: {t.support}</div>
        <div className="mt-2"><em>Hvorfor: Dette forekommer oftere før dårlige dager enn før gode dager.</em></div>
        <div className="mt-3">
          <h3 className="font-semibold">Eksempler</h3>
          <ul className="mt-2 list-disc list-inside">
            {t.examples.map(d => <li key={d}>{d}</li>)}
          </ul>
        </div>
        <div className="mt-4">
          <form action={`/api/experiments/create`} method="post">
            <input type="hidden" name="triggerKey" value={t.key} />
            <button className="btn" type="submit">Start eksperiment</button>
          </form>
        </div>
      </div>
    </div>
  );
}
