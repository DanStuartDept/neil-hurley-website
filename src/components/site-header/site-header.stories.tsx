import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SiteHeader } from './site-header';

/** Storybook metadata for SiteHeader stories. */
const meta: Meta<typeof SiteHeader> = {
  title: 'Components/SiteHeader',
  component: SiteHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
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

/** Default header with navigation links. */
export const Default: Story = {
  args: {
    links: defaultLinks,
  },
};

/** Header with an active link highlighted. */
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
