import { fetchFeaturedProducts } from '@/utils/action'
import React from 'react'
import EmptyList from '../global/EmptyList'
import SectionTitle from '../global/SectionTitle';
import ProductsGrid from '../products/ProductsGrid';

async function FeaturedProducts() {
  const products = await fetchFeaturedProducts()
  if(products.length===0) return <EmptyList/>
  return (
    <section className='pt-24'>
      <SectionTitle title="featured products"/>
      <ProductsGrid products={products}/>
    </section>
  )
}

export default FeaturedProducts
