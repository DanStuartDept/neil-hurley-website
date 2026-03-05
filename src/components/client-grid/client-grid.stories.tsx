import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ClientGrid } from './client-grid';
import clientsData from '@/data/clients.json';

/** Storybook metadata for ClientGrid stories. */
const meta: Meta<typeof ClientGrid> = {
  title: 'Components/ClientGrid',
  component: ClientGrid,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ClientGrid>;

/** Default grid with the full set of clients. */
export const Default: Story = {
  args: {
    clients: clientsData.clients,
  },
};

/** Preview grid with a limited set of clients. */
export const Preview: Story = {
  args: {
    clients: clientsData.clients.slice(0, 8),
  },
};
