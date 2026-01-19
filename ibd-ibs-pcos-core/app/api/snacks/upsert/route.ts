import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  const { date, kind, amount, notes } = await req.json();
  const rec = await prisma.snackDrinkEntry.create({ data: { userId, date, kind, amount, notes } });
  return NextResponse.json({ ok: true, entry: rec });
}
