// src/app/(site)/sluzby/layout.js

import fetchPageData from '../../../lib/fetchPageData';
import PageHeader from '../../components/PageHeader';
import { SluzbyContext } from './SluzbyContext';

export default async function SluzbyLayout({ children }) {
  const page = await fetchPageData('sluzby');
  const title = page?.acf?.page_name || page?.title?.rendered || 'Služby';
  const description = page?.acf?.page_desc || null;

  return (
    <>
      <PageHeader title={title} description={description} />
      <SluzbyContext.Provider value={page}>
        <main>{children}</main>
      </SluzbyContext.Provider>
    </>
  );
}
