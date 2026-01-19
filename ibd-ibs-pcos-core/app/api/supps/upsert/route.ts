import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  const { date, name, dose, taken, notes } = await req.json();
  const rec = await prisma.supplementEntry.create({ data: { userId, date, name, dose, taken: taken ?? true, notes } });
  return NextResponse.json({ ok: true, entry: rec });
}
