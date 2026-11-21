'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { CartButton } from './CartButton';
import { Container } from './Container';

const PAW_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3.5c2.8 0 4.8 2.8 4.8 5.6s-1.9 5.4-4.8 5.4-4.8-2.6-4.8-5.4S9.2 3.5 12 3.5Z" />
    <circle cx="7.6" cy="6.6" r="1.35" fill="currentColor" />
    <circle cx="11.6" cy="4.4" r="1.35" fill="currentColor" />
    <circle cx="15.6" cy="5.6" r="1.35" fill="currentColor" />
    <circle cx="17.4" cy="9.4" r="1.25" fill="currentColor" />
    <circle cx="6.2" cy="10.4" r="1.25" fill="currentColor" />
  </svg>
);

const MENU_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

const CLOSE_ICON = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ARROW_ICON = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const PRODUCT_HREF = '/shop/awaystack';

const navLinks = [
  { name: 'Home', href: '/', type: 'route' },
  { name: 'How it works', href: '#how-it-works', type: 'section' },
  { name: 'Calm Curve', href: '#calm-curve', type: 'section' },
  { name: 'Day Report', href: '#day-report', type: 'section' },
  { name: 'Shop', href: PRODUCT_HREF, type: 'route' },
  { name: 'FAQ', href: '#faq', type: 'section' },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return true;
}

export function Navbar({ cartCount = 0 }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleSectionClick = (event, id) => {
    event.preventDefault();
    closeMenu();
    if (!scrollToSection(id)) {
      window.location.href = `/#${id}`;
    }
  };

  const handleCartClick = () => {
    closeMenu();
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-peach/50 bg-background/90 backdrop-blur-md">
        <nav aria-label="Main navigation">
          <Container>
            <div className="flex h-16 items-center justify-between gap-4">
              {/* Logo */}
              <Link
                href="/"
                onClick={closeMenu}
                className="group flex shrink-0 items-center gap-2 text-teal transition-transform duration-200 hover:-rotate-3"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal text-white shadow-soft transition-colors duration-200 group-hover:bg-dark-teal">
                  {PAW_ICON}
                </span>
                <span className="font-heading text-xl font-bold tracking-tight text-text">
                  AwayStack
                </span>
              </Link>

              {/* Desktop nav links */}
              <ul className="hidden items-center gap-7 lg:flex">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {link.type === 'section' ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleSectionClick(e, link.href.slice(1))}
                        className="relative py-1 text-sm font-medium text-text/80 transition-colors duration-200 hover:text-teal after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-teal after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="relative py-1 text-sm font-medium text-text/80 transition-colors duration-200 hover:text-teal after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-teal after:transition-all after:duration-300 hover:after:w-full"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

              {/* Desktop right actions */}
              <div className="hidden shrink-0 items-center gap-2 lg:flex">
                <CartButton count={cartCount} onClick={handleCartClick} />
                <Button variant="coral" size="sm" asChild>
                  <Link href={PRODUCT_HREF}>Shop now</Link>
                </Button>
              </div>

              {/* Mobile right actions */}
              <div className="flex shrink-0 items-center gap-1 lg:hidden">
                <CartButton count={cartCount} onClick={handleCartClick} />
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={isMenuOpen}
                  className="grid h-10 w-10 place-items-center rounded-button text-text transition-colors duration-200 hover:bg-peach hover:text-teal"
                >
                  {MENU_ICON}
                </button>
              </div>
            </div>
          </Container>
        </nav>
      </header>

      {/* Mobile drawer backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
            className="fixed inset-0 z-[60] bg-dark-teal/40 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col overflow-y-auto border-l border-peach/50 bg-background shadow-2xl lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-peach/50 px-5 py-4">
              <span className="flex items-center gap-2 font-heading text-lg font-bold tracking-tight text-text">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal text-white">
                  {PAW_ICON}
                </span>
                AwayStack
              </span>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-button text-text transition-colors duration-200 hover:bg-peach hover:text-teal"
              >
                {CLOSE_ICON}
              </button>
            </div>

            <ul className="flex-1 space-y-1 px-4 py-5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.type === 'section' ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleSectionClick(e, link.href.slice(1))}
                      className="flex items-center justify-between rounded-card border border-transparent px-4 py-3 font-heading text-lg font-semibold text-text transition-colors duration-200 hover:border-teal/30 hover:bg-peach hover:text-teal"
                    >
                      {link.name}
                      {ARROW_ICON}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between rounded-card border border-transparent px-4 py-3 font-heading text-lg font-semibold text-text transition-colors duration-200 hover:border-teal/30 hover:bg-peach hover:text-teal"
                    >
                      {link.name}
                      {ARROW_ICON}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-peach/50 px-5 py-5">
              <Button variant="coral" size="lg" asChild className="w-full">
                <Link href={PRODUCT_HREF} onClick={closeMenu}>
                  Shop now
                </Link>
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={handleCartClick}
                className="w-full"
              >
                Cart ({cartCount})
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
