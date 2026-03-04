'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { GalleryItemType } from '@/components/types';

interface LightboxProps {
  items: GalleryItemType[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onNavigate(prevIndex);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onNavigate(nextIndex);
  }, [currentIndex, items.length, onNavigate]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
      }
    },
    [onClose, handlePrev, handleNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      className="fixed inset-0 z-100 bg-[rgba(26,24,21,0.85)] backdrop-blur-3xl flex items-center justify-center animate-fade-in"
    >
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-6 right-6 text-card text-2xl font-body cursor-pointer hover:text-muted transition-colors duration-300 z-10"
      >
        &#x2715;
      </button>

      <button
        onClick={handlePrev}
        aria-label="Previous image"
        className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-[rgba(247,245,242,0.1)] backdrop-blur-sm flex items-center justify-center text-card hover:bg-[rgba(247,245,242,0.2)] transition-colors duration-300 cursor-pointer z-10"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full flex items-center justify-center">
        <Image
          src={currentItem.image.src}
          alt={currentItem.image.alt}
          fill
          className="object-contain shadow-[0_8px_24px_rgba(0,0,0,0.1)]"
          sizes="90vw"
          priority
        />
      </div>

      <button
        onClick={handleNext}
        aria-label="Next image"
        className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-[rgba(247,245,242,0.1)] backdrop-blur-sm flex items-center justify-center text-card hover:bg-[rgba(247,245,242,0.2)] transition-colors duration-300 cursor-pointer z-10"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
