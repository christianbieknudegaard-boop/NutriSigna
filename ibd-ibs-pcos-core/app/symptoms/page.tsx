import { prisma } from '@/lib/db';
import Link from 'next/link';
import { getUserIdFromSession } from '@/lib/server/session';
import SymptomExportButton from '@/components/SymptomExportButton';

export default async function SymptomsPage() {
  const userId = await getUserIdFromSession(); // we don't have req here, helper reads server session
  if (!userId) return (<div className="prose"><p>Logg inn for å se symptomloggen.</p></div>);

  const entries = await prisma.symptomEntry.findMany({ where: { userId }, orderBy: { date: 'desc' }, take: 30 });

  return (
    <div className="prose">
      <h1>Symptomlogg</h1>
      <Link href="/symptoms/new" className="btn">Ny registrering</Link>
      <SymptomExportButton entries={entries} />
      <ul>
        {entries.map((e) => (
          <li key={e.id}><Link href={`/symptoms/${e.date}`}>{e.date} — Overall {e.overall}</Link></li>
        ))}
      </ul>
    </div>
  );
}
