import React from 'react'

export default function Header({title}:{title:string}){
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/60 dark:bg-black/40 border-b" style={{borderColor:'var(--border)'}}>
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button aria-label="menu" className="p-2 rounded-md hover:bg-black/5">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="search" className="p-2 rounded-md hover:bg-black/5"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>
          <button aria-label="quick add" className="p-2 bg-accent text-white rounded-md" style={{background:'var(--accent)'}}>+</button>
          <button aria-label="profile" className="p-2 rounded-full bg-white shadow-sm" style={{boxShadow:'var(--shadow-sm)'}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M6 20c1.333-2 3.667-3 6-3s4.667 1 6 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
    </header>
  )
}
