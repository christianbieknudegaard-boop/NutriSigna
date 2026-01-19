import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try { await prisma.$connect() } catch (e) { return NextResponse.json({ ok: true, configured: false, templates: [] }, { status: 501 }) }
  const templates = await prisma.mealTemplate.findMany({ take: 50 })
  return NextResponse.json({ ok: true, configured: true, templates })
}

export async function POST(req: Request) {
  try { await prisma.$connect() } catch (e) { return NextResponse.json({ ok: false, configured: false }, { status: 501 }) }
  const body = await req.json()
  // normalize itemsJson if passed as array or text
  if (body.items && !body.itemsJson) {
    body.itemsJson = typeof body.items === 'string' ? body.items : JSON.stringify(body.items)
  }
  try {
    const { getServerSession } = await import('next-auth')
    const { authOptions } = await import('@/lib/server/auth-options')
    const session = await (getServerSession as any)(authOptions as any)
    if (session && (session as any).user && (session as any).user.id) body.userId = (session as any).user.id
  } catch (e) {}
  const created = await prisma.mealTemplate.create({ data: body })
  return NextResponse.json({ ok: true, template: created })
}
