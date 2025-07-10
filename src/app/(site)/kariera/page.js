import PageHeader from '../../components/PageHeader';
import Link from 'next/link';

// WP REST API
async function fetchPageData() {
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=kariera&_embed',
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
    acf.seo_title || page?.title?.rendered || 'Kariéra | Za bohatší Česko';

  const canonicalUrl = 'https://zabohatsicesko.cz/kariera';

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

export default async function CareerPage() {
  // Fetch stránky kariera
  const careerPageRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=kariera&_embed',
    { cache: 'no-store' }
  );
  if (!careerPageRes.ok) throw new Error('Failed to fetch career page');
  const careerPageData = await careerPageRes.json();
  const careerPage = careerPageData[0];

  // Fetch pracovních pozic
  const positionsRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pracovni-pozice?per_page=100&_embed',
    { cache: 'no-store' }
  );
  if (!positionsRes.ok) throw new Error('Failed to fetch positions');
  const positionsData = await positionsRes.json();

  const positions = positionsData.map((position) => {
    const image = position._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.png';
    return {
      id: position.id,
      slug: position.slug,
      title: position.title.rendered,
      image,
      excerpt: position.excerpt?.rendered || '',  // Pokud existuje excerpt
    };
  });

  const recenzeRes = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/recenze?per_page=3&_embed');
  const recenze = await recenzeRes.json();

  const career_intro_title = careerPage.acf?.career_intro_title || '';
  const career_intro_detail = careerPage.acf?.career_intro_detail || '';
  const career_intro_img = careerPage.acf?.career_intro_img?.url || '';
  const career_intro_imgAlt = careerPage.acf?.career_intro_img?.alt || 'Intro obrázek';
  const career_hodnoty_title = careerPage.acf?.career_hodnoty_title || ''; 
  const why_1 = careerPage.acf?.why_1 || '';
  const why_1_desc = careerPage.acf?.why_1_desc || ''; 
  const why_2 = careerPage.acf?.why_2 || '';
  const why_2_desc = careerPage.acf?.why_2_desc || '';
  const why_3 = careerPage.acf?.why_3 || '';
  const why_3_desc = careerPage.acf?.why_3_desc || '';
  const why_4 = careerPage.acf?.why_4 || '';
  const why_4_desc = careerPage.acf?.why_4_desc || '';
  const why_5 = careerPage.acf?.why_5 || '';
  const why_5_desc = careerPage.acf?.why_5_desc || '';
  const career_why_img = careerPage.acf?.career_why_img?.url|| '';
  const career_why_imgAlt = careerPage.acf?.career_why_img?.alt || 'Intro obrázek';
  const career_why_vid = careerPage.acf?.career_why_vid || '';
  const career_ben_vid = careerPage.acf?.career_ben_vid || ''; 
  const career_ben_title = careerPage.acf?.career_ben_title || '';
  const career_ben_card_1 = careerPage.acf?.career_ben_card_1 || '';
  const career_ben_card_2 = careerPage.acf?.career_ben_card_2 || '';  
  const career_ben_card_3 = careerPage.acf?.career_ben_card_3 || '';  
  const career_ben_card_4 = careerPage.acf?.career_ben_card_4 || '';  
  const career_ben_card_5 = careerPage.acf?.career_ben_card_5 || '';    

  return (
    <div>
      <PageHeader
        title={careerPage?.acf?.page_name || careerPage?.title?.rendered || 'Kariéra'}
        description={careerPage?.acf?.page_desc || null}
      />

      <main className="flex min-h-screen flex-col items-center">
        {/* Úvodní intro sekce */}
        <section className="px-4 w-full -mt-8 md:-mt-20 z-[50]">
          <div className="flex flex-col lg:flex-row items-end w-full max-w-[1392px] mx-auto bg-white xl:bg-transparent pb-12 md:pb-16">
            <div className="flex w-full lg:w-1/2 mr-0 xl:mr-6 justify-center items-center bg-white xl:bg-transparent">
              <img
                src={career_intro_img}
                alt={career_intro_imgAlt}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-12 lg:mb-12">
              <h2 className="text-[28px] lg:text-[40px] mb-4 text-goldenBrown">{career_intro_title}</h2>
              <div
                className="text-raisinBlack"
                dangerouslySetInnerHTML={{ __html: career_intro_detail }}
              />
              <Link href="/nas-tym" className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center">
                Chci poznat celý tým
              </Link>
            </div>
          </div>
        </section>
        {/*Proč*/}
        <section className="bg-raisinBlack w-full  px-4 py-12 md:py-16">

        <div className="flex flex-col md:flex-row w-full items-center max-w-[1392px] mx-auto">

          <div className="w-full">

            <h2 className="text-[28px] md:text-[40px] pb-8 md:pb-10 text-white text-center">{career_hodnoty_title}</h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-golden.svg" alt="Symbol Gold" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-goldenBrown mt-2">{why_1}</h4>
                <p className="text-silkBeige">{why_1_desc}</p>
              </div>
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-silver.svg" alt="Symbol Silver" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-silverSage mt-2">{why_2}</h4>
                <p className="text-silkBeige">{why_2_desc}</p>
              </div>
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-golden.svg" alt="Symbol Gold" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-goldenBrown mt-2">{why_3}</h4>
                <p className="text-silkBeige">{why_3_desc}</p>
              </div>
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-silver.svg" alt="Symbol Silver" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-silverSage mt-2">{why_4}</h4>
                <p className="text-silkBeige">{why_4_desc}</p>
              </div>
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-golden.svg" alt="Symbol Gold" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-goldenBrown mt-2">{why_5}</h4>
                <p className="text-silkBeige">{why_5_desc}</p>
              </div>
            </div>

          </div>

        </div>
        </section>
        <section className="relative bg-raisinBlack w-full px-4 pb-24 md:pb-32 overflow-hidden">
  <img
    src="/images/symbol-pattern-l.svg"
    alt="Symbol Pattern"
    className="hidden lg:block absolute -left-[55px] -bottom-[55px] w-[380px] h-[380px]"
  />
  <img
    src="/images/symbol-pattern-s.svg"
    alt="Symbol Pattern"
    className="lg:hidden absolute -right-[32px] -bottom-[32px] w-[205px] h-[205px] md:w-[280px] md:h-[280px]"
  />

  <div className="flex flex-col lg:flex-row w-full items-center max-w-[800px] mx-auto">
  <div className="w-full rounded-[8px] overflow-hidden relative z-[50] aspect-video">
    <iframe
      className="w-full h-full"
      src={`https://www.youtube.com/embed/${career_why_vid?.split('v=')[1]}`}
      title="YouTube video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
</div>

        </section>
        {/*Benefity*/}
        <section className="bg-silkBeige px-4 w-full py-12 md:py-16">
        
        <div className="w-full max-w-[1392px] mx-auto text-center">
          <h2 className="text-[28px] md:text-[40px] pb-8 md:pb-10 text-goldenBrown text-center">{career_ben_title}</h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                <img src="/images/icon-mag-glass.svg" alt="Symbol Gold" className="w-[68px] h-[68px]" />
                <div className="mt-2 text-center card-text-fp text-goldenBrown" dangerouslySetInnerHTML={{ __html: career_ben_card_1 }} />
              </div>
              <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                <img src="/images/icon-graph.svg" alt="Symbol Silver" className="w-[68px] h-[68px]" />
                <div className="mt-2 text-center card-text-fp text-goldenBrown" dangerouslySetInnerHTML={{ __html: career_ben_card_2 }} />
              </div>
              <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                <img src="/images/icon-trust.svg" alt="Symbol Gold" className="w-[68px] h-[68px]" />
                <div className="mt-2 text-center card-text-fp text-goldenBrown" dangerouslySetInnerHTML={{ __html: career_ben_card_3 }} />
              </div>
              <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                <img src="/images/icon-mountain.svg" alt="Symbol Silver" className="w-[68px] h-[68px]" />
                <div className="mt-2 text-center card-text-fp text-goldenBrown" dangerouslySetInnerHTML={{ __html: career_ben_card_4 }} />
              </div>
              <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                <img src="/images/icon-certificate.svg" alt="Symbol Gold" className="w-[68px] h-[68px]" />
                <div className="mt-2 text-center card-text-fp text-goldenBrown" dangerouslySetInnerHTML={{ __html: career_ben_card_5 }} />
              </div>
            </div>
        </div>
        

        </section>
        <section className="relative bg-silkBeige w-full px-4 pb-24 md:pb-32 overflow-hidden">
  <img
    src="/images/symbol-pattern-l-rev.svg"
    alt="Symbol Pattern"
    className="hidden lg:block absolute -right-[55px] -bottom-[55px] w-[380px] h-[380px]"
  />
  <img
    src="/images/symbol-pattern-s-rev.svg"
    alt="Symbol Pattern"
    className="lg:hidden absolute -left-[32px] -bottom-[32px] w-[205px] h-[205px] md:w-[280px] md:h-[280px]"
  />

  <div className="flex flex-col lg:flex-row w-full items-center max-w-[800px] mx-auto">
  <div className="w-full rounded-[8px] overflow-hidden relative z-[50] aspect-video">
    <iframe
      className="w-full h-full"
      src={`https://www.youtube.com/embed/${career_ben_vid?.split('v=')[1]}`}
      title="YouTube video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
</div>

        </section>
        {/*Pozice*/}
        <section className="flex flex-col md:flex-row items-center w-full max-w-[1392px] mx-auto px-4 py-12 md:py-24">
          <div className="max-w-[1392px] w-full">
            <h2 className="text-[28px] md:text-[40px] mb-6 md:mb-12 text-center text-goldenBrown">Koho hledáme?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {positions.map((position) => (
                <Link
                  key={position.id}
                  href={`/kariera/${position.slug}`}
                  className="flex flex-col bg-silkBeige/30 rounded-lg hover:shadow-lg transition overflow-hidden group"
                >
                  <img
                    src={position.image}
                    alt={position.title}
                    className="w-full h-52 object-cover rounded-lg"
                  />
                  <div className="px-5 md:px-6 pt-5 md:pt-8 flex flex-col flex-grow justify-between">
                    <div>
                      <h3
                        className="text-lg text-goldenBrown text-[22px] md:text-[22px] font-satoshi-bold mb-4 md:mb-5 group-hover:underline"
                        dangerouslySetInnerHTML={{ __html: position.title }}
                      />
                      <div
                        className="text-raisinBlack"
                        dangerouslySetInnerHTML={{ __html: position.excerpt }}
                      />
                    </div>
                    <div className="flex flex-col gap-5 pt-5 pb-5 md:gap-5 md:pt-5 md:pb-6">
                      <hr className="border-t border-raisinBlack/10" />
                      <div className="mt-auto flex items-start text-goldenBrown">
                        <span className="group-hover:underline">Detail pozice</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            </div>
        </section>

        {/*recenze*/}
        <section className="px-4 w-full py-12 md:py-24 bg-silverSage recenze">
  <div className="w-full max-w-[1392px] mx-auto text-center">

    <h2 className="text-[28px] md:text-[40px] pb-8 md:pb-10 text-white text-center">Chceš i ty mít reputaci jako my?</h2>

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


        <section className="bg-silkBeige w-full py-12 md:py-16">
  <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center mb-4">
    Přidej se k nám!
  </h2>
  <p className="text-center text-raisinBlack mb-8">
    Chcete mít ve financích jasno a klid? <strong>Začněte tady.</strong>
  </p>

  <div className="flex flex-col w-full max-w-[1392px] mx-auto justify-center">

    {/* Formulář */}
    <form
      action="https://formcarry.com/s/kY_1MuRL2um"
      method="POST"
      encType="multipart/form-data"
      className="mx-auto p-6 space-y-5 w-full max-w-[850px]"
      target="_self"
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select name="typ" id="typ" required className="hidden"><option value="spolupracovník " selected></option></select>
        <input
          type="text"
          name="firstName"
          placeholder="Jméno"
          required
          className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Příjmení"
          required
          className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Telefon"
          required
          className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
        />

        <div className="md:col-span-2 md:flex md:justify-center">
          <div className="relative w-full md:w-1/2">
            <select
              name="role"
              required
              className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-silverSage text-inputPlacehoder"
              style={{ color: '#747271' }}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Jaká role tě láká nejvíce?
              </option>
              {positions.map((item) => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>

            <div
              className="pointer-events-none absolute inset-y-[9px] right-[9px] flex items-center justify-center rounded cursor-pointer"
              style={{
                width: '28px',
                height: '22px',
                backgroundColor: '#9D6219',
              }}
            >
              <img
                src="/images/chevron-down.svg"
                alt="šipka"
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <button
          type="submit"
          className="w-full md:w-auto md:mt-[24px] bg-goldenBrown text-white py-2 px-6 rounded font-satoshi-bold"
        >
          Kontaktujte mě
        </button>
      </div>
    </form>

    <p className="text-cardGrey text-center w-full max-w-[850px] p-6 m-auto">
      Odesláním formuláře berete na vědomí podmínky zpracování osobních údajů uvedené v informaci o zpracování osobních údajů
    </p>
  </div>
</section>



        
      </main>
    </div>
  );
}
