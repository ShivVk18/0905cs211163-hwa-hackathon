'use client';

import { useState } from 'react';

import { Container } from '@/components/Container';
import { useCart } from '@/components/CartProvider';

import { ProductGallery } from '@/components/ProductGallery';
import { ProductInfo } from '@/components/ProductInfo';
import { ProductPurchase } from '@/components/ProductPurchase';
import { DeliveryChecker } from '@/components/DeliveryChecker';
import { TrustCards } from '@/components/TrustCards';
import { ProductTabs } from '@/components/ProductTabs';
import { LifestyleImages } from '@/components/LifestyleImages';
import { product } from '@/data/product';

export default function AwayStackPage() {
  const [selectedId, setSelectedId] = useState(product.images[0].id);
  const { cartCount } = useCart();

  const handleBuyNow = (items, total) => {
    sessionStorage.setItem(
      'awaystack_checkout',
      JSON.stringify({ items, total })
    );
    window.location.href = '/shop/awaystack/checkout';
  };

  const handleAddToCart = (items, total) => {
    sessionStorage.setItem(
      'awaystack_checkout',
      JSON.stringify({ items, total })
    );
    window.location.href = '/shop/awaystack/checkout';
  };

  return (
    <main className="bg-background">
      <Container>
        {/* Product — gallery and information side by side */}
        <section className="scroll-mt-24 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16 pt-10 sm:pt-14">
          <ProductGallery
            images={product.images}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
          <div className="flex flex-col gap-8 sm:gap-10">
            <ProductInfo
              badges={product.badges}
              name={product.name}
              description={product.description}
              price={product.price}
            />
            <ProductPurchase
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
            <DeliveryChecker />
          </div>
        </section>

        {/* Trust strip — full page width */}
        <section className="scroll-mt-24 py-6 sm:py-8">
          <TrustCards />
        </section>

        {/* Information tabs — full page width */}
        <section className="scroll-mt-24 py-6 sm:py-8">
          <ProductTabs />
        </section>

        {/* Lifestyle images — full page width */}
        <section className="scroll-mt-24 py-20 sm:py-28">
          <LifestyleImages />
        </section>
      </Container>
    </main>
  );
}
