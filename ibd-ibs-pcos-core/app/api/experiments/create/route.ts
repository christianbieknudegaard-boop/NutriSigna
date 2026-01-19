import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req as any);
  if (!userId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const body = await req.json().catch(()=>({}));
  const { title, triggerKey, mode, startDate } = body as any;
  const start = startDate || new Date().toISOString().slice(0,10);
  const end = new Date(start); end.setDate(end.getDate()+6);
  const endS = end.toISOString().slice(0,10);
  const created = await prisma.experiment.create({ data: { userId, title, triggerKey, mode, startDate: start, endDate: endS } });
  return NextResponse.json({ ok: true, experiment: created });
}
