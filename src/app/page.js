import Image from 'next/image';
import ContactFormClient from '../app/components/ContactFormClient'


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

      <section className="relative w-full min-h-[600px] md:min-h-[800px] bg-[url('/images/heroimage.webp')] bg-left bg-cover bg-no-repeat overflow-hidden">
  {/* Horní gradient */}
  <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-black/80 to-black/0 z-0" />
  {/* Dolní gradient */}
  <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-black/80 to-black/0 z-0" />

  <div className="absolute bottom-10 sm:top-12 md:top-10 left-4 md:left-12 z-10 overflow-visible">
    <img
      src="/images/symbol-outline.svg"
      alt=""
      className="w-[125vw] max-w-none sm:w-[90vw] md:w-[650px]" // přesahuje viewport
    />
  </div>

  {/* Logo a text */}
  <div className="absolute inset-0 flex flex-col justify-between z-20">
    
    <div className="relative z-10 w-full max-w-[1392px] mx-auto px-8 py-8">
      
    </div>

    <div className="relative z-10 flex px-4 flex-col md:flex-row w-full max-w-[1392px] mx-auto py-12 md:py-24">
      <div>
        <div className="max-w-[1000px]">
          <h1 className="text-[44px] md:text-[70px] hero-h text-silkBeige md:leading-snug">{brand_claim}</h1>
        </div>
        <a href="https://www.zabohatsicesko.cz/sluzby" className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center">Chci zjistit víc</a>
      </div>
    </div>
  </div>
</section>

    

<section className="px-4 w-full bg-silkBeige">

  <div className="flex flex-col md:flex-row items-center w-full max-w-[1392px] mx-auto py-12 md:py-24">

    {/* Obrázek – desktop vlevo */}
    <div className="hidden md:flex w-full md:w-1/2 pr-6 justify-center items-center">
      <img
        src="/images/intro-img.png"
        alt="Intro"
        className="max-w-[90%] h-auto object-contain"
      />
    </div>

    {/* Obsah */}
    <div className="w-full md:w-1/2 md:pl-12">
      <h2 className="text-[28px] md:text-[40px] mb-4 text-goldenBrown">
        {hp_intro_title}
      </h2>
      <p className="text-raisinBlack">{hp_intro_detail}</p>
      <a
        href="https://www.zabohatsicesko.cz/kontakt"
        className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center"
      >
        Rezervovat konzultaci
      </a>

      {/* Obrázek – mobil verze */}
      <div className="block md:hidden mt-8">
        <img
          src="/images/intro-img.png"
          alt="Intro"
          className="w-full h-auto object-contain -mt-[100px]"
        />
      </div>
    </div>
  </div>
