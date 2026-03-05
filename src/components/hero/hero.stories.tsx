import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Hero } from './hero';

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

export const Default: Story = {
  args: {
    image: {
      src: '/images/product/1021.jpg',
      alt: 'Neil Hurley Photography',
    },
  },
};
