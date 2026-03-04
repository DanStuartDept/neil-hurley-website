import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SiteHeader } from './site-header';

const meta: Meta<typeof SiteHeader> = {
  title: 'Components/SiteHeader',
  component: SiteHeader,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SiteHeader>;

const defaultLinks = [
  { label: 'Portfolio', href: '/' },
  { label: 'Food', href: '/food' },
  { label: 'Advertising', href: '/advertising' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact', href: '/contact' },
];

export const Default: Story = {
  args: {
    links: defaultLinks,
  },
};

export const WithActiveLink: Story = {
  args: {
    links: defaultLinks,
  },
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/food',
      },
    },
  },
};
