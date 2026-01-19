import React from 'react'
import { PLAN_LIST } from '@/lib/plans'

export default async function BillingPage() {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Abonnement</h1>
      <p className="mb-4">Velg et abonnement for å låse opp flere funksjoner.</p>
      <div className="space-y-4">
        {PLAN_LIST.map((p) => (
          <div key={p.key} className="border rounded p-4 flex justify-between items-center">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-muted-foreground">{p.priceNok} NOK / måned</div>
            </div>
            <div className="space-x-2">
              <form action="/api/billing/create-checkout" method="post">
                <input type="hidden" name="plan" value={p.key} />
                <button className="btn btn-primary">Oppgrader</button>
              </form>
              <form action="/api/billing/portal" method="post">
                <button className="btn">Administrer abonnement</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
