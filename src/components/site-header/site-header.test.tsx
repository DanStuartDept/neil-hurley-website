import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SiteHeader } from './site-header';

vi.mock('next/navigation', () => ({
  usePathname: () => '/food',
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
    expect(screen.getAllByText('Portfolio').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Food').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Advertising').length).toBeGreaterThanOrEqual(1);
  });

  it('applies active styles to the current route link', () => {
    render(<SiteHeader links={links} />);
    const foodLinks = screen.getAllByText('Food');
    const desktopFoodLink = foodLinks[0].closest('a');
    expect(desktopFoodLink?.className).toContain('text-primary');
  });

  it('renders hamburger button for mobile', () => {
    render(<SiteHeader links={links} />);
    const hamburger = screen.getByLabelText('Open menu');
    expect(hamburger).toBeInTheDocument();
  });

  it('opens mobile nav when hamburger is clicked', () => {
    render(<SiteHeader links={links} />);
    const hamburger = screen.getByLabelText('Open menu');
    fireEvent.click(hamburger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has sticky positioning', () => {
    render(<SiteHeader links={links} />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('sticky');
    expect(header.className).toContain('top-0');
    expect(header.className).toContain('z-50');
  });

  it('has aria-label on nav element', () => {
    render(<SiteHeader links={links} />);
    expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
  });
});
