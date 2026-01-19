import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' })

async function buffer(stream: any) {
  const chunks: any[] = []
  for await (const chunk of stream) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) return NextResponse.json({ ok: true, configured: false }, { status: 501 })

  const sig = (req.headers.get('stripe-signature') as string) || ''
  const buf = await buffer(req.body as any)

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET || '')
  } catch (err: any) {
    return NextResponse.json({ error: 'invalid_signature' }, { status: 400 })
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      const customer = session.customer as string | Stripe.Customer
      const metadata: any = (session.metadata || {})
      const userId = metadata.userId || (session.client_reference_id as string | undefined)
      if (session.subscription && userId) {
        const subId = session.subscription as string
        const stripeSub = await stripe.subscriptions.retrieve(subId)
        const plan = stripeSub.items.data[0]?.price?.id === process.env.STRIPE_PRICE_PLUS_69 ? 'plus' : 'family'
        await prisma.subscription.upsert({
          where: { userId },
          update: {
            stripeCustomerId: typeof customer === 'string' ? customer : customer?.id,
            stripeSubId: stripeSub.id,
            status: stripeSub.status,
            plan,
            currentPeriodEnd: stripeSub.current_period_end ? new Date(stripeSub.current_period_end * 1000) : null,
          },
          create: {
            userId,
            stripeCustomerId: typeof customer === 'string' ? customer : customer?.id,
            stripeSubId: stripeSub.id,
            status: stripeSub.status,
            plan,
            currentPeriodEnd: stripeSub.current_period_end ? new Date(stripeSub.current_period_end * 1000) : null,
          },
        })
      }
    }

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      const subObj = event.data.object as Stripe.Subscription
      const stripeSubId = subObj.id
      const local = await prisma.subscription.findFirst({ where: { stripeSubId } })
      if (local) {
        const plan = subObj.items.data[0]?.price?.id === process.env.STRIPE_PRICE_PLUS_69 ? 'plus' : 'family'
        await prisma.subscription.update({ where: { id: local.id }, data: { status: subObj.status, plan, currentPeriodEnd: subObj.current_period_end ? new Date(subObj.current_period_end * 1000) : null } })
      }
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.warn('webhook handler error', err)
    return NextResponse.json({ error: err.message || 'webhook_error' }, { status: 500 })
  }
}
