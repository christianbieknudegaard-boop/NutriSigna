import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';
import { getUserSubscription, userHasFeature } from '@/lib/server/subscription';
import UpsellClientWrapper from '@/components/UpsellClientWrapper';
import { groupByDate, movingAverage, computeTrendSlope } from '@/lib/analytics/time-series';
import { drawLineSeries } from '@/lib/analytics/graphs';
import Link from 'next/link';

export default async function InsightsPage() {
  const userId = await getUserIdFromSession();
  if (!userId) return (<div className="prose"><p>Logg inn for å se innsikt.</p></div>);

  const symptoms = await prisma.symptomEntry.findMany({ where: { userId }, orderBy: { date: 'asc' } });
  const weight = await prisma.weightEntry.findMany({ where: { userId }, orderBy: { date: 'asc' } });

  const symptomsByDate = groupByDate(symptoms, 'date');
  const weightByDate = groupByDate(weight, 'date');

  const sub = await getUserSubscription(userId)
  const hasAdvanced = userHasFeature(sub, 'advancedInsights')

  return (
    <div className="container-main">
      <h1 className="text-2xl font-bold">Innsikt</h1>

      <section className="mt-4 card">
        <h2 className="font-semibold">Trender</h2>
        <div className="mt-3">
          {hasAdvanced ? <canvas id="symptoms-canvas" width={600} height={150}></canvas> : <UpsellClientWrapper feature="Avanserte innsikter" />}
        </div>
      </section>

      <section className="mt-4 card">
        <h2 className="font-semibold">Måltider & symptomer</h2>
        <p className="text-sm text-slate-600">Hurtigoversikt over måltider som ofte vises rundt dårlige dager.</p>
        <div className="mt-3">
          <Link href="/insights/triggers" className="btn">Se triggere</Link>
        </div>
      </section>

      <section className="mt-4 card">
        <h2 className="font-semibold">Eksperiment</h2>
        <p className="text-sm text-slate-600">Test en enkelt trigger i 7 dager.</p>
        <div className="mt-3"><Link href="/experiments" className="btn">Gå til Eksperimenter</Link></div>
      </section>

      <script dangerouslySetInnerHTML={{ __html: `(${(function(){
        const c = document.getElementById('symptoms-canvas');
        if (!c) return;
        const ctx = (c as any).getContext('2d');
        if (!ctx) return;
        // TODO: fetch data and draw via client-side script if available
      }).toString()})()` }} />
    </div>
  );
}
