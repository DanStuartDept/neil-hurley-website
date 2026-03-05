import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MobileNav } from './mobile-nav';

const meta: Meta<typeof MobileNav> = {
  title: 'Components/MobileNav',
  component: MobileNav,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MobileNav>;

const defaultLinks = [
  { label: 'Portfolio', href: '/' },
  { label: 'Food', href: '/food' },
  { label: 'Advertising', href: '/advertising' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact', href: '/contact' },
];

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    links: defaultLinks,
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    links: defaultLinks,
  },
};
