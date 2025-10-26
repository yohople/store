import React from "react";
import HeroCarousel from "./HeroCarousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl sm:text-6xl capitalize">
          we are changing the way people shop
        </h1>
        <p className="max-w-xl mt-8 text-lg leading-8 text-muted-foreground">
          Discover the perfect blend of style, quality, and convenience right at
          your fingertips. Whether you’re upgrading your home, refreshing your
          wardrobe, or finding the perfect gift, we bring the best products
          straight to your door. Enjoy effortless shopping, exclusive deals, and
          fast, reliable delivery that makes every purchase a delight. Shop
          smart, live better, and experience shopping the way it should be
        </p>
        <Button size="lg" className="mt-10">
          <Link href="/products">Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
}

export default Hero;
