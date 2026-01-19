import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { randomToken, sha256Hex } from '@/lib/crypto';
import { getUserIdFromSession } from '@/lib/server/session';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const days = body.daysValid || 7;
  const raw = randomToken(24);
  const hash = await sha256Hex(raw);
  const expiresAt = new Date(Date.now() + days * 24 * 3600 * 1000);

  const token = await prisma.shareToken.create({ data: { userId, tokenHash: hash, scope: 'clinician_read', expiresAt } });
  return NextResponse.json({ url: `/share/clinician?token=${raw}`, raw });
}