</section>



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

      {/*produkce,funguje*/}
      <section className="relative bg-raisinBlack w-full px-4 py-12 md:py-16 overflow-hidden">
  <img
    src="/images/symbol-pattern-l.svg"
    alt="Symbol Pattern"
    className="hidden lg:block absolute -left-[64px] -bottom-[64px] w-[420px] h-[420px]"
  />
  <img
    src="/images/symbol-pattern-s.svg"
    alt="Symbol Pattern"
    className="lg:hidden absolute -right-[32px] -bottom-[32px] w-[205px] h-[205px] md:w-[280px] md:h-[280px]"
  />

  <div className="flex flex-col lg:flex-row w-full items-center max-w-[1392px] mx-auto">
    <div className="w-full flex flex-col lg:flex-row">
      <h2 className="text-[28px] md:pt-16 md:text-[40px] pb-8 md:pb-10 lg:w-1/3 text-center lg:text-left text-goldenBrown">
        {hp_numbers_title}
      </h2>

      {/* ČTVERCOVÁ MŘÍŽKA */}
      <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-px bg-darkDivGrey">
        {/* Karta 1 */}
        <div className="aspect-square bg-raisinBlack p-6 flex flex-col justify-center">
          <span className="text-silkBeige text-[36px] md:text-[70px] recife">
            {hp_number_1}
          </span>
          <h4 className="card-heading-v md:text-lg text-goldenBrown mt-2">
            {hp_number_desc_1}
          </h4>
        </div>

        {/* Karta 2 */}
        <div className="aspect-square bg-raisinBlack p-6 flex flex-col justify-center">
          <span className="text-silkBeige text-[36px] md:text-[70px] recife">
            {hp_number_2}
          </span>
          <h4 className="card-heading-v md:text-lg text-goldenBrown mt-2">
            {hp_number_desc_2}
          </h4>
        </div>

        {/* Karta 3 */}
        <div className="aspect-square bg-raisinBlack p-6 flex flex-col justify-center">
          <span className="text-silkBeige text-[36px] md:text-[70px] recife">
            {hp_number_3}
          </span>
          <h4 className="card-heading-v md:text-lg text-goldenBrown mt-2">
            {hp_number_desc_3}
          </h4>
        </div>

        {/* Karta 4 */}
        <div className="aspect-square bg-raisinBlack p-6 flex flex-col justify-center">
          <span className="text-silkBeige text-[36px] md:text-[70px] recife">
            {hp_number_4}
          </span>
          <h4 className="card-heading-v md:text-lg text-goldenBrown mt-2">
            {hp_number_desc_4}
          </h4>
        </div>

        {/* Karta 5 */}
        <div className="aspect-square bg-raisinBlack p-6 flex flex-col justify-center">
          <span className="text-silkBeige text-[36px] md:text-[70px] recife">
            {hp_number_5}
          </span>
          <h4 className="card-heading-v md:text-lg text-goldenBrown mt-2">
            {hp_number_desc_5}
          </h4>
        </div>

        {/* Šestý doplňkový čtverec – skrytý obsah, ale tmavý pozadí */}
        <div className="aspect-square bg-raisinBlack p-6 flex" />
      </div>
    </div>
  </div>
      </section>




      <section className="px-4 w-full py-12 md:py-24">

        <div className="flex flex-col md:flex-row w-full max-w-[1392px] mx-auto ">

        <div className="w-full md:w-1/2 md:pr-12 lg:pr-16 xl:pr-16">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-[28px] md:text-[40px] text-goldenBrown">{hp_adv_title}</h2>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:pr-4 lg:pr-8 xl:pr-12 pb-10 md:pb-0">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="mt-4 md:mt-6 text-raisinBlack" dangerouslySetInnerHTML={{ __html: hp_adv_desc }} />
          </div>
        </div>
        </div>
        <hr className="border-lightDivGrey w-full max-w-[1392px] mx-auto mt-10 mb-20"/>
        <div className="w-full max-w-[1392px] mx-auto text-center">
          <h4 className="text-2xl md:text-3xl  kfp mb-16 text-goldenBrown">Naše komplexní finanční plánování zahrnuje</h4>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                <img src="/images/icon-mag-glass.svg" alt="Symbol Gold" className="w-[68px] h-[68px]" />
                <div className="mt-2 text-center card-text-fp text-goldenBrown" dangerouslySetInnerHTML={{ __html: hp_fp_card_1 }} />
              </div>
              <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                <img src="/images/icon-graph.svg" alt="Symbol Silver" className="w-[68px] h-[68px]" />
                <div className="mt-2 text-center card-text-fp text-goldenBrown" dangerouslySetInnerHTML={{ __html: hp_fp_card_2 }} />
              </div>
              <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                <img src="/images/icon-trust.svg" alt="Symbol Gold" className="w-[68px] h-[68px]" />
                <div className="mt-2 text-center card-text-fp text-goldenBrown" dangerouslySetInnerHTML={{ __html: hp_fp_card_3 }} />
              </div>
              <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                <img src="/images/icon-mountain.svg" alt="Symbol Silver" className="w-[68px] h-[68px]" />
                <div className="mt-2 text-center card-text-fp text-goldenBrown" dangerouslySetInnerHTML={{ __html: hp_fp_card_4 }} />
              </div>
              <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                <img src="/images/icon-certificate.svg" alt="Symbol Gold" className="w-[68px] h-[68px]" />
                <div className="mt-2 text-center card-text-fp text-goldenBrown" dangerouslySetInnerHTML={{ __html: hp_fp_card_5 }} />
              </div>
            </div>
            
          <a href="https://www.zabohatsicesko.cz/sluzby" className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center">Zjistit jak začít</a>
        </div>
        

      </section>



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
        src="/images/symbol-golden-s.svg" // ← nahraď svým obrázkem
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
    </div>
  ))}
</div>
    <a href="https://www.zabohatsicesko.cz/reference" className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center">Přečíst více recenzí</a>
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

    <a href="https://www.youtube.com/@ZabohatsiCesko" className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center">Zobrazit všechny epizody</a>
  </div>
</section>

<ContactFormClient/>


    </main>
  );
}
