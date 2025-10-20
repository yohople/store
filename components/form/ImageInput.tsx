import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const name="image"
function ImageInput() {
  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>{name}</Label>
      <Input type="file" id={name} name={name} required accept='images/*'/>
    </div>
  )
}

export default ImageInput
