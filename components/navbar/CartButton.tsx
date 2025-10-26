import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link';
import { FaCartArrowDown } from "react-icons/fa";
import { fetchCartItems } from '@/utils/action';


async function CartButton() {
  const itemsInCart = await fetchCartItems()
  return (
    <Button variant="outline" size="icon" className='flex items-center justify-center relative'>
      <Link href="/cart">
      <FaCartArrowDown/>
      <span className='flex absolute -top-3 -right-3 bg-primary text-white rounded-full items-center justify-center text-xs h-6 w-6'>{itemsInCart}</span>
      </Link>
    </Button>
  )
}

export default CartButton