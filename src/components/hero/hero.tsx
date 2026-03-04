import Image from 'next/image';
import type { ImageType } from '@/components/types';

interface HeroProps {
  image: ImageType;
}

export function Hero({ image }: HeroProps) {
  return (
    <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
