'use client';

import { motion } from 'motion/react';

import { Badge } from '@/components/Badge';

export function WelcomeHomeBanner() {
  return (
    <section id="welcome-home" className="bg-background pt-12 pb-10 sm:pt-14 sm:pb-14">
      <div className="mx-auto w-[90%] max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative h-[380px] overflow-hidden rounded-[2.5rem] bg-dark-teal shadow-soft sm:h-[420px] lg:h-[450px]"
        >
          <img
            src="/images/welcome-home.jpg"
            alt="A dog greeting their owner in the hallway of a home, with the AwayStack tower waiting by the door"
            width={926}
            height={434}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[58%_50%] lg:object-bottom"
          />

          {/* Readability gradients — darkest toward the bottom left */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-dark-teal/90 via-dark-teal/40 to-dark-teal/5"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-dark-teal/70 via-dark-teal/25 to-transparent"
          />

          {/* Copy */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-12">
            <div className="max-w-xl">
              <Badge variant="yellow" size="md" className="font-bold tracking-tight">
                The Welcome Home cup
              </Badge>

              <h2 className="mt-4 font-heading text-[2rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
                The last cup means you&rsquo;re almost back.
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
                A special beetroot berry cup is served 15 min before you are due so the
                door opening is the best part of their day.
              </p>

              <p className="mt-3 max-w-md text-xs leading-relaxed text-white/55">
                A proposed product feature. The recipe and serving timing have not been
                independently tested.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WelcomeHomeBanner;
