export default async function PoziceDetailPage({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/pracovni-pozice?slug=${slug}`);
    if (!res.ok) {
      throw new Error(`Fetch error: ${res.status}`);
    }
    const pozice = await res.json();

    if (!pozice.length) {
      return <p>Pozice nenalezena</p>;
    }

    const data = pozice[0];

    return (
      <>
        <PageHeader
          title={data.title?.rendered || 'Detail pozice'}
          description={data.acf?.popis || null}
        />
        <main className="max-w-[1392px] mx-auto px-4 py-12">
          <h2 dangerouslySetInnerHTML={{ __html: data.title.rendered }} className="text-3xl mb-6" />
          <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </main>
      </>
    );
  } catch (error) {
    return <p>Chyba při načítání pozice: {error.message}</p>;
  }
}
