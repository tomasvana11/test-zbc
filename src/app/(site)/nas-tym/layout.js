// src/app/(site)/nas-tym/layout.js
import fetchPageData from '../../../lib/fetchPageData';
import PageHeader from '../../components/PageHeader';

export default async function TymLayout({ children, params }) {
  // Pokud máme params.slug, znamená to, že jsme v detailu člena
  if (params?.slug) {
    // V detailu nechceme zobrazovat obecný header, protože ho zobrazí stránka detailu člena
    return <main>{children}</main>;
  }

  // Jinak fetchujeme data pro obecný týmový header
  const page = await fetchPageData('nas-tym');

  return (
    <>
      <PageHeader
        title={page?.acf?.page_name || page?.title?.rendered || 'Náš tým'}
        description={page?.acf?.page_desc || null}
      />
      <main>{children}</main>
    </>
  );
}
