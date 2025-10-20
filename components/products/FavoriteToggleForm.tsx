"use client"
import { toggleFavoriteAction } from '@/utils/action';
import { usePathname } from 'next/navigation';
import React from 'react'
import FormContainer from '../form/FormContainer';
import { CardSubmitButton } from '../form/Buttons';


type FavoriteToggleFormProps = {
  productId: string;
  favoriteId: string | null;
};

function FavoriteToggleForm({productId, favoriteId}:FavoriteToggleFormProps) {
  const pathName = usePathname()
  const toggleAction = toggleFavoriteAction.bind(null, {productId, favoriteId, pathName})

  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId?true:false}/>
    </FormContainer>
  )
}

export default FavoriteToggleForm
