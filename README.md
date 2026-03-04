# Neil Hurley Photography

Portfolio website for Dublin-based still life and product photographer Neil Hurley.

**Design Direction:** Clean White Gallery
**Stack:** Next.js 15 · Tailwind CSS 4 · TypeScript · Storybook 8 · Vitest

## Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)

## Setup

```bash
pnpm install
```

## Development

```bash
pnpm dev          # Start dev server at localhost:3000
pnpm storybook    # Start Storybook at localhost:6006
```

## Testing & Quality

```bash
pnpm test         # Run Vitest tests
pnpm test:watch   # Vitest watch mode
pnpm lint         # ESLint
pnpm format       # Prettier
pnpm typecheck    # TypeScript type check
```

## Project Structure

```
src/
├── app/          # Next.js App Router pages and layouts
├── components/   # UI components (each with .tsx, .stories.tsx, .test.tsx)
│   └── types/    # Shared TypeScript interfaces
├── data/         # JSON data files for each page
├── lib/          # Data loading utilities
├── styles/       # globals.css (Tailwind + design tokens)
└── test/         # Vitest setup
public/
└── images/       # Portfolio images by category (food, advertising, product)
resources/        # Design system reference files
```

## Component Conventions

- Each component lives in `src/components/<name>/`
- Files: `index.ts`, `<name>.tsx`, `<name>.stories.tsx`, `<name>.test.tsx`
- Tailwind classes only — no inline styles, no CSS modules
- All images must use `next/image`
- All components must have at least one Storybook story and one Vitest test

## Branches & PRs

- `main` is protected — no direct pushes
- Feature branches: `feature/<issue-number>-<short-description>`
- All PRs require review from the principal developer before merging
- Squash merge into main
