import PageHeader from '../../../components/PageHeader';

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
  const excerpt = post.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '';

  return (
    <>
      <PageHeader title={title} description={excerpt} />
      <main>{children}</main>
    </>
  );
}
