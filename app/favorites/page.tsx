import SectionTitle from '@/components/global/SectionTitle'
import ProductsGrid from '@/components/products/ProductsGrid'
import { fetchUserFavorites } from '@/utils/action'
import React from 'react'

async function FavoritesPage() {
  const favorites = await fetchUserFavorites()
  if(favorites.length === 0) return <SectionTitle title="you have no favorites yet."/>
  return (
    <div>
      <SectionTitle title="favorites"/>
      <ProductsGrid products={favorites.map((favorite)=>favorite.product)}/>
    </div>
  )
}

export default FavoritesPage
