import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req as any);
  if (!userId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const body = await req.json().catch(()=>({}));
  const { id } = body as any;
  const updated = await prisma.experiment.update({ where: { id }, data: { active: false } });
  return NextResponse.json({ ok: true, experiment: updated });
}
