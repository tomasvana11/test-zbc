import PageHeader from '../../../components/PosHeader';

export default async function PostLayout({ children, params }) {
  const { slug } = params;

  const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/blog?slug=${slug}&_embed`);
  if (!res.ok) throw new Error('Failed to fetch job post');
  const data = await res.json();
  const post = data[0];

  if (!post) {
    return <p>Pozice nebyla nalezena.</p>;
  }

  const title = post.title?.rendered || 'Pozice';

  const excerpt = post.excerpt?.rendered || 'Popis';




  const imageUrl = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

  return (
    <>
      <PageHeader title={title} excerpt={excerpt} imageUrl={imageUrl} />
      <main>{children}</main>
    </>
  );
}
