// src/app/(site)/nas-tym/layout.js
import fetchPageData from '../../../lib/fetchPageData';
import PageHeader from '../../components/PageHeader';

export default async function TymLayout({ children, params }) {
  // params.slug bude undefined pokud jsi na /nas-tym, bude definované pokud jsi na /nas-tym/[slug]

  // Fetch page data jen pokud jsi na root týmu, protože detailní stránka použije svůj vlastní header
  const page = !params.slug ? await fetchPageData('nas-tym') : null;

  return (
    <>
      {!params.slug && (
        <PageHeader
          title={page?.acf?.page_name || page?.title?.rendered || 'Náš tým'}
          description={page?.acf?.page_desc || null}
        />
      )}
      <main>{children}</main>
    </>
  );
}
