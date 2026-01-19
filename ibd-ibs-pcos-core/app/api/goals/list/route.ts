import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export async function GET(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const list = await prisma.goal.findMany({ where: { userId } });
  return NextResponse.json(list);
}
