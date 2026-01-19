import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export default async function WeightPage() {
  const userId = await getUserIdFromSession();
  if (!userId) return (<div className="prose"><p>Logg inn for å se vektloggen.</p></div>);

  const entries = await prisma.weightEntry.findMany({ where: { userId }, orderBy: { date: 'desc' }, take: 30 });

  return (
    <div className="container-main">
      <h1 className="text-2xl font-bold">Vekt</h1>
      <div className="mt-3">
        <Link href="/weight/new" className="btn">Ny måling</Link>
      </div>
      <ul className="mt-4 space-y-3">
        {entries.map(e => (
          <li key={e.id} className="card">{e.date}: {e.weightKg} kg {e.waistCm ? ` - midje ${e.waistCm} cm` : ''}</li>
        ))}
      </ul>
    </div>
  );
}
