// app/nas-tym/page.js

export default async function TymPage() {
  // 1. Fetch dat z API
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed',
    { next: { revalidate: 60 } } // optional: ISR, stránka se obnoví po 60s
  );

  if (!res.ok) {
    // Když fetch selže, můžeme hodit chybu nebo vrátit fallback
    throw new Error('Failed to fetch data');
  }

  const tymPosts = await res.json();

  // 2. Render stránky s daty
  return (
    <main>
      <h1>Tým</h1>
      {tymPosts.length === 0 && <p>Žádná data k zobrazení.</p>}

      {tymPosts.map((post) => (
        <article key={post.id}>
          {/* V Next.js je potřeba použití dangerouslySetInnerHTML na HTML z WordPressu */}
          <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div dangerouslySetInnerHTML={{ __html: post.content?.rendered || '' }} />
        </article>
      ))}
    </main>
  );
}
