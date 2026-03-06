---
phase: implementation
title: Hero Redesign — Implementation Guide
feature: hero-redesign
---

# Implementation Guide

## Development Setup

Install the Motion library before starting:

```bash
pnpm add motion
```

## Code Structure

Files to modify:
```
src/
  data/home.json                        # Add name, tagline, specialties to hero object
  components/hero/
    hero.tsx                            # Add HeroProps fields; render HeroContent
    hero-content.tsx                    # NEW — 'use client' animation component
    hero.test.tsx                       # Update tests for new props + HeroContent render
    hero.stories.tsx                    # Update story args
  app/page.tsx                          # Pass new hero props
```

## Implementation Notes

### 1. `home.json` — extend hero object

```json
"hero": {
  "image": { "src": "/images/food/70.jpg", "alt": "Neil Hurley Photography" },
  "name": "Neil Hurley",
  "tagline": "Commercial photographer based in Dublin",
  "specialties": [
    { "label": "Food & Drink", "href": "/food" },
    { "label": "Advertising & Product", "href": "/advertising" }
  ]
}
```

### 2. `hero.tsx` — updated server component

```tsx
import Image from 'next/image';
import type { ImageType, LinkType } from '@/components/types';
import { HeroContent } from './hero-content';

interface HeroProps {
  image: ImageType;
  name: string;
  tagline: string;
  specialties: LinkType[];
}

export function Hero({ image, name, tagline, specialties }: HeroProps) {
  return (
    <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden">
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
      <HeroContent name={name} tagline={tagline} specialties={specialties} />
    </section>
  );
}
```

### 3. `hero-content.tsx` — clip-path word reveal animation

The core technique: each word is wrapped in an `overflow-hidden` outer `<span>` (the clip mask) containing an inner `<span>` that animates `y: "110%" → y: 0`. Words at rest are fully visible — animation is purely additive.

**Brand easing:** `cubic-bezier(0.23, 1, 0.32, 1)` — specified in the design system as the standard `ease-out`. Use this constant for all Motion transitions.

**Ampersand convention:** The design system specifies that `&` in display/heading text uses the italic variant of Libre Baskerville in `text-accent`. Both "Food & Drink" and "Advertising & Product" contain `&` — the `WordToken` component handles this for all text contexts.

