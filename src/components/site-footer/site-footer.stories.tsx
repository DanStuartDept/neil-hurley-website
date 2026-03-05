import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SiteFooter } from './site-footer';

/** Storybook metadata for SiteFooter stories. */
const meta: Meta<typeof SiteFooter> = {
  title: 'Components/SiteFooter',
  component: SiteFooter,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SiteFooter>;

/** Default footer with year and links. */
export const Default: Story = {
  args: {
    year: 2026,
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Instagram', href: 'https://instagram.com', isExternal: true },
    ],
  },
};

/** Footer without any navigation links. */
export const NoLinks: Story = {
  args: {
    year: 2026,
  },
};

/** Footer using the current year automatically. */
export const CurrentYear: Story = {
  args: {
    links: [{ label: 'Privacy Policy', href: '/privacy' }],
  },
};
