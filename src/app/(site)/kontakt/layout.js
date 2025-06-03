// src/app/(site)/kontakt/layout.js

import fetchPageData from '../../../lib/fetchPageData';
import PageHeader from '../../components/PageHeader';

export default async function KontaktLayout({ children }) {
  const page = await fetchPageData('kontakt');

  return (
    <>
      <PageHeader
        title={page?.acf?.page_name || page?.title?.rendered || 'Kontakt'}
        description={page?.acf?.page_desc || null}
      />
      <main>{children}</main>
    </>
  );
}
