import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req as any);
  if (!userId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const body = await req.json().catch(()=>({}));
  const { experimentId, date, adherence, notes } = body as any;
  const existing = await prisma.experimentCheckin.findFirst({ where: { experimentId, date } });
  if (existing) {
    const u = await prisma.experimentCheckin.update({ where: { id: existing.id }, data: { adherence, notes } });
    return NextResponse.json({ ok: true, checkin: u });
  }
  const c = await prisma.experimentCheckin.create({ data: { experimentId, date, adherence, notes } });
  return NextResponse.json({ ok: true, checkin: c });
}
