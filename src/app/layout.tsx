import type { Metadata } from 'next';
import '../styles/globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import navigationData from '@/data/navigation.json';

export const metadata: Metadata = {
  title: 'Neil Hurley Photography',
  description: 'Still life and product photographer based in Dublin, Ireland.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@200;300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">
        <SiteHeader links={navigationData.links} />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
