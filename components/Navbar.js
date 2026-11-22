'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './Button';
import { CartButton } from './CartButton';
import { useCart } from './CartProvider';

const FaviconIcon = (
  <img src="/images/favicon.ico" alt="AwayStack" className="w-9 h-9" />
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

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

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
      <header className="sticky top-3 z-50 px-3 sm:px-4">
        <nav
          aria-label="Main navigation"
          className="mx-auto max-w-6xl rounded-full border-2 border-text bg-background/95 shadow-soft backdrop-blur-md"
        >
          <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-2 pl-5 pr-2.5 sm:pl-6 lg:grid-cols-[1fr_auto_1fr]">
            {/* Logo */}
            <Link
              href="/"
              onClick={closeMenu}
              className="group flex shrink-0 items-center gap-2 justify-self-start text-teal transition-transform duration-200 hover:-rotate-3"
            >
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal text-white shadow-soft transition-colors duration-200 group-hover:bg-dark-teal">
                {FaviconIcon}
              </span>
              <span className="hidden font-heading text-xl font-bold tracking-tight text-text sm:inline">
                AwayStack
              </span>
            </Link>

            {/* Centre — nav links inside a soft cream pill */}
            <ul className="hidden items-center gap-1 justify-self-center rounded-full bg-peach/40 px-2 py-1.5 lg:flex">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.type === 'section' ? (
                    <a
                      href={link.href}
                      onClick={(e) => handleSectionClick(e, link.href.slice(1))}
                      className="relative block rounded-full px-3.5 py-1.5 text-sm font-medium text-text/80 transition-colors duration-200 hover:bg-white/70 hover:text-teal"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="relative block rounded-full px-3.5 py-1.5 text-sm font-medium text-text/80 transition-colors duration-200 hover:bg-white/70 hover:text-teal"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* Right — cart and shop now */}
            <div className="flex shrink-0 items-center gap-2 justify-self-end">
              <CartButton count={cartCount} onClick={handleCartClick} />

              <Button variant="raised" size="sm" shape="pill" asChild className="text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                <Link href={PRODUCT_HREF}>Shop now</Link>
              </Button>

              <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
                className="grid h-10 w-10 place-items-center rounded-full border-2 border-text bg-white text-text transition-colors duration-200 hover:bg-peach hover:text-teal lg:hidden"
              >
                {MENU_ICON}
              </button>
            </div>
          </div>
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
                  {FaviconIcon}
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
              <Button variant="raised" size="lg" shape="pill" asChild className="w-full text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                <Link href={PRODUCT_HREF} onClick={closeMenu}>
                  Shop now
                </Link>
              </Button>
              <Button
                variant="outlineDark"
                size="md"
                shape="pill"
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
