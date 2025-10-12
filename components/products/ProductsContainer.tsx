import { fetchAllProducts } from "@/utils/action";
import React from "react";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { MdGridView } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";

async function ProductsContainer({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) {
  const products = await fetchAllProducts({search});
  const totalProducts = products.length;
  const searchTerm = search ? `&search=${search}` : "";

  return (
    <>
      <section className="flex items-center justify-between">
        <h1 className="text-lg capitalize">{totalProducts} product{totalProducts>1&&"s"}</h1>
        <div className="flex gap-x-4">
          <Button variant={layout === "grid" ? "default" : "outline"} size="icon" asChild>
            <Link href={`/products?layout=grid${searchTerm}`}>
              <MdGridView/>
            </Link>
          </Button>
          <Button variant={layout === "list" ? "default" : "outline"} size="icon" asChild>
            <Link href={`/products?layout=list${searchTerm}`}>
              <FaList/>
            </Link>
          </Button>
        </div>
        
      </section>
      <Separator className="my-4" />
      <div>
        {totalProducts === 0 ? (
          "Sorry no product matched your search..."
        ) : layout === "grid" ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  );
}

export default ProductsContainer;
