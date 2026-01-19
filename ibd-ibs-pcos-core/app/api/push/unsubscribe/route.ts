import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req as any);
  if (!userId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  // ensure DB available
  try {
    await prisma.$connect();
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Database not configured', configured: false }, { status: 501 });
  }

  const body = await req.json().catch(() => ({}));
  const { endpoint } = body as any;
  if (!endpoint) return NextResponse.json({ error: 'Missing endpoint' }, { status: 400 });

  await prisma.pushSubscription.deleteMany({ where: { endpoint, userId } });
  return NextResponse.json({ ok: true });
}
