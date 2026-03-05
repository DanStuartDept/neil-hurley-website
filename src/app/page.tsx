import type { Metadata } from 'next';
import { Hero } from '@/components/hero';
import { GalleryGrid } from '@/components/gallery-grid';
import { SectionHeader } from '@/components/section-header';
import { ClientGrid } from '@/components/client-grid';
import { ContactSection } from '@/components/contact-section';
import homeData from '@/data/home.json';
import foodData from '@/data/food.json';
import advertisingData from '@/data/advertising.json';
import clientsData from '@/data/clients.json';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Portfolio — ${siteConfig.name}`,
  description: siteConfig.description,
  openGraph: {
    title: `Portfolio — ${siteConfig.name}`,
    description: siteConfig.description,
    type: 'website',
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Portfolio — ${siteConfig.name}`,
    description: siteConfig.description,
  },
};

const FOOD_PREVIEW_ITEMS = 5;
const ADV_PREVIEW_ITEMS = 3;
const CLIENTS_PREVIEW_COUNT = 8;

export default function HomePage() {
  return (
    <>
      <h1 className="sr-only">Neil Hurley Photography</h1>
      <Hero
        image={homeData.hero.image}
        name={homeData.hero.name}
        tagline={homeData.hero.tagline}
        specialties={homeData.hero.specialties}
      />

      
      <section className="bg-background px-6 py-20">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader
            title="Food & Drink"
            viewAllLink={{ label: 'View Collection', href: '/food' }}
          />
          <GalleryGrid items={foodData.items.slice(0, FOOD_PREVIEW_ITEMS)} variant="asymmetric" />
        </div>
      </section>

      <section className="bg-background-alt py-20">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeader
            title="Advertising & Product"
            viewAllLink={{ label: 'View Collection', href: '/advertising' }}
          />
          <GalleryGrid items={advertisingData.items.slice(0, ADV_PREVIEW_ITEMS)} variant="uniform" />
        </div>
      </section>

      <section className="bg-background px-6 py-20">
        <div className="mx-auto max-w-[1280px]">
          <SectionHeader
            title="Selected Clients"
            viewAllLink={{ label: 'View All', href: '/clients' }}
          />
          <ClientGrid clients={clientsData.clients.slice(0, CLIENTS_PREVIEW_COUNT)} />
        </div>
      </section>

      <ContactSection
        heading="Let's work together"
        details={[
          { label: 'Email', value: 'info@neilhurley.com', href: 'mailto:info@neilhurley.com' },
          { label: 'Location', value: 'Dublin, Ireland' },
        ]}
      />
    </>
  );
}
