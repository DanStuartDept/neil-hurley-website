import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionHeader } from './section-header';

/** Storybook metadata for SectionHeader stories. */
const meta: Meta<typeof SectionHeader> = {
  title: 'Components/SectionHeader',
  component: SectionHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

/** Section header with a view-all link. */
export const WithViewAllLink: Story = {
  args: {
    title: 'Food & Drink',
    viewAllLink: { label: 'View Collection', href: '/food' },
  },
};

/** Section header without a view-all link. */
export const WithoutViewAllLink: Story = {
  args: {
    title: 'Selected Clients',
  },
};
