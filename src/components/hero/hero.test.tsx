import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Hero } from './hero';

vi.mock('motion/react', () => ({
  motion: {
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) =>
      React.createElement('span', props, children),
    li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) =>
      React.createElement('li', props, children),
  },
  useReducedMotion: () => false,
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement('a', { href }, children),
}));

describe('Hero', () => {
  const defaultProps = {
    image: { src: '/images/food/70.jpg', alt: 'Neil Hurley Photography' },
    name: 'Neil Hurley',
    tagline: 'Commercial photographer based in Dublin',
    specialties: [
      { label: 'Food & Drink', href: '/food' },
      { label: 'Advertising & Product', href: '/advertising' },
    ],
  };

  it('renders the hero image with correct alt text', () => {
    render(<Hero {...defaultProps} />);
    const img = screen.getByRole('img', { name: 'Neil Hurley Photography' });
    expect(img).toBeInTheDocument();
  });

  it('renders image with fill layout', () => {
    render(<Hero {...defaultProps} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src');
  });

  it('renders with correct section classes', () => {
    const { container } = render(<Hero {...defaultProps} />);
    const section = container.querySelector('section');
    expect(section?.className).toContain('h-[85vh]');
    expect(section?.className).toContain('overflow-hidden');
  });

  it('renders the gradient overlay', () => {
    const { container } = render(<Hero {...defaultProps} />);
    const overlay = container.querySelector('[class*="bg-linear"]');
    expect(overlay).toBeInTheDocument();
  });

  it('renders name', () => {
    const { container } = render(<Hero {...defaultProps} />);
    const nameEl = container.querySelector('p.font-display');
    expect(nameEl?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Neil Hurley');
  });

  it('renders tagline', () => {
    const { container } = render(<Hero {...defaultProps} />);
    const taglineEl = container.querySelector('p.font-body');
    expect(taglineEl?.textContent?.replace(/\s+/g, ' ').trim()).toBe(
      'Commercial photographer based in Dublin'
    );
  });

  it('renders specialty links with correct hrefs', () => {
    render(<Hero {...defaultProps} />);
    const foodLink = screen.getByRole('link', { name: 'Food & Drink' });
    expect(foodLink).toBeInTheDocument();
    expect(foodLink).toHaveAttribute('href', '/food');

    const adLink = screen.getByRole('link', { name: 'Advertising & Product' });
    expect(adLink).toBeInTheDocument();
    expect(adLink).toHaveAttribute('href', '/advertising');
  });

  it('renders no links when specialties is empty', () => {
    render(<Hero {...defaultProps} specialties={[]} />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });
});
