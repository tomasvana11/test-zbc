import fetchPageData from '../../lib/fetchPageData';
import PageHeader from '../components/PageHeader';

export default async function SluzbyLayout({ children }) {
  const page = await fetchPageData('sluzby');

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


