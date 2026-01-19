import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  const rows = await prisma.medicationEntry.findMany({ where: { userId }, orderBy: { date: 'desc' }, take: 200 });
  return NextResponse.json({ ok: true, rows });
}
