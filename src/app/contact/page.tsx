import { PageHeader } from '@/components/page-header';
import { ContactSection } from '@/components/contact-section';
import contactData from '@/data/contact.json';

export const metadata = {
  title: 'Contact — Neil Hurley Photography',
  description: 'Get in touch with Neil Hurley Photography.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" description="Interested in working together? Get in touch." />
      <ContactSection heading={contactData.heading} details={contactData.details} />
    </>
  );
}
