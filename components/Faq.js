'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { faqs } from '@/data/content';

function AccordionIcon({ open }) {
  return (
    <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-text bg-white text-text transition-colors duration-300 sm:h-10 sm:w-10">
      <span className="absolute h-[2.5px] w-4 rounded-full bg-current" />
      <motion.span
        animate={{ scaleY: open ? 0 : 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        className="absolute h-4 w-[2.5px] origin-center rounded-full bg-current"
      />
    </span>
  );
}

export function Faq() {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? null);

  const toggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className="scroll-mt-28 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-[1050px] px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-text sm:text-5xl lg:text-[3.4rem]">
            Questions? <span className="text-coral">We&rsquo;ve got you.</span>
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="mt-12 space-y-3 sm:mt-14 sm:space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: Math.min(i, 3) * 0.05 }}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  isOpen ? 'border-text/70 bg-peach' : 'border-transparent bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:px-7 sm:py-6"
                >
                  <span className="font-heading text-lg font-bold leading-snug text-text sm:text-xl">
                    {faq.question}
                  </span>
                  <AccordionIcon open={isOpen} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      id={`faq-panel-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl px-5 pb-5 text-sm leading-relaxed text-text/70 sm:px-7 sm:pb-6 sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Faq;
