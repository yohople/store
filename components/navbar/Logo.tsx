import React from 'react'
import { FaStore } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Logo() {
  return (
    <div>
      <Button size="icon" asChild>
        <Link href="/">
        <FaStore className='w-6 h-6'/>
        </Link>
      </Button>
    </div>
  )
}

export default Logo
