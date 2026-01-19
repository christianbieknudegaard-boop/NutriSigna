type Toast = { id: string, message: string }
const toasts: Toast[] = []
const subs: ((t:Toast[])=>void)[] = []
export function pushToast(message:string){
  const id = Math.random().toString(36).slice(2)
  toasts.push({id,message})
  subs.forEach(s=>s([...toasts]))
  setTimeout(()=>{ // auto remove
    const idx = toasts.findIndex(x=>x.id===id)
    if (idx>-1) { toasts.splice(idx,1); subs.forEach(s=>s([...toasts])) }
  },4000)
}
export function subscribe(fn:(t:Toast[])=>void){ subs.push(fn); return ()=>{ const i=subs.indexOf(fn); if(i>-1) subs.splice(i,1)} }
