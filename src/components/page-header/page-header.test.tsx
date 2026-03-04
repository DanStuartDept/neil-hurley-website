import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PageHeader } from './page-header';

describe('PageHeader', () => {
  it('renders the title', () => {
    render(<PageHeader title="Food & Drink" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Food & Drink');
  });

  it('renders the description when provided', () => {
    render(
      <PageHeader
        title="Food & Drink"
        description="Crafting appetite through light, texture and composition."
      />
    );
    expect(screen.getByText('Crafting appetite through light, texture and composition.')).toBeInTheDocument();
  });

  it('does not render description when not provided', () => {
    const { container } = render(<PageHeader title="Selected Clients" />);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(0);
  });

  it('applies correct heading styles', () => {
    render(<PageHeader title="Test" />);
    const heading = screen.getByRole('heading');
    expect(heading.className).toContain('font-display');
    expect(heading.className).toContain('text-primary');
  });

  it('applies top padding for sticky nav clearance', () => {
    const { container } = render(<PageHeader title="Test" />);
    const header = container.querySelector('header');
    expect(header?.className).toContain('pt-32');
  });
});
