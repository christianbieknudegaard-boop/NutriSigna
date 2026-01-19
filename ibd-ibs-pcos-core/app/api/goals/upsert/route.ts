import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  try {
    const g = await prisma.goal.create({ data: { userId, type: body.type, title: body.title, targetJson: JSON.stringify(body.target || {}) } });
    return NextResponse.json(g);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
