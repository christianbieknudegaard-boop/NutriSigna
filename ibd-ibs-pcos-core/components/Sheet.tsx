import React from 'react'

export default function Sheet({ children, open, onClose }: any) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in" onClick={onClose}></div>
      <div className="w-full bg-[var(--card)] rounded-t-[var(--radius-lg)] p-3 max-h-[85vh] overflow-auto animate-in" style={{boxShadow:'var(--shadow-md)'}}>
        <div className="w-full flex justify-center mb-3">
          <div className="w-12 h-1.5 rounded-full bg-[var(--border)]" />
        </div>
        {children}
      </div>
    </div>
  )
}
