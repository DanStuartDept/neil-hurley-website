import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MobileNav } from './mobile-nav';

const links = [
  { label: 'Portfolio', href: '/' },
  { label: 'Food', href: '/food' },
  { label: 'Contact', href: '/contact' },
];

describe('MobileNav', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <MobileNav isOpen={false} onClose={vi.fn()} links={links} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders links when open', () => {
    render(<MobileNav isOpen={true} onClose={vi.fn()} links={links} />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders close button', () => {
    render(<MobileNav isOpen={true} onClose={vi.fn()} links={links} />);
    expect(screen.getByLabelText('Close navigation')).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn();
    render(<MobileNav isOpen={true} onClose={onClose} links={links} />);
    fireEvent.click(screen.getByLabelText('Close navigation'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape key', () => {
    const onClose = vi.fn();
    render(<MobileNav isOpen={true} onClose={onClose} links={links} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when a link is clicked', () => {
    const onClose = vi.fn();
    render(<MobileNav isOpen={true} onClose={onClose} links={links} />);
    fireEvent.click(screen.getByText('Food'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('has dialog role with aria-modal', () => {
    render(<MobileNav isOpen={true} onClose={vi.fn()} links={links} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });
});
