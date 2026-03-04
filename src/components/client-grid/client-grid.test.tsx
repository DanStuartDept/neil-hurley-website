import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ClientGrid } from './client-grid';

const clients = [
  { name: 'Hermes' },
  { name: 'Cartier' },
  { name: 'Brown Thomas' },
];

describe('ClientGrid', () => {
  it('renders all client names', () => {
    render(<ClientGrid clients={clients} />);
    expect(screen.getByText('Hermes')).toBeInTheDocument();
    expect(screen.getByText('Cartier')).toBeInTheDocument();
    expect(screen.getByText('Brown Thomas')).toBeInTheDocument();
  });

  it('renders correct number of grid cells', () => {
    const { container } = render(<ClientGrid clients={clients} />);
    const cells = container.querySelectorAll('.bg-background');
    expect(cells).toHaveLength(3);
  });

  it('applies auto-fill grid layout', () => {
    const { container } = render(<ClientGrid clients={clients} />);
    const grid = container.firstElementChild;
    expect(grid?.className).toContain('grid');
    expect(grid?.className).toContain('gap-px');
    expect(grid?.className).toContain('bg-border-light');
  });

  it('applies hover classes on cells', () => {
    const { container } = render(<ClientGrid clients={clients} />);
    const cell = container.querySelector('.bg-background');
    expect(cell?.className).toContain('hover:bg-card');
    expect(cell?.className).toContain('hover:text-primary');
  });

  it('renders empty grid when no clients', () => {
    const { container } = render(<ClientGrid clients={[]} />);
    const cells = container.querySelectorAll('.bg-background');
    expect(cells).toHaveLength(0);
  });
});
