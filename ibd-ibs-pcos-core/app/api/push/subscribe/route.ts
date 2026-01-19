import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const sub = body.subscription;
    if (!sub) return NextResponse.json({ error: 'Missing subscription' }, { status: 400 });
    const endpoint = sub.endpoint || sub.url || null;
    const keys = sub.keys ? sub.keys : null;
    if (!endpoint) return NextResponse.json({ error: 'Missing endpoint in subscription' }, { status: 400 });

    // normalize keys
    const keysObj = (typeof keys === 'object' && keys) ? keys : {};

    // dedupe: find existing subscription for this endpoint (and user)
    const existing = await prisma.pushSubscription.findFirst({ where: { endpoint } });
    if (existing) {
      // if same user, update keys; otherwise attach to this user as duplicate prevention
      const updated = await prisma.pushSubscription.update({ where: { id: existing.id }, data: { userId, keysJson: JSON.stringify(keysObj) } });
      return NextResponse.json({ ok: true, existing: true, id: updated.id });
    }

    const created = await prisma.pushSubscription.create({ data: { userId, endpoint, keysJson: JSON.stringify(keysObj) } });
    return NextResponse.json({ ok: true, existing: false, id: created.id });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
