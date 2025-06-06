'use client';

import { useSluzbyData } from './SluzbyContext';

export default function SluzbyPage() {
  const page = useSluzbyData();

  if (!page) {
    return <p>Načítání dat…</p>;
  }

  return (
    <section style={{ padding: '2rem' }}>
      <h1>{page.acf?.page_name || 'Bez názvu'}</h1>
      <p>{page.acf?.page_desc || 'Bez popisu'}</p>

      <h3>Debug ACF:</h3>
      <pre style={{ background: '#eee', padding: '1rem' }}>
        {JSON.stringify(page.acf, null, 2)}
      </pre>
    </section>
  );
}
