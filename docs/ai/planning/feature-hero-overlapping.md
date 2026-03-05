---
phase: planning
title: Project Planning & Task Breakdown
feature: hero-overlapping
---

# Project Planning & Task Breakdown

## Milestones

- [x] Milestone 1: New `HeroOverlapping` component renders correctly in Storybook with static layout
- [x] Milestone 2: All motion effects (entrance, scroll parallax, mouse parallax) working in the dev server
- [x] Milestone 3: Homepage wired up, old `Hero` replaced, all tests passing

## Task Breakdown

### Phase 1: Component scaffold

- [x] 1.1 Create `src/components/hero-overlapping/` directory with `index.ts`
- [x] 1.2 Implement static layout in `hero-overlapping.tsx` — three absolutely-positioned frame divs, name text, scroll cue, correct sizing/positions for desktop and mobile
- [x] 1.3 Add `next/image` inside each frame with `fill` + `sizes` attributes
- [x] 1.4 Write `hero-overlapping.stories.tsx` with a default story (three images from `public/images/`)
- [ ] 1.5 Verify Storybook renders without a11y errors

### Phase 2: Motion effects

- [x] 2.1 Add entrance animations — frame fade-in with staggered `enterDelay`, name `translateY` + `opacity`, accent underline `width` grow
- [x] 2.2 Add scroll parallax — `useScroll` + `useTransform` with distinct `inputRange`/`outputRange` per frame
- [x] 2.3 Add mouse parallax — `useMotionValue` + `useSpring` for X/Y, apply different intensity per frame
- [x] 2.4 Wire `HeroScrollCue` fade-out on scroll using `useTransform` on scroll progress
- [x] 2.5 Gate all motion on `useReducedMotion()`

### Phase 3: Integration & tests

- [x] 3.1 Update `src/app/page.tsx` — import `HeroOverlapping`, pass three images from data JSON, remove old `Hero` import
- [ ] 3.2 Verify homepage renders correctly at desktop, tablet, and mobile in the dev server
- [x] 3.3 Write `hero-overlapping.test.tsx` — unit tests covering: renders name, renders all frame images, reduced motion skips animation props, scroll cue present
- [x] 3.4 Run `pnpm test` and `pnpm typecheck` — fix any failures
- [x] 3.5 Run `pnpm test:coverage` — confirm 100% coverage on new files

## Dependencies

- `motion/react` — already installed (used by existing `HeroContent`)
- `next/image` — already available
- Three portfolio images — must exist in `public/images/`; homepage page component selects them from existing JSON data
- No new packages required

## Implementation Order

1. Static layout first (no motion) → verify in Storybook
2. Add entrance animations → verify reduced-motion path
3. Add scroll parallax → verify in dev server
4. Add mouse parallax → verify desktop-only gating
5. Wire homepage → run full test suite

## Risks & Mitigation

| Risk | Mitigation |
|---|---|
| Mouse parallax janky on lower-end devices | Use `useSpring` with conservative stiffness; only enable above `md` breakpoint |
| `next/image` with `fill` inside absolutely-positioned parent requires explicit dimensions on parent | Ensure each frame div has explicit `width`/`height` via Tailwind classes, not percentages alone |
| Scroll parallax fighting with `overflow-hidden` on the section | Use `useScroll({ target: sectionRef })` scoped to the section element |
| Three `priority` images hitting LCP budget | Only the front (foreground) frame gets `priority`; back and accent are `loading="lazy"` |

## Implementation Notes

- `useTransform` callbacks `(v) => v * N` for mouse parallax and `([s, m]) => s + m` for combined scroll+mouse Y are mocked with call invocation in tests for 100% function coverage
- `motionStyle` set to `{}` (empty) when `!shouldAnimate` — clean way to disable parallax without conditional hook calls
- `HeroScrollCue` uses two-layer motion.div: outer for scroll-fade (`style={{ opacity }}`), inner for entrance animation — avoids opacity conflict
- Homepage uses `homeData.hero.name` ("Neil Hurley") so the first/last name split produces "Neil" + "Hurley" correctly
- sr-only `<h1>` removed from page.tsx since `HeroOverlapping` renders a visible `<h1>`
