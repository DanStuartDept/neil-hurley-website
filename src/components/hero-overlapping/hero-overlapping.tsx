'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'motion/react';
import type { ImageType } from '@/components/types';

function pickThree(pool: ImageType[]): [ImageType, ImageType, ImageType] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1], shuffled[2]];
}

type ImageState = 'hidden' | 'ready' | 'visible';

interface HeroFrameProps {
  image: ImageType;
  /** Tailwind classes for size/position/z-index */
  className: string;
  motionStyle: React.ComponentPropsWithoutRef<typeof motion.div>['style'];
  enterDelay: number;
  priority?: boolean;
  shouldAnimate: boolean;
  imageState: ImageState;
  /** Tailwind delay class for the staggered image fade-in, e.g. 'delay-0' */
  imageDelayClass: string;
}

function HeroFrame({
  image,
  className,
  motionStyle,
  enterDelay,
  priority = false,
  shouldAnimate,
  imageState,
  imageDelayClass,
}: HeroFrameProps) {
  return (
    <motion.div
      className={`absolute overflow-hidden rounded-sm bg-surface ${className}`}
      style={motionStyle}
      initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: enterDelay, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Decorative inset border */}
      <div className="absolute inset-0 border border-white/15 z-10 pointer-events-none rounded-sm" />
      {imageState !== 'hidden' && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 65vw, 52vw"
          className={`object-cover transition-opacity duration-700 ${imageDelayClass} ${imageState === 'visible' ? 'opacity-100' : 'opacity-0'}`}
          priority={priority}
        />
      )}
    </motion.div>
  );
}

interface HeroScrollCueProps {
  opacity: MotionValue<number>;
  shouldAnimate: boolean;
}

function HeroScrollCue({ opacity, shouldAnimate }: HeroScrollCueProps) {
  return (
    <motion.div style={{ opacity }}>
      <motion.div
        className="absolute bottom-14 right-12 z-10 flex flex-col items-center gap-1.5"
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <span className="font-body text-[0.58rem] tracking-[0.25em] uppercase text-muted">
          Scroll
        </span>
        <motion.div
          className="w-px h-9 bg-gradient-to-b from-accent to-transparent"
          animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
        />
      </motion.div>
    </motion.div>
  );
}

export interface HeroOverlappingProps {
  /** The photographer's name. Surname is rendered in italic accent colour. */
  name: string;
  /**
   * Pool of portfolio images to randomise from.
   * The component picks 3 unique images on client mount — different every page load.
   * Must contain at least 3 items.
   */
  imagePool: ImageType[];
}

/**
 * Hero section with three overlapping photo frames, scroll parallax, and mouse parallax.
 * Replaces the full-bleed Hero on the homepage.
 */
export function HeroOverlapping({ name, imagePool }: HeroOverlappingProps) {
  const shouldAnimate = !useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // No images rendered on SSR — randomised and faded in on client only
  const [frames, setFrames] = useState<[ImageType, ImageType, ImageType]>([
    imagePool[0],
    imagePool[1],
    imagePool[2],
  ]);
  const [imageState, setImageState] = useState<ImageState>('hidden');

  useEffect(() => {
    setFrames(pickThree(imagePool));
    setImageState('ready'); // mounts <Image> tags into DOM at opacity-0
    requestAnimationFrame(() => setImageState('visible')); // triggers CSS transition
    // imagePool is stable from the server component — intentionally omitted from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const backScrollY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const frontScrollY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const accentScrollY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const backMouseX = useTransform(smoothX, (v) => v * -8);
  const backMouseY = useTransform(smoothY, (v) => v * -6);
  const frontMouseX = useTransform(smoothX, (v) => v * 14);
  const frontMouseY = useTransform(smoothY, (v) => v * 10);
  const accentMouseX = useTransform(smoothX, (v) => v * -5);
  const accentMouseY = useTransform(smoothY, (v) => v * -4);

  // Combine scroll + mouse Y per frame
  const backFinalY = useTransform(
    [backScrollY, backMouseY],
    ([s, m]) => (s as number) + (m as number)
  );
  const frontFinalY = useTransform(
    [frontScrollY, frontMouseY],
    ([s, m]) => (s as number) + (m as number)
  );
  const accentFinalY = useTransform(
    [accentScrollY, accentMouseY],
    ([s, m]) => (s as number) + (m as number)
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!shouldAnimate) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[640px] overflow-hidden bg-background"
      onMouseMove={handleMouseMove}
    >
      {/* Back frame — larger, right side */}
      <HeroFrame
        image={frames[0]}
        className="w-[52%] h-[62%] right-[6%] top-[18%] z-10 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
        motionStyle={shouldAnimate ? { x: backMouseX, y: backFinalY } : {}}
        enterDelay={0}
        shouldAnimate={shouldAnimate}
        imageState={imageState}
        imageDelayClass="delay-0"
      />

      {/* Accent frame — small, top-right, hidden on mobile */}
      <HeroFrame
        image={frames[2]}
        className="w-[18%] h-[24%] right-[4%] top-[10%] z-20 shadow-[0_12px_40px_rgba(0,0,0,0.06)] hidden md:block"
        motionStyle={shouldAnimate ? { x: accentMouseX, y: accentFinalY } : {}}
        enterDelay={0.8}
        shouldAnimate={shouldAnimate}
        imageState={imageState}
        imageDelayClass="delay-150"
      />

      {/* Front frame — smaller, left side, highest z */}
      <HeroFrame
        image={frames[1]}
        className="w-[38%] h-[52%] left-[10%] top-[26%] z-30 shadow-[0_28px_72px_rgba(0,0,0,0.10)]"
        motionStyle={shouldAnimate ? { x: frontMouseX, y: frontFinalY } : {}}
        enterDelay={0.2}
        priority
        shouldAnimate={shouldAnimate}
        imageState={imageState}
        imageDelayClass="delay-300"
      />

      {/* Name text — bottom-left */}
      <motion.div
        className="absolute bottom-14 left-12 z-10"
        initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        <h1 className="font-display font-normal text-[clamp(2.4rem,4.5vw,3.6rem)] text-primary leading-[1.08] tracking-[-0.01em]">
          {firstName} <em className="italic text-accent">{lastName}</em>
        </h1>
        <motion.div
          className="h-0.5 bg-accent mt-4"
          initial={shouldAnimate ? { width: 0 } : { width: 40 }}
          animate={{ width: 40 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.23, 1, 0.32, 1] }}
        />
      </motion.div>

      {/* Scroll cue — bottom-right */}
      <HeroScrollCue opacity={scrollCueOpacity} shouldAnimate={shouldAnimate} />
    </section>
  );
}
