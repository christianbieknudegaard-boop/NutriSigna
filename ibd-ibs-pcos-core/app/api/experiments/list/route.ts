import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export async function GET() {
  const userId = await getUserIdFromSession();
  if (!userId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const items = await prisma.experiment.findMany({ where: { userId } });
  return NextResponse.json({ ok: true, experiments: items });
}
