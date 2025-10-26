import React from 'react'
import { Separator } from '../ui/separator'
import { Card, CardTitle } from '../ui/card'
import { formatCurrency } from '@/utils/format'
import { Cart } from '@prisma/client'
import FormContainer from '../form/FormContainer'
import { createOrderAction } from '@/utils/action'
import { SubmitButton } from '../form/Buttons'

function CartTotals({cart}:{cart:Cart}) {
    const {cartTotal, orderTotal, shipping, tax} = cart
  return (
    <>
    <Card className='p-8'>
        <CartTotalRows label="Sub Total" amount={formatCurrency(cartTotal)}/>
        <CartTotalRows label="Shipping" amount={formatCurrency(shipping)}/>
        <CartTotalRows label="tax" amount={formatCurrency(tax)}/>
        <CardTitle>
            <CartTotalRows label="Order Total" amount={formatCurrency(orderTotal)} lastRow/>
        </CardTitle>
       
    </Card>
     <FormContainer action={createOrderAction}>
            <SubmitButton text='place order' className='w-full capitalize mt-8'/>
        </FormContainer>
    </>
  )
}

function CartTotalRows({label,amount,lastRow}:{label:string, amount:string, lastRow?:boolean}){
    return <>
    <p className='flex justify-between text-sm capitalize'>
            <span>{label}</span>
            <span>{amount}</span>
        </p>
        {lastRow?null:<Separator className='my-2'/>}
    </>
}

export default CartTotals
