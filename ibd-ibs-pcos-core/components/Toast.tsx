"use client"
import React, { useEffect, useState } from 'react'
import { subscribe } from '../../ibd-ibs-pcos-core/lib/toast'

export default function Toasts(){
  const [items,setItems] = useState<any[]>([])
  useEffect(()=> subscribe(setItems), [])
  if (!items.length) return null
  return (
    <div className="fixed bottom-6 left-0 right-0 z-60 flex justify-center pointer-events-none">
      <div className="max-w-md w-full space-y-2 pointer-events-auto">
        {items.map(t=> (
          <div key={t.id} className="bg-[var(--card)] p-3 rounded-lg shadow-md animate-in">{t.message}</div>
        ))}
      </div>
    </div>
  )
}
