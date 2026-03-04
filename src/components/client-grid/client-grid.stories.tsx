import type { Meta, StoryObj } from '@storybook/react';
import { ClientGrid } from './client-grid';

const meta: Meta<typeof ClientGrid> = {
  title: 'Components/ClientGrid',
  component: ClientGrid,
};

export default meta;
type Story = StoryObj<typeof ClientGrid>;

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

export const FewClients: Story = {
  args: {
    clients: [
      { name: 'Hermes' },
      { name: 'Cartier' },
      { name: 'Brown Thomas' },
    ],
  },
};
