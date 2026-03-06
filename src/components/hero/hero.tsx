import Image from 'next/image';
import type { ImageType, LinkType } from '@/components/types';
import { HeroContent } from './hero-content';

/**
 * Props for the Hero component.
 */
interface HeroProps {
  /** Hero background image. */
  image: ImageType;
  /** Photographer name displayed in the overlay. */
  name: string;
  /** Short positioning tagline. */
  tagline: string;
  /** Specialty area labels with hrefs, rendered as navigation links. */
  specialties: LinkType[];
}

/**
 * Full-width hero section with a background image and gradient overlay.
 *
 * @example
 * <Hero image={{ src: '/images/hero.jpg', alt: 'Hero' }} name="Neil Hurley" tagline="Commercial photographer" specialties={[]} />
 */
export function Hero({ image, name, tagline, specialties }: HeroProps) {
  return (
    <section className="relative h-[85vh] min-h-125 w-full overflow-hidden">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover pointer-events-none"
        priority
        quality={85}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-linear-to-t from-background to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 md:pb-14">
        <HeroContent name={name} tagline={tagline} specialties={specialties} />
      </div>
    </section>
  );
}
