import fetchPageData from '../../../lib/fetchPageData';
import PageHeader from '../../components/PageHeader';
import Menu from '../../components/Menu';

export default async function GDPRLayout({ children }) {
  const page = await fetchPageData('gdpr');

  return (
    <>
      <Menu/>
      <PageHeader
        title={page?.acf?.page_name || page?.title?.rendered || 'GDPR'}
        description={page?.acf?.page_desc || ''}
      />
      <main className="px-4 max-w-[1000px] mx-auto py-12 md:py-24">
        {children}
      </main>
    </>
  );
}
