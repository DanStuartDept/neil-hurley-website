'use client';

import Image from 'next/image';
import { GalleryItemType } from '@/components/types';

interface GalleryItemProps {
  item: GalleryItemType;
  onClick: () => void;
  priority?: boolean;
  className?: string;
}

export function GalleryItem({
  item,
  onClick,
  priority = false,
  className = '',
}: GalleryItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative aspect-[4/5] overflow-hidden rounded-sm cursor-pointer ${className}`}
      aria-label={`View ${item.title}`}
    >
      <Image
        src={item.image.src}
        alt={item.image.alt}
        fill
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
        priority={priority}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,24,21,0.6)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <span className="font-display text-lg text-card">{item.title}</span>
        <span className="font-body text-xs uppercase tracking-[0.18em] text-card/70 mt-1">
          {item.category}
        </span>
      </div>
    </button>
  );
}
