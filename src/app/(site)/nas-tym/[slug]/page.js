import PageHeader from '../../../components/PageHeader';

export default async function MemberPage({ params }) {
  const { slug } = params;

  // Na začátek pro test fetchni člena podle slug
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
    return <p>Člen týmu nenalezen</p>;
  }

  const title = member.title?.rendered || 'Člen týmu';
  const description = member.acf?.short_bio || 'Popis není dostupný';

  return (
    <>
      <PageHeader title={title} description={description} />
      <main className="max-w-[800px] mx-auto px-4 py-12 text-center">
        <p>Toto je zatím prázdná stránka pro člena týmu s slug: <strong>{slug}</strong></p>
      </main>
    </>
  );
}
