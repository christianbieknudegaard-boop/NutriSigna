import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export default async function GoalsPage() {
  const userId = await getUserIdFromSession();
  if (!userId) return (<div className="prose"><p>Logg inn for å se mål.</p></div>);
  const goals = await prisma.goal.findMany({ where: { userId } });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Mål</h1>
      <ul className="mt-4 space-y-2">
        {goals.map(g => <li key={g.id} className="p-3 border rounded">{g.title} - {g.type}</li>)}
      </ul>
    </div>
  );
}
