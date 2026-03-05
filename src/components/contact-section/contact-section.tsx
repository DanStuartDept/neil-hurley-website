import type { ContactDetailType } from '@/components/types';

/**
 * Props for the ContactSection component.
 */
interface ContactSectionProps {
  /** Section heading text. */
  heading: string;
  /** List of contact detail entries (phone, email, location, etc.). */
  details: ContactDetailType[];
}

/**
 * Two-column contact section with a heading, detail list, and call-to-action text.
 *
 * @example
 * <ContactSection heading="Let's work together" details={[{ label: 'Email', value: 'info@neilhurley.com' }]} />
 */
export function ContactSection({ heading, details }: ContactSectionProps) {
  return (
    <section className="mx-auto grid max-w-[1280px] grid-cols-1 gap-[80px] px-6 py-20 md:grid-cols-2">
      <div>
        <h2 className="mb-10 font-display text-[2.5rem] text-primary">
          {heading}
        </h2>
        <dl className="space-y-6">
          {details.map((detail) => (
            <div key={detail.label}>
              <dt className="font-body text-xs uppercase tracking-[0.18em] text-muted">
                {detail.label}
              </dt>
              <dd className="mt-1 font-body text-base text-primary">
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="transition-colors duration-300 hover:text-accent"
                  >
                    {detail.value}
                  </a>
                ) : (
                  detail.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex items-start">
        <p className="font-body text-base font-light text-secondary">
          Interested in working together? Get in touch to discuss your next project.
        </p>
      </div>
    </section>
  );
}
