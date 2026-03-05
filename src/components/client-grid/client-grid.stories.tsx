import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ClientGrid } from './client-grid';

/** Storybook metadata for ClientGrid stories. */
const meta: Meta<typeof ClientGrid> = {
  title: 'Components/ClientGrid',
  component: ClientGrid,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ClientGrid>;

/** Default grid with a full set of clients. */
export const Default: Story = {
  args: {
    clients: [
      { name: 'Hermes' },
      { name: 'Cartier' },
      { name: 'Brown Thomas' },
      { name: 'Avoca Handweavers' },
      { name: "Kellogg's" },
      { name: 'Pepsi' },
      { name: 'American Express' },
      { name: 'Adidas' },
      { name: 'Flora' },
      { name: 'BBC' },
      { name: 'ITV' },
      { name: 'Channel 4' },
    ],
  },
};

/** Grid with only a few clients. */
export const FewClients: Story = {
  args: {
    clients: [
      { name: 'Hermes' },
      { name: 'Cartier' },
      { name: 'Brown Thomas' },
    ],
  },
};
