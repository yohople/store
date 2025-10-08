import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {links} from "@/utils/utils"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LuAlignLeft } from "react-icons/lu";

function LinksDropdown() {
  return (
    <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className='flex gap-x-4 max-w-[100px]'>
      <LuAlignLeft className='w-6 h-6'/>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className='w-40' align='start' sideOffset={10}>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {links.map((link)=>{
    return <DropdownMenuItem key={link.href}>
      <Link href={link.href} className='capitalize w-full'>{link.label}</Link>
    </DropdownMenuItem>
       
    })}
  </DropdownMenuContent>
</DropdownMenu>
  )
}

export default LinksDropdown