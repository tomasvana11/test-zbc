import PageHeader from '../../../components/BlogHeader';

export default async function PostLayout({ children, params }) {
  const { slug } = params;

  const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/blog?slug=${slug}&_embed`);
  if (!res.ok) throw new Error('Failed to fetch blog post');
  const data = await res.json();
  const post = data[0];

  if (!post) {
    return <p>Článek nebyl nalezen.</p>;
  }

  const title = post.title?.rendered || 'Článek';

  // Formatuj datum (např. na "7. června 2025")
  const date = new Date(post.date).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const imageUrl = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

  return (
    <>
      <PageHeader title={title} excerpt={excerpt} imageUrl={imageUrl} />
      <main>{children}</main>
    </>
  );
}
