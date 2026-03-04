'use client';

import { useState } from 'react';
import { GalleryItemType } from '@/components/types';
import { GalleryItem } from './gallery-item';
import { Lightbox } from '@/components/lightbox';

interface GalleryGridProps {
  items: GalleryItemType[];
  variant: 'asymmetric' | 'uniform';
}

export function GalleryGrid({ items, variant }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[14px]">
        {items.map((item, index) => (
          <GalleryItem
            key={item.id}
            item={item}
            onClick={() => setLightboxIndex(index)}
            priority={index === 0}
            className={
              variant === 'asymmetric' && index === 0
                ? 'md:col-span-2 md:row-span-2'
                : ''
            }
          />
        ))}
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          items={items}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}
