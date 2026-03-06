'use client';

import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import type { LinkType } from '@/components/types';

interface RevealWordsProps {
  text: string;
  delay: number;
  staggerMs: number;
  durationMs: number;
  shouldAnimate: boolean;
}

function RevealWords({ text, delay, staggerMs, durationMs, shouldAnimate }: RevealWordsProps) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={shouldAnimate ? { y: '110%' } : false}
            animate={{ y: 0 }}
            transition={{
              duration: durationMs / 1000,
              delay: (delay + i * staggerMs) / 1000,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  );
}

interface HeroContentProps {
  name: string;
  tagline: string;
  specialties: LinkType[];
}

/**
 * Animated hero text overlay with staggered word reveals for name, tagline, and specialty links.
 */
export function HeroContent({ name, tagline, specialties }: HeroContentProps) {
  const shouldAnimate = !useReducedMotion();

  const nameWords = name.split(' ').length;
  const taglineDelay = nameWords * 60 + 100;

  const taglineWords = tagline.split(' ').length;
  const specialtiesBaseDelay = taglineDelay + taglineWords * 40 + 80;

  return (
    <div>
      <p className="font-display text-3xl md:text-5xl text-card leading-tight">
        <RevealWords
          text={name}
          delay={0}
          staggerMs={60}
          durationMs={500}
          shouldAnimate={shouldAnimate}
        />
      </p>
      <p className="font-body text-sm md:text-base text-card/75 mt-2">
        <RevealWords
          text={tagline}
          delay={taglineDelay}
          staggerMs={40}
          durationMs={400}
          shouldAnimate={shouldAnimate}
        />
      </p>
      <ul className="flex flex-wrap gap-2 mt-4">
        {specialties.map((s, i) => (
          <motion.li
            key={s.href}
            initial={shouldAnimate ? { clipPath: 'inset(0 0 100% 0)' } : false}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{
              duration: 0.4,
              delay: (specialtiesBaseDelay + i * 80) / 1000,
            }}
          >
            <Link
              href={s.href}
              className="font-body text-xs md:text-sm text-card border border-card/40 rounded-full px-3 py-1 hover:bg-card/10 transition-colors"
            >
              {s.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
