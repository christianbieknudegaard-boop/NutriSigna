import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  const body = await req.json();
  const { date, phase, flow, cramps, mood, notes } = body;
  if (!date) return NextResponse.json({ ok: false, error: 'missing_date' }, { status: 400 });
  const rec = await prisma.cycleEntry.upsert({ where: { userId_date: { userId, date } as any }, update: { phase, flow, cramps, mood, notes }, create: { userId, date, phase, flow, cramps, mood, notes } });
  return NextResponse.json({ ok: true, entry: rec });
}
