import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  const { planJson, shoppingJson } = await req.json();
  const up = await prisma.planDoc.upsert({ where: { userId }, update: { planJson, shoppingJson }, create: { userId, planJson, shoppingJson } });
  return NextResponse.json({ ok: true, doc: up });
}
