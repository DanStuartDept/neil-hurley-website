---
phase: requirements
title: Requirements & Problem Understanding
feature: hero-overlapping
---

# Requirements & Problem Understanding

## Problem Statement

The current hero is a single full-bleed background image with a gradient overlay and text pinned to the bottom-left. It works but reads as generic — many portfolio sites use the same pattern. The goal is to replace it with an editorial, layered composition that better communicates the photographer's craft: three overlapping photo frames arranged asymmetrically on a warm background, with parallax depth and restrained entrance animations.

- **Who is affected:** Every homepage visitor sees the hero; it is the primary first impression.
- **Current workaround:** No workaround — the current design is functional but aesthetically common.

## Goals & Objectives

**Primary goals:**
- Replace `Hero` with a new `HeroOverlapping` component on the homepage
- Three portfolio images displayed as overlapping frames (back, front, accent) at distinct z-levels
- Light/warm background (`--color-bg` / `bg-background`) — no full-bleed dark image
- Entrance animations: frames fade/slide in, name text reveals, accent underline grows
- Scroll parallax: each frame moves at a different Y speed as the user scrolls
- Mouse parallax (desktop only): frames subtly shift based on cursor position for depth

**Secondary goals:**
- Scroll cue indicator (bottom-right) that pulses and fades on scroll
- Respect `prefers-reduced-motion` — skip all motion when set
- Responsive layout: adjusted frame sizes and positions at mobile breakpoints

**Non-goals:**
- The tagline and specialty links from the previous hero are removed in this design
- No lightbox or click interaction on the frames
- No server-side personalisation — randomisation is purely client-side

## User Stories & Use Cases

- As a **homepage visitor**, I see three overlapping photo frames drawn randomly from the portfolio pool — a different combination on every page load.
- As a **returning visitor**, the hero feels fresh each visit without any CMS or server changes.
- As a **desktop user**, I notice subtle parallax depth as I move my mouse and scroll, creating a tactile, high-end feel.
- As a **mobile user**, I see the same composition at appropriate sizes without horizontal overflow or janky scroll.
- As a **user with reduced motion preference**, I see the final static state immediately, with no animations playing.

## Success Criteria

- [ ] Three frames render at correct sizes and z-levels matching the reference design
- [ ] Name text (`Neil Hurley`) shows with last name in italic accent color
- [ ] Accent underline animates from `width: 0` to `width: 40px` on load
- [ ] Scroll parallax moves each frame at a distinct Y offset
- [ ] Mouse parallax runs on desktop; disabled on mobile
- [ ] `prefers-reduced-motion` disables all animations (entrance + parallax)
- [ ] No horizontal overflow on any viewport
- [ ] All existing tests pass; new component has 100% unit test coverage
- [ ] Storybook stories render without a11y errors

## Constraints & Assumptions

- **Tech:** Must use `motion/react` (already installed). No raw CSS animations in JS for motion.
- **Images:** The component accepts an `imagePool: ImageType[]` prop (all available portfolio images from JSON). It picks 3 unique random images on client mount via `useState` lazy initialiser — guarantees a different set every page load without SSR/SSG constraints.
- **Styling:** Tailwind CSS 4 only — no inline styles except where `motion` requires numeric values for interpolation.
- **Next.js:** Use `next/image` for all three frame images with `fill` and appropriate `sizes`.
- **Assumption:** The existing `Hero` component and its tests/stories remain untouched; only the homepage import changes.

## Questions & Open Items

- [ ] Should the accent frame be shown on mobile, or hidden below a breakpoint? (Reference hides nav links on mobile — accent frame may feel crowded at small sizes.) **Proposed:** hide accent frame below `md`.
- [ ] Should the full combined image pool (food + advertising) be used, or a curated subset? Needs content decision from the principal developer.
