import PageHeader from '../../../components/PosHeader';

export default async function PostLayout({ children, params }) {
  const resolvedParams = await params;
const { slug } = resolvedParams;

  const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/pracovni-pozice?slug=${slug}&_embed`, {
    next: { revalidate: 60 }, // ISR - pokud chceš refresh každou minutu
  });

  if (!res.ok) throw new Error('Nepodařilo se načíst pracovní pozici.');
  const data = await res.json();
  const post = data[0];

  if (!post) {
    return <p>Pozice nebyla nalezena.</p>;
  }

  const title = post.title?.rendered || 'Pozice';
  const excerpt = post.excerpt?.rendered || '';
  const imageUrl = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;

  return (
    <>
      <PageHeader title={title} excerpt={excerpt} imageUrl={imageUrl} />
      <main>{children}</main>
    </>
  );
}
