import PageHeader from '../../../components/PageHeader';

export default async function MemberDetailPage({ params }) {
  const { slug } = params;

  // Fetch dat člena podle slugu
  const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?slug=${slug}&_embed`);
  if (!res.ok) throw new Error('Failed to fetch team member');
  const data = await res.json();
  const member = data[0];

  if (!member) {
    return <p>Člen týmu nenalezen</p>;
  }

  const photo = member._embedded?.['wp:attachment']?.[0]?.source_url || '/placeholder.png';
  const name = member.title.rendered;
  const role = member.acf?.role || '';

  return (
    <>
      <PageHeader
        title={name}
        description={role}
      />

      <main className="flex flex-col items-center px-4 py-12 max-w-[1392px] mx-auto">
        <img src={photo} alt={name} className="w-64 h-64 rounded-full object-cover mb-6" />
        <h2 className="text-3xl text-goldenBrown mb-2" dangerouslySetInnerHTML={{ __html: name }} />
        <p className="text-raisinBlack mb-6">{role}</p>

        {/* Tady můžeš přidat další detaily člena */}
      </main>
    </>
  );
}
