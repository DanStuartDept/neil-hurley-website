import type { Meta, StoryObj } from '@storybook/nextjs-vite';

const meta: Meta = {
  title: 'Design System/Page Templates',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const navLinks = [
  { label: 'Portfolio', href: '/' },
  { label: 'Food', href: '/food' },
  { label: 'Advertising', href: '/advertising' },
  { label: 'Clients', href: '/clients' },
  { label: 'Contact', href: '/contact' },
];

function MockHeader({ activePath = '/' }: { activePath?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e0dbd4] bg-[#f7f5f2]">
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4" aria-label="Main navigation">
        <span className="font-display text-lg text-[#1a1815]" style={{ fontFamily: 'var(--font-baskerville), Georgia, serif' }}>
          Neil Hurley
        </span>
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = link.href === activePath;
            return (
              <li key={link.href}>
                <span
                  className={[
                    'relative cursor-pointer text-xs uppercase tracking-[0.18em] font-body',
                    isActive ? 'text-[#1a1815]' : 'text-[#7a756e]',
                  ].join(' ')}
                  style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-[-4px] left-0 h-[1px] w-full bg-[#8b7355]" />
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

function MockFooter() {
  return (
    <footer className="border-t border-[#e0dbd4] px-12 py-10">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between">
        <span className="text-xs text-[#a8a29e]" style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}>
          © {new Date().getFullYear()} Neil Hurley Photography
        </span>
        <div className="flex gap-6">
          {['Privacy', 'Contact'].map((l) => (
            <span key={l} className="cursor-pointer text-xs text-[#a8a29e]" style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}

export const HomePage: Story = {
  name: 'Home Page',
  render: () => (
    <div className="min-h-screen bg-[#f7f5f2]">
      <MockHeader activePath="/" />
      {/* Hero */}
      <div className="relative flex h-[85vh] min-h-[500px] items-end bg-[#efece7]">
        <div className="absolute inset-0 flex items-center justify-center text-[#a8a29e] text-sm" style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}>
          Hero image (85vh · full-width · object-cover · priority)
        </div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f7f5f2] to-transparent" />
      </div>
      {/* Section: Food */}
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="mb-12 flex items-baseline justify-between">
          <h2 className="text-[2rem] text-[#1a1815]" style={{ fontFamily: 'var(--font-baskerville), Georgia, serif' }}>Food{' '}<em style={{ color: '#8b7355' }}>&</em>{' '}Drink</h2>
          <span className="cursor-pointer text-xs uppercase tracking-[0.18em] text-[#7a756e]" style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}>View Collection →</span>
        </div>
        <div className="grid grid-cols-3 gap-[14px]">
          <div className="col-span-2 row-span-2 aspect-[4/5] bg-[#e8e3dc] rounded-sm" />
          <div className="aspect-[4/5] bg-[#e8e3dc] rounded-sm" />
          <div className="aspect-[4/5] bg-[#e8e3dc] rounded-sm" />
        </div>
      </section>
      {/* Section: Advertising */}
      <section className="mx-auto max-w-[1280px] px-6 pb-16">
        <div className="mb-12 flex items-baseline justify-between">
          <h2 className="text-[2rem] text-[#1a1815]" style={{ fontFamily: 'var(--font-baskerville), Georgia, serif' }}>Advertising{' '}<em style={{ color: '#8b7355' }}>&</em>{' '}Product</h2>
          <span className="cursor-pointer text-xs uppercase tracking-[0.18em] text-[#7a756e]" style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}>View Collection →</span>
        </div>
        <div className="grid grid-cols-3 gap-[14px]">
          {[...Array(3)].map((_, i) => <div key={i} className="aspect-[4/5] bg-[#e8e3dc] rounded-sm" />)}
        </div>
      </section>
      <MockFooter />
    </div>
  ),
};

export const GalleryPage: Story = {
  name: 'Gallery Page (Food / Advertising)',
  render: () => (
    <div className="min-h-screen bg-[#f7f5f2]">
      <MockHeader activePath="/food" />
      <main>
        <div className="mx-auto max-w-[1280px] px-6 pb-8 pt-32">
          <h1 className="text-[3.25rem] leading-tight text-[#1a1815]" style={{ fontFamily: 'var(--font-baskerville), Georgia, serif' }}>
            Food{' '}<em style={{ color: '#8b7355' }}>&</em>{' '}Drink
          </h1>
          <p className="mt-4 max-w-[520px] text-base font-light text-[#7a756e]" style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}>
            Crafting appetite through light, texture and composition.
          </p>
        </div>
        <section className="mx-auto max-w-[1280px] px-6 pb-20">
          <div className="grid grid-cols-3 gap-[14px]">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-[#e8e3dc] rounded-sm" />
            ))}
          </div>
        </section>
      </main>
      <MockFooter />
    </div>
  ),
};

export const ClientsPage: Story = {
  name: 'Clients Page',
  render: () => {
    const clients = ['Hermès', 'Cartier', 'Chloé', 'Brown Thomas', 'Avoca', 'Kellogg\'s', 'Pepsi', 'American Express', 'Adidas', 'Flora', 'BBC', 'ITV'];
    return (
      <div className="min-h-screen bg-[#f7f5f2]">
        <MockHeader activePath="/clients" />
        <main>
          <div className="mx-auto max-w-[1280px] px-6 pb-8 pt-32">
            <h1 className="text-[3.25rem] leading-tight text-[#1a1815]" style={{ fontFamily: 'var(--font-baskerville), Georgia, serif' }}>
              Selected Clients
            </h1>
            <p className="mt-4 max-w-[520px] text-base font-light text-[#7a756e]" style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}>
              Trusted by leading international brands.
            </p>
          </div>
          <section className="mx-auto max-w-[1280px] px-6 pb-20">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-px bg-[#ece8e2]">
              {clients.map((c) => (
                <div key={c} className="flex items-center justify-center bg-[#f7f5f2] px-6 py-9 transition-colors hover:bg-white">
                  <span className="text-center text-base text-[#7a756e]" style={{ fontFamily: 'var(--font-baskerville), Georgia, serif' }}>{c}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
        <MockFooter />
      </div>
    );
  },
};

export const ContactPage: Story = {
  name: 'Contact Page',
  render: () => (
    <div className="min-h-screen bg-[#f7f5f2]">
      <MockHeader activePath="/contact" />
      <main>
        <div className="mx-auto max-w-[1280px] px-6 pb-8 pt-32">
          <h1 className="text-[3.25rem] leading-tight text-[#1a1815]" style={{ fontFamily: 'var(--font-baskerville), Georgia, serif' }}>
            Contact
          </h1>
        </div>
        <section className="mx-auto grid max-w-[1280px] grid-cols-2 gap-[80px] px-6 py-20">
          <div>
            <h2 className="mb-10 text-[2.5rem] leading-tight text-[#1a1815]" style={{ fontFamily: 'var(--font-baskerville), Georgia, serif' }}>
              Let's work together
            </h2>
            <dl className="space-y-6">
              {[
                { label: 'Phone', value: '+353 87 672 4862' },
                { label: 'Email', value: 'info@neilhurley.com' },
                { label: 'Location', value: 'Dublin, Ireland' },
              ].map((d) => (
                <div key={d.label}>
                  <dt className="text-xs uppercase tracking-[0.18em] text-[#a8a29e]" style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}>{d.label}</dt>
                  <dd className="mt-1 text-base text-[#3d3a36]" style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}>{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex items-start">
            <p className="text-base font-light text-[#7a756e]" style={{ fontFamily: 'var(--font-outfit), system-ui, sans-serif' }}>
              Available for commercial projects, editorial commissions, and advertising campaigns.
            </p>
          </div>
        </section>
      </main>
      <MockFooter />
    </div>
  ),
};
