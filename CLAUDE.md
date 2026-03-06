# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev              # Dev server at localhost:3000
pnpm storybook        # Storybook at localhost:6006
pnpm test             # Vitest unit tests (run once)
pnpm test:watch       # Vitest unit tests (watch mode)
pnpm test:stories     # Storybook interaction tests via Vitest
pnpm lint             # ESLint
pnpm typecheck        # TypeScript type check
pnpm format           # Prettier
pnpm build            # Production build
pnpm test:coverage    # Unit tests with v8 coverage
```

To run a single test file: `pnpm vitest run --project unit src/components/button/button.test.tsx`

## Architecture

**Next.js App Router** (`src/app/`) — pages are server components by default; mark client components with `'use client'`.

**Data layer** — all content lives in `src/data/*.json` (no CMS/API). Pages import JSON directly.

**Styling** — Tailwind CSS 4 with CSS-first configuration. Design tokens are defined in `src/styles/globals.css` using `@theme {}`. There is no `tailwind.config.js` — use CSS variables from `@theme` for colors and fonts. Never use inline styles or CSS modules. A custom `animate-fade-in` utility is defined there for entrance animations. Max content width is `max-w-[1280px]` (standard) or `max-w-[1440px]` (wide); always pair with `px-6`.

**Shared types** — `src/components/types/index.ts` defines `ImageType`, `GalleryItemType`, `LinkType`, etc. Import from there rather than redefining.

**Images** — always use `next/image`. Portfolio images live in `public/images/` organized by category.

**Path alias** — `@/` maps to `src/`. Use it for all internal imports.

**Site metadata** — `src/lib/site-config.ts` exports `siteConfig` (name, baseUrl, description). Use it in `metadata` exports instead of hardcoding strings.

## Pages

- `/` — homepage with Hero, Food preview (asymmetric, 5 items), Advertising preview (uniform, 3 items), Clients preview, ContactSection
- `/food` — full Food & Drink gallery (uniform)
- `/advertising` — full Advertising & Product gallery (uniform)
- `/clients` — full client list
- `/contact` — contact page

All pages are server components that import JSON directly. The `GalleryGrid` component is a client component (it manages lightbox open state), so pages that include it still render as server components — Next.js handles the boundary automatically.

## Component Conventions

Each component lives in `src/components/<name>/` with four files:
- `<name>.tsx` — component implementation with TSDoc comments on props
- `<name>.test.tsx` — Vitest unit tests using `@testing-library/react`
- `<name>.stories.tsx` — Storybook stories (framework: `@storybook/nextjs-vite`)
- `index.ts` — named export only

Test assertions use semantic queries (`getByRole`, `getByAltText`, `getByLabelText`) — avoid `getByTestId`.

Stories use `tags: ['autodocs']` and import from `storybook/test` for interaction tests.

`GalleryGrid` accepts a `variant` prop: `"asymmetric"` (first item spans 2 cols + 2 rows, used for featured sections) or `"uniform"` (equal 3-col grid). It integrates `Lightbox` internally — no need to wire it separately.

`MobileNav` is a client component (`'use client'`) that handles the hamburger menu toggle for small screens.

## Testing Stack

- **Unit tests:** Vitest + jsdom + `@testing-library/react` (project: `unit`)
- **Story tests:** Vitest + Playwright + Storybook vitest addon (project: `storybook`)
- **A11y:** Storybook a11y addon is set to `'error'` — a11y violations fail CI

## Branches & PRs

- `main` is protected — no direct pushes
- Feature branches: `feature/<issue-number>-<short-description>`
- Squash merge into main; all PRs require principal developer review
