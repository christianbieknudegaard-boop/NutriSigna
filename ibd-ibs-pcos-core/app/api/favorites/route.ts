import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    await prisma.$connect()
  } catch (e) {
    return NextResponse.json({ ok: true, configured: false, favorites: [] }, { status: 501 })
  }
  const list = await prisma.favorite.findMany({ take: 50 })
  return NextResponse.json({ ok: true, configured: true, favorites: list })
}

export async function POST(req: Request) {
  try { await prisma.$connect() } catch (e) { return NextResponse.json({ ok: false, configured: false }, { status: 501 }) }
  const body = await req.json()
  // attach userId from session when available (server-side)
  try {
    const { getServerSession } = await import('next-auth')
    const { authOptions } = await import('@/lib/server/auth-options')
    const session = await (getServerSession as any)(authOptions as any)
    if (session && (session as any).user && (session as any).user.id) body.userId = (session as any).user.id
  } catch (e) {
    // ignore
  }
  const created = await prisma.favorite.create({ data: body })
  return NextResponse.json({ ok: true, favorite: created })
}
