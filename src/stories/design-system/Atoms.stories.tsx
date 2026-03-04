import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta = {
  title: 'Design System/Atoms',
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const shadows = [
  { name: 'shadow-sm', value: '0 1px 2px rgba(0,0,0,0.04)', usage: 'Subtle elevation' },
  { name: 'shadow-md', value: '0 4px 12px rgba(0,0,0,0.06)', usage: 'Cards' },
  { name: 'shadow-lg', value: '0 12px 32px rgba(0,0,0,0.08)', usage: 'Modals' },
  { name: 'shadow-image', value: '0 8px 24px rgba(0,0,0,0.1)', usage: 'Lightbox image' },
];

const spacing = [
  { token: 'space-1', value: '4px', usage: 'Micro gaps' },
  { token: 'space-2', value: '8px', usage: 'Tight spacing' },
  { token: 'space-4', value: '16px', usage: 'Default element gap' },
  { token: 'space-6', value: '24px', usage: 'Nav gaps, gutter' },
  { token: 'space-8', value: '32px', usage: 'Form group spacing' },
  { token: 'space-12', value: '48px', usage: 'Section inner padding' },
  { token: 'space-16', value: '64px', usage: 'Section margins' },
  { token: 'space-20', value: '80px', usage: 'Large section padding' },
  { token: 'space-32', value: '128px', usage: 'Page header top padding' },
];

const transitions = [
  { name: 'Fast', duration: '150ms', easing: 'ease-out', usage: 'Micro interactions' },
  { name: 'Normal', duration: '300ms', easing: 'cubic-bezier(0.23, 1, 0.32, 1)', usage: 'Most transitions' },
  { name: 'Slow', duration: '600ms', easing: 'cubic-bezier(0.23, 1, 0.32, 1)', usage: 'Nav underline, hover effects' },
  { name: 'Gallery hover', duration: '1000ms', easing: 'ease-out', usage: 'Gallery image scale' },
];

export const Shadows: Story = {
  render: () => (
    <div className="space-y-8 bg-[#f7f5f2] p-8 font-sans">
      <div>
        <h1 className="mb-1 text-2xl font-semibold text-[#1a1815]">Shadows</h1>
        <p className="text-sm text-[#7a756e]">Elevation system — minimal and warm</p>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {shadows.map((s) => (
          <div key={s.name} className="flex flex-col gap-4">
            <div
              className="h-24 w-full rounded-sm bg-white"
              style={{ boxShadow: s.value }}
            />
            <div>
              <p className="text-sm font-semibold text-[#1a1815]">{s.name}</p>
              <p className="font-mono text-xs text-[#a8a29e] break-all">{s.value}</p>
              <p className="text-xs text-[#7a756e]">{s.usage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="space-y-6 bg-white p-8 font-sans">
      <div>
        <h1 className="mb-1 text-2xl font-semibold text-[#1a1815]">Spacing</h1>
        <p className="text-sm text-[#7a756e]">Key spacing values used across the design system</p>
      </div>
      <div className="space-y-3">
        {spacing.map((s) => (
          <div key={s.token} className="flex items-center gap-4">
            <div className="w-28 shrink-0">
              <p className="font-mono text-xs text-[#1a1815]">{s.token}</p>
              <p className="font-mono text-xs text-[#a8a29e]">{s.value}</p>
            </div>
            <div className="flex items-center gap-3 flex-1">
              <div
                className="bg-accent shrink-0"
                style={{ width: s.value, height: '20px', minWidth: '4px' }}
              />
              <p className="text-xs text-[#7a756e]">{s.usage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Transitions: Story = {
  render: () => (
    <div className="space-y-8 bg-white p-8 font-sans">
      <div>
        <h1 className="mb-1 text-2xl font-semibold text-[#1a1815]">Transitions</h1>
        <p className="text-sm text-[#7a756e]">Hover over each card to preview the timing</p>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {transitions.map((t) => (
          <div key={t.name} className="group flex flex-col gap-4">
            <div
              className="flex h-24 w-full items-center justify-center rounded-sm border border-[#e0dbd4] bg-[#f7f5f2] text-sm text-[#7a756e] group-hover:bg-[#8b7355] group-hover:text-white"
              style={{ transition: `background-color ${t.duration}, color ${t.duration}`, transitionTimingFunction: t.easing }}
            >
              Hover me
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1a1815]">{t.name}</p>
              <p className="font-mono text-xs text-[#a8a29e]">{t.duration}</p>
              <p className="font-mono text-xs text-[#a8a29e] break-all">{t.easing}</p>
              <p className="text-xs text-[#7a756e]">{t.usage}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-[#e0dbd4] pt-6">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#7a756e]">Layout Constants</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-sm">
          <div><p className="font-mono text-xs text-[#1a1815]">Container</p><p className="text-xs text-[#7a756e]">1280px max-width</p></div>
          <div><p className="font-mono text-xs text-[#1a1815]">Container wide</p><p className="text-xs text-[#7a756e]">1440px full-bleed</p></div>
          <div><p className="font-mono text-xs text-[#1a1815]">Gallery gap</p><p className="text-xs text-[#7a756e]">14px between images</p></div>
          <div><p className="font-mono text-xs text-[#1a1815]">Border radius</p><p className="text-xs text-[#7a756e]">2px (gallery items only)</p></div>
        </div>
      </div>
    </div>
  ),
};
