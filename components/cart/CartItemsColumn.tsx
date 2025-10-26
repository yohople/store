import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/utils/format";

export const FirstColumn = ({
  name,
  image,
}: {
  name: string;
  image: string;
}) => {
  return (
    <div className="relative h-24 w-24 sm:h-34 sm:w-34">
      <Image
        src={image}
        alt={name}
        fill
        priority
        className="w-full rounded-md object-cover"
        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
      />
    </div>
  );
};

export const SecondColumn = ({
  name,
  company,
  productId,
}: {
  name: string;
  company: string;
  productId: string;
}) => {
    return <div>
        <Link href={`/products/${productId}`}>
            <h3 className="capitalize hover:underline font-medium">{name}</h3>
        </Link>
        <h4 className="capitalize text-xs mt-2">{company}</h4>
    </div>
};

export const FourthColumn = ({price}:{price:number}) =>{
    return <p className="font-medium md:ml-auto">{formatCurrency(price)}</p>
}
