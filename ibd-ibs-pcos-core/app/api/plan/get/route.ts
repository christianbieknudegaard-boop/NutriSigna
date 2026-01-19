import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  const pd = await prisma.planDoc.findUnique({ where: { userId } });
  if (!pd) return NextResponse.json({ ok: true, plan: { items: [] }, shopping: [] });
  return NextResponse.json({ ok: true, plan: JSON.parse(pd.planJson || '{}'), shopping: JSON.parse(pd.shoppingJson || '[]') });
}
