import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeroOverlapping } from './hero-overlapping';
import foodData from '@/data/food.json';
import advertisingData from '@/data/advertising.json';

const imagePool = [
  ...foodData.items.map((item) => item.image),
  ...advertisingData.items.map((item) => item.image),
];

/** Storybook metadata for HeroOverlapping stories. */
const meta: Meta<typeof HeroOverlapping> = {
  title: 'Components/HeroOverlapping',
  component: HeroOverlapping,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HeroOverlapping>;

/** Default hero with three random images drawn from the combined food + advertising pool. */
export const Default: Story = {
  args: {
    name: 'Neil Hurley',
    imagePool,
  },
};

/** Minimal pool (exactly 3 images) — verifies the component works at the minimum required pool size. */
export const MinimalPool: Story = {
  args: {
    name: 'Neil Hurley',
    imagePool: imagePool.slice(0, 3),
  },
};

/** Rendered with reduced motion preference — all entrance and parallax animations are skipped. */
export const ReducedMotion: Story = {
  name: 'Reduced Motion',
  parameters: {
    motionSafe: false,
  },
  args: {
    ...Default.args,
  },
};
