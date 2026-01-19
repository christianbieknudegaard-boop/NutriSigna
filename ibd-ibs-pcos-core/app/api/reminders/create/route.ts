import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { time, channel = 'web', kind = 'daily' } = body as any;

  const userId = await getUserIdFromSession(req as any);
  if (!userId) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const existing = await prisma.reminderSetting.findFirst({ where: { userId } });
  if (existing) {
    const updated = await prisma.reminderSetting.update({ where: { id: existing.id }, data: { timeLocal: time, channel, kind, enabled: true } });
    return NextResponse.json({ ok: true, reminder: updated });
  }

  const created = await prisma.reminderSetting.create({ data: { userId, timeLocal: time, channel, kind, enabled: true, days: '' } });
  return NextResponse.json({ ok: true, reminder: created });
}
