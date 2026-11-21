'use client';

import { motion } from 'motion/react';

import { Badge } from '@/components/Badge';
import { Container } from '@/components/Container';

const STEPS = [
  {
    label: 'Step 1',
    title: 'Stack and wind',
    body: 'Load six frozen cups, close the lid, turn the dial. Turning it winds the spring.',
    image: '/images/dial.jpg',
    alt: 'A hand turning the white dial on the peach base of the AwayStack, with the scent band and six session indicators visible',
  },
  {
    label: 'Step 2',
    title: 'Add your scent',
    body: 'Rub the soft band on your hands and wrap it around the base.',
    image: '/images/scent.jpg',
    alt: 'Hands wrapping the soft scent band around the base of the AwayStack while a dog leans in to sniff',
  },
  {
    label: 'Step 3',
    title: 'Leave happy',
    body: 'The first cup is ready as you leave. The remaining sessions follow your selected schedule.',
    image: '/images/leaving.jpg',
    alt: 'An owner leaving through the front door while the dog licks from the AwayStack tower',
  },
];

export function SetupSteps() {
  return (
    <section id="setup" className="relative scroll-mt-28 bg-background py-20 sm:py-28">
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-bold uppercase tracking-[0.14em] text-coral shadow-card">
            Set up in a minute
          </span>
          <h2 className="mt-6 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-[3.4rem]">
            <span className="text-text">Stack. Wind. Scent. </span>
            <span className="text-teal">Go.</span>
          </h2>
        </motion.div>

        {/* Three setup cards */}
        <div className="mt-14 grid gap-7 sm:mt-16 lg:grid-cols-3 lg:items-start lg:gap-6">
          {STEPS.map((step, i) => (
            <motion.article
              key={step.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={`overflow-hidden rounded-[2rem] border-2 border-text bg-white p-2.5 shadow-soft ${
                i === 1 ? 'lg:translate-y-10' : ''
              }`}
            >
              <div className="overflow-hidden rounded-[1.5rem] bg-peach/30">
                <img
                  src={step.image}
                  alt={step.alt}
                  width={1024}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                />
              </div>

              <div className="px-3 pb-3 pt-5 sm:px-4 sm:pb-4">
                <Badge variant="teal" size="sm">
                  {step.label}
                </Badge>
                <h3 className="mt-3.5 font-heading text-2xl font-bold leading-tight text-text">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-text/70">
                  {step.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default SetupSteps;
