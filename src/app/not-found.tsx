import Link from 'next/link';
import { PageHeader } from '@/components/page-header';

export default function NotFound() {
  return (
    <>
      <PageHeader
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
      />
      <div className="mx-auto max-w-[1280px] px-6 pb-20">
        <Link
          href="/"
          className="inline-flex items-center font-body text-xs uppercase tracking-[0.2em] text-accent hover:text-accent-hover transition-colors duration-300"
        >
          ← Back to home
        </Link>
      </div>
    </>
  );
}
