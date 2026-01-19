import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/server/stripe'
import { PLANS } from '@/lib/plans'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/server/auth-options'

export async function POST(req: Request) {
  const stripe = getStripe()
  if (!stripe) return NextResponse.json({ ok: true, configured: false }, { status: 501 })

  const session: any = await getServerSession(authOptions as any)
  if (!session || !session.user) return NextResponse.json({ ok: false, error: 'unauthenticated' }, { status: 401 })

  const body = await req.json()
  const plan = body.plan || 'plus'
  const priceId = PLANS[plan as keyof typeof PLANS]?.priceId
  if (!priceId) return NextResponse.json({ ok: false, error: 'price_not_configured' }, { status: 400 })

  try {
    const checkout = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || ''}/billing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || ''}/billing`,
      client_reference_id: session.user.id,
      payment_method_types: ['card'],
    })
    return NextResponse.json({ ok: true, url: checkout.url })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || 'stripe_error' }, { status: 500 })
  }
}

