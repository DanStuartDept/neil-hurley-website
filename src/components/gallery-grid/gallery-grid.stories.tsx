import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GalleryGrid } from './gallery-grid';

const meta: Meta<typeof GalleryGrid> = {
  title: 'Components/GalleryGrid',
  component: GalleryGrid,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof GalleryGrid>;

const mockItems = [
  {
    id: 'food-1',
    image: { src: '/resources/images/food/001.jpg', alt: 'Artisan produce' },
    title: 'Artisan Produce',
    category: 'Food',
  },
  {
    id: 'food-2',
    image: { src: '/resources/images/food/002.jpg', alt: 'Fresh bread' },
    title: 'Fresh Bread',
    category: 'Food',
  },
  {
    id: 'food-3',
    image: { src: '/resources/images/food/003.jpg', alt: 'Wine glass' },
    title: 'Wine Glass',
    category: 'Editorial',
  },
  {
    id: 'food-4',
    image: { src: '/resources/images/food/004.jpg', alt: 'Cheese board' },
    title: 'Cheese Board',
    category: 'Food',
  },
  {
    id: 'food-5',
    image: { src: '/resources/images/food/005.jpg', alt: 'Coffee setup' },
    title: 'Coffee Setup',
    category: 'Product',
  },
];

export const Asymmetric: Story = {
  args: {
    items: mockItems,
    variant: 'asymmetric',
  },
};

export const Uniform: Story = {
  args: {
    items: mockItems,
    variant: 'uniform',
  },
};
