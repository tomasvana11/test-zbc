import PageHeader from '../../components/PageHeader';

export default async function SluzbyLayout({ children }) {
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=sluzby&_embed',
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error('Failed to fetch Služby page data');

  const data = await res.json();
  const page = data[0];

  return (
    <>
      <PageHeader
        title={page?.acf?.page_name || page?.title?.rendered || 'Služby'}
        description={page?.acf?.page_desc || null}
      />
      <main>{children}</main>
    </>
  );
}
