---
phase: testing
title: Hero Redesign — Testing Strategy
feature: hero-redesign
---

# Testing Strategy

## Test Coverage Goals

- 100% of new/changed lines in `hero.tsx` and `hero-content.tsx`
- Storybook a11y addon zero violations on all Hero stories
- Manual visual check at 375px, 768px, and 1280px
- Manual check with `prefers-reduced-motion: reduce` (OS setting or DevTools)

## Unit Tests (`hero.test.tsx`)

Motion must be mocked in the jsdom unit test environment since it relies on browser animation APIs.

### Mocking strategy

```ts
vi.mock('motion/react', () => ({
  motion: {
    span: ({ children, ...rest }: React.HTMLAttributes<HTMLSpanElement>) =>
      <span {...rest}>{children}</span>,
    li: ({ children, ...rest }: React.HTMLAttributes<HTMLLIElement>) =>
      <li {...rest}>{children}</li>,
  },
  useReducedMotion: () => false,
}));
```

### `Hero` component

- [ ] Renders the background `<img>` with correct `src` and `alt`
- [ ] Renders `HeroContent` (presence of the specialty `<nav>` is sufficient proxy)

### `HeroContent` component

- [ ] Renders a `<nav aria-label="Photography specialties">`
- [ ] Full name string is accessible (via `aria-label` on the wrapper span)
- [ ] Full tagline string is accessible (via `aria-label` on the wrapper span)
- [ ] Renders one `<li>` per specialty
- [ ] Each specialty `<a>` has the correct `href`
- [ ] Each specialty `<a>` has the correct visible label text
- [ ] With `useReducedMotion` returning `true` — component still renders all text and links (no skip/hide)
- [ ] Edge: single word name renders without crashing
- [ ] Edge: empty `specialties` array renders an empty `<ul>` without crashing

Run: `pnpm vitest run --project unit src/components/hero/hero.test.tsx`

## Storybook Stories (`hero.stories.tsx`)

- [ ] `Default` story — updated args include `name`, `tagline`, `specialties`; animation plays in Storybook canvas
- [ ] `ReducedMotion` story — use `parameters: { a11y: ... }` or a decorator to simulate `prefers-reduced-motion: reduce`; confirm text is static and fully visible
- [ ] `FoodHero` story — updated args include text props
- [ ] A11y panel shows zero violations on all stories

Run: `pnpm test:stories`

## Manual Testing

**Animation feel:**
- [ ] Name words emerge cleanly one by one with no clipping artefacts
- [ ] Inter-word spacing is preserved during animation (no words running together)
- [ ] Tagline begins naturally after name settles
- [ ] Specialty labels wipe up crisply after tagline
- [ ] On page load (not Storybook), animation triggers exactly once

**Reduced motion:**
- [ ] Enable "Reduce motion" in OS or Chrome DevTools (`prefers-reduced-motion: reduce`)
- [ ] All text is immediately visible, no animation plays

**Responsive:**
- [ ] At 375px: name wraps to 2 lines without overflow; labels wrap naturally
- [ ] At 768px: comfortable intermediate layout
- [ ] At 1280px: full layout as designed

**Keyboard / focus:**
- [ ] Tab reaches each specialty link
- [ ] Focus ring visible (`focus-visible:ring-2 focus-visible:ring-accent`)
- [ ] Links navigate correctly

**Accessibility:**
- [ ] Screen reader (VoiceOver / NVDA) announces full name string and full tagline string — not individual fragmented words
- [ ] `<nav aria-label="Photography specialties">` appears as a distinct landmark

## Test Data

Storybook story args:
```ts
args: {
  image: { src: '/images/food/70.jpg', alt: 'Neil Hurley Photography' },
  name: 'Neil Hurley',
  tagline: 'Commercial photographer based in Dublin',
  specialties: [
    { label: 'Food & Drink', href: '/food' },
    { label: 'Advertising & Product', href: '/advertising' },
  ],
}
```

## Test Reporting & Coverage

- `pnpm test:coverage` — confirm `hero.tsx` and `hero-content.tsx` at 100% line coverage
- `pnpm test:stories` — Storybook a11y set to `'error'` mode; any violation fails CI
