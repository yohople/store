import CartItemsList from '@/components/cart/CartItemsList'
import CartTotals from '@/components/cart/CartTotals'
import SectionTitle from '@/components/global/SectionTitle'
import { fetchOrCreateCart, updateCart } from '@/utils/action'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

async function CartPage() {
  const {userId} = auth()
  if(!userId) redirect("/")
  const previousCart = await fetchOrCreateCart({userId})
  const {currentCart, cartItems} = await updateCart(previousCart)
  if(currentCart.numItemsInCart===0) return <SectionTitle title="empty cart"/>
  return (
    <>
    <SectionTitle title="shopping cart"/>
      <div className='mt-8 grid lg:grid-cols-12 gap-5'>
        <div className='col-span-8'>
          <CartItemsList cartItems={cartItems}/>
        </div>
        <div className='col-span-4'>
          <CartTotals cart={currentCart}/> 
        </div>
      </div>
    </>
  )
}

export default CartPage
