import PageHeader from '../../../components/PageHeader';

export default async function MemberPage({ params }) {
  const { slug } = params;

  // 1. Fetch člena podle slug
  const res = await fetch(
    `https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?slug=${slug}&_embed`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch team member');
  }

  const data = await res.json();
  const member = data[0];

  if (!member) {
    // Můžeš zde vrátit 404 stránku, nebo redirect
    throw new Error('Member not found');
  }

  // 2. Header data
  const title = member.title?.rendered || 'Člen týmu';
  const description = member.acf?.short_bio || '';

  // 3. Detailní data člena
  const photo =
    member._embedded?.['wp:attachment']?.[0]?.source_url || '/placeholder.png';
  const role = member.acf?.role || '';
  const content = member.content?.rendered || '';

  return (
    <>
      <PageHeader title={title} description={description} />
      <main className="max-w-[800px] mx-auto px-4 py-12">
        <img
          src={photo}
          alt={title}
          className="w-48 h-48 rounded-full object-cover mx-auto mb-6"
          loading="lazy"
        />
        <h2 className="text-3xl mb-2 text-goldenBrown text-center">{title}</h2>
        <p className="text-center text-raisinBlack mb-8">{role}</p>
        <article
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </main>
    </>
  );
}
