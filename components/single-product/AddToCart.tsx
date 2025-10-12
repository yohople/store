import React from 'react'
import {Button} from "@/components/ui/button";

function AddToCart({productId}:{productId:string}) {
  console.log(productId);
  
  return (
    <Button className='mt-8 capitalize' size="lg">add to cart</Button>
  )
}

export default AddToCart
