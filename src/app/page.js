
import Image from 'next/image';
import ContactFormClient from '../app/components/ContactFormClient'
import HeroSection from './components/HeroSection';
import IntroSectionHp from './components/IntroSectionHp';
import HpNumbersSection from './components/NumbersSection';
import Advantages from './components/Advantages';




// WP REST API
async function fetchPageData() {
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=homepage&_embed',
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
    acf.seo_title || page?.title?.rendered || 'Domů | Za bohatší Česko';

  const canonicalUrl = 'https://zabohatsicesko.cz/homepage';

  

  return {
    title,
    description,
    featuredImage,
    canonicalUrl,
  };
}

const res = await fetch(
  'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed',
  { next: { revalidate: 60 } }
);
if (!res.ok) throw new Error('Failed to fetch team members');
const data = await res.json();

const members = data.map((item) => {
  const photo = item.acf?.team_member_photo?.url || '/placeholder.png';
  return {
    id: item.id,
    slug: item.slug,
    name: item.title.rendered,
    role: item.acf?.role || '',
  };
});

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

export default async function Page() {
  // Fetch homepage
  const pageRes = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=homepage', {
    cache: 'no-store',
  });


  if (!pageRes.ok) {
    return <p>Chyba při načítání stránky</p>;
  }

  const pages = await pageRes.json();

  if (pages.length === 0) {
    return <p>Stránka nenalezena</p>;
  }

  // Získáme první stránku z pole
  const page = pages[0];

  // Extrahujeme ACF pole
  const hp_m_title = page.acf?.hp_m_title || '';
  const hp_m_desc = page.acf?.hp_m_desc || '';
  const hp_v_title = page.acf?.hp_v_title || '';
  const hp_v_desc = page.acf?.hp_v_desc || ''; 
  const hp_hodnoty_title = page.acf?.hp_hodnoty_title || '';
  const hodnota_1 = page.acf?.hodnota_1 || '';
  const hodnota_1_desc = page.acf?.hodnota_1_desc || '';
  const hodnota_2 = page.acf?.hodnota_2 || '';
  const hodnota_2_desc = page.acf?.hodnota_2_desc || '';
  const hodnota_3 = page.acf?.hodnota_3 || '';
  const hodnota_3_desc = page.acf?.hodnota_3_desc || '';
  const hodnota_4 = page.acf?.hodnota_4 || '';
  const hodnota_4_desc = page.acf?.hodnota_4_desc || '';
  const hodnota_5 = page.acf?.hodnota_5 || '';
  const hodnota_5_desc = page.acf?.hodnota_5_desc || '';
  const hp_adv_title = page.acf?.hp_adv_title || '';
  const hp_adv_desc = page.acf?.hp_adv_desc || ''; 
  const hp_fp_card_1 = page.acf?.hp_fp_card_1 || ''; 
  const hp_fp_card_2 = page.acf?.hp_fp_card_2 || '';
  const hp_fp_card_3 = page.acf?.hp_fp_card_3 || ''; 
  const hp_fp_card_4 = page.acf?.hp_fp_card_4 || ''; 
  const hp_fp_card_5 = page.acf?.hp_fp_card_5 || '';
  const podcast_title = page.acf?.podcast_title || '';
  const podcast_desc = page.acf?.podcast_desc || '';
  const hp_intro_title = page.acf?.hp_intro_title || '';
  const hp_intro_detail = page.acf?.hp_intro_detail || ''; 
  const brand_claim = page.acf?.brand_claim || ''; 
  const hp_numbers_title = page.acf?.hp_numbers_title || ''; 
  const hp_number_1 = page.acf?.hp_number_1 || '';
  const hp_number_desc_1 = page.acf?.hp_number_desc_1 || '';
  const hp_number_2 = page.acf?.hp_number_2 || '';
  const hp_number_desc_2 = page.acf?.hp_number_desc_2 || '';
  const hp_number_3 = page.acf?.hp_number_3 || '';
  const hp_number_desc_3 = page.acf?.hp_number_desc_3 || '';
  const hp_number_4 = page.acf?.hp_number_4 || '';
  const hp_number_desc_4 = page.acf?.hp_number_desc_4 || '';
  const hp_number_5 = page.acf?.hp_number_5 || '';
  const hp_number_desc_5 = page.acf?.hp_number_desc_5 || '';


  const podcastRes = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/podcast?per_page=3&_embed');
  const podcastPosts = await podcastRes.json();

  const recenzeRes = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/recenze?per_page=3&_embed');
  const recenze = await recenzeRes.json();


  


  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <HeroSection brand_claim={brand_claim} />
      <IntroSectionHp
        hp_intro_title={hp_intro_title}
        hp_intro_detail={hp_intro_detail}
      />


      <section className="px-4 w-full">
        <div className="flex flex-col md:flex-row w-full max-w-[1392px] mx-auto py-12 md:py-24">
        <div className="w-full md:w-1/2 md:pr-12 lg:pr-16 xl:pr-20 pb-10 md:pb-0">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-[28px] md:text-[40px] text-goldenBrown">{hp_m_title}</h2>
            <img src="/images/IconMise.svg" alt="Ikona mise" className="w-[30px] h-[30px] md:w-[38px] md:h-[38px]" />
          </div>
          <hr className="border-lightDivGrey"/>
          <div className="mt-4 md:mt-6 text-raisinBlack" dangerouslySetInnerHTML={{ __html: hp_m_desc }} />
        </div>
        <div className="w-full md:w-1/2 md:pr-12 lg:pr-16 xl:pr-20 pb-10 md:pb-0">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-[28px] md:text-[40px] text-goldenBrown">{hp_v_title}</h2>
            <img src="/images/IconVize.svg" alt="Ikona Vize" className="w-[34px] h-[24px] md:w-[38px] md:h-[38px]" />
          </div>
          <hr className="border-lightDivGrey"/>
          <div className="mt-4 md:mt-6 text-raisinBlack" dangerouslySetInnerHTML={{ __html: hp_v_desc }} />
        </div>
        </div>
      </section>

      

      

      <section className="bg-raisinBlack w-full  px-4 py-12 md:py-16">

        <div className="flex flex-col md:flex-row w-full items-center max-w-[1392px] mx-auto">

          <div className="w-full">

            <h2 className="text-[28px] md:text-[40px] pb-8 md:pb-10 text-white text-center">{hp_hodnoty_title}</h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-golden.svg" alt="Symbol Gold" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-goldenBrown mt-2">{hodnota_1}</h4>
                <p className="text-silkBeige">{hodnota_1_desc}</p>
              </div>
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-silver.svg" alt="Symbol Silver" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-silverSage mt-2">{hodnota_2}</h4>
                <p className="text-silkBeige">{hodnota_2_desc}</p>
              </div>
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-golden.svg" alt="Symbol Gold" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-goldenBrown mt-2">{hodnota_3}</h4>
                <p className="text-silkBeige">{hodnota_3_desc}</p>
              </div>
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-silver.svg" alt="Symbol Silver" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-silverSage mt-2">{hodnota_4}</h4>
                <p className="text-silkBeige">{hodnota_4_desc}</p>
              </div>
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-golden.svg" alt="Symbol Gold" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-goldenBrown mt-2">{hodnota_5}</h4>
                <p className="text-silkBeige">{hodnota_5_desc}</p>
              </div>
            </div>

          </div>

          

        </div>

      </section>

      <HpNumbersSection
        hp_numbers_title={hp_numbers_title}
        hp_number_1={hp_number_1}
        hp_number_desc_1={hp_number_desc_1}
        hp_number_2={hp_number_2}
        hp_number_desc_2={hp_number_desc_2}
        hp_number_3={hp_number_3}
        hp_number_desc_3={hp_number_desc_3}
        hp_number_4={hp_number_4}
        hp_number_desc_4={hp_number_desc_4}
        hp_number_5={hp_number_5}
        hp_number_desc_5={hp_number_desc_5}
      />

      <Advantages
        hp_adv_title={hp_adv_title}
        hp_adv_desc={hp_adv_desc}
        hp_fp_card_1={hp_fp_card_1}
        hp_fp_card_2={hp_fp_card_2}
        hp_fp_card_3={hp_fp_card_3}
        hp_fp_card_4={hp_fp_card_4}
        hp_fp_card_5={hp_fp_card_5}
      />



      <section className="px-4 w-full py-12 md:py-24 bg-silverSage recenze">
  <div className="w-full max-w-[1392px] mx-auto text-center">

    <h2 className="text-[28px] md:text-[40px] pb-8 md:pb-10 text-white text-center">Co o nás říkají naši klienti?</h2>

    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {recenze.map((item) => (
    <div
      key={item.id}
      className="relative bg-gradient-to-b pt-10 pl-10 ml-2 md:ml-6 mb-2 md:mb-0 rounded-lg flex flex-row gap-5 items-start overflow-visible"
    >
      {/* Nový absolutní obrázek */}
      <img
        src="/images/symbol-golden-s.svg" 
        alt="Dekorace"
        className="absolute top-0 left-0 w-[46px] h-[46px] -translate-x-1/2 -translate-y-1/2 z-10"
      />


      <p className="text-left text-raisinBlack w-1/2">
        {item.acf?.citation || 'Bez citace'}
      </p>

      <img
        src={item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg'}
        alt="Recenze"
        className="w-[200px] mt-[-80px] h-auto object-contain align-middle"
      />
      <div className='flex flex-col gap-2 absolute bottom-10 left-10'>
        {item.acf?.client_name && (
          <p className="text-goldenBrown font-bold">{item.acf.client_name}</p>
        )}
        {item.acf?.client_since && (
          <p className="text-raisinBlack opacity-75">Klient/ka od roku {item.acf.client_since}</p>
        )}
      </div>
    </div>
  ))}
</div>
    <a href="https://www.zabohatsicesko.cz/reference" className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center transition-colors duration-300 hover:bg-goldenBrownHover">Přečíst více recenzí</a>
  </div>
</section>
<section className="px-4 w-full py-12 md:py-24">
  <div className="flex flex-col md:flex-row w-full max-w-[1392px] mx-auto">
    <div className="w-full md:w-1/2 md:pr-12 lg:pr-16 xl:pr-16">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        {podcast_title && (
          <h2 className="text-[28px] md:text-[40px] text-goldenBrown">
            {podcast_title.split(' ')[0]}<br />
            {podcast_title.split(' ').slice(1).join(' ')}
          </h2>
        )}
      </div>
    </div>
    <div className="w-full md:w-1/2 md:pr-4 lg:pr-8 xl:pr-12 pb-10 md:pb-0">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div
          className="mt-4 md:mt-6 text-raisinBlack"
          dangerouslySetInnerHTML={{ __html: podcast_desc }}
        />
      </div>
    </div>
  </div>

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
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            ></div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(35,35,35,0.5)] to-[rgba(0,0,0,0.7)]"></div>
            {/* Play button - circle with triangle */}
            <div className="absolute top-1/2 left-1/2 w-[48px] h-[48px] -translate-x-1/2 -translate-y-1/2 bg-[#E2DBD5] rounded-full flex items-center justify-center">
              <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 1L17 11L3 21V1Z" fill="#9D6219"/>
              </svg>
            </div>

            {/* Text content */}
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

    <a href="https://www.youtube.com/@ZabohatsiCesko" className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center transition-colors duration-300 hover:bg-goldenBrownHover">Zobrazit všechny epizody</a>
  </div>
</section>

<ContactFormClient/>


    </main>
  );
}
