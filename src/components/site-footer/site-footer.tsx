import Link from 'next/link';
import type { LinkType } from '@/components/types';

/**
 * Props for the SiteFooter component.
 */
interface SiteFooterProps {
  /** Copyright year; defaults to the current year. */
  year?: number;
  /** Optional footer navigation links. */
  links?: LinkType[];
}

/**
 * Site-wide footer with copyright notice and optional navigation links.
 *
 * @example
 * <SiteFooter year={2026} links={[{ label: 'Privacy', href: '/privacy' }]} />
 */
export function SiteFooter({ year, links }: SiteFooterProps) {
  const displayYear = year ?? new Date().getFullYear();

  return (
    <footer className="border-t border-border px-12 py-10 bg-background">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-body text-xs tracking-[0.12em] text-muted">
          &copy; {displayYear} Neil Hurley Photography
        </p>
        {links && links.length > 0 && (
          <nav aria-label="Footer navigation">
            <ul className="flex items-center gap-6">
              {links.map((link) => (
                <li key={link.href}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-xs tracking-[0.12em] text-muted transition-colors duration-300 hover:text-primary"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="font-body text-xs tracking-[0.12em] text-muted transition-colors duration-300 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </footer>
  );
}
