'use client';

import { usePathname } from 'next/navigation';
import PageHeader from '../../components/PageHeader';

export default function KarieraLayout({ children }) {
  const pathname = usePathname();

  // Pokud je detail pozice (např. /kariera/asistentka), nevykresluj header zde
  const isSlugPage = pathname !== '/kariera' && pathname.startsWith('/kariera');

  return (
    <>
      {!isSlugPage && (
        <PageHeader title="Kariéra" description="Popis kariéry..." />
      )}
      <main>{children}</main>
    </>
  );
}
