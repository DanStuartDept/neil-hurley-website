'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LinkType } from '@/components/types';
import { MobileNav } from '@/components/mobile-nav';

interface SiteHeaderProps {
  links: LinkType[];
}

export function SiteHeader({ links }: SiteHeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <nav
          className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4"
          aria-label="Main navigation"
        >
          <Link href="/" className="font-display text-lg text-primary">
            Neil Hurley
          </Link>

          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={[
                      'relative font-body text-xs uppercase tracking-[0.18em] transition-colors duration-300',
                      isActive ? 'text-primary' : 'text-secondary hover:text-primary',
                      'after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:bg-accent after:transition-all after:duration-[600ms] after:ease-out',
                      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full',
                    ].join(' ')}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="flex flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open menu"
          >
            <span className="block h-[1.5px] w-5 bg-primary" />
            <span className="block h-[1.5px] w-5 bg-primary" />
            <span className="block h-[1.5px] w-5 bg-primary" />
          </button>
        </nav>
      </header>

      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        links={links}
      />
    </>
  );
}
