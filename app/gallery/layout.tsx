import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'View our luxury bathroom trailer gallery — elegant interiors, premium fixtures, and professional event setups throughout Central California.',
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
