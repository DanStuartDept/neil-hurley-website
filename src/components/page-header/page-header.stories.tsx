import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PageHeader } from './page-header';

/** Storybook metadata for PageHeader stories. */
const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

/** Default page header with title and description. */
export const Default: Story = {
  args: {
    title: 'Food & Drink',
    description: 'Crafting appetite through light, texture and composition.',
  },
};

/** Page header without a description. */
export const WithoutDescription: Story = {
  args: {
    title: 'Selected Clients',
  },
};
