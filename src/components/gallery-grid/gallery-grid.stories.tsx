import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GalleryGrid } from './gallery-grid';
import foodData from '@/data/food.json';
import advertisingData from '@/data/advertising.json';

/** Storybook metadata for GalleryGrid stories. */
const meta: Meta<typeof GalleryGrid> = {
  title: 'Components/GalleryGrid',
  component: GalleryGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GalleryGrid>;

/** Asymmetric layout with a featured first item. */
export const Asymmetric: Story = {
  args: {
    items: foodData.items.slice(0, 5),
    variant: 'asymmetric',
  },
};

/** Uniform layout with equally sized items. */
export const Uniform: Story = {
  args: {
    items: advertisingData.items.slice(0, 3),
    variant: 'uniform',
  },
};

/** Full food collection in asymmetric layout. */
export const FullFoodGrid: Story = {
  args: {
    items: foodData.items,
    variant: 'asymmetric',
  },
};

/** Full advertising collection in uniform layout. */
export const FullAdvertisingGrid: Story = {
  args: {
    items: advertisingData.items,
    variant: 'uniform',
  },
};
