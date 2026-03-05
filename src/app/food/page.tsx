import type { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { GalleryGrid } from '@/components/gallery-grid';
import foodData from '@/data/food.json';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Food & Drink — ${siteConfig.name}`,
  description: foodData.header.description,
  openGraph: {
    title: `Food & Drink — ${siteConfig.name}`,
    description: foodData.header.description,
    type: 'website',
    url: `${siteConfig.baseUrl}/food`,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Food & Drink — ${siteConfig.name}`,
    description: foodData.header.description,
  },
};

export default function FoodPage() {
  return (
    <>
      <PageHeader title={foodData.header.title} description={foodData.header.description} />
      <div className="mx-auto max-w-[1280px] px-6 pb-20">
        <GalleryGrid items={foodData.items} variant="uniform" />
      </div>
    </>
  );
}
