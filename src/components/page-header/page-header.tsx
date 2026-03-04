interface PageHeaderProps {
  title: string;
  description?: string;
}

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
