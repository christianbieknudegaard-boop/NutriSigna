import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(req: Request, { params }: any) {
  try { await prisma.$connect() } catch (e) { return NextResponse.json({ ok: false, configured: false }, { status: 501 }) }
  const id = params.id
  await prisma.favorite.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

export async function POST(req: Request, { params }: any) {
  const body = await req.formData()
  if (body.get('_method') === 'delete') return DELETE(req, { params })
  return NextResponse.json({ ok: false }, { status: 400 })
}
