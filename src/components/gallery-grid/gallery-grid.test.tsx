import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { GalleryItem } from './gallery-item';
import { GalleryGrid } from './gallery-grid';

const mockItems = [
  {
    id: 'food-1',
    image: { src: '/images/food/001.jpg', alt: 'Artisan produce' },
    title: 'Artisan Produce',
    category: 'Food',
  },
  {
    id: 'food-2',
    image: { src: '/images/food/002.jpg', alt: 'Fresh bread' },
    title: 'Fresh Bread',
    category: 'Food',
  },
  {
    id: 'food-3',
    image: { src: '/images/food/003.jpg', alt: 'Wine glass' },
    title: 'Wine Glass',
    category: 'Editorial',
  },
];

describe('GalleryItem', () => {
  it('renders with item data', () => {
    render(
      <GalleryItem item={mockItems[0]} onClick={vi.fn()} />
    );
    expect(screen.getByAltText('Artisan produce')).toBeInTheDocument();
    expect(screen.getByText('Artisan Produce')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<GalleryItem item={mockItems[0]} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has accessible label', () => {
    render(<GalleryItem item={mockItems[0]} onClick={vi.fn()} />);
    expect(screen.getByLabelText('View Artisan Produce')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <GalleryItem
        item={mockItems[0]}
        onClick={vi.fn()}
        className="md:col-span-2"
      />
    );
    expect(screen.getByRole('button').className).toContain('md:col-span-2');
  });
});

describe('GalleryGrid', () => {
  it('renders all items', () => {
    render(<GalleryGrid items={mockItems} variant="uniform" />);
    expect(screen.getByAltText('Artisan produce')).toBeInTheDocument();
    expect(screen.getByAltText('Fresh bread')).toBeInTheDocument();
    expect(screen.getByAltText('Wine glass')).toBeInTheDocument();
  });

  it('applies asymmetric classes to first item', () => {
    render(<GalleryGrid items={mockItems} variant="asymmetric" />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].className).toContain('md:col-span-2');
    expect(buttons[0].className).toContain('md:row-span-2');
  });

  it('does not apply span classes in uniform mode', () => {
    render(<GalleryGrid items={mockItems} variant="uniform" />);
    const buttons = screen.getAllByRole('button');
    expect(buttons[0].className).not.toContain('md:col-span-2');
  });

  it('opens lightbox when item is clicked', () => {
    render(<GalleryGrid items={mockItems} variant="uniform" />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
