import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { sha256Hex } from '@/lib/crypto';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token') || '';
  if (!token) return NextResponse.json({ error: 'Missing' }, { status: 400 });
  const hash = await sha256Hex(token);
  const st = await prisma.shareToken.findUnique({ where: { tokenHash: hash } });
  if (!st || st.expiresAt < new Date()) return NextResponse.json({ error: 'Invalid or expired' }, { status: 404 });

  const userId = st.userId;
  const symptoms = await prisma.symptomEntry.findMany({ where: { userId }, orderBy: { date: 'desc' }, take: 50 });
  const weight = await prisma.weightEntry.findMany({ where: { userId }, orderBy: { date: 'desc' }, take: 50 });
  const meals = await prisma.mealEntry.findMany({ where: { userId }, orderBy: { date: 'desc' }, take: 50 });

  return NextResponse.json({ symptoms, weight, meals });
}
