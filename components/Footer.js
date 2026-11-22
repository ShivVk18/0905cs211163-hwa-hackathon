'use client';

import { scrollToSection } from '@/lib/scroll';

const FOOTER_LINKS = [
  { name: 'AwayStack', href: '/shop/awaystack', type: 'route' },
  { name: 'Flavour Cups', href: '/shop/awaystack', type: 'route' },
  { name: 'Shop', href: '/shop/awaystack', type: 'route' },
];

export function Footer() {
  const handleSectionClick = (event, id) => {
    event.preventDefault();
    if (!scrollToSection(id)) {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer className="relative bg-dark-teal pt-16 pb-10 sm:pt-20 sm:pb-12">
      {/* Wavy top edge — paints the page background back over the straight edge */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 h-10 w-full fill-background"
      >
        <path d="M0 0H1200V20C1000 40 800 0 600 20S200 40 0 20z" />
      </svg>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Brand statement */}
        <p className="font-heading text-[2.75rem] font-bold leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-8xl">
          Happy while <span className="text-yellow">away</span>
        </p>

        {/* Nav row */}
        <div className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-8 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:pt-10">
          <nav
            aria-label="Footer"
            className="flex flex-wrap items-center gap-x-7 gap-y-3 sm:gap-x-9"
          >
            {FOOTER_LINKS.map((link) => {
              if (link.type === 'section') {
                const id = link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(event) => handleSectionClick(event, id)}
                    className="text-sm font-medium text-white/85 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    {link.name}
                  </a>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-white/85 transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          <p className="text-sm text-white/65 sm:text-right">
            Made with love & care for the voiceless ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
