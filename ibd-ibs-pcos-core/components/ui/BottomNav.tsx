import React from 'react'

function Tab({label,active}:{label:string, active?:boolean}){
  return (
    <div className={`flex flex-col items-center justify-center text-xs ${active? 'text-accent' : 'text-muted'}`}>
      <div className={`w-6 h-6 rounded ${active? 'bg-accent/10' : ''}`} style={{background: active? 'rgba(124,92,255,0.08)':'transparent'}}></div>
      <span className="mt-1">{label}</span>
    </div>
  )
}

export default function BottomNav(){
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-transparent pointer-events-auto">
      <div className="max-w-3xl mx-auto px-4 pb-env-safe">
        <div className="relative bg-white/70 dark:bg-black/50 backdrop-blur-md rounded-t-xl shadow-md border-t" style={{borderColor:'var(--border)'}}>
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex-1"><Tab label="Home" active /></div>
            <div className="flex-1"><Tab label="Plan" /></div>
            <div className="-mt-6"><button aria-label="Log" className="w-14 h-14 rounded-full shadow-md flex items-center justify-center" style={{background:'var(--accent)', color:'#fff', transform:'translateY(-10%)'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="1.6" strokeLinecap="round"/></svg>
            </button></div>
            <div className="flex-1"><Tab label="Insights" /></div>
            <div className="flex-1"><Tab label="Settings" /></div>
          </div>
        </div>
      </div>
    </nav>
  )
}
