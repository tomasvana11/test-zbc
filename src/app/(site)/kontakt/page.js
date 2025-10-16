// WP REST API
async function fetchPageData() {
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=kontakt&_embed',
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
    acf.seo_title || page?.title?.rendered || 'Kontakt | Za bohatší Česko';

  const canonicalUrl = 'https://zabohatsicesko.cz/kontakt';

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




export default async function ContactPage() {

  const { title, description, featuredImage } = await fetchPageData();
  return (
    <main>
      <section className="px-4 w-full">
        <div className="flex flex-col md:flex-row w-full max-w-[1300px] mx-auto py-12 md:py-24 ">
          <div className="w-full mx-auto">
            <div className="flex flex-col md:grid md:grid-cols-2">
              {/* Blok 1 */}
              <div className="flex flex-col gap-1 md:gap-2 w-full md:pt-[64px] pt-[24px] pb-[24px] md:pb-[64px] md:pl-[77px] md:pr-[77px] border-b border-lightDivGrey md:border-b md:border-r border-lightDivGrey">
                <p className="text-goldenBrown text-bold text-[15px] mb-2 font-satoshi-bold">TELEFON</p>
                <h2 className="text-raisinBlack text-[20px] md:text-[24px]">+420 603 818 647</h2>
              </div>

              {/* Blok 2 */}
              <div className="flex flex-col gap-1 md:gap-2 w-full md:pt-[64px] pt-[24px] pb-[24px] md:pb-[64px] md:pl-[77px] md:pr-[77px] border-b border-lightDivGrey ">
                <p className="text-goldenBrown text-bold text-[15px] mb-2 font-satoshi-bold">EMAIL</p>
                <h2 className="text-raisinBlack text-[20px] md:text-[24px]">info@zabohatsicesko.cz</h2>
              </div>

              {/* Blok 3 */}
              <div className="flex flex-col gap-1 md:gap-2 w-full pt-[24px] pb-[24px] md:pt-[64px] md:pb-[64px] md:pl-[77px] md:pr-[77px] border-b border-lightDivGrey md:border-b-0 md:border-r md:border-lightDivGrey">
                <p className="text-goldenBrown text-bold text-[15px] mb-2 font-satoshi-bold">INFORMACE</p>
                <h2 className="text-raisinBlack text-[20px] md:text-[24px]">Za bohatší Česko, s.r.o<br/>IČ: 17687799</h2>
              </div>

              {/* Blok 4 */}
              <div className="flex flex-col gap-1 md:gap-2 w-full md:pt-[64px] pt-[24px] md:pb-[64px] md:pl-[77px] md:pr-[77px]">
                <p className="text-goldenBrown text-bold text-[15px]  mb-2 font-satoshi-bold">SÍDLO</p>
                <h2 className="text-raisinBlack text-[20px] md:text-[24px]">SIRIUS FINANCE, a.s.<br/>Jankovcova 1569/2c<br/>170 00 Praha 7</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
