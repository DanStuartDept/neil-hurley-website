import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Lightbox } from './lightbox';

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

describe('Lightbox', () => {
  it('renders the current image', () => {
    render(
      <Lightbox
        items={mockItems}
        currentIndex={0}
        onClose={vi.fn()}
        onNavigate={vi.fn()}
      />
    );
    expect(screen.getByAltText('Artisan produce')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(
      <Lightbox
        items={mockItems}
        currentIndex={0}
        onClose={vi.fn()}
        onNavigate={vi.fn()}
      />
    );
    expect(screen.getByLabelText('Close lightbox')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(
      <Lightbox
        items={mockItems}
        currentIndex={0}
        onClose={onClose}
        onNavigate={vi.fn()}
      />
    );
    fireEvent.click(screen.getByLabelText('Close lightbox'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key', () => {
    const onClose = vi.fn();
    render(
      <Lightbox
        items={mockItems}
        currentIndex={0}
        onClose={onClose}
        onNavigate={vi.fn()}
      />
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('navigates to next image on ArrowRight', () => {
    const onNavigate = vi.fn();
    render(
      <Lightbox
        items={mockItems}
        currentIndex={0}
        onClose={vi.fn()}
        onNavigate={onNavigate}
      />
    );
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(onNavigate).toHaveBeenCalledWith(1);
  });

  it('navigates to previous image on ArrowLeft', () => {
    const onNavigate = vi.fn();
    render(
      <Lightbox
        items={mockItems}
        currentIndex={1}
        onClose={vi.fn()}
        onNavigate={onNavigate}
      />
    );
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(onNavigate).toHaveBeenCalledWith(0);
  });

  it('wraps to last item on ArrowLeft from first', () => {
    const onNavigate = vi.fn();
    render(
      <Lightbox
        items={mockItems}
        currentIndex={0}
        onClose={vi.fn()}
        onNavigate={onNavigate}
      />
    );
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(onNavigate).toHaveBeenCalledWith(2);
  });

  it('wraps to first item on ArrowRight from last', () => {
    const onNavigate = vi.fn();
    render(
      <Lightbox
        items={mockItems}
        currentIndex={2}
        onClose={vi.fn()}
        onNavigate={onNavigate}
      />
    );
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(onNavigate).toHaveBeenCalledWith(0);
  });

  it('renders prev and next buttons', () => {
    render(
      <Lightbox
        items={mockItems}
        currentIndex={0}
        onClose={vi.fn()}
        onNavigate={vi.fn()}
      />
    );
    expect(screen.getByLabelText('Previous image')).toBeInTheDocument();
    expect(screen.getByLabelText('Next image')).toBeInTheDocument();
  });

  it('calls onNavigate when next button clicked', () => {
    const onNavigate = vi.fn();
    render(
      <Lightbox
        items={mockItems}
        currentIndex={0}
        onClose={vi.fn()}
        onNavigate={onNavigate}
      />
    );
    fireEvent.click(screen.getByLabelText('Next image'));
    expect(onNavigate).toHaveBeenCalledWith(1);
  });

  it('has dialog role with aria-modal', () => {
    render(
      <Lightbox
        items={mockItems}
        currentIndex={0}
        onClose={vi.fn()}
        onNavigate={vi.fn()}
      />
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });
});
