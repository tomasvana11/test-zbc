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
        <PageHeader title="Máš na to stát se naším parťákem?" description="Hledáme osobnosti, které chtějí růst. Lidi, pro které práce není jen výdělek, ale příležitost měnit životy – vlastní i těch, se kterými spolupracují. U nás najdete silné zázemí, přátelské prostředí a prostor tvořit vlastní cestu, projekty i výsledky na které budete hrdí." />
      )}
      <main>{children}</main>
    </>
  );
}
