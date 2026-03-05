import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from '@storybook/test';
import { Lightbox } from './lightbox';
import { GalleryGrid } from '@/components/gallery-grid';
import foodData from '@/data/food.json';
import advertisingData from '@/data/advertising.json';

/** Storybook metadata for Lightbox stories. */
const meta: Meta<typeof Lightbox> = {
  title: 'Components/Lightbox',
  component: Lightbox,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Lightbox>;
type GalleryGridStory = StoryObj<typeof GalleryGrid>;

/** Default lightbox showing the first food image. */
export const Default: Story = {
  args: {
    items: foodData.items,
    currentIndex: 0,
    onClose: () => {},
    onNavigate: () => {},
  },
};

/** Lightbox starting at a middle food image. */
export const MiddleImage: Story = {
  args: {
    items: foodData.items,
    currentIndex: 1,
    onClose: () => {},
    onNavigate: () => {},
  },
};

/** Lightbox with advertising collection images. */
export const AdvertisingLightbox: Story = {
  args: {
    items: advertisingData.items,
    currentIndex: 0,
    onClose: () => {},
    onNavigate: () => {},
  },
};

/** Opens lightbox via gallery click and verifies dialog is visible. */
export const OpensAndDisplaysImage: GalleryGridStory = {
  render: () => (
    <GalleryGrid items={foodData.items.slice(0, 3)} variant="uniform" />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstItem = canvas.getByRole('button', {
      name: /View Fresh Ingredients/i,
    });
    await userEvent.click(firstItem);
    const dialog = await within(document.body).findByRole('dialog');
    await expect(dialog).toBeVisible();
  },
};

/** Opens lightbox then closes it with Escape key. */
export const ClosesOnEscapeKey: GalleryGridStory = {
  render: () => (
    <GalleryGrid items={foodData.items.slice(0, 3)} variant="uniform" />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstItem = canvas.getByRole('button', {
      name: /View Fresh Ingredients/i,
    });
    await userEvent.click(firstItem);
    const dialog = await within(document.body).findByRole('dialog');
    await expect(dialog).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await expect(within(document.body).queryByRole('dialog')).toBeNull();
  },
};

/** Opens lightbox and navigates to next image. */
export const NavigatesToNextImage: GalleryGridStory = {
  render: () => (
    <GalleryGrid items={foodData.items.slice(0, 3)} variant="uniform" />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstItem = canvas.getByRole('button', {
      name: /View Fresh Ingredients/i,
    });
    await userEvent.click(firstItem);
    const dialog = await within(document.body).findByRole('dialog');
    await expect(dialog).toBeVisible();
    const nextButton = within(dialog).getByRole('button', {
      name: /Next image/i,
    });
    await userEvent.click(nextButton);
    const img = within(dialog).getByRole('img');
    await expect(img).toHaveAttribute('alt', foodData.items[1].image.alt);
  },
};
