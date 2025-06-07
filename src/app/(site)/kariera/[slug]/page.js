import PageHeader from '../../../components/PageHeader';

export default async function PoziceDetailPage({ params }) {
  const { slug } = params;

  try {
    const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/pracovni-pozice?slug=${slug}`);

    if (!res.ok) {
      throw new Error(`Fetch error: ${res.status}`);
    }

    const pozice = await res.json();

    if (!Array.isArray(pozice) || pozice.length === 0) {
      return <p>Pozice nenalezena</p>;
    }

    const data = pozice[0];

    const title = data?.title?.rendered || 'Detail pozice';
    const description = data?.acf?.popis || null;
    const content = data?.content?.rendered || '<p>Obsah nenalezen.</p>';

    return (
      <>
        <PageHeader title={title} description={description} />
        <main className="max-w-[1392px] mx-auto px-4 py-12">
          <h2 dangerouslySetInnerHTML={{ __html: title }} className="text-3xl mb-6" />
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </main>
      </>
    );
  } catch (error) {
    return <p>Chyba při načítání pozice: {error.message}</p>;
  }
}
