---
phase: implementation
title: Implementation Guide
feature: hero-overlapping
---

# Implementation Guide

## Development Setup

No new dependencies. Existing stack covers everything:
- `motion/react` (motion library, already installed)
- `next/image` (Next.js built-in)
- Tailwind CSS 4 (styling)
- `@/components/types` for `ImageType`

Run `pnpm dev` and `pnpm storybook` in parallel during development.

## Code Structure

```
src/components/hero-overlapping/
  hero-overlapping.tsx   # Main component (client)
  index.ts               # Named export: HeroOverlapping
  hero-overlapping.test.tsx
  hero-overlapping.stories.tsx
```

The old `src/components/hero/` directory is **not deleted** — it remains for reference and its tests must still pass. Only the homepage import changes.

## Implementation Notes

### Random image selection

```ts
function pickThree(pool: ImageType[]): [ImageType, ImageType, ImageType] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1], shuffled[2]];
}

// In component:
const [frames] = useState<[ImageType, ImageType, ImageType]>(() => pickThree(imagePool));
// frames[0] → back frame, frames[1] → front frame, frames[2] → accent frame
```

Using `useState` with a lazy initialiser ensures selection runs once on the client, after hydration — so SSG/SSR output is consistent (no hydration mismatch) and every browser page load gets a fresh random set.

### Frame layout

Three absolutely-positioned `motion.div` containers inside a `relative` section. Tailwind classes handle size and position. Reference values (translate to Tailwind):

| Frame | Width | Height | Position |
|---|---|---|---|
| `back` | `w-[52%]` | `h-[62%]` | `right-[6%] top-[18%]` |
| `front` | `w-[38%]` | `h-[52%]` | `left-[10%] top-[26%]` |
| `accent` | `w-[18%]` | `h-[24%]` | `right-[4%] top-[10%] hidden md:block` |

Z-levels: back → `z-10`, accent → `z-20`, front → `z-30`.

Each frame has `box-shadow` — use Tailwind shadow utilities or a custom CSS variable shadow (check design system).

### Entrance animations (motion/react)

```tsx
// Frame fade-in
<motion.div
  initial={shouldAnimate ? { opacity: 0, y: 20 } : false}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: enterDelay, ease: [0.23, 1, 0.32, 1] }}
/>

// Name text
<motion.div
  initial={shouldAnimate ? { opacity: 0, y: 24 } : false}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
/>

// Accent underline width
<motion.div
  initial={shouldAnimate ? { width: 0 } : { width: 40 }}
  animate={{ width: 40 }}
  transition={{ duration: 0.8, delay: 0.9, ease: [0.23, 1, 0.32, 1] }}
/>
```

### Scroll parallax

```tsx
const sectionRef = useRef<HTMLElement>(null);
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

const backY  = useTransform(scrollYProgress, [0, 1], [0,  60]);  // slow
const frontY = useTransform(scrollYProgress, [0, 1], [0, -100]); // faster, opposite
const accentY = useTransform(scrollYProgress, [0, 1], [0,  40]);
```

Apply via `style={{ y: backY }}` on each frame's `motion.div`.

### Mouse parallax

```tsx
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20 });
const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20 });

// On section mousemove (desktop only):
const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
  if (!shouldAnimate) return;
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
  const y = (e.clientY - rect.top)  / rect.height - 0.5;
  mouseX.set(x);
  mouseY.set(y);
};

// Per-frame multipliers (back: -8/-6, front: 14/10, accent: -5/-4)
const backMotionX  = useTransform(smoothX, v => v * -8);
const backMotionY  = useTransform(smoothY, v => v * -6);
// etc.
```

Combine scroll + mouse parallax by merging transforms: `useTransform` for each axis, or stack via `style={{ x: backMouseX, y: backY }}` (motion composites multiple `style` values correctly when both are motion values).

### Scroll cue fade-out

```tsx
const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
// Apply to HeroScrollCue wrapper
```

### Reduced motion gate

```tsx
const shouldAnimate = !useReducedMotion();
// Pass to all initial props and disable mousemove handler
```

## Integration Points

**`src/app/page.tsx`** — server component. Change:
```tsx
// Before
import { Hero } from '@/components/hero';
// After
import { HeroOverlapping } from '@/components/hero-overlapping';
```

Pass the full image pool from JSON data:
```tsx
import foodImages from '@/data/food.json';
import advertisingImages from '@/data/advertising.json';

// Combine all images into a single pool
const heroImagePool = [...foodImages, ...advertisingImages];

<HeroOverlapping name={siteConfig.name} imagePool={heroImagePool} />
```

The component picks 3 random images on client mount — no server-side selection needed. The specific JSON files/fields to use are a content decision for the principal developer.

## Error Handling

- `next/image` with `fill` requires the parent to have `position: relative` (or absolute) and explicit dimensions — ensured by Tailwind classes on each frame div.
- If an image fails to load, `next/image` handles fallback internally; no extra error state needed.

## Performance Considerations

- Only `front` frame gets `priority` prop on `next/image`; back and accent use default lazy loading.
- Mouse parallax listener is added as a React event handler (no manual `addEventListener`) — React handles cleanup automatically.
- Scroll parallax uses motion's optimised path (GPU-composited `transform` only — no layout properties).
- `will-change: transform` is applied by motion automatically when animating transforms.

## Security Notes

No user input, no external data fetching, no authentication — no security surface area in this component.
