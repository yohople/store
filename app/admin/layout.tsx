import { Separator } from '@/components/ui/separator'
import React from 'react'
import Sidebar from './Sidebar'

function DashBoarLayout({children}:{children:React.ReactNode}) {
  return (
    <>
    <h1 className='text-2xl pl-4'>DashBoard</h1>
      <Separator className='mt-2'/>
      <div className='grid lg:grid-cols-12 gap-12 mt-12'>
        <div className='grid lg:col-span-2'>
          <Sidebar />
        </div>
        <div className='grid lg:col-span-10'>
          {children}
        </div>
      </div>
    </>
  )
}

export default DashBoarLayout
