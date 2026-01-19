import { NextResponse } from 'next/server';
import { sendPush } from '@/lib/push';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const subscription = body.subscription;
    const payload = body.payload ?? { title: 'Test', body: 'Dette er en test' };
    if (!subscription) return NextResponse.json({ error: 'Missing subscription' }, { status: 400 });
    await sendPush(subscription, payload);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
