import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { GalleryGrid } from '@/components/gallery-grid';
import advertisingData from '@/data/advertising.json';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Advertising & Product — ${siteConfig.name}`,
  description: advertisingData.header.description,
  openGraph: {
    title: `Advertising & Product — ${siteConfig.name}`,
    description: advertisingData.header.description,
    type: 'website',
    url: `${siteConfig.baseUrl}/advertising`,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Advertising & Product — ${siteConfig.name}`,
    description: advertisingData.header.description,
  },
};

export default function AdvertisingPage() {
  return (
    <>
      <PageHeader title={advertisingData.header.title} description={advertisingData.header.description} />
      <div className="mx-auto max-w-[1280px] px-6 pb-20">
        <GalleryGrid items={advertisingData.items} variant="uniform" />
      </div>
    </>
  );
}
