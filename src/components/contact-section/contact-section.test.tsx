import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ContactSection } from './contact-section';

const details = [
  { label: 'Phone', value: '+353 87 672 4862', href: 'tel:+353876724862' },
  { label: 'Email', value: 'info@neilhurley.com', href: 'mailto:info@neilhurley.com' },
  { label: 'Location', value: 'Dublin, Ireland' },
];

describe('ContactSection', () => {
  it('renders the heading', () => {
    render(<ContactSection heading="Let's work together" details={details} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent("Let's work together");
  });

  it('renders all contact detail labels', () => {
    render(<ContactSection heading="Contact" details={details} />);
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
  });

  it('renders contact detail values', () => {
    render(<ContactSection heading="Contact" details={details} />);
    expect(screen.getByText('+353 87 672 4862')).toBeInTheDocument();
    expect(screen.getByText('info@neilhurley.com')).toBeInTheDocument();
    expect(screen.getByText('Dublin, Ireland')).toBeInTheDocument();
  });

  it('renders links for details with href', () => {
    render(<ContactSection heading="Contact" details={details} />);
    const phoneLink = screen.getByText('+353 87 672 4862').closest('a');
    expect(phoneLink).toHaveAttribute('href', 'tel:+353876724862');
    const emailLink = screen.getByText('info@neilhurley.com').closest('a');
    expect(emailLink).toHaveAttribute('href', 'mailto:info@neilhurley.com');
  });

  it('renders plain text for details without href', () => {
    render(<ContactSection heading="Contact" details={details} />);
    const location = screen.getByText('Dublin, Ireland');
    expect(location.closest('a')).toBeNull();
  });

  it('renders the CTA text', () => {
    render(<ContactSection heading="Contact" details={details} />);
    expect(screen.getByText(/Get in touch/)).toBeInTheDocument();
  });
});
