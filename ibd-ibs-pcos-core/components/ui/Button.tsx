import React from 'react'

export default function Button({children,variant='primary',size='md',className='',...props}:any){
  const base = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none'
  const sizes:any = {sm:'px-3 py-1.5 text-sm', md:'px-4 py-2 text-base', lg:'px-5 py-3 text-lg'}
  const variantCls:any = {
    primary: `bg-[var(--accent)] text-white`,
    secondary: `bg-white border text-[var(--text)]`,
    ghost: `bg-transparent text-[var(--text)]`,
    danger: `bg-[var(--bad)] text-white`
  }
  return <button className={`${base} ${sizes[size]} ${variantCls[variant]} ${className}`} {...props}>{children}</button>
}
