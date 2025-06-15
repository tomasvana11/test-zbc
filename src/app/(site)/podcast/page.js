// WP REST API
async function fetchPageData() {
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=podcast&_embed',
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
    acf.seo_title || page?.title?.rendered || 'Podcast | Za bohatší Česko';

  const canonicalUrl = 'https://zabohatsicesko.cz/podcast';

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

export default async function PodcastPage() {
  // 1. Fetch ACF ze stránky /homepage (pro podcasty)
  const homepageRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=homepage&_embed',
    { next: { revalidate: 60 } }
  );
  if (!homepageRes.ok) throw new Error('Failed to fetch homepage');
  const homepageData = await homepageRes.json();
  const homepage = homepageData[0];

  const podcast_title = homepage.acf?.podcast_title || '';
  const podcast_desc = homepage.acf?.podcast_desc || '';

  // 2. Fetch poslední 3 podcasty
  const podcastRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/podcast?per_page=100&_embed',
    { next: { revalidate: 60 } }
  );
  if (!podcastRes.ok) throw new Error('Failed to fetch podcast posts');
  const podcastPosts = await podcastRes.json();

  // 3. Render
  return (
    <main className="flex flex-col items-center">
      {/* Sekce podcasty */}
<section className="px-4 w-full -mt-12 md:-mt-16 pb-12 md:pb-24 z-[100] relative">
  <div className="w-full max-w-[1392px] mx-auto text-center">
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {podcastPosts.map((post) => {
        const title = post.title?.rendered || 'Bez názvu';
        const image =
          post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg';
        const episodeNumber = post.acf?.episode_number || '';
        const ytLink = post.acf?.episode_yt_link || '#';

        return (
          <a
            key={post.id}
            href={ytLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative rounded-lg overflow-hidden h-[300px] block"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            ></div>

            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(35,35,35,0.5)] to-[rgba(0,0,0,0.7)]"></div>

            <div className="absolute top-1/2 left-1/2 w-[48px] h-[48px] -translate-x-1/2 -translate-y-1/2 bg-[#E2DBD5] rounded-full flex items-center justify-center">
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 1L17 11L3 21V1Z" fill="#9D6219" />
              </svg>
            </div>

            <div className="relative z-10 flex flex-col justify-between items-start h-full p-5 text-left text-silkBeige">
              <span className="text-[28px] md:text-[40px] text-goldenBrown ep_num">
                #{episodeNumber}
              </span>
              <h4 className="card-heading-d text-base">{title}</h4>
            </div>
          </a>
        );
      })}
    </div>
  </div>
</section>
    </main>
  );
}
