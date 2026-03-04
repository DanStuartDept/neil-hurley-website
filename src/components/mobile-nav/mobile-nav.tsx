'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { LinkType } from '@/components/types';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: LinkType[];
}

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const navRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && navRef.current) {
        const focusableElements = navRef.current.querySelectorAll<HTMLElement>(
          'a[href], button'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      firstLinkRef.current?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      ref={navRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={`fixed inset-0 z-60 bg-[rgba(247,245,242,0.97)] backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="Close navigation"
        className="absolute top-6 right-6 text-primary text-2xl font-body cursor-pointer hover:text-accent transition-colors duration-300"
      >
        &#x2715;
      </button>

      <nav className="flex flex-col items-center gap-8">
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            ref={index === 0 ? firstLinkRef : undefined}
            onClick={onClose}
            className="font-body font-light text-xl tracking-[0.25em] uppercase text-secondary hover:text-primary transition-colors duration-300"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
