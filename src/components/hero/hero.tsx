import Image from 'next/image';
import type { ImageType } from '@/components/types';

/**
 * Props for the Hero component.
 */
interface HeroProps {
  /** Hero background image. */
  image: ImageType;
}

/**
 * Full-width hero section with a background image and gradient overlay.
 *
 * @example
 * <Hero image={{ src: '/images/hero.jpg', alt: 'Hero' }} />
 */
export function Hero({ image }: HeroProps) {
  return (
    <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        priority
        quality={85}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
