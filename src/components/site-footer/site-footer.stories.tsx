import type { Meta, StoryObj } from '@storybook/react';
import { SiteFooter } from './site-footer';

const meta: Meta<typeof SiteFooter> = {
  title: 'Components/SiteFooter',
  component: SiteFooter,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SiteFooter>;

export const Default: Story = {
  args: {
    year: 2026,
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Instagram', href: 'https://instagram.com', isExternal: true },
    ],
  },
};

export const NoLinks: Story = {
  args: {
    year: 2026,
  },
};

export const CurrentYear: Story = {
  args: {
    links: [{ label: 'Privacy Policy', href: '/privacy' }],
  },
};
