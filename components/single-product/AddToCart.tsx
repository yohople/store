"use client"
import { useState } from 'react'
import SelectProductAmount from './SelectProductAmount';
import {Mode} from "./SelectProductAmount"
import FormContainer from '../form/FormContainer';
import {addToCartAction} from "@/utils/action"
import { ProductSignInButton, SubmitButton } from '../form/Buttons';
import { useAuth } from '@clerk/nextjs';

function AddToCart({productId}:{productId:string}) {
  const [amount, setAmount] = useState(1)
  const {userId} = useAuth()
  return (
    <div className='mt-4'>
      <SelectProductAmount amount={amount} mode={Mode.SingleProduct} setAmount={setAmount} />
      {userId?
      <FormContainer action={addToCartAction}>
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="amount" value={amount} />
        <SubmitButton text='Add to Cart' className='mt-8'/>
      </FormContainer>:
      <ProductSignInButton />
      }
    </div>

  )
}

export default AddToCart
