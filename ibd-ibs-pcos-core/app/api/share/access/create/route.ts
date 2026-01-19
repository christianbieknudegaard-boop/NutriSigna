import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/prisma';
import { getUserSubscription, userHasFeature } from '@/lib/server/subscription';
import crypto from 'crypto';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  const { role, daysValid = 7, perms = {} } = await req.json();
  if (role !== 'clinician_read' && role !== 'co_owner_edit_plan') return NextResponse.json({ ok: false, error: 'invalid_role' }, { status: 400 });
  // gating: check subscription
  const sub = await getUserSubscription(userId);
  if (role === 'co_owner_edit_plan' && !userHasFeature(sub, 'family_sharing')) {
    return NextResponse.json({ ok: false, error: 'subscription_required' }, { status: 402 });
  }
  if (role === 'clinician_read' && !userHasFeature(sub, 'clinician_sharing')) {
    return NextResponse.json({ ok: false, error: 'subscription_required' }, { status: 402 });
  }
  const raw = crypto.randomBytes(24).toString('hex');
  const hash = crypto.createHash('sha256').update(raw).digest('hex');
  const expires = new Date(Date.now() + daysValid * 24*3600*1000);
  const record = await prisma.shareAccess.create({ data: { ownerUserId: userId, tokenHash: hash, role, expiresAt: expires, canSeeWeight: !!perms.canSeeWeight, canSeeSymptoms: !!perms.canSeeSymptoms, canSeeMeals: !!perms.canSeeMeals, canEditPlan: !!perms.canEditPlan, canEditShopping: !!perms.canEditShopping } });
  const url = `${process.env.NEXT_PUBLIC_APP_URL || ''}/share/access?token=${raw}`;
  return NextResponse.json({ ok: true, url, record });
}
