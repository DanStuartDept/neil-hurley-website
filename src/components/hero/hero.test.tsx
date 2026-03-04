import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from './hero';

describe('Hero', () => {
  const defaultImage = {
    src: '/resources/images/hero/main.jpg',
    alt: 'Neil Hurley Photography',
  };

  it('renders the hero image with correct alt text', () => {
    render(<Hero image={defaultImage} />);
    const img = screen.getByRole('img', { name: 'Neil Hurley Photography' });
    expect(img).toBeInTheDocument();
  });

  it('renders image with fill layout', () => {
    render(<Hero image={defaultImage} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src');
  });

  it('renders with correct section classes', () => {
    const { container } = render(<Hero image={defaultImage} />);
    const section = container.querySelector('section');
    expect(section?.className).toContain('h-[85vh]');
    expect(section?.className).toContain('min-h-[500px]');
    expect(section?.className).toContain('overflow-hidden');
  });

  it('renders the gradient overlay', () => {
    const { container } = render(<Hero image={defaultImage} />);
    const overlay = container.querySelector('.bg-gradient-to-t');
    expect(overlay).toBeInTheDocument();
  });
});
