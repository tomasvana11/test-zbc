export default async function SluzbyPage() {
  // Fetch ACF data ze stránky "sluzby"
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=sluzby&_embed',
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error('Nepodařilo se načíst stránku Sluzby');

  const data = await res.json();
  const page = data[0];

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '1rem' }}>
        Debug ACF ze stránky <code>/sluzby</code>
      </h1>
      <pre
        style={{
          background: '#f3f3f3',
          padding: '1rem',
          borderRadius: '8px',
          overflowX: 'auto',
          fontSize: '14px',
        }}
      >
        {JSON.stringify(page.acf, null, 2)}
      </pre>
    </main>
  );
}
