import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get('token') || '';
  const hash = crypto.createHash('sha256').update(token).digest('hex');
  const rec = await prisma.shareAccess.findUnique({ where: { tokenHash: hash } });
  if (!rec) return NextResponse.json({ ok: false, error: 'invalid' }, { status: 404 });
  if (rec.expiresAt < new Date()) return NextResponse.json({ ok: false, error: 'expired' }, { status: 410 });
  return NextResponse.json({ ok: true, role: rec.role, perms: { canSeeWeight: rec.canSeeWeight, canSeeSymptoms: rec.canSeeSymptoms, canSeeMeals: rec.canSeeMeals, canEditPlan: rec.canEditPlan, canEditShopping: rec.canEditShopping }, ownerUserId: rec.ownerUserId });
}
