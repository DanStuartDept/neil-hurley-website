# Neil Hurley Photography — Website Rebuild

## Developer Documentation

**Version:** 1.0
**Last Updated:** March 2026
**Design Direction:** Clean White Gallery

---

## 1. Project Overview

A complete rebuild of [neilhurley.com](https://www.neilhurley.com/) — a portfolio site for Dublin-based still life and product photographer Neil Hurley. The current site is a dated WordPress theme with a basic image carousel. The rebuild delivers a modern, performant, gallery-forward portfolio using Next.js with a refined "Clean White Gallery" aesthetic.

### Goals

- Let the photography dominate — minimal UI chrome, generous whitespace, warm neutral palette
- Multi-page architecture: Home, Food, Advertising, Clients, Contact
- Responsive across all breakpoints
- Excellent Core Web Vitals (LCP, CLS, INP)
- Component-driven architecture with Storybook documentation
- JSON-driven page content for easy updates without code changes

### Target Audience

Art directors, brand managers, agency producers, and marketing teams looking for a still life / product / food photographer. The site needs to communicate premium quality and professionalism instantly.

---

## 2. Tech Stack

| Layer           | Technology                     | Version |
| --------------- | ------------------------------ | ------- |
| Framework       | Next.js (App Router)           | 15.x    |
| Styling         | Tailwind CSS                   | 4.x     |
| Component Docs  | Storybook                      | 8.x     |
| Testing         | Vitest + React Testing Library | Latest  |
| Language        | TypeScript                     | 5.x     |
| Linting         | ESLint + Prettier              | Latest  |
| Package Manager | pnpm                           | Latest  |
| Deployment      | Vercel (recommended)           | —       |

---

## 3. Design System

### 3.1 Colour Palette

Refer to the Design System HTML file for visual swatches.

**Backgrounds**

| Token             | Hex       | Tailwind Class      | Usage                                  |
| ----------------- | --------- | ------------------- | -------------------------------------- |
| `--color-bg`      | `#f7f5f2` | `bg-background`     | Primary page background                |
| `--color-bg-alt`  | `#efece7` | `bg-background-alt` | Alternating sections, hero placeholder |
| `--color-bg-card` | `#ffffff` | `bg-card`           | Cards, elevated surfaces               |
| `--color-surface` | `#e8e3dc` | `bg-surface`        | Subtle surface fills                   |

**Text**

| Token                    | Hex       | Tailwind Class   | Usage                          |
| ------------------------ | --------- | ---------------- | ------------------------------ |
| `--color-text-primary`   | `#1a1815` | `text-primary`   | Headlines, nav logo            |
| `--color-text-body`      | `#3d3a36` | `text-body`      | Paragraphs, body copy          |
| `--color-text-secondary` | `#7a756e` | `text-secondary` | Descriptions, nav links        |
| `--color-text-muted`     | `#a8a29e` | `text-muted`     | Labels, captions, placeholders |

**Accent & Borders**

| Token                  | Hex       | Tailwind Class              | Usage                                |
| ---------------------- | --------- | --------------------------- | ------------------------------------ |
| `--color-accent`       | `#8b7355` | `text-accent` / `bg-accent` | Links, decorative bars, hover states |
| `--color-accent-hover` | `#73603f` | `hover:bg-accent-hover`     | Button/link hover                    |
| `--color-border`       | `#e0dbd4` | `border-border`             | Standard dividers, input borders     |
| `--color-border-light` | `#ece8e2` | `border-border-light`       | Subtle separators                    |

**Overlays**

| Token                   | Value                 | Usage                      |
| ----------------------- | --------------------- | -------------------------- |
| `--color-overlay`       | `rgba(26,24,21,0.6)`  | Gallery item hover overlay |
| `--color-overlay-heavy` | `rgba(26,24,21,0.85)` | Lightbox backdrop          |

### 3.2 Typography

**Font Stack**

| Role               | Font              | Weight                  | Google Fonts Import                                    |
| ------------------ | ----------------- | ----------------------- | ------------------------------------------------------ |
| Display / Headings | Libre Baskerville | 400, 700, 400 italic    | `family=Libre+Baskerville:ital,wght@0,400;0,700;1,400` |
| Body / UI          | Outfit            | 200, 300, 400, 500, 600 | `family=Outfit:wght@200;300;400;500;600`               |

**Type Scale**

| Name       | Size            | Font              | Weight | Tracking | Usage                             |
| ---------- | --------------- | ----------------- | ------ | -------- | --------------------------------- |
| Display 1  | 4rem (64px)     | Libre Baskerville | 400    | -0.02em  | Hero title                        |
| Display 2  | 3.25rem (52px)  | Libre Baskerville | 400    | -0.01em  | Page headers                      |
| Display 3  | 2rem (32px)     | Libre Baskerville | 400    | —        | Section titles                    |
| Heading 1  | 1.5rem (24px)   | Libre Baskerville | 400    | —        | Card titles                       |
| Heading 2  | 1.25rem (20px)  | Libre Baskerville | 400    | —        | Subsection titles                 |
| Body       | 1rem (16px)     | Outfit            | 300    | —        | Paragraphs                        |
| Body Small | 0.875rem (14px) | Outfit            | 300    | —        | Descriptions                      |
| Label      | 0.75rem (12px)  | Outfit            | 400    | 0.18em   | Nav links, form labels, uppercase |
| Caption    | 0.75rem (12px)  | Outfit            | 300    | 0.12em   | Footer, copyright                 |

**Convention:** Ampersands (&) in headings use `font-style: italic` and `color: accent` via the display font's italic variant.

### 3.3 Spacing

The spacing scale follows Tailwind defaults. Key values used:

| Token      | Value | Usage                   |
| ---------- | ----- | ----------------------- |
| `space-1`  | 4px   | Micro gaps              |
| `space-2`  | 8px   | Tight spacing           |
| `space-4`  | 16px  | Default element gap     |
| `space-6`  | 24px  | Nav gaps, gutter        |
| `space-8`  | 32px  | Form group spacing      |
| `space-12` | 48px  | Section inner padding   |
| `space-16` | 64px  | Section margins         |
| `space-20` | 80px  | Large section padding   |
| `space-32` | 128px | Page header top padding |

### 3.4 Layout

| Constant       | Value  | Usage                                         |
| -------------- | ------ | --------------------------------------------- |
| Container max  | 1280px | Default content width                         |
| Container wide | 1440px | Full-bleed gallery areas                      |
| Grid gap       | 14px   | Gallery image gaps                            |
| Border radius  | 2px    | Gallery items only — everything else is sharp |

### 3.5 Shadows

| Name           | Value                          | Usage            |
| -------------- | ------------------------------ | ---------------- |
| `shadow-sm`    | `0 1px 2px rgba(0,0,0,0.04)`   | Subtle elevation |
| `shadow-md`    | `0 4px 12px rgba(0,0,0,0.06)`  | Cards            |
| `shadow-lg`    | `0 12px 32px rgba(0,0,0,0.08)` | Modals           |
| `shadow-image` | `0 8px 24px rgba(0,0,0,0.1)`   | Lightbox image   |

### 3.6 Transitions

| Name              | Value                            |
| ----------------- | -------------------------------- |
| `ease-out`        | `cubic-bezier(0.23, 1, 0.32, 1)` |
| `duration-fast`   | 150ms                            |
| `duration-normal` | 300ms                            |
| `duration-slow`   | 600ms                            |

---

## 4. Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata, SiteHeader, SiteFooter)
│   ├── page.tsx                # Home page
│   ├── food/
│   │   └── page.tsx            # Food gallery page
│   ├── advertising/
│   │   └── page.tsx            # Advertising gallery page
│   ├── clients/
│   │   └── page.tsx            # Clients page
│   └── contact/
│       └── page.tsx            # Contact page
├── components/
│   ├── site-header/
│   │   ├── index.ts
│   │   ├── site-header.tsx
│   │   ├── site-header.stories.tsx
│   │   └── site-header.test.tsx
│   ├── site-footer/
│   │   ├── index.ts
│   │   ├── site-footer.tsx
│   │   ├── site-footer.stories.tsx
│   │   └── site-footer.test.tsx
│   ├── mobile-nav/
│   │   ├── index.ts
│   │   ├── mobile-nav.tsx
│   │   ├── mobile-nav.stories.tsx
│   │   └── mobile-nav.test.tsx
│   ├── hero/
│   │   ├── index.ts
│   │   ├── hero.tsx
│   │   ├── hero.stories.tsx
│   │   └── hero.test.tsx
│   ├── section-header/
│   │   ├── index.ts
│   │   ├── section-header.tsx
│   │   ├── section-header.stories.tsx
│   │   └── section-header.test.tsx
│   ├── page-header/
│   │   ├── index.ts
│   │   ├── page-header.tsx
│   │   ├── page-header.stories.tsx
│   │   └── page-header.test.tsx
│   ├── gallery-grid/
│   │   ├── index.ts
│   │   ├── gallery-grid.tsx
│   │   ├── gallery-item.tsx
│   │   ├── gallery-grid.stories.tsx
│   │   └── gallery-grid.test.tsx
│   ├── client-grid/
│   │   ├── index.ts
│   │   ├── client-grid.tsx
│   │   ├── client-grid.stories.tsx
│   │   └── client-grid.test.tsx
│   ├── contact-section/
│   │   ├── index.ts
│   │   ├── contact-section.tsx
│   │   ├── contact-section.stories.tsx
│   │   └── contact-section.test.tsx
│   ├── lightbox/
│   │   ├── index.ts
│   │   ├── lightbox.tsx
│   │   ├── lightbox.stories.tsx
│   │   └── lightbox.test.tsx
│   ├── button/
│   │   ├── index.ts
│   │   ├── button.tsx
│   │   ├── button.stories.tsx
│   │   └── button.test.tsx
│   └── types/
│       └── index.ts            # Shared types (LinkType, ImageType, HeadingLevel, etc.)
├── data/
│   ├── navigation.json         # Nav links
│   ├── home.json               # Home page sections and gallery previews
│   ├── food.json               # Food gallery images
│   ├── advertising.json        # Advertising gallery images
│   ├── clients.json            # Client names
│   └── contact.json            # Contact details
├── lib/
│   └── data.ts                 # Data loading utilities
└── styles/
    └── globals.css             # Tailwind imports + CSS custom properties
```

---

## 5. Shared Types

```typescript
// src/components/types/index.ts

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface LinkType {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ImageType {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface GalleryItemType {
  id: string;
  image: ImageType;
  title: string;
  category: string;
}

export interface ClientType {
  name: string;
}

export interface ContactDetailType {
  label: string;
  value: string;
  href?: string;
}

export interface SectionType {
  component: string;
  props: Record<string, unknown>;
}
```

---

## 6. JSON Data Format

### navigation.json

```json
{
  "logo": {
    "label": "Neil Hurley",
    "href": "/"
  },
  "links": [
    { "label": "Portfolio", "href": "/" },
    { "label": "Food", "href": "/food" },
    { "label": "Advertising", "href": "/advertising" },
    { "label": "Clients", "href": "/clients" },
    { "label": "Contact", "href": "/contact" }
  ]
}
```

### home.json

```json
{
  "hero": {
    "image": {
      "src": "/resources/images/hero/main.jpg",
      "alt": "Neil Hurley Photography"
    }
  },
  "sections": [
    {
      "component": "SectionWithGallery",
      "props": {
        "title": "Food & Drink",
        "viewAllLink": { "label": "View Collection", "href": "/food" },
        "variant": "asymmetric",
        "items": [
          {
            "id": "food-1",
            "image": { "src": "/resources/images/food/001.jpg", "alt": "Artisan produce" },
            "title": "Artisan Produce",
            "category": "Food"
          }
        ]
      }
    },
    {
      "component": "SectionWithGallery",
      "props": {
        "title": "Advertising & Product",
        "viewAllLink": { "label": "View Collection", "href": "/advertising" },
        "variant": "uniform",
        "items": []
      }
    },
    {
      "component": "SectionWithClients",
      "props": {
        "title": "Selected Clients",
        "viewAllLink": { "label": "View All", "href": "/clients" },
        "clients": [{ "name": "Hermès" }, { "name": "Cartier" }],
        "limit": 8
      }
    }
  ]
}
```

### food.json / advertising.json

```json
{
  "header": {
    "title": "Food & Drink",
    "description": "Crafting appetite through light, texture and composition."
  },
  "items": [
    {
      "id": "food-1",
      "image": { "src": "/resources/images/food/001.jpg", "alt": "Artisan produce" },
      "title": "Artisan Produce",
      "category": "Editorial"
    }
  ]
}
```

### clients.json

```json
{
  "header": {
    "title": "Selected Clients",
    "description": "Trusted by leading international brands."
  },
  "clients": [
    { "name": "Hermès" },
    { "name": "Cartier" },
    { "name": "Chloé" },
    { "name": "Brown Thomas" },
    { "name": "Avoca Handweavers" },
    { "name": "Kellogg's" },
    { "name": "Pepsi" },
    { "name": "American Express" },
    { "name": "Adidas" },
    { "name": "Flora" },
    { "name": "BBC" },
    { "name": "ITV" },
    { "name": "Channel 4" },
    { "name": "RTÉ" },
    { "name": "TodayFM" },
    { "name": "The Gloss" },
    { "name": "EuroRSCG" },
    { "name": "Webfactory" },
    { "name": "Dubliner Cheese" },
    { "name": "Boyne Valley" },
    { "name": "Bfree Foods" },
    { "name": "Carroll Cuisine" },
    { "name": "Total Petrol" },
    { "name": "Mindy Brownes" },
    { "name": "Caterhire" },
    { "name": "National Maritime Museum" }
  ]
}
```

### contact.json

```json
{
  "heading": "Let's work together",
  "details": [
    { "label": "Phone", "value": "+353 87 672 4862", "href": "tel:+353876724862" },
    { "label": "Email", "value": "info@neilhurley.com", "href": "mailto:info@neilhurley.com" },
    { "label": "Location", "value": "Dublin, Ireland" }
  ]
}
```

---

## 7. Page Data Flow

Each App Router page is a **server component** that reads JSON data and maps it to UI components:

```typescript
// src/app/food/page.tsx
import { PageHeader } from '@/components/page-header';
import { GalleryGrid } from '@/components/gallery-grid';
import foodData from '@/data/food.json';

export default function FoodPage() {
  return (
    <main>
      <PageHeader
        title={foodData.header.title}
        description={foodData.header.description}
      />
      <section className="max-w-[1280px] mx-auto px-6 pb-20">
        <GalleryGrid items={foodData.items} variant="uniform" />
      </section>
    </main>
  );
}
```

For the home page, a section mapper iterates through the sections array:

```typescript
// src/app/page.tsx
import homeData from '@/data/home.json';
import { sectionMap } from '@/lib/section-map';

export default function HomePage() {
  return (
    <main>
      <Hero image={homeData.hero.image} />
      {homeData.sections.map((section, i) => {
        const Component = sectionMap[section.component];
        return Component ? <Component key={i} {...section.props} /> : null;
      })}
    </main>
  );
}
```

---

## 8. Component Specifications

### SiteHeader

- Fixed to top of viewport
- Border-bottom: 1px solid border colour
- Background: bg colour (no blur/transparency)
- Logo: Libre Baskerville 400, 1.125rem
- Links: Outfit 300, 0.75rem, 0.18em tracking, uppercase
- Active link: text-primary with accent underline
- Hover: underline animates from left (width 0 to 100%, 600ms ease-out)
- Mobile: hamburger toggle at 768px breakpoint, triggers MobileNav overlay
- Sticky with `position: sticky; top: 0; z-index: 50`

### MobileNav

- Full-screen fixed overlay
- Background: `rgba(247,245,242,0.97)` with `backdrop-filter: blur(20px)`
- Centred links, Outfit 300, 1.25rem, 0.25em tracking
- Animate in: fade + slide from top (300ms)
- Close on link click, close button, or Escape key
- Focus trap for accessibility

### Hero

- Height: 85vh, min-height: 500px
- Single image, `object-fit: cover`
- Bottom gradient overlay fading to page background colour
- Used on Home page only
- Next.js `<Image>` with `priority` for LCP

### PageHeader

- Top padding: 128px (accounts for sticky nav)
- Title: Display 2 (3.25rem)
- Optional description: Body, text-secondary, max-width 520px
- Used on Food, Advertising, Clients pages

### SectionHeader

- Flex row: title left, optional "View All" link right
- Title: Display 3 (2rem)
- Margin-bottom: 48px

### GalleryGrid

- Two variants: `asymmetric` and `uniform`
- **asymmetric**: 3-column grid, first item spans 2 cols + 2 rows
- **uniform**: 3-column grid, all items equal
- Items have 4:5 aspect ratio (portrait)
- Gap: 14px
- Hover: image scales 1.03 (1s ease-out), overlay fades in with title + category
- Click: opens Lightbox
- Responsive: 2 columns at 768px, 1 column at 480px
- Use Next.js `<Image>` with `sizes` attribute for responsive loading

### GalleryItem

- Sub-component of GalleryGrid
- Contains: image, hover overlay (gradient bottom-to-top), title, category label
- Border-radius: 2px
- Overlay: gradient from overlay colour to transparent, opacity 0 → 1 on hover

### ClientGrid

- `auto-fill` grid, `minmax(200px, 1fr)`
- 1px gap with border-light background creating the "border" effect
- Cells: bg colour, 36px vertical padding
- Client name: Libre Baskerville 400, 1rem, text-secondary
- Hover: background shifts to card white, text shifts to primary

### ContactSection

- Two-column grid (1fr 1fr), gap 80px
- Left: heading (Display 3, 2.5rem), contact details with labels
- Right: reserved for future contact form (render empty or with a brief CTA for now)
- Collapses to single column at 768px
- No form in this build — contact details (phone, email, location) only

### Lightbox

- Fixed overlay, z-index: 100
- Background: overlay-heavy with `backdrop-filter: blur(30px)`
- Image centred, `max-width: 90vw; max-height: 90vh; object-fit: contain`
- Close button: top-right, × character
- Navigation: prev/next arrows (circular buttons with frosted glass bg)
- Keyboard: Escape closes, Left/Right arrows navigate
- Animate: fade in 300ms

### Button

- Three variants: `primary`, `secondary`, `accent`
- Three sizes: `sm`, `default`, `lg`
- Uppercase, 0.2em tracking
- No border-radius
- Transitions: background + border-color, 300ms ease-out

### SiteFooter

- Flex row: copyright left, links right
- Top border: 1px solid border colour
- Padding: 40px 48px
- Text: Caption size, muted colour

---

## 9. Image Handling

All portfolio images should be placed in `resources/images/` organised by category:

```
resources/images/
├── hero/
│   └── main.jpg
├── product/
│   ├── 001.jpg
│   ├── 002.jpg
│   └── ...
├── food/
│   ├── 001.jpg
│   ├── 002.jpg
│   └── ...
└── advertising/
    ├── 001.jpg
    ├── 002.jpg
    └── ...
```

Images are pre-organised in `resources/images/` by category (see folder structure above).

Use Next.js `<Image>` component with appropriate `sizes` prop for responsive loading. Gallery images should use `loading="lazy"` except for hero and above-fold content.

---

## 10. Accessibility Requirements

- Semantic HTML5 elements (`<nav>`, `<main>`, `<section>`, `<footer>`)
- All images must have descriptive `alt` text
- Keyboard navigation for lightbox (Escape, Arrow keys)
- Focus trap in mobile nav and lightbox when open
- Minimum 4.5:1 contrast ratio for body text
- `prefers-reduced-motion` media query to disable animations
- ARIA labels on interactive elements without visible text (hamburger, close buttons)
- Skip-to-content link

---

## 11. Performance Targets

| Metric                   | Target  |
| ------------------------ | ------- |
| LCP                      | < 2.5s  |
| CLS                      | < 0.1   |
| INP                      | < 200ms |
| Lighthouse Performance   | > 90    |
| Lighthouse Accessibility | > 95    |

### Optimisation strategies

- Hero image with `priority` and `fetchpriority="high"`
- Gallery images with `loading="lazy"` and appropriate `sizes`
- Fonts: `display=swap` with `next/font`
- Minimal client-side JavaScript (lightbox + mobile nav only)
- Static generation for all pages (no SSR needed)
- Image optimisation via Next.js Image component

---

## 12. Testing Strategy

- **Unit tests (Vitest):** Component rendering, props, conditional logic
- **Stories (Storybook):** Visual states for every component, including variants and responsive
- **Each component folder** contains its own `.test.tsx` and `.stories.tsx`

Minimum test coverage per component:

- Renders without crashing
- Renders correct content from props
- Conditional rendering (e.g. optional viewAllLink in SectionHeader)
- Interaction states where applicable (Lightbox open/close, MobileNav toggle)

---

## 13. Git Workflow

- `main` branch is protected — no direct pushes
- Feature branches: `feature/<ticket-id>-<short-description>`
- All PRs require review from the principal developer before merge
- Squash merge into main
- GitHub Actions: lint, typecheck, test on every PR

---

## 14. Reference Links

- **Design System HTML:** See `design-system.html` for live component previews
- **Current site:** [neilhurley.com](https://www.neilhurley.com/)
