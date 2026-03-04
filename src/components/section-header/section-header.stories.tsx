import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SectionHeader } from './section-header';

const meta: Meta<typeof SectionHeader> = {
  title: 'Components/SectionHeader',
  component: SectionHeader,
};

export default meta;
type Story = StoryObj<typeof SectionHeader>;

export const WithViewAllLink: Story = {
  args: {
    title: 'Food & Drink',
    viewAllLink: { label: 'View Collection', href: '/food' },
  },
};

export const WithoutViewAllLink: Story = {
  args: {
    title: 'Selected Clients',
  },
};
