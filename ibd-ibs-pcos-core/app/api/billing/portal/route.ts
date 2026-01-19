import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/server/stripe'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/server/auth-options'
import { prisma } from '@/lib/prisma'

export async function POST() {
  const stripe = getStripe()
  if (!stripe) return NextResponse.json({ ok: true, configured: false }, { status: 501 })
  const session: any = await getServerSession(authOptions as any)
  if (!session || !session.user) return NextResponse.json({ ok: false, error: 'unauthenticated' }, { status: 401 })

  const sub = await prisma.subscription.findUnique({ where: { userId: session.user.id } })
  if (!sub || !sub.stripeCustomerId) return NextResponse.json({ ok: false, error: 'no_customer' }, { status: 400 })

  try {
    const portal = await stripe.billingPortal.sessions.create({ customer: sub.stripeCustomerId, return_url: process.env.NEXT_PUBLIC_APP_URL || '' })
    return NextResponse.json({ ok: true, url: portal.url })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || 'stripe_error' }, { status: 500 })
  }
}
