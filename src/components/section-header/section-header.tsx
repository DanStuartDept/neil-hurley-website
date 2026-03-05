import Link from 'next/link';
import { LinkType } from '@/components/types';

/**
 * Props for the SectionHeader component.
 */
interface SectionHeaderProps {
  /** Section title text. */
  title: string;
  /** Optional "view all" link displayed on the right. */
  viewAllLink?: LinkType;
}

/**
 * Section heading row with an optional "view all" navigation link.
 *
 * @example
 * <SectionHeader title="Food & Drink" viewAllLink={{ label: 'View All', href: '/food' }} />
 */
export function SectionHeader({ title, viewAllLink }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-12">
      <h2 className="text-[2rem] font-display text-primary">{title}</h2>
      {viewAllLink && (
        <Link
          href={viewAllLink.href}
          className="text-sm font-body text-secondary hover:text-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {viewAllLink.label}
        </Link>
      )}
    </div>
  );
}
