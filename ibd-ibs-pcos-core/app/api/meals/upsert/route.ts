import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserIdFromSession } from '@/lib/server/session';

export async function POST(req: Request) {
  const userId = await getUserIdFromSession(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const date = body.date;
  const mealType = body.mealType;
  const title = body.title;
  const items = body.items || [];

  try {
    const entry = await prisma.mealEntry.create({ data: { userId, date, mealType, title, itemsJson: JSON.stringify(items), notes: body.notes || null } });
    return NextResponse.json(entry);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
