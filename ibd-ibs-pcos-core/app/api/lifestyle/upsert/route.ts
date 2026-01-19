import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  const { date, sleepQuality, sleepHours, activityMin, notes } = await req.json();
  const rec = await prisma.lifestyleEntry.upsert({ where: { userId_date: { userId, date } as any }, update: { sleepQuality, sleepHours, activityMin, notes }, create: { userId, date, sleepQuality, sleepHours, activityMin, notes } });
  return NextResponse.json({ ok: true, entry: rec });
}
