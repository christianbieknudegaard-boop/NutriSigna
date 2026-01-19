import React from 'react'
import MealTemplatesList from '@/components/MealTemplatesList'
import UpsellClientWrapper from '@/components/UpsellClientWrapper'
import { getUserIdFromSession } from '@/lib/server/session'
import { getUserSubscription, userHasFeature } from '@/lib/server/subscription'

export default async function MealTemplatesPage() {
  const userId = await getUserIdFromSession();
  const sub = userId ? await getUserSubscription(userId) : null;
  const allowed = userHasFeature(sub as any, 'templates')
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Måltidsmaler</h2>
      {allowed ? <MealTemplatesList /> : <div className="mt-3"><UpsellClientWrapper feature="templates" /></div>}
    </div>
  )
}
