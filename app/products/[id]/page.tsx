import { fetchSingleProduct } from "@/utils/action";
import { formatCurrency } from "@/utils/format";
import React from "react";
import BreadCrumb from "@/components/single-product/BreadCrumb";
import Image from "next/image";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import ProductRating from "@/components/single-product/ProductRating";
import AddToCart from "@/components/single-product/AddToCart";

async function SingleProduct({ params }: { params: { id: string } }) {
  const product = await fetchSingleProduct(params.id);
  const { image, name, description, price, id, company } = product;
  const dollarAmount = formatCurrency(price);
  return (
    <section>
      <BreadCrumb name={name} />
      <div className="grid mt-6 gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <div className="relative h-full">
          <Image
            src={image}
            alt={name}
            fill
            priority
            className="object-cover rounded w-full"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          />
        </div>
        <div>
            <div className="flex gap-x-8 items-center">
                <h1 className="text-3xl font-bold capitalize">{name}</h1>
                <FavoriteToggleButton productId={id}/>
            </div>
            <ProductRating productId={id}/>
            <h4 className="text-xl mt-2">{company}</h4>
            <p className="mt-3 text-md bg-muted inline-block p-2 rounded">{dollarAmount}</p>
            <p className="mt-6 text-muted-foreground leading-8">{description}</p>
            <AddToCart productId={id} />
        </div>
      </div>
    </section>
  );
}

export default SingleProduct;
