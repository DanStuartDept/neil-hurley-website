import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Lightbox } from './lightbox';
import foodData from '@/data/food.json';
import advertisingData from '@/data/advertising.json';

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

/** Default lightbox showing the first food image. */
export const Default: Story = {
  args: {
    items: foodData.items,
    currentIndex: 0,
    onClose: () => {},
    onNavigate: () => {},
  },
};

/** Lightbox starting at a middle food image. */
export const MiddleImage: Story = {
  args: {
    items: foodData.items,
    currentIndex: 1,
    onClose: () => {},
    onNavigate: () => {},
  },
};

/** Lightbox with advertising collection images. */
export const AdvertisingLightbox: Story = {
  args: {
    items: advertisingData.items,
    currentIndex: 0,
    onClose: () => {},
    onNavigate: () => {},
  },
};
