import PageHeader from '../../../components/PageHeader';

export default async function PoziceLayout({ children, params }) {
  const { slug } = params;

  try {
    const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/pracovni-pozice?slug=${slug}`);

    if (!res.ok) throw new Error('Fetch error');

    const pozice = await res.json();

    if (!Array.isArray(pozice) || pozice.length === 0) {
      return (
        <>
          <PageHeader title="Pozice nenalezena" />
          <main>{children}</main>
        </>
      );
    }

    const data = pozice[0];
    const title = data?.title?.rendered || 'Detail pozice';
    const description = data?.acf?.popis || null;

    return (
      <>
        <PageHeader title={title} description={description} />
        <main>{children}</main>
      </>
    );
  } catch (error) {
    return (
      <>
        <PageHeader title="Chyba načítání pozice" />
        <main>{children}</main>
      </>
    );
  }
}
