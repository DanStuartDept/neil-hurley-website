import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './hero';

const meta: Meta<typeof Hero> = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {
    image: {
      src: '/resources/images/hero/main.jpg',
      alt: 'Neil Hurley Photography',
    },
  },
};
