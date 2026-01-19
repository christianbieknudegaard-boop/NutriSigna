import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const data = {
    conditions: body.conditions || [],
    goals: body.goals || [],
    preferences: body.preferences || [],
    onboardingDone: !!body.onboardingDone,
  };

  try {
    const profile = await prisma.userProfile.upsert({ where: { userId }, update: data, create: { userId, ...data } });
    return NextResponse.json(profile);
  } catch (err) {
    console.error('Profile update failed', err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
