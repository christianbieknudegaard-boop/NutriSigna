import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { getMarks } from '@/lib/safety';

export async function GET(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  const kind = new URL(req.url).searchParams.get('kind') as any || 'food';
  const marks = await getMarks(userId, kind);
  return NextResponse.json({ ok: true, marks });
}
