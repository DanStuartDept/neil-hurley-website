import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  it('renders copyright with provided year', () => {
    render(<SiteFooter year={2026} />);
    expect(screen.getByText(/2026 Neil Hurley Photography/)).toBeInTheDocument();
  });

  it('defaults to current year when no year provided', () => {
    render(<SiteFooter />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear}`))).toBeInTheDocument();
  });

  it('renders footer links', () => {
    const links = [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Instagram', href: 'https://instagram.com', isExternal: true },
    ];
    render(<SiteFooter year={2026} links={links} />);
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
  });

  it('renders external links with target blank', () => {
    const links = [
      { label: 'Instagram', href: 'https://instagram.com', isExternal: true },
    ];
    render(<SiteFooter year={2026} links={links} />);
    const link = screen.getByText('Instagram').closest('a');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render nav when no links provided', () => {
    render(<SiteFooter year={2026} />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('has top border', () => {
    const { container } = render(<SiteFooter year={2026} />);
    const footer = container.querySelector('footer');
    expect(footer?.className).toContain('border-t');
    expect(footer?.className).toContain('border-border');
  });
});
