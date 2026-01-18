import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q') || '';
  const results = await prisma.foodItemCustom.findMany({ where: { OR: [ { name: { contains: q } }, { barcode: { contains: q } } ] }, take: 20 });
  return NextResponse.json({ results });
}
