import React from 'react'
import FavoritesList from '@/components/FavoritesList'
import Upsell from '@/components/Upsell'
import { getUserSubscription, userHasFeature } from '@/lib/server/subscription'

async function getSubscriptionForRequest() {
  try {
    const res = await fetch('/api/auth/session')
    if (!res.ok) return null
    const s = await res.json()
    return s?.user?.id ? await getUserSubscription(s.user.id) : null
  } catch (e) { return null }
}
export default async function FavoritesPage() {
  const sub = await getSubscriptionForRequest()
  const allowed = userHasFeature(sub as any, 'favorites')
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Favoritter</h2>
      {allowed ? <FavoritesList /> : <div className="mt-3"><Upsell feature="favorites" /></div>}
    </div>
  )
}
