---
phase: requirements
title: Hero Redesign — Requirements & Problem Understanding
feature: hero-redesign
---

# Requirements & Problem Understanding

## Problem Statement

The current Hero component is a full-width background image with a gradient overlay and no text content. It communicates nothing about Neil Hurley's identity or specialties. First-time visitors — typically potential clients or art directors — cannot tell from the hero what kind of photographer Neil is or where to go next. This increases bounce rate and reduces the quality of initial impressions.

**Current state:** Image + gradient only. No name, no tagline, no specialty labels, no navigation cues.

## Goals & Objectives

**Primary goals:**
- Surface Neil's name and a short positioning tagline within the hero
- Display his two specialty areas (Food & Drink, Advertising & Product) as visible, tappable labels that link to the relevant portfolio sections
- Communicate the type and quality of work at a glance

**Secondary goals:**
- Provide a clear visual entry point so visitors can self-select into the relevant section without scrolling
- Maintain the clean, gallery-first aesthetic of the design system

**Non-goals:**
- Replacing the hero image or changing how images are managed
- Adding video, carousel, or animated background
- Redesigning any page beyond the homepage hero

## User Stories & Use Cases

- As a **first-time visitor**, I want to see the photographer's name and specialty areas in the hero so that I immediately know what Neil Hurley photographs.
- As a **potential food & drink client**, I want to see a clear "Food & Drink" label in the hero that links to the relevant portfolio so that I can jump straight to work relevant to my brief.
- As a **potential advertising client**, I want to see a clear "Advertising & Product" label so that I can assess his commercial work without scrolling.
- As a **mobile user**, I want the hero text to be legible and uncluttered on small screens so that the first impression is as strong as on desktop.

## Success Criteria

- The hero renders the photographer's name, a short tagline, and at least the two specialty area labels
- Each specialty label navigates to its respective portfolio page (`/food`, `/advertising`)
- All new text elements meet WCAG AA contrast requirements against the hero image
- The Storybook a11y addon reports zero violations on the updated Hero stories
- Unit tests cover all new props and rendered output
- Existing Hero behaviour (full-width image, gradient overlay, responsive height) is unchanged

## Constraints & Assumptions

- **Tailwind CSS 4 only** — no inline styles or CSS modules; design tokens from `src/styles/globals.css`
- **Server component** — Hero must remain a server component; no `'use client'` boundary needed for static text and links
- **Data-driven** — new text content (name, tagline, specialty labels + hrefs) must come from `src/data/home.json`, not be hardcoded in the component
- **`next/image`** — the background image implementation stays as-is
- **Font system** — `font-display` (Libre Baskerville) for the photographer name/tagline; `font-body` (Outfit) for labels, per design system convention
- Specialty areas are fixed: Food & Drink and Advertising & Product

## Questions & Open Items

- Should the tagline be a permanent fixture in `home.json` or sourced from `site-config.ts`?
- Should specialty labels use `<Link>` (Next.js) or plain `<a>` tags? (Likely `<Link>` for client-side navigation.)
- Should there be a CTA button (e.g., "View Portfolio") in addition to specialty labels, or are the labels sufficient?
- What is the preferred vertical positioning of the text — bottom-left (common in editorial photography sites) or centred?
