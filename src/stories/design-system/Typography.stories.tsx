import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta = {
  title: 'Design System/Typography',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const typeScale = [
  { name: 'Display 1', size: '4rem', px: '64px', font: 'Libre Baskerville', weight: '400', tracking: '-0.02em', usage: 'Hero title', sample: 'Still Life & Product' },
  { name: 'Display 2', size: '3.25rem', px: '52px', font: 'Libre Baskerville', weight: '400', tracking: '-0.01em', usage: 'Page headers', sample: 'Food & Drink' },
  { name: 'Display 3', size: '2rem', px: '32px', font: 'Libre Baskerville', weight: '400', tracking: 'normal', usage: 'Section titles', sample: 'Selected Work' },
  { name: 'Heading 1', size: '1.5rem', px: '24px', font: 'Libre Baskerville', weight: '400', tracking: 'normal', usage: 'Card titles', sample: 'Artisan Produce' },
  { name: 'Heading 2', size: '1.25rem', px: '20px', font: 'Libre Baskerville', weight: '400', tracking: 'normal', usage: 'Subsection titles', sample: 'Advertising' },
  { name: 'Body', size: '1rem', px: '16px', font: 'Outfit', weight: '300', tracking: 'normal', usage: 'Paragraphs', sample: 'Crafting appetite through light, texture and composition.' },
  { name: 'Body Small', size: '0.875rem', px: '14px', font: 'Outfit', weight: '300', tracking: 'normal', usage: 'Descriptions', sample: 'Still life photographer based in Dublin, Ireland.' },
  { name: 'Label', size: '0.75rem', px: '12px', font: 'Outfit', weight: '400', tracking: '0.18em', usage: 'Nav links, uppercase', sample: 'PORTFOLIO' },
  { name: 'Caption', size: '0.75rem', px: '12px', font: 'Outfit', weight: '300', tracking: '0.12em', usage: 'Footer, copyright', sample: '© 2024 Neil Hurley Photography' },
];

export const TypeScale: Story = {
  name: 'Type Scale',
  render: () => (
    <div className="space-y-8 bg-white p-8">
      <div>
        <h1 className="mb-1 text-2xl font-semibold font-sans">Typography</h1>
        <p className="text-sm text-[#7a756e] font-sans">Libre Baskerville (display) · Outfit (body/UI)</p>
      </div>
      <div className="divide-y divide-[#e0dbd4]">
        {typeScale.map((t) => (
          <div key={t.name} className="flex items-baseline gap-8 py-6">
            <div className="w-36 shrink-0">
              <p className="text-xs font-semibold font-sans text-[#1a1815]">{t.name}</p>
              <p className="text-xs font-mono text-[#a8a29e]">{t.size} / {t.px}</p>
              <p className="text-xs font-mono text-[#a8a29e]">{t.font.replace('Libre Baskerville', 'Baskerville')}</p>
              <p className="text-xs font-mono text-[#a8a29e]">w{t.weight}</p>
              {t.tracking !== 'normal' && <p className="text-xs font-mono text-[#a8a29e]">ls {t.tracking}</p>}
              <p className="mt-1 text-xs text-[#7a756e] font-sans">{t.usage}</p>
            </div>
            <div
              className="flex-1 text-[#1a1815] leading-tight"
              style={{
                fontSize: t.size,
                fontFamily: t.font === 'Libre Baskerville' ? 'var(--font-baskerville), Georgia, serif' : 'var(--font-outfit), system-ui, sans-serif',
                fontWeight: t.weight,
                letterSpacing: t.tracking,
              }}
            >
              {t.sample}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[#e0dbd4] pt-6">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#7a756e] font-sans">Ampersand Convention</h2>
        <p className="text-sm text-[#7a756e] font-sans mb-4">Ampersands in headings use italic style and accent colour.</p>
        <div
          className="text-[2rem] leading-tight text-[#1a1815]"
          style={{ fontFamily: 'var(--font-baskerville), Georgia, serif' }}
        >
          Food{' '}
          <span style={{ fontStyle: 'italic', color: '#8b7355' }}>&</span>
          {' '}Drink
        </div>
      </div>
    </div>
  ),
};
