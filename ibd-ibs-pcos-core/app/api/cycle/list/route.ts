import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  const params = new URL(req.url).searchParams;
  const since = params.get('since');
  const where: any = { userId };
  if (since) where.date = { gte: since };
  const rows = await prisma.cycleEntry.findMany({ where, orderBy: { date: 'desc' }, take: 200 });
  return NextResponse.json({ ok: true, rows });
}
