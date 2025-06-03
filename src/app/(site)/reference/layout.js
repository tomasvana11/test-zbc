// src/app/(site)/reference/layout.js

import fetchPageData from '../../../lib/fetchPageData';
import PageHeader from '../../components/PageHeader';

export default async function KontaktLayout({ children }) {
  const page = await fetchPageData('reference');

  return (
    <>
      <PageHeader
        title={page?.acf?.page_name || page?.title?.rendered || 'Reference'}
        description={page?.acf?.page_desc || null}
      />
      <main>{children}</main>
    </>
  );
}
