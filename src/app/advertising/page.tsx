import { PageHeader } from '@/components/page-header';
import { GalleryGrid } from '@/components/gallery-grid';
import advertisingData from '@/data/advertising.json';

export const metadata = {
  title: 'Advertising & Product — Neil Hurley Photography',
  description: advertisingData.header.description,
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
