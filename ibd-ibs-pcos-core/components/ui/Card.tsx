import React from 'react'

export function Card({children, className=''}:{children:React.ReactNode, className?:string}){
  return <div className={`rounded-[var(--radius-md)] bg-[color:var(--card)] border shadow-sm border-[var(--border)] ${className}`} style={{boxShadow:'var(--shadow-sm)'}}>{children}</div>
}

export function CardHeader({children, className=''}:{children:React.ReactNode,className?:string}){
  return <div className={`px-4 py-3 border-b border-[var(--border)] ${className}`}>{children}</div>
}

export function CardContent({children, className=''}:{children:React.ReactNode,className?:string}){
  return <div className={`p-4 ${className}`}>{children}</div>
}

export default Card
