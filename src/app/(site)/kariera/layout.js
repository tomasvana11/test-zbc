// src/app/(site)/reference/layout.js

import fetchPageData from '../../../lib/fetchPageData';
import PageHeader from '../../components/PageHeader';

export default async function KarieraLayout({ children }) {
  const page = await fetchPageData('kariera');

  return (
    <>
      <PageHeader
        title={page?.acf?.page_name || page?.title?.rendered || 'Kariéra'}
        description={page?.acf?.page_desc || null}
      />
      <main>{children}</main>
    </>
  );
}
