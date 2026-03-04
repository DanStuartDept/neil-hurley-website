import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PageHeader } from './page-header';

const meta: Meta<typeof PageHeader> = {
  title: 'Components/PageHeader',
  component: PageHeader,
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: 'Food & Drink',
    description: 'Crafting appetite through light, texture and composition.',
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Selected Clients',
  },
};
