import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HeroOverlapping } from './hero-overlapping';
import type { ImageType } from '@/components/types';

const mockMotionDiv = vi.fn(({ children, className }: { children?: React.ReactNode; className?: string }) =>
  React.createElement('div', { className }, children)
);

const mockUseReducedMotion = vi.fn(() => false);
const mockMouseXSet = vi.fn();
const mockMouseYSet = vi.fn();

vi.mock('motion/react', () => ({
  motion: {
    div: (props: Parameters<typeof mockMotionDiv>[0]) => mockMotionDiv(props),
  },
  useReducedMotion: () => mockUseReducedMotion(),
  useScroll: () => ({ scrollYProgress: 0 }),
  useTransform: (...args: unknown[]) => {
    if (typeof args[1] === 'function') {
      // Multi-input form: useTransform([vals], fn)
      if (Array.isArray(args[0])) {
        (args[1] as (v: number[]) => number)([0, 0]);
      } else {
        // Single-input form: useTransform(motionValue, fn)
        (args[1] as (v: number) => number)(0);
      }
    }
    return 0;
  },
  useMotionValue: (initial: number) => {
    if (initial === 0) {
      // Return the first call's mock for mouseX, second for mouseY
      return { set: mockMouseXSet };
    }
    return { set: vi.fn() };
  },
  useSpring: () => 0,
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, fill, priority, ...rest }: { src: string; alt: string; fill?: boolean; priority?: boolean; [key: string]: unknown }) =>
    React.createElement('img', { src, alt, 'data-fill': fill, 'data-priority': priority, ...rest }),
}));

const imagePool: ImageType[] = [
  { src: '/images/food/01.jpg', alt: 'Food image one' },
  { src: '/images/food/02.jpg', alt: 'Food image two' },
  { src: '/images/food/03.jpg', alt: 'Food image three' },
  { src: '/images/food/04.jpg', alt: 'Food image four' },
  { src: '/images/food/05.jpg', alt: 'Food image five' },
];

describe('HeroOverlapping', () => {
  beforeEach(() => {
    mockMotionDiv.mockClear();
    mockUseReducedMotion.mockReturnValue(false);
  });

  it('renders the section element', () => {
    const { container } = render(<HeroOverlapping name="Neil Hurley" imagePool={imagePool} />);
    const section = container.querySelector('section');
    expect(section).toBeInTheDocument();
  });

  it('renders the photographer name with first name and surname', () => {
    render(<HeroOverlapping name="Neil Hurley" imagePool={imagePool} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain('Neil');
    expect(heading.textContent).toContain('Hurley');
  });

  it('renders the surname in an em element', () => {
    const { container } = render(<HeroOverlapping name="Neil Hurley" imagePool={imagePool} />);
    const em = container.querySelector('h1 em');
    expect(em).toBeInTheDocument();
    expect(em?.textContent).toBe('Hurley');
  });

  it('renders exactly three frame images from the image pool', () => {
    render(<HeroOverlapping name="Neil Hurley" imagePool={imagePool} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    // All should have src values from the pool
    const srcs = images.map((img) => img.getAttribute('src'));
    srcs.forEach((src) => {
      expect(imagePool.some((item) => item.src === src)).toBe(true);
    });
  });

  it('renders the scroll cue with Scroll label', () => {
    render(<HeroOverlapping name="Neil Hurley" imagePool={imagePool} />);
    expect(screen.getByText('Scroll')).toBeInTheDocument();
  });

  it('renders correctly with reduced motion preference', () => {
    mockUseReducedMotion.mockReturnValue(true);
    const { container } = render(<HeroOverlapping name="Neil Hurley" imagePool={imagePool} />);
    expect(container.querySelector('section')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('picks three unique images from the pool', () => {
    render(<HeroOverlapping name="Neil Hurley" imagePool={imagePool} />);
    const images = screen.getAllByRole('img');
    const srcs = images.map((img) => img.getAttribute('src'));
    const uniqueSrcs = new Set(srcs);
    expect(uniqueSrcs.size).toBe(3);
  });

  it('handles mousemove events on the section', () => {
    const { container } = render(<HeroOverlapping name="Neil Hurley" imagePool={imagePool} />);
    const section = container.querySelector('section')!;
    // Simulate mouse move — should not throw
    fireEvent.mouseMove(section, { clientX: 100, clientY: 100 });
    expect(section).toBeInTheDocument();
  });

  it('does not update mouse values when reduced motion is preferred', () => {
    mockUseReducedMotion.mockReturnValue(true);
    mockMouseXSet.mockClear();
    const { container } = render(<HeroOverlapping name="Neil Hurley" imagePool={imagePool} />);
    const section = container.querySelector('section')!;
    fireEvent.mouseMove(section, { clientX: 100, clientY: 100 });
    expect(mockMouseXSet).not.toHaveBeenCalled();
  });
});
