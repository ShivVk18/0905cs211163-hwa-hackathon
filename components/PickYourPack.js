'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { useCart } from '@/components/CartProvider';

const PACKS = [
  {
    id: 'awaystack',
    name: 'AwayStack',
    price: 1499,
    description: 'Tower, lick tray, scent band and 6 reusable cups',
  },
  {
    id: 'starter-kit',
    name: 'Starter Kit',
    price: 1999,
    description: 'Everything above, plus 12 flavour cups and a cup mould',
  },
];

function formatPrice(price) {
  return price.toLocaleString('en-IN');
}

export function PickYourPack() {
  const [selectedId, setSelectedId] = useState(PACKS[0].id);
  const [isAdded, setIsAdded] = useState(false);
  const timerRef = useRef(null);
  const { addToCart, cartCount } = useCart();

  const selected = PACKS.find((pack) => pack.id === selectedId) ?? PACKS[0];

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAddToCart = () => {
    addToCart({ id: selected.id, name: selected.name, price: selected.price });
    setIsAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIsAdded(false), 2200);
  };

  return (
    <section id="pick-your-pack" className="relative scroll-mt-28 bg-background py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — the complete kit */}
          <motion.div
            initial={{ opacity: 0, x: -26 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto w-full max-w-[560px] lg:mx-0"
          >
            <div className="overflow-hidden rounded-[2rem] bg-white p-3 shadow-soft sm:p-4">
              <img
                src="/images/kit.jpg"
                alt="The complete AwayStack kit laid out — the frosted tower, teal lick tray, peach scent band, cup mould and six reusable lick cups in different flavours"
                width={1024}
                height={687}
                loading="lazy"
                decoding="async"
                className="block aspect-[3/2] w-full rounded-[1.5rem] object-cover"
              />
            </div>
            <span className="absolute -top-5 right-5 inline-flex items-center rounded-full border-2 border-text bg-coral px-4 py-2 font-heading text-sm font-bold text-white shadow-soft">
              Free delivery
            </span>
          </motion.div>

          {/* Right — pack selector */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-text sm:text-5xl lg:text-[3.4rem]">
              Pick your pack
            </h2>

            <div className="mt-8 space-y-3" role="group" aria-label="Choose a pack">
              {PACKS.map((pack) => {
                const isSelected = pack.id === selectedId;
                return (
                  <button
                    key={pack.id}
                    type="button"
                    onClick={() => setSelectedId(pack.id)}
                    aria-pressed={isSelected}
                    className={`flex w-full items-start justify-between gap-4 rounded-2xl border-2 p-5 text-left transition-all duration-200 ${
                      isSelected
                        ? 'border-text bg-white shadow-[0_4px_0_#202B29]'
                        : 'border-text/15 bg-background hover:border-text/40'
                    }`}
                  >
                    <span>
                      <span className="block font-heading text-xl font-bold text-text">
                        {pack.name}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-text/70">
                        {pack.description}
                      </span>
                    </span>
                    <span className="shrink-0 font-heading text-xl font-bold text-teal">
                      ₹{formatPrice(pack.price)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Button
                variant="raised"
                size="lg"
                shape="pill"
                onClick={handleAddToCart}
                className="w-full sm:w-auto"
              >
                {isAdded ? 'Added to cart' : `Add to cart · ₹${formatPrice(selected.price)}`}
              </Button>
              <p className="text-sm text-text/60">30-day returns · Cash on delivery</p>
            </div>

            <p aria-live="polite" className="mt-4 text-sm font-semibold text-teal">
              {isAdded
                ? `${selected.name} added — ${cartCount} item${cartCount === 1 ? '' : 's'} in cart.`
                : ''}
            </p>

            <p className="mt-3 max-w-lg text-xs leading-relaxed text-text/50">
              Concept product. Pack contents and pricing are illustrative for this
              preview and have not been verified.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default PickYourPack;
