import { PageHeader } from '@/components/page-header';
import { GalleryGrid } from '@/components/gallery-grid';
import foodData from '@/data/food.json';

export const metadata = {
  title: 'Food & Drink — Neil Hurley Photography',
  description: foodData.header.description,
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
