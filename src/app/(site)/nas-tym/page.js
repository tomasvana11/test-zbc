export default async function TymPage() {
  const tymRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed'
  );
  const tymPosts = await tymRes.json();

  return (
    <main>
      {tymPosts.length === 0 && <p>Žádná data k zobrazení.</p>}

      {tymPosts.map((post) => (
        <article key={post.id}>
          <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </article>
      ))}
    </main>
  );
}
