import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const from = body.from;
  const to = body.to;

  const entries = await prisma.symptomEntry.findMany({ where: { userId, date: { gte: from, lte: to } }, orderBy: { date: 'asc' } });

  return NextResponse.json({ entries });
}
