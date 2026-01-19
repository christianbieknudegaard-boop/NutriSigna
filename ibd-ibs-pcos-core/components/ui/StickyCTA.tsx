import React from 'react'

export default function StickyCTA({children}:{children:React.ReactNode}){
  return (
    <div className="fixed left-0 right-0 bottom-0 z-50 px-4 pb-env-safe">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[var(--card)] rounded-xl p-3 shadow-md flex items-center justify-center">{children}</div>
      </div>
    </div>
  )
}
