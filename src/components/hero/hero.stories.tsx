import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Hero } from './hero';
import homeData from '@/data/home.json';
import foodData from '@/data/food.json';

/** Storybook metadata for Hero stories. */
const meta: Meta<typeof Hero> = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Hero>;

/** Default hero with a full-width background image, name, tagline, and specialty links. */
export const Default: Story = {
  args: {
    image: homeData.hero.image,
    name: homeData.hero.name,
    tagline: homeData.hero.tagline,
    specialties: homeData.hero.specialties,
  },
};

/** Food hero using the first food collection image. */
export const FoodHero: Story = {
  args: {
    image: foodData.items[0].image,
    name: homeData.hero.name,
    tagline: homeData.hero.tagline,
    specialties: homeData.hero.specialties,
  },
};

/** Hero rendered with reduced motion preference (animations should be skipped). */
export const ReducedMotion: Story = {
  name: 'Reduced Motion',
  parameters: {
    backgrounds: { default: 'dark' },
    motionSafe: false,
  },
  args: {
    ...Default.args,
  },
};
