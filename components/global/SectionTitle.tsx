import { Separator } from "@/components/ui/separator"
import React from 'react'


function SectionTitle({title}:{title:string}) {
  return (
    <div>
      <h2 className='text-3xl capitalize mb-8 font-medium tracking-wider'>{title}</h2>
      <Separator />
    </div>
  )
}

export default SectionTitle
