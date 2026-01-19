import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  try {
    // if prisma is not configured (missing DATABASE_URL), return Not Implemented
    try {
      // quick call to validate prisma initialization
      await prisma.$connect();
    } catch (e) {
      return NextResponse.json({ ok: false, error: 'Database not configured', configured: false }, { status: 501 });
    }

    const body = await req.json();
    if (!Array.isArray(body)) return NextResponse.json({ error: 'Expected array' }, { status: 400 });

    const results = [];
    for (const item of body) {
      const { type, payload } = item;
      if (type === 'symptom') {
        const created = await prisma.symptomEntry.create({ data: payload });
        results.push({ ok: true, id: created.id });
      } else if (type === 'meal') {
        const created = await prisma.mealEntry.create({ data: payload });
        results.push({ ok: true, id: created.id });
      } else {
        results.push({ ok: false, error: 'Unknown type' });
      }
    }

    return NextResponse.json({ ok: true, results });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
