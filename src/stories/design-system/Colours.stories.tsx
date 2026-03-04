import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta = {
  title: 'Design System/Colours',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const swatchGroups = [
  {
    label: 'Backgrounds',
    swatches: [
      { name: 'background', hex: '#f7f5f2', class: 'bg-background', usage: 'Primary page background' },
      { name: 'background-alt', hex: '#efece7', class: 'bg-background-alt', usage: 'Alternating sections' },
      { name: 'card', hex: '#ffffff', class: 'bg-card', usage: 'Cards, elevated surfaces' },
      { name: 'surface', hex: '#e8e3dc', class: 'bg-surface', usage: 'Subtle surface fills' },
    ],
  },
  {
    label: 'Text',
    swatches: [
      { name: 'primary', hex: '#1a1815', class: 'text-primary', usage: 'Headlines, nav logo' },
      { name: 'body-text', hex: '#3d3a36', class: 'text-body-text', usage: 'Paragraphs, body copy' },
      { name: 'secondary', hex: '#7a756e', class: 'text-secondary', usage: 'Descriptions, nav links' },
      { name: 'muted', hex: '#a8a29e', class: 'text-muted', usage: 'Labels, captions' },
    ],
  },
  {
    label: 'Accent & Borders',
    swatches: [
      { name: 'accent', hex: '#8b7355', class: 'bg-accent', usage: 'Links, decorative bars, hover states' },
      { name: 'accent-hover', hex: '#73603f', class: 'bg-accent-hover', usage: 'Button/link hover' },
      { name: 'border', hex: '#e0dbd4', class: 'border-border', usage: 'Standard dividers' },
      { name: 'border-light', hex: '#ece8e2', class: 'border-border-light', usage: 'Subtle separators' },
    ],
  },
  {
    label: 'Overlays',
    swatches: [
      { name: 'overlay', hex: 'rgba(26,24,21,0.6)', class: '—', usage: 'Gallery item hover overlay' },
      { name: 'overlay-heavy', hex: 'rgba(26,24,21,0.85)', class: '—', usage: 'Lightbox backdrop' },
    ],
  },
];

function Swatch({ name, hex, className: cls, usage }: { name: string; hex: string; className: string; usage: string }) {
  const isOverlay = hex.startsWith('rgba');
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 w-full rounded-sm border border-[#e0dbd4]"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className="text-sm font-medium text-[#1a1815]">{name}</p>
        <p className="font-mono text-xs text-[#7a756e]">{hex}</p>
        {!isOverlay && <p className="font-mono text-xs text-[#a8a29e]">{cls}</p>}
        <p className="text-xs text-[#7a756e]">{usage}</p>
      </div>
    </div>
  );
}

export const AllColours: Story = {
  name: 'All Colours',
  render: () => (
    <div className="space-y-10 bg-white p-8 font-sans">
      <div>
        <h1 className="mb-1 text-2xl font-semibold">Colour Palette</h1>
        <p className="text-sm text-[#7a756e]">All design tokens defined in <code>src/styles/globals.css</code></p>
      </div>
      {swatchGroups.map((group) => (
        <div key={group.label}>
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-[#7a756e]">{group.label}</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {group.swatches.map((s) => (
              <Swatch key={s.name} name={s.name} hex={s.hex} className={s.class} usage={s.usage} />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
