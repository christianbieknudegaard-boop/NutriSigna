import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const date = body.date;
  const weight = body.weight;
  const waist = body.waist;

  try {
    const entry = await prisma.weightEntry.upsert({ where: { userId_date: { userId, date } }, create: { userId, date, weightKg: weight, waistCm: waist }, update: { weightKg: weight, waistCm: waist } });
    return NextResponse.json(entry);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
