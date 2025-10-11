import React from "react";
import { Product } from "@prisma/client";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import FavoriteToggleButton from "./FavoriteToggleButton";

function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pt-24">
      {products.map((product) => {
        const { id, image, price, name } = product;
        const dollarAmount = formatCurrency(price);
        return (
          <article key={id} className="relative group">
            <Link href={`products/${id}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-4">
                  <div className="relative h-64 md:h-48 rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      priority
                      sizes="(max-width-768px) 100vw, (max-width-1200px) 50vw, 33vw"
                      className="rounded w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h2 className="text-lg capitalize">{name}</h2>
                    <p className="text-muted-foreground mt-2">{dollarAmount}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute top-7 right-7">
              <FavoriteToggleButton productId={id}/>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsGrid;
