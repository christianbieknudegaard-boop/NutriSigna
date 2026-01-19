import { NextResponse } from 'next/server';
import { notifyAll } from '@/lib/pushNotifyAll';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    // ensure DB available and check admin flag
    try {
      await prisma.$connect();
    } catch (e) {
      return NextResponse.json({ ok: false, error: 'Database not configured', configured: false }, { status: 501 });
    }

    const profile = await prisma.userProfile.findUnique({ where: { userId } });
    // profile may not have isAdmin field; guard defensively
    if (!profile || (profile as any).isAdmin !== true) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    const payload = body.payload ?? { title: 'Broadcast', body: 'Test broadcast' };
    const res = await notifyAll(payload);
    return NextResponse.json({ ok: true, results: res });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