```tsx
'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import type { LinkType } from '@/components/types';

// Design system ease-out — cubic-bezier(0.23, 1, 0.32, 1)
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

interface HeroContentProps {
  name: string;
  tagline: string;
  specialties: LinkType[];
}

/**
 * Renders a single word token.
 * Ampersands receive the brand treatment: italic Libre Baskerville in text-accent.
 */
function WordToken({ word }: { word: string }) {
  if (word === '&') {
    return (
      <span className="font-display italic text-accent" aria-label="and">
        &amp;
      </span>
    );
  }
  return <>{word}</>;
}

/**
 * Splits text into words and animates each with an overflow-hidden clip reveal.
 * aria-label on wrapper = full string for screen readers.
 * Individual word spans are aria-hidden to avoid fragmented announcement.
 */
function RevealWords({
  text,
  delayOffset = 0,
  stagger = 0.06,
  duration = 0.5,
  shouldAnimate,
}: {
  text: string;
  delayOffset?: number;
  stagger?: number;
  duration?: number;
  shouldAnimate: boolean;
}) {
  const words = text.split(' ');
  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden leading-[1.1]"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            initial={shouldAnimate ? { y: '110%' } : false}
            animate={{ y: 0 }}
            transition={{
              duration,
              delay: delayOffset + i * stagger,
              ease: EASE_OUT,
            }}
          >
            <WordToken word={word} />
          </motion.span>
          {/* Non-breaking space lives outside the clip mask — never gets clipped */}
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}

export function HeroContent({ name, tagline, specialties }: HeroContentProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = !prefersReducedMotion;

  const nameWordCount = name.split(' ').length;
  // tagline starts after name completes + 100ms buffer
  const taglineDelay = nameWordCount * 0.06 + 0.1;
  // specialties start after tagline completes + 80ms buffer
  const taglineWordCount = tagline.split(' ').length;
  const specialtiesDelay = taglineDelay + taglineWordCount * 0.04 + 0.08;

  return (
    <div className="absolute inset-x-0 bottom-0 px-8 pb-12 md:px-16 md:pb-16 z-10">
      {/*
        Photographer name — Display 1 from design system:
        4rem (text-6xl), Libre Baskerville 400, tracking -0.02em
        Scales to text-4xl on mobile.
      */}
      <p className="font-display text-4xl md:text-6xl font-normal text-card tracking-[-0.02em] mb-3 drop-shadow-md">
        <RevealWords
          text={name}
          shouldAnimate={shouldAnimate}
          stagger={0.06}
          duration={0.6}
        />
      </p>

      {/*
        Tagline — Body Small from design system:
        0.875rem (text-sm), Outfit 300 (font-light)
      */}
      <p className="font-body text-sm font-light text-card/75 mb-8 drop-shadow-sm">
        <RevealWords
          text={tagline}
          shouldAnimate={shouldAnimate}
          delayOffset={taglineDelay}
          stagger={0.04}
          duration={0.5}
        />
      </p>

      {/*
        Specialty labels — Label style from design system:
        0.75rem (text-xs), Outfit 400 (font-normal), 0.18em tracking, uppercase.
        Clip-path wipe-up reveal on motion.li.
        Sharp corners — no border-radius (design system: only gallery items use rounded-sm).
        Ampersands in labels handled by WordToken inside the Link.
      */}
      <nav aria-label="Photography specialties">
        <ul className="flex flex-wrap gap-3">
          {specialties.map((s, i) => (
            <motion.li
              key={s.href}
              initial={shouldAnimate ? { clipPath: 'inset(0 0 100% 0)' } : false}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              transition={{
                duration: 0.45,
                delay: specialtiesDelay + i * 0.1,
                ease: EASE_OUT,
              }}
            >
              <Link
                href={s.href}
                className="font-body text-xs font-normal uppercase tracking-[0.18em] text-card border border-card/40 px-4 py-2 inline-block hover:bg-card/10 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {s.label.split(' ').map((word, wi, arr) => (
                  <span key={wi}>
                    <WordToken word={word} />
                    {wi < arr.length - 1 && '\u00A0'}
                  </span>
                ))}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
```

### Patterns & Best Practices

- **Design system easing** — always use `EASE_OUT = [0.23, 1, 0.32, 1]`, the design-system-specified `cubic-bezier(0.23, 1, 0.32, 1)`. Do not use a different curve.
- **Display 1 type scale** — hero name is `text-6xl` (4rem), `tracking-[-0.02em]`, `font-display`, weight 400. The design system is explicit that this scale is reserved for hero titles.
- **Ampersand convention** — `&` tokens in display text must render as italic + `text-accent` using Libre Baskerville's italic variant. Both specialty labels contain `&`; `WordToken` handles this consistently for all text contexts.
- **Sharp corners everywhere** — design system specifies `border-radius: 2px` for gallery items only. All other elements (including specialty label borders) are sharp — don't add any `rounded-*` class.
- **`aria-label` on wrapper + `aria-hidden` on word spans** — screen readers announce the full string; they never encounter the fragmented word structure.
- **`initial={shouldAnimate ? {...} : false}`** — `false` tells Motion to skip animation entirely for reduced-motion users with no FOUC or layout shift.
- **Inter-word spacing** — `\u00A0` lives outside the `overflow-hidden` span and is never clipped during animation.
- **Duration values** — 600ms for name (slower = more gravitas at display scale), 500ms for tagline, 450ms for labels. All use brand `EASE_OUT`.

## Integration Points

`page.tsx` — pass new props:
```tsx
<Hero
  image={homeData.hero.image}
  name={homeData.hero.name}
  tagline={homeData.hero.tagline}
  specialties={homeData.hero.specialties}
/>
```
