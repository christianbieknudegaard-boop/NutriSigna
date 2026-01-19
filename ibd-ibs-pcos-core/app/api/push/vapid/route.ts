import { NextResponse } from 'next/server';
import { getVapidPublic } from '@/lib/push';

export async function GET() {
  const pub = getVapidPublic();
  if (!pub) return NextResponse.json({ ok: true, configured: false, publicKey: null });
  return NextResponse.json({ ok: true, configured: true, publicKey: pub });
}
