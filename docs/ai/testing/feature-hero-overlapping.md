---
phase: testing
title: Testing Strategy
feature: hero-overlapping
---

# Testing Strategy

## Test Coverage Goals

- **Unit tests:** 100% of new/changed code in `src/components/hero-overlapping/`
- **Story tests:** Storybook interaction test for entrance animation completion
- **A11y:** Storybook a11y addon set to `'error'` — zero violations required
- **Manual:** Visual check in dev server at desktop, tablet (768px), and mobile (375px)

## Unit Tests

### `HeroOverlapping`

- [ ] Renders the photographer's name with first and last parts
- [ ] Last name is wrapped in an element that carries accent styling (check for `<em>` or appropriate element)
- [ ] Renders exactly 3 frame images chosen from the provided pool
- [ ] All 3 rendered images are members of the `imagePool` prop
- [ ] No duplicate images across the 3 frames (all 3 are unique)
- [ ] Accent frame is hidden on small screens — carries `hidden md:block` (or equivalent class)
- [ ] Scroll cue is rendered (check for "scroll" text or aria-label)
- [ ] When `useReducedMotion` returns `true`, no `initial` animation props are set (frames render at final opacity/position)
- [ ] With a pool of exactly 3 images, renders all 3 without error

### Mock strategy

- Mock `motion/react`: `useReducedMotion` → controllable boolean; `useScroll`, `useMotionValue`, `useSpring`, `useTransform` → identity mocks returning `{ get: () => 0, set: () => {} }` or `0`
- Mock `next/image` → plain `<img>` (standard testing-library pattern for Next.js)
- For randomness tests: run `pickThree` in isolation with a fixed pool and assert output length is 3 and all items are unique

**Run single file:**
```bash
pnpm vitest run --project unit src/components/hero-overlapping/hero-overlapping.test.tsx
```

**Coverage:**
```bash
pnpm test:coverage
```

## Integration Tests

- [ ] Homepage (`/`) renders `HeroOverlapping` instead of `Hero` — verify name "Neil Hurley" appears in a heading
- [ ] No TypeScript errors in the page/component import chain (`pnpm typecheck`)

## End-to-End Tests (Playwright MCP)

- [ ] Navigate to `/` — three frame images are visible in the DOM
- [ ] Name heading present with correct text
- [ ] Scroll cue visible before scrolling, fades after scroll
- [ ] No horizontal scrollbar at 1440px, 768px, and 375px viewport widths
- [ ] Keyboard navigation: no focus traps inside the hero frames

## Test Data

- Three placeholder images from `public/images/` used in Storybook story and unit tests
- `alt` values: `"Portfolio image 1"`, `"Portfolio image 2"`, `"Portfolio image 3"` (or matching actual data)

## Test Reporting & Coverage

```bash
pnpm test:coverage
```

Target: 100% statements/branches/functions on `hero-overlapping.tsx`.

Known acceptable gap: scroll and mouse parallax motion value computations are difficult to assert numerically in jsdom — test that the motion values are created and the handlers are wired, not the pixel output.

## Manual Testing

- [ ] Desktop (1440px): three frames visible, overlapping correctly, mouse parallax responds to cursor
- [ ] Tablet (768px): layout intact, accent frame visible
- [ ] Mobile (375px): no overflow, accent frame hidden, text legible
- [ ] Reduced motion (OS setting or Chrome DevTools): frames and text appear immediately at final state
- [ ] Scroll: parallax offset visible; scroll cue fades as hero exits viewport
- [ ] Images load with fade-in (check on throttled connection)

## Performance Testing

- Lighthouse LCP: front frame image should be the LCP candidate — confirm `priority` prop is set and image is in the viewport on load
- No layout shift from image loading — `fill` + explicit frame dimensions prevents CLS

## Bug Tracking

- File issues under `feature/hero-overlapping` branch
- Regression: ensure existing `Hero` component tests still pass after homepage swap
