import { cn } from '@/lib/utils'
import React from 'react'

function EmptyList({heading="No items found", className}: {heading?:string, className?:string}) {
  return (
    <div>
      <h2 className={cn('text-3xl', className)}>{heading}</h2>
    </div>
  )
}

export default EmptyList
