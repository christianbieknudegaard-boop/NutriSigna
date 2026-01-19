"use client";
import CycleForm from '@/components/CycleForm'

export default function NewCyclePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Ny syklusoppføring</h1>
      <div className="mt-3"><CycleForm /></div>
    </div>
  )
}
