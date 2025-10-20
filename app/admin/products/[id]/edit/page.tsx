import FormContainer from '@/components/form/FormContainer'
import { fetchAdminProductDetail, updateProductAction, updateProductImageAction } from '@/utils/action'
import FormInput  from '@/components/form/FormInput'
import React from 'react'
import PriceInput from '@/components/form/PriceInput'
import CheckBoxInput from '@/components/form/CheckBoxInput'
import { SubmitButton } from '@/components/form/Buttons'
import TextAreaInput from '@/components/form/TextAreaInput'
import ImageInputContainer from '@/components/form/ImageInputContainer'

async function EditProduct({params}:{params:{id:string}}) {
    const {id} = params
    const product = await fetchAdminProductDetail(id)
    const {name, company, description, price, featured, image} = product
  return (
    <section>
        <h1 className='text-2xl font-semibold mb-8 capitalize'>update product</h1>
        <div className='border p-8 rounded'>
            <ImageInputContainer image={image} name={name} action={updateProductImageAction} text="update image">
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="url" value={image} />
            </ImageInputContainer>
            <FormContainer action={updateProductAction}>
            <div className='grid my-4 md:grid-cols-2 gap-4'>
                <input type="hidden" name='id' value={id} />
                <FormInput name="name" type="text" defaultValue={name} label="Product Name"/> 
                <FormInput name="company" type="text" defaultValue={company}/>
                <PriceInput defaultValue={price}/> 
            </div>
            <TextAreaInput name="description" labelText="product description" defaultValue={description}/>
            <div className='mt-6'>
              <CheckBoxInput name="featured" defaultChecked={featured} label="featured"/>
            </div>
            <SubmitButton className='mt-8'/>
            </FormContainer>
        </div>
    </section>
  )
}

export default EditProduct
