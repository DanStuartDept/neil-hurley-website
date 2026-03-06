---
phase: planning
title: Hero Redesign — Project Planning & Task Breakdown
feature: hero-redesign
---

# Project Planning & Task Breakdown

## Milestones

- [ ] Milestone 1: Data & types updated — `home.json` and `HeroProps` reflect new fields
- [ ] Milestone 2: Component implemented — Hero renders name, tagline, and specialty links with correct styling
- [ ] Milestone 3: Tests & stories passing — unit tests, Storybook stories, and a11y checks all green

## Task Breakdown

### Phase 1: Foundation

- [ ] **1.1** `pnpm add motion` — add Motion library
- [ ] **1.2** Add `name`, `tagline`, and `specialties` fields to `src/data/home.json`
- [ ] **1.3** Update `HeroProps` in `hero.tsx` to include the three new props (typed using existing `LinkType`)
- [ ] **1.4** Update `src/app/page.tsx` to pass `homeData.hero.name`, `homeData.hero.tagline`, and `homeData.hero.specialties` into `<Hero>`

### Phase 2: Component Implementation

- [ ] **2.1** Create `src/components/hero/hero-content.tsx` — `'use client'` component with `RevealWords` helper and `HeroContent` export
- [ ] **2.2** Implement `RevealWords` — per-word `overflow-hidden` outer span + `motion.span` inner span animating `y: "110%" → 0`
- [ ] **2.3** Implement name reveal — `font-display`, `text-3xl md:text-5xl`, `text-card`, stagger 60ms, expo-out easing
- [ ] **2.4** Implement tagline reveal — `font-body`, `text-sm md:text-base`, `text-card/75`, delayed after name, stagger 40ms
- [ ] **2.5** Implement specialty label reveal — `clip-path: inset(0 0 100% 0) → inset(0 0 0% 0)` on `motion.li`, pill-border styling, delayed after tagline
- [ ] **2.6** Wire `useReducedMotion` — pass `initial={shouldAnimate ? {...} : false}` to skip animation cleanly
- [ ] **2.7** Update `hero.tsx` to render `<HeroContent>` and accept updated props

### Phase 3: Tests & Stories

- [ ] **3.1** Add Motion mock to `hero.test.tsx` (`vi.mock('motion/react', ...)`)
- [ ] **3.2** Update unit tests — assert accessible name/tagline strings, specialty hrefs and labels, empty specialties edge case
- [ ] **3.3** Update `hero.stories.tsx` — extend `Default` and `FoodHero` args; add `ReducedMotion` story
- [ ] **3.4** Run `pnpm test:stories` — confirm Storybook a11y passes
- [ ] **3.5** Run `pnpm test` — confirm all unit tests pass
- [ ] **3.6** Run `pnpm typecheck` and `pnpm lint` — zero errors

## Dependencies

- Task 1.1 before any Phase 2 work (Motion must be installed)
- Task 1.3 must complete before 2.x (props must be defined)
- Task 1.4 must complete before visual dev-server testing
- All Phase 2 tasks before Phase 3

## Timeline & Estimates

| Phase | Effort |
|---|---|
| Phase 1 (install + data + types) | ~30 min |
| Phase 2 (animation component) | ~2–3 hours |
| Phase 3 (tests + stories) | ~1–1.5 hours |

## Risks & Mitigation

| Risk | Mitigation |
|---|---|
| Motion not available in jsdom test environment | Mock `motion/react` in test setup (see testing doc) |
| Word splitting breaks with punctuation (e.g. "Dublin,") | Treat punctuation as part of the word — it stays attached; no special handling needed |
| Inter-word spacing clipped during animation | Non-breaking space placed *outside* the `overflow-hidden` span |
| `clip-path` on specialty labels looks jaggy on some GPUs | Use `will-change: clip-path` if needed; test on real device |
| Contrast failure in a11y checks | `drop-shadow-md` on name + gradient from page background provides scrim; test in Storybook a11y panel early |
| `home.json` shape change breaks `page.tsx` | Update `page.tsx` (Task 1.4) immediately after JSON change |
