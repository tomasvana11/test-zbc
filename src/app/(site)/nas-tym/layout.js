// src/app/(site)/nas-tym/layout.js

import fetchPageData from '../../../lib/fetchPageData';
import PageHeader from '../../components/PageHeader';

export default async function TymLayout({ children, params }) {
  // params.slug existuje, když jsi na detailu člena
  const isDetailPage = Boolean(params?.slug);

  // Fetch stránky /nas-tym jen pokud nejsme na detailu
  const page = !isDetailPage ? await fetchPageData('nas-tym') : null;

  return (
    <>
      {!isDetailPage && (
        <PageHeader
          title={page?.acf?.page_name || page?.title?.rendered || 'Náš tým'}
          description={page?.acf?.page_desc || null}
        />
      )}
      <main>{children}</main>
    </>
  );
}
