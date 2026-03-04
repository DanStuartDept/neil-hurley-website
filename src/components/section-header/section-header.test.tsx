import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SectionHeader } from './section-header';

describe('SectionHeader', () => {
  it('renders the title', () => {
    render(<SectionHeader title="Food & Drink" />);
    expect(screen.getByText('Food & Drink')).toBeInTheDocument();
  });

  it('renders title as h2', () => {
    render(<SectionHeader title="Test Title" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test Title');
  });

  it('renders view all link when provided', () => {
    render(
      <SectionHeader
        title="Food & Drink"
        viewAllLink={{ label: 'View Collection', href: '/food' }}
      />
    );
    const link = screen.getByRole('link', { name: 'View Collection' });
    expect(link).toHaveAttribute('href', '/food');
  });

  it('does not render link when viewAllLink is not provided', () => {
    render(<SectionHeader title="Clients" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('applies mb-12 spacing', () => {
    const { container } = render(<SectionHeader title="Test" />);
    expect(container.firstChild).toHaveClass('mb-12');
  });
});
