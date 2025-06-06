// src/app/(site)/sluzby/layout.js

import fetchPageData from '../../../lib/fetchPageData';
import PageHeader from '../../components/PageHeader';

export default async function TymLayout({ children }) {
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
