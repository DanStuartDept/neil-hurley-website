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

/** Default hero with a full-width background image. */
export const Default: Story = {
  args: {
    image: homeData.hero.image,
  },
};

/** Food hero using the first food collection image. */
export const FoodHero: Story = {
  args: {
    image: foodData.items[0].image,
  },
};
