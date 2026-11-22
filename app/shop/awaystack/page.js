'use client';

import { useState } from 'react';

import { Container } from '@/components/Container';

import { ProductGallery } from '@/components/ProductGallery';
import { ProductInfo } from '@/components/ProductInfo';
import { ProductPurchase } from '@/components/ProductPurchase';
import { DeliveryChecker } from '@/components/DeliveryChecker';
import { TrustCards } from '@/components/TrustCards';
import { product } from '@/data/product';

export default function AwayStackPage() {
  const [selectedId, setSelectedId] = useState(product.images[0].id);

  return (
    <section className="bg-background py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
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
            <ProductPurchase />
            <DeliveryChecker />
            <TrustCards />
          </div>
        </div>
      </Container>
    </section>
  );
}
