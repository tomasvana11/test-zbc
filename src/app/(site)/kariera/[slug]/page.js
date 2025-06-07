export default async function PoziceDetailPage({ params }) {
  const { slug } = params;

  const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/pracovni-pozice?slug=${slug}`);

  if (!res.ok) {
    return <p>Chyba při načítání pozice: {res.status}</p>;
  }

  const pozice = await res.json();

  if (!Array.isArray(pozice) || pozice.length === 0) {
    return <p>Pozice nenalezena</p>;
  }

  const data = pozice[0];
  const content = data?.content?.rendered || '<p>Obsah nenalezen.</p>';

  return (
    <main className="max-w-[1392px] mx-auto px-4 py-12">
      <h2 dangerouslySetInnerHTML={{ __html: data.title.rendered }} className="text-3xl mb-6" />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}
