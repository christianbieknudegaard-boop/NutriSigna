import { NextResponse } from 'next/server';
import { getUserIdFromSession } from '@/lib/server/session';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ ok: false, error: 'not_authenticated' }, { status: 401 });
  // gather user data
  const [profile, symptoms, weight, meals, goals, reminders, safetyMarks, cycle, meds, supps, lifestyle, snacks] = await Promise.all([
    prisma.userProfile.findUnique({ where: { userId } }),
    prisma.symptomEntry.findMany({ where: { userId } }),
    prisma.weightEntry.findMany({ where: { userId } }),
    prisma.mealEntry.findMany({ where: { userId } }),
    prisma.goal.findMany({ where: { userId } }),
    prisma.reminderSetting.findMany({ where: { userId } }),
    prisma.safetyMark.findMany({ where: { userId } }),
    prisma.cycleEntry.findMany({ where: { userId } }),
    prisma.medicationEntry.findMany({ where: { userId } }),
    prisma.supplementEntry.findMany({ where: { userId } }),
    prisma.lifestyleEntry.findMany({ where: { userId } }),
    prisma.snackDrinkEntry.findMany({ where: { userId } })
  ]);
  return NextResponse.json({ ok: true, data: { profile, symptoms, weight, meals, goals, reminders, safetyMarks, cycle, meds, supps, lifestyle, snacks } });
}
