import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SiteHeader } from './site-header';

vi.mock('next/navigation', () => ({
  usePathname: () => '/food',
}));

vi.mock('@/components/mobile-nav', () => ({
  MobileNav: ({ isOpen, onClose, links }: { isOpen: boolean; onClose: () => void; links: { label: string; href: string }[] }) => {
    if (!isOpen) return null;
    return (
      <div role="dialog" aria-label="Mobile navigation" data-testid="mobile-nav">
        <button onClick={onClose} aria-label="Close navigation">Close</button>
        {links.map((link) => (
          <a key={link.href} href={link.href}>{link.label}</a>
        ))}
      </div>
    );
  },
}));

const links = [
  { label: 'Portfolio', href: '/' },
  { label: 'Food', href: '/food' },
  { label: 'Advertising', href: '/advertising' },
];

describe('SiteHeader', () => {
  it('renders the logo linking to home', () => {
    render(<SiteHeader links={links} />);
    const logo = screen.getByText('Neil Hurley');
    expect(logo.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders all navigation links', () => {
    render(<SiteHeader links={links} />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('Advertising')).toBeInTheDocument();
  });

  it('applies active styles to the current route link', () => {
    render(<SiteHeader links={links} />);
    const foodLink = screen.getByText('Food').closest('a');
    expect(foodLink?.className).toContain('text-primary');
    expect(foodLink?.className).toContain('after:w-full');
  });

  it('applies inactive styles to non-current route links', () => {
    render(<SiteHeader links={links} />);
    const portfolioLink = screen.getByText('Portfolio').closest('a');
    expect(portfolioLink?.className).toContain('text-secondary');
    expect(portfolioLink?.className).toContain('after:w-0');
  });

  it('renders hamburger button for mobile', () => {
    render(<SiteHeader links={links} />);
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('opens MobileNav when hamburger is clicked', () => {
    render(<SiteHeader links={links} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
  });

  it('closes MobileNav via onClose callback', () => {
    render(<SiteHeader links={links} />);
    fireEvent.click(screen.getByLabelText('Open menu'));
    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close navigation'));
    expect(screen.queryByTestId('mobile-nav')).not.toBeInTheDocument();
  });

  it('has sticky positioning with correct z-index', () => {
    render(<SiteHeader links={links} />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('sticky');
    expect(header.className).toContain('top-0');
    expect(header.className).toContain('z-50');
  });

  it('has aria-label on nav element', () => {
    render(<SiteHeader links={links} />);
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });
});
