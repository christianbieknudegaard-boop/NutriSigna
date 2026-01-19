import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  const { data, replaceAll } = await req.json();
  // basic validation and upsert logic
  if (!data) return NextResponse.json({ ok: false, error: 'missing' }, { status: 400 });
  // profile
  if (data.profile) {
    await prisma.userProfile.upsert({ where: { userId }, update: { ...data.profile }, create: { userId, ...data.profile } as any });
  }
  // symptoms
  if (Array.isArray(data.symptoms)) {
    for (const s of data.symptoms) await prisma.symptomEntry.upsert({ where: { userId_date: { userId, date: s.date } as any }, update: s, create: { ...s, userId } as any });
  }
  // weight
  if (Array.isArray(data.weight)) {
    for (const w of data.weight) await prisma.weightEntry.upsert({ where: { userId_date: { userId, date: w.date } as any }, update: w, create: { ...w, userId } as any });
  }
  // meals
  if (Array.isArray(data.meals)) {
    for (const m of data.meals) await (prisma as any).mealEntry.upsert({ where: { userId_date: { userId, date: m.date } as any }, update: m, create: { ...m, userId } as any });
  }
  // others: safetyMarks, cycle, meds, supps, lifestyle, snacks
  if (Array.isArray(data.safetyMarks)) for (const sm of data.safetyMarks) await (prisma as any).safetyMark.upsert({ where: { userId_kind_refId: { userId, kind: sm.kind, refId: sm.refId } as any }, update: sm, create: { ...sm, userId } as any });
  if (Array.isArray(data.cycle)) for (const c of data.cycle) await (prisma as any).cycleEntry.upsert({ where: { userId_date: { userId, date: c.date } as any }, update: c, create: { ...c, userId } as any });
  if (Array.isArray(data.meds)) for (const me of data.meds) await (prisma as any).medicationEntry.create({ data: { ...me, userId } });
  if (Array.isArray(data.supps)) for (const se of data.supps) await (prisma as any).supplementEntry.create({ data: { ...se, userId } });
  if (Array.isArray(data.lifestyle)) for (const le of data.lifestyle) await (prisma as any).lifestyleEntry.upsert({ where: { userId_date: { userId, date: le.date } as any }, update: le, create: { ...le, userId } as any });
  if (Array.isArray(data.snacks)) for (const sn of data.snacks) await (prisma as any).snackDrinkEntry.create({ data: { ...sn, userId } });

  return NextResponse.json({ ok: true });
}
