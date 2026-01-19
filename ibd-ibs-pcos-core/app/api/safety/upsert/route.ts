import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { setMark } from '@/lib/safety';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  const body = await req.json();
  const { kind, refId, status, notes } = body;
  if (!kind || !refId || !status) return NextResponse.json({ ok: false, error: 'missing' }, { status: 400 });
  const rec = await setMark(userId, kind, refId, status, notes);
  return NextResponse.json({ ok: true, mark: rec });
}
