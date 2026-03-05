import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { ClientGrid } from '@/components/client-grid';
import clientsData from '@/data/clients.json';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Clients — ${siteConfig.name}`,
  description: 'Selected clients of Neil Hurley Photography.',
  openGraph: {
    title: `Clients — ${siteConfig.name}`,
    description: 'Selected clients of Neil Hurley Photography.',
    type: 'website',
    url: `${siteConfig.baseUrl}/clients`,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Clients — ${siteConfig.name}`,
    description: 'Selected clients of Neil Hurley Photography.',
  },
};

export default function ClientsPage() {
  return (
    <>
      <PageHeader title="Clients" description="A selection of brands and agencies worked with over the years." />
      <div className="mx-auto max-w-[1280px] px-6 pb-20">
        <ClientGrid clients={clientsData.clients} />
      </div>
    </>
  );
}
