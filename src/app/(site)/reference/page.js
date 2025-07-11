import ContactFormClient from '../../components/ContactFormClient'; 
// WP REST API
async function fetchPageData() {
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=reference&_embed',
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  const page = data[0];

  const acf = page?.acf || {};
  const featuredImage =
    page?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-og.jpg';

  const rawDescription = acf.seo_description || page?.excerpt?.rendered || '';
  const description = rawDescription.replace(/(<([^>]+)>)/gi, '').trim();

  const title =
    acf.seo_title || page?.title?.rendered || 'Reference | Za bohatší Česko';

  const canonicalUrl = 'https://zabohatsicesko.cz/reference';

  return {
    title,
    description,
    featuredImage,
    canonicalUrl,
  };
}

// generate metadata
export async function generateMetadata() {
  const {
    title,
    description,
    featuredImage,
    canonicalUrl,
  } = await fetchPageData();

  return {
    title,
    description,
    metadataBase: new URL('https://zabohatsicesko.cz'),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: 'index, follow',
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Za bohatší Česko',
      locale: 'cs_CZ',
      url: canonicalUrl,
      images: [featuredImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [featuredImage],
      site: '@zabohatsicesko',
    },
  };
}

const res = await fetch(
  'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed',
  { next: { revalidate: 60 } }
);
if (!res.ok) throw new Error('Failed to fetch team members');
const data = await res.json();

let members = data.map((item) => {
  const photo = item.acf?.team_member_photo?.url || '/placeholder.png';
  return {
    id: item.id,
    slug: item.slug,
    photo,
    name: item.title.rendered,
    role: item.acf?.role || '',
  };
});

export default async function RefPage() {
  const recenzeRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/recenze?per_page=100&_embed'
  );
  const recenze = await recenzeRes.json();

  return (
    <main className="relative z-100">
      <section className="px-4 w-full -mt-12 md:-mt-16 pb-12 md:pb-24 z-[100] relative">
        <div className="w-full max-w-[1392px] mx-auto text-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 md:gap-y-8">
            {recenze.map((item) => {
              const imageUrl =
                item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                '/placeholder.jpg';

              return (
                <div
                  key={item.id}
                  className="relative pt-10 pl-10 ml-4 md:ml-6 mb-2 md:mb-0 rounded-lg flex flex-row gap-5 items-start overflow-visible bg-gradient-to-b from-[#E2DBD5] to-[#D6D6D3]"
                >
                  <img
                    src="/images/symbol-golden-s.svg"
                    alt="Dekorace"
                    className="absolute top-0 left-0 w-[46px] h-[46px] -translate-x-1/2 -translate-y-1/2 z-10"
                  />

                  <p className="text-left text-raisinBlack flex-1">
                    {item.acf?.citation || 'Bez citace'}
                  </p>

                  <img
                    src={imageUrl}
                    alt={item.title.rendered || 'Recenze'}
                    className="w-[200px] mt-[-80px] h-auto object-contain align-middle"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <ContactFormClient />

    </main>
  );
}

