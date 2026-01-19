import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';
import Link from 'next/link';

export default async function ExperimentsPage() {
  const userId = await getUserIdFromSession();
  if (!userId) return (<div className="prose"><p>Logg inn.</p></div>);
  const items = await prisma.experiment.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  return (
    <div className="container-main">
      <h1 className="text-2xl font-bold">Eksperimenter</h1>
      <div className="mt-4">
        <Link href="/insights/triggers" className="btn">Velg trigger</Link>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map(i => (
          <li key={i.id} className="card flex justify-between items-center">
            <div>
              <strong>{i.title}</strong>
              <div className="text-sm text-slate-600">{i.startDate} — {i.endDate} — {i.active ? 'aktiv' : 'avsluttet'}</div>
            </div>
            <Link href={`/experiments/${i.id}`} className="btn">Åpne</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
