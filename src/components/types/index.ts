export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface LinkType {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ImageType {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface GalleryItemType {
  id: string;
  image: ImageType;
  title: string;
  category: string;
}

export interface ClientType {
  name: string;
}

export interface ContactDetailType {
  label: string;
  value: string;
  href?: string;
}

export interface SectionType {
  component: string;
  props: Record<string, unknown>;
}
