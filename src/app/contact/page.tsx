import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { ContactSection } from '@/components/contact-section';
import contactData from '@/data/contact.json';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Contact — ${siteConfig.name}`,
  description: 'Get in touch with Neil Hurley Photography.',
  openGraph: {
    title: `Contact — ${siteConfig.name}`,
    description: 'Get in touch with Neil Hurley Photography.',
    type: 'website',
    url: `${siteConfig.baseUrl}/contact`,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Contact — ${siteConfig.name}`,
    description: 'Get in touch with Neil Hurley Photography.',
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" description="Interested in working together? Get in touch." />
      <ContactSection heading={contactData.heading} details={contactData.details} />
    </>
  );
}
