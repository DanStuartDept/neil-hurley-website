import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ContactSection } from './contact-section';

const meta: Meta<typeof ContactSection> = {
  title: 'Components/ContactSection',
  component: ContactSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContactSection>;

export const Default: Story = {
  args: {
    heading: "Let's work together",
    details: [
      { label: 'Phone', value: '+353 87 672 4862', href: 'tel:+353876724862' },
      { label: 'Email', value: 'info@neilhurley.com', href: 'mailto:info@neilhurley.com' },
      { label: 'Location', value: 'Dublin, Ireland' },
    ],
  },
};
