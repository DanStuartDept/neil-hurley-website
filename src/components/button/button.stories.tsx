import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './button';

/** Storybook metadata for Button stories. */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

/** Primary variant button. */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'View Collection',
  },
};

/** Secondary variant button. */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Learn More',
  },
};

/** Ghost variant button. */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Cancel',
  },
};

/** Small size button. */
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Small Button',
  },
};

/** Large size button. */
export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Large Button',
  },
};

/** Disabled state button. */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled',
  },
};

/** Button rendered as a link. */
export const AsLink: Story = {
  args: {
    variant: 'secondary',
    href: '/food',
    children: 'View Food Gallery',
  },
};
