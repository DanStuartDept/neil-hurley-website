import Link from 'next/link';
import { LinkType } from '@/components/types';

interface SectionHeaderProps {
  title: string;
  viewAllLink?: LinkType;
}

export function SectionHeader({ title, viewAllLink }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-12">
      <h2 className="text-3xl font-display text-primary">{title}</h2>
      {viewAllLink && (
        <Link
          href={viewAllLink.href}
          className="text-sm font-body text-secondary hover:text-accent transition-colors duration-300"
        >
          {viewAllLink.label}
        </Link>
      )}
    </div>
  );
}
