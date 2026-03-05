import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Lightbox } from './lightbox';

/** Storybook metadata for Lightbox stories. */
const meta: Meta<typeof Lightbox> = {
  title: 'Components/Lightbox',
  component: Lightbox,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Lightbox>;

const mockItems = [
  {
    id: 'food-1',
    image: { src: '/images/food/02.jpg', alt: 'Artisan produce' },
    title: 'Artisan Produce',
    category: 'Food',
  },
  {
    id: 'food-2',
    image: { src: '/images/food/04.jpg', alt: 'Fresh bread' },
    title: 'Fresh Bread',
    category: 'Food',
  },
  {
    id: 'food-3',
    image: { src: '/images/food/05.jpg', alt: 'Wine glass' },
    title: 'Wine Glass',
    category: 'Editorial',
  },
];

/** Default lightbox showing the first image. */
export const Default: Story = {
  args: {
    items: mockItems,
    currentIndex: 0,
    onClose: () => {},
    onNavigate: () => {},
  },
};

/** Lightbox starting at a middle image. */
export const MiddleImage: Story = {
  args: {
    items: mockItems,
    currentIndex: 1,
    onClose: () => {},
    onNavigate: () => {},
  },
};
