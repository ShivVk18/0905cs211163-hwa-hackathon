'use client';

import Link from 'next/link';
import { motion } from 'motion/react';

import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { Badge } from '@/components/Badge';
import { ProductImage } from '@/components/ProductImage';

const colors = [
  { name: 'Background', hex: '#FFF7ED' },
  { name: 'Teal', hex: '#126D68' },
  { name: 'Dark Teal', hex: '#103B38' },
  { name: 'Peach', hex: '#F9D6C8' },
  { name: 'Coral', hex: '#F1785B' },
  { name: 'Yellow', hex: '#FFC94A' },
  { name: 'Lavender', hex: '#A78BDA' },
  { name: 'Text', hex: '#202B29' },
];

export default function DesignPreview() {
  return (
    <main className="min-h-screen bg-background text-text selection:bg-coral selection:text-white">
      <Container>
        <SectionHeading
          title="AwayStack Design System"
          subtitle="Premium • Modern • Playful • Warm"
        />

        {/* Colors */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h3 className="text-xl font-heading font-semibold mb-4">Color palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {colors.map((c) => (
                <div
                  key={c.name}
                  className="rounded-card shadow-card p-4 flex flex-col items-center gap-2 border border-peach/40"
                >
                  <div
                    className={`w-16 h-16 rounded-xl ${c.name === 'Background' ? 'border border-teal/20' : ''}`}
                    style={{ backgroundColor: c.hex }}
                  ></div>
                  <span className="text-xs font-medium text-text">{c.name}</span>
                  <span className="text-[10px] text-teal/60 font-mono">{c.hex}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <h3 className="text-xl font-heading font-semibold">Typography</h3>
            <h1 className="text-5xl font-heading font-bold tracking-tight">Heading 1 — Big and attractive</h1>
            <h2 className="text-4xl font-heading font-bold tracking-tight">Heading 2 — Section titles</h2>
            <h3 className="text-2xl font-heading font-semibold">Heading 3 — Card titles</h3>
            <p className="text-base font-body text-text/80 leading-relaxed">
              Body text uses DM Sans — clean, geometric, easy to read at any size.
              This is how paragraphs flow across the site with generous line height.
            </p>
            <p className="text-sm font-body text-teal/70 leading-relaxed">
              Small text / captions stay legible and warm.
            </p>
          </motion.div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <h3 className="text-xl font-heading font-semibold">Buttons</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button variant="primary" size="md">
                Buy Now
              </Button>
              <Button variant="secondary" size="md">
                Learn More
              </Button>
              <Button variant="outline" size="md">
                View Details
              </Button>
              <Button variant="ghost" size="md">
                Cancel
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </motion.div>
        </section>

        {/* Badges */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-center space-y-6"
          >
            <h3 className="text-xl font-heading font-semibold">Badges</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="teal" size="md">Teal</Badge>
              <Badge variant="dark" size="md">Dark Teal</Badge>
              <Badge variant="peach" size="md">Peach</Badge>
              <Badge variant="coral" size="md">Coral</Badge>
              <Badge variant="yellow" size="md">Yellow</Badge>
              <Badge variant="lavender" size="md">Lavender</Badge>
              <Badge variant="outline" size="md">Outline</Badge>
            </div>
          </motion.div>
        </section>

        {/* Cards */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-card shadow-card bg-white p-6 border border-peach/40 group hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-32 rounded-lg bg-yellow/20 mb-4 flex items-center justify-center">
                  <span className="text-teal font-heading font-bold">Product Image</span>
                </div>
                <h4 className="text-lg font-heading font-bold mb-2">Premium feature</h4>
                <p className="text-sm text-text/70 leading-relaxed">
                  Clean, rounded card with soft shadow — no glassmorphism, no gradients.
                </p>
                <Button variant="ghost" size="sm" className="mt-4">
                  Explore
                </Button>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ProductImage with real images */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { src: '/images/hero.jpg', alt: 'AwayStack hero product shot' },
              { src: '/images/cutaway.jpg', alt: 'Cutaway view of mechanism' },
              { src: '/images/dial.jpg', alt: 'Wind-up dial close-up' },
              { src: '/images/scent.jpg', alt: 'Scent band detail' },
            ].map((img, i) => (
              <div key={i} className="rounded-card shadow-card overflow-hidden border border-peach/40 group">
                <ProductImage
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={300}
                  priority={i === 0}
                  animate
                />
              </div>
            ))}
          </motion.div>
        </section>

        {/* SectionHeading demo */}
        <section className="mb-16">
          <SectionHeading
            title="This is a SectionHeading component"
            subtitle="Uses motion for gentle entrance"
            align="center"
          />
          <p className="text-center text-text/70 max-w-xl mx-auto">
            The SectionHeading renders a small badge-style subtitle above a large
            heading, both fading in with Motion. Use it at the top of every page section.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-xl bg-teal p-8 md:p-12 text-center shadow-soft">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-3xl font-heading font-bold text-white mb-3">Ready to meet AwayStack?</h3>
            <p className="text-teal/100 mb-6 max-w-md mx-auto text-lg">
              A wind-up clock mechanism that releases one frozen lick cup at a time — for calmer, happier dogs.
            </p>
            <Button variant="coral" size="lg" asChild>
              <Link href="/">Get AwayStack</Link>
            </Button>
          </motion.div>
        </section>
      </Container>
    </main>
  );
}
