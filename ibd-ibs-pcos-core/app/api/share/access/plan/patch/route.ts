import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { applyPlanOp } from '@/lib/shared/plan-protocol';

export async function POST(req: Request) {
  const { token, op } = await req.json();
  const hash = crypto.createHash('sha256').update(token || '').digest('hex');
  const rec = await prisma.shareAccess.findUnique({ where: { tokenHash: hash } });
  if (!rec) return NextResponse.json({ ok: false, error: 'invalid_token' }, { status: 401 });
  if (!rec.canEditPlan && !rec.canEditShopping) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  const pd = await prisma.planDoc.findUnique({ where: { userId: rec.ownerUserId } });
  if (!pd) return NextResponse.json({ ok: false, error: 'no_plan' }, { status: 404 });
  const newPlanJson = applyPlanOp(pd.planJson, op);
  const updated = await prisma.planDoc.update({ where: { userId: rec.ownerUserId }, data: { planJson: newPlanJson } });
  return NextResponse.json({ ok: true, doc: updated });
}
