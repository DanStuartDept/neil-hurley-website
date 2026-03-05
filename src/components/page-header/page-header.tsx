/**
 * Props for the PageHeader component.
 */
interface PageHeaderProps {
  /** Page title displayed as an h1 heading. */
  title: string;
  /** Optional descriptive text shown below the title. */
  description?: string;
}

/**
 * Top-of-page header with a large title and optional description.
 *
 * @example
 * <PageHeader title="Food & Drink" description="Crafting appetite through light." />
 */
export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mx-auto max-w-[1280px] px-6 pb-12 pt-32">
      <h1 className="font-display text-[3.25rem] leading-tight text-primary">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-[520px] font-body text-base font-light text-secondary">
          {description}
        </p>
      )}
    </header>
  );
}
