import React from 'react'
import Header from './Header'
import BottomNav from './BottomNav'
import titles from '../../lib/ui/titles'

export default function AppShell({ children, pathname }:any){
  const title = titles[(pathname ?? '/') as string] ?? 'NutriSigna'
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <Header title={title} />
      <main className="flex-1 pb-24">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
