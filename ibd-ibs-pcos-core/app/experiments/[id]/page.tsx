import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';
import { computeExperimentOutcome } from '@/lib/experiments';

export default async function ExperimentDetail({ params }: { params: { id: string } }) {
  const userId = await getUserIdFromSession();
  if (!userId) return (<div className="prose"><p>Logg inn.</p></div>);
  const e = await prisma.experiment.findUnique({ where: { id: params.id } });
  if (!e) return (<div className="prose"><p>Eksperiment ikke funnet.</p></div>);
  const outcome = await computeExperimentOutcome(e);

  return (
    <div className="container-main">
      <h1 className="text-2xl font-bold">{e.title}</h1>
      <div className="mt-4 card">
        <div>Periode: {e.startDate} — {e.endDate}</div>
        <div className="mt-3">Adherence score: {Math.round(outcome.adherenceScore*100)}%</div>
        <div className="mt-3">Før: {outcome.beforeAvg.toFixed(2)} — Under: {outcome.duringAvg.toFixed(2)} — Delta: {outcome.delta.toFixed(2)}</div>
      </div>

      <section className="mt-4">
        <h2 className="font-semibold">Daglig check-in</h2>
        <form action="/api/experiments/checkin" method="post" className="mt-3 flex gap-2">
          <input type="hidden" name="experimentId" value={e.id} />
          <input type="date" name="date" defaultValue={new Date().toISOString().slice(0,10)} className="input" />
          <select name="adherence" className="input"><option value="yes">Ja</option><option value="partial">Delvis</option><option value="no">Nei</option></select>
          <button className="btn" type="submit">Sjekk inn</button>
        </form>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Rapport</h2>
        <div className="mt-2 card">
          <pre>{JSON.stringify(outcome, null, 2)}</pre>
        </div>
      </section>
    </div>
  );
}
