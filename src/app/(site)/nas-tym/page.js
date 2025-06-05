export default async function TymPage() {
  const tymRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed'
  );

  if (!tymRes.ok) {
    // Když API nevrátí OK, vyhoď chybu nebo zobraz info
    throw new Error(`Failed to fetch: ${tymRes.status}`);
  }

  const tymPosts = await tymRes.json();

  // Kontrola, jestli data jsou pole
  if (!Array.isArray(tymPosts)) {
    throw new Error('Data z API nejsou pole, ale: ' + JSON.stringify(tymPosts));
  }

  return (
    <main>
      {tymPosts.length === 0 && <p>Žádná data k zobrazení.</p>}

      {tymPosts.map((post) => {
        const title = post?.title?.rendered ?? 'Bez názvu';
        const content = post?.content?.rendered ?? 'Bez obsahu';

        return (
          <article key={post.id}>
            <h2 dangerouslySetInnerHTML={{ __html: title }} />
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </article>
        );
      })}
    </main>
  );
}
