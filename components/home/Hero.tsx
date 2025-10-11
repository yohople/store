import React from "react";
import HeroCarousel from "./HeroCarousel";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl sm:text-6xl capitalize">
          we are changing the way people shop
        </h1>
        <p className="max-w-xl mt-8 text-lg leading-8 text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam quibusdam beatae corporis?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odit nostrum unde.
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
