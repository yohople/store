import React from "react";
import { Product } from "@prisma/client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "./FavoriteToggleButton";

function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="mt-12 grid gap-y-8">
      {products.map((product) => {
        const { id, name, image, price, company } = product;
        const dollarsAmount = formatCurrency(price)
        return (
          <article className="group relative" key={id}>
            <Link href={`/products/${id}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                  <div className="relative h-64 md:h-48 md:w-48">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      priority
                      className="w-full rounded object-cover"
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold capitalize">{name}</h2>
                    <h4 className="text-muted-foreground">{company}</h4>
                  </div>
                  <p className="text-muted-foreground md:ml-auto text-lg">{dollarsAmount}</p>

                </CardContent>
              </Card>
            </Link>
            <div className="absolute bottom-8 right-8">
              <FavoriteToggleButton productId={id}/>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsList;
