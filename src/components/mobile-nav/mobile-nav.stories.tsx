import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { SiteHeader } from '@/components/site-header';
import { MobileNav } from './mobile-nav';

/** Storybook metadata for MobileNav stories. */
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
type SiteHeaderStory = StoryObj<typeof SiteHeader>;

const defaultLinks = [
  { label: 'Portfolio', href: '/' },
  { label: 'Food', href: '/food' },
  { label: 'Advertising', href: '/advertising' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact', href: '/contact' },
];

/** Mobile navigation in the open state. */
export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    links: defaultLinks,
  },
};

/** Mobile navigation in the closed state. */
export const Closed: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    links: defaultLinks,
  },
};

/** Opens mobile nav when menu button is clicked. */
export const OpensOnMenuButtonClick: SiteHeaderStory = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [375] },
  },
  render: () => <SiteHeader links={defaultLinks} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuButton = canvas.getByRole('button', { name: /Open menu/i });
    await userEvent.click(menuButton);
    const dialog = await within(document.body).findByRole('dialog', {
      name: /Mobile navigation/i,
    });
    await expect(dialog).toBeVisible();
    await expect(within(dialog).getByText('Portfolio')).toBeVisible();
    await expect(within(dialog).getByText('Contact')).toBeVisible();
  },
};

/** Opens then closes mobile nav via close button. */
export const ClosesOnCloseButtonClick: SiteHeaderStory = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [375] },
  },
  render: () => <SiteHeader links={defaultLinks} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const menuButton = canvas.getByRole('button', { name: /Open menu/i });
    await userEvent.click(menuButton);
    const dialog = await within(document.body).findByRole('dialog', {
      name: /Mobile navigation/i,
    });
    await expect(dialog).toBeVisible();
    const closeButton = within(dialog).getByRole('button', {
      name: /Close navigation/i,
    });
    await userEvent.click(closeButton);
    await expect(within(document.body).queryByRole('dialog')).toBeNull();
  },
};
