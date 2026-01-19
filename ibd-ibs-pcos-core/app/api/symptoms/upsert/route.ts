import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const date = body.date;

  const data = {
    userId,
    date,
    overall: body.overall || 5,
    mood: body.mood || 3,
    pain: body.pain || 5,
    bloating: body.bloating || 5,
    stool: body.stool || 5,
    energy: body.energy || 5,
    notes: body.notes || '',
  };

  await prisma.symptomEntry.upsert({ where: { userId_date: { userId, date } }, update: data, create: data });

  return NextResponse.json({ ok: true });
}
