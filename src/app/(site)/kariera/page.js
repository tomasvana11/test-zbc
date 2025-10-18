import PageHeader from "../../components/PageHeader";
import Link from "next/link";
import SmoothScrollButton from '../../components/SmoothScrollButton';
import SlovaKoleguSection from './SlovaKoleguSection';

// WP REST API - METADATA
async function fetchPageData() {
  const res = await fetch(
    "https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=kariera&_embed",
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  const page = data[0];

  const acf = page?.acf || {};
  const featuredImage =
    page?._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/default-og.jpg";

  const rawDescription = acf.seo_description || page?.excerpt?.rendered || "";
  const description = rawDescription.replace(/(<([^>]+)>)/gi, "").trim();

  const title =
    acf.seo_title || page?.title?.rendered || "Kariéra | Za bohatší Česko";

  const canonicalUrl = "https://zabohatsicesko.cz/kariera";

  return {
    title,
    description,
    featuredImage,
    canonicalUrl,
  };
}

// generate metadata
export async function generateMetadata() {
  const { title, description, featuredImage, canonicalUrl } =
    await fetchPageData();

  return {
    title,
    description,
    metadataBase: new URL("https://zabohatsicesko.cz"),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: "index, follow",
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "Za bohatší Česko",
      locale: "cs_CZ",
      url: canonicalUrl,
      images: [featuredImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [featuredImage],
      site: "@zabohatsicesko",
    },
  };
}

export default async function CareerPage() {
  // Fetch stránky kariera
  const careerPageRes = await fetch(
    "https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=kariera&_embed",
    { cache: "no-store" }
  );
  if (!careerPageRes.ok) throw new Error("Failed to fetch career page");
  const careerPageData = await careerPageRes.json();
  const careerPage = careerPageData[0];

  // Fetch Homepage pro Vizi a Misi
  const homepageRes = await fetch(
    "https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=homepage",
    { cache: "no-store" }
  );
  if (!homepageRes.ok) throw new Error("Failed to fetch homepage");
  const homepageData = await homepageRes.json();
  const homepage = homepageData[0];

  // Fetch pracovních pozic
  const positionsRes = await fetch(
    "https://api.zabohatsicesko.cz/wp-json/wp/v2/pracovni-pozice?per_page=100&_embed&orderby=menu_order&order=asc",
    { cache: "no-store" }
  );
  if (!positionsRes.ok) throw new Error("Failed to fetch positions");
  const positionsData = await positionsRes.json();

  const positions = positionsData.map((position) => {
    const image =
      position._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "/placeholder.png";
    return {
      id: position.id,
      slug: position.slug,
      title: position.title.rendered,
      image,
      excerpt: position.excerpt?.rendered || "",
    };
  });

  // Fetch slov kolegů
  const slovaKoleguRes = await fetch(
    "https://api.zabohatsicesko.cz/wp-json/wp/v2/slova-kolegu?per_page=100&_embed",
    { cache: "no-store" }
  );
  const slovaKolegu = await slovaKoleguRes.json();

  // ACF pole z kariérní stránky
  const career_intro_title = careerPage.acf?.career_intro_title || "";
  const career_intro_detail = careerPage.acf?.career_intro_detail || "";
  const career_intro_img = careerPage.acf?.career_intro_img?.url || "";
  const career_intro_imgAlt =
    careerPage.acf?.career_intro_img?.alt || "Intro obrázek";
  const career_hodnoty_title = careerPage.acf?.career_hodnoty_title || "";
  const why_1 = careerPage.acf?.why_1 || "";
  const why_1_desc = careerPage.acf?.why_1_desc || "";
  const why_2 = careerPage.acf?.why_2 || "";
  const why_2_desc = careerPage.acf?.why_2_desc || "";
  const why_3 = careerPage.acf?.why_3 || "";
  const why_3_desc = careerPage.acf?.why_3_desc || "";
  const why_4 = careerPage.acf?.why_4 || "";
  const why_4_desc = careerPage.acf?.why_4_desc || "";
  const why_5 = careerPage.acf?.why_5 || "";
  const why_5_desc = careerPage.acf?.why_5_desc || "";
  const career_why_vid = careerPage.acf?.career_why_vid || "";
  const career_timeline_title = careerPage.acf?.career_timeline_title || "";
  const kar_tim_t1 = careerPage.acf?.kar_tim_t1 || "";
  const kar_tim_d1 = careerPage.acf?.kar_tim_d1 || "";
  const kar_tim_t2 = careerPage.acf?.kar_tim_t2 || "";
  const kar_tim_d2 = careerPage.acf?.kar_tim_d2 || "";
  const kar_tim_t3 = careerPage.acf?.kar_tim_t3 || "";
  const kar_tim_d3 = careerPage.acf?.kar_tim_d3 || "";
  const kar_tim_t4 = careerPage.acf?.kar_tim_t4 || "";
  const kar_tim_d4 = careerPage.acf?.kar_tim_d4 || "";
  const kar_tim_t5 = careerPage.acf?.kar_tim_t5 || "";
  const kar_tim_d5 = careerPage.acf?.kar_tim_d5 || "";
  
  
  // Nová pole pro sekci Hodnota
  const kar_hodnota_t1 = careerPage.acf?.kar_hodnota_t1 || "";
  const kar_hodnota_d1 = careerPage.acf?.kar_hodnota_d1 || "";
  const kar_hodnota_t2 = careerPage.acf?.kar_hodnota_t2 || "";
  const kar_hodnota_d2 = careerPage.acf?.kar_hodnota_d2 || "";
  const kar_hodnota_t3 = careerPage.acf?.kar_hodnota_t3 || "";
  const kar_hodnota_d3 = careerPage.acf?.kar_hodnota_d3 || "";
  const kar_hodnota_t4 = careerPage.acf?.kar_hodnota_t4 || "";
  const kar_hodnota_d4 = careerPage.acf?.kar_hodnota_d4 || "";
  const kar_hodnota_t5 = careerPage.acf?.kar_hodnota_t5 || "";
  const kar_hodnota_d5 = careerPage.acf?.kar_hodnota_d5 || "";

  return (
    <div>
      <PageHeader
        title={
          careerPage?.acf?.page_name || careerPage?.title?.rendered || "Kariéra"
        }
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
              <h2 className="text-[28px] lg:text-[40px] mb-4 text-goldenBrown">
                {career_intro_title}
              </h2>
              <div
                className="text-raisinBlack"
                dangerouslySetInnerHTML={{ __html: career_intro_detail }}
              />
              
              {/* Tlačítka */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <SmoothScrollButton
                  targetId="volne-pozice"
                  className="w-full sm:w-auto custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige inline-flex items-center justify-center text-center"
                >
                  Volné pozice
                  <img src="/images/chevron-down.svg" alt="šipka" className="w-4 h-4 ml-2" />
                </SmoothScrollButton>
                {/* Sekundární tlačítko - Chci poznat celý tým */}
                <Link
                  href="/nas-tym"
                  className="w-full sm:w-auto custom-btn py-3 px-4 rounded bg-white text-goldenBrown border border-goldenBrown inline-block text-center"
                >
                  Chci poznat celý tým
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/*Proč*/}
        <section className="bg-raisinBlack w-full px-4 py-12 md:py-16">
          <div className="flex flex-col md:flex-row w-full items-center max-w-[1392px] mx-auto">
            <div className="w-full">
              <h2 className="text-[28px] md:text-[40px] pb-8 md:pb-10 text-white text-center">
                {career_hodnoty_title}
              </h2>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                  <img
                    src="/images/zbc-symbol-golden.svg"
                    alt="Symbol Gold"
                    className="w-[32px] h-[32px]"
                  />
                  <h4 className="card-heading text-goldenBrown mt-2">
                    {why_5}
                  </h4>
                  <p className="text-silkBeige">{why_5_desc}</p>
                </div>

                <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                  <img
                    src="/images/zbc-symbol-silver.svg"
                    alt="Symbol Silver"
                    className="w-[32px] h-[32px]"
                  />
                  <h4 className="card-heading text-silverSage mt-2">{why_2}</h4>
                  <p className="text-silkBeige">{why_2_desc}</p>
                </div>
                <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                  <img
                    src="/images/zbc-symbol-golden.svg"
                    alt="Symbol Gold"
                    className="w-[32px] h-[32px]"
                  />
                  <h4 className="card-heading text-goldenBrown mt-2">
                    {why_3}
                  </h4>
                  <p className="text-silkBeige">{why_3_desc}</p>
                </div>
                <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                  <img
                    src="/images/zbc-symbol-silver.svg"
                    alt="Symbol Silver"
                    className="w-[32px] h-[32px]"
                  />
                  <h4 className="card-heading text-silverSage mt-2">{why_4}</h4>
                  <p className="text-silkBeige">{why_4_desc}</p>
                </div>
                <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                  <img
                    src="/images/zbc-symbol-golden.svg"
                    alt="Symbol Gold"
                    className="w-[32px] h-[32px]"
                  />
                  <h4 className="card-heading text-goldenBrown mt-2">
                    {why_1}
                  </h4>
                  <p className="text-silkBeige">{why_1_desc}</p>
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
                src={`https://www.youtube.com/embed/${
                  career_why_vid?.split("v=")[1]
                }`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Hodnoty */}
        <section className="px-4 w-full bg-white py-12 md:py-16">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 lg:gap-20 w-full max-w-[1392px] mx-auto">
    
    {/* Karta 1 */}
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-[28px] md:text-[40px] text-goldenBrown">
          {kar_hodnota_t1}
        </h2>
        <img
          src="/images/IconMise.svg"
          alt="Ikona mise"
          className="w-[30px] h-[30px] md:w-[38px] md:h-[38px]"
        />
      </div>
      <hr className="border-lightDivGrey" />
      <div className="mt-4 md:mt-6 text-raisinBlack">
        {kar_hodnota_d1}
      </div>
    </div>

    {/* Karta 2 */}
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-[28px] md:text-[40px] text-goldenBrown">
          {kar_hodnota_t2}
        </h2>
        <img
          src="/images/IconVize.svg"
          alt="Ikona Vize"
          className="w-[30px] h-[30px] md:w-[38px] md:h-[38px]"
        />
      </div>
      <hr className="border-lightDivGrey" />
      <div className="mt-4 md:mt-6 text-raisinBlack">
        {kar_hodnota_d2}
      </div>
    </div>

    {/* Karta 3 */}
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-[28px] md:text-[40px] text-goldenBrown">
          {kar_hodnota_t3}
        </h2>
        <img
          src="/images/IconMise.svg"
          alt="Ikona mise"
          className="w-[30px] h-[30px] md:w-[38px] md:h-[38px]"
        />
      </div>
      <hr className="border-lightDivGrey" />
      <div className="mt-4 md:mt-6 text-raisinBlack">
        {kar_hodnota_d3}
      </div>
    </div>

    {/* Karta 4 */}
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-[28px] md:text-[40px] text-goldenBrown">
          {kar_hodnota_t4}
        </h2>
        <img
          src="/images/IconVize.svg"
          alt="Ikona Vize"
          className="w-[30px] h-[30px] md:w-[38px] md:h-[38px]"
        />
      </div>
      <hr className="border-lightDivGrey" />
      <div className="mt-4 md:mt-6 text-raisinBlack">
        {kar_hodnota_d4}
      </div>
    </div>

    {/* Karta 5 */}
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-[28px] md:text-[40px] text-goldenBrown">
          {kar_hodnota_t5}
        </h2>
        <img
          src="/images/IconMise.svg"
          alt="Ikona mise"
          className="w-[30px] h-[30px] md:w-[38px] md:h-[38px]"
        />
      </div>
      <hr className="border-lightDivGrey" />
      <div className="mt-4 md:mt-6 text-raisinBlack">
        {kar_hodnota_d5}
      </div>
    </div>

  </div>
        </section>


        {/*Benefity*/}
        
        <section className="relative bg-silkBeige w-full px-4 py-12 md:py-20 overflow-hidden">
  <img
    src="/images/symbol-green-outline.svg"
    alt="Symbol"
    className="hidden lg:block absolute -left-[120px] -bottom-[350px] w-[689px] h-[690px]"
  />

  <div className="flex flex-col gap-6 md:gap-10 lg:flex-row w-full items-center max-w-[1392px] mx-auto">
    <div className="w-full flex flex-col lg:flex-row">
      <h2 className="recife text-[28px] md:pt-8 md:text-[40px] pb-8 md:pb-10 lg:mr-10 lg:w-2/5 text-left text-goldenBrown">
        {career_timeline_title}
      </h2>

      {/*MŘÍŽKA*/}
      <div className="relative w-full lg:w-3/5 grid grid-cols-1 gap-10 md:gap-16 pl-4 md:pl-0">
      <div className="absolute h-[700px] bg-lightDivGrey w-[1px] top-0 left-[40px] z-0 hidden md:block"></div>
        {/* Karta 1 */}
        <div className="flex flex-col md:flex-row gap-4">
            <div className="relative shrink-0 rounded-br-[12px] w-[64px] h-[64px] md:w-[80px] md:h-[80px] bg-cardBeige flex items-center justify-center">
            <img src="/images/symbol-golden-single.svg"
            alt="Symbol"
            className="absolute w-auto h-[32px] md:h-[48px] left-0 top-0 transform -translate-x-1/2 -translate-y-1/2"/>
            <span className="recife text-[28px] md:text-[36px] text-raisinBlack text-center">01</span>
            </div>
            <div>
                <h3 className="recife text-goldenBrown text-[24px] md:text-[28px] mb-2 md:mt-2">{kar_tim_t1}</h3>
                <div className="text-raisinBlack" dangerouslySetInnerHTML={{ __html: kar_tim_d1 || '' }}/>
            </div>
        </div>
        {/* Karta 2 */}
        <div className="flex flex-col md:flex-row gap-6">
            <div className="relative shrink-0 rounded-br-[12px] w-[64px] h-[64px] md:w-[80px] md:h-[80px] bg-cardBeige flex items-center justify-center">
            <img src="/images/symbol-golden-single.svg"
            alt="Symbol"
            className="absolute w-auto h-[32px] md:h-[48px] left-0 top-0 transform -translate-x-1/2 -translate-y-1/2"/>
            <span className="recife text-[28px] md:text-[36px] text-raisinBlack text-center">02</span>
            </div>
            <div>
                <h3 className="recife text-goldenBrown text-[24px] md:text-[28px] mb-2 md:mt-2">{kar_tim_t2}</h3>
                <div className="text-raisinBlack" dangerouslySetInnerHTML={{ __html: kar_tim_d2 || '' }}/>
            </div>
        </div>
        {/* Karta 3 */}
        <div className="flex flex-col md:flex-row gap-6">
            <div className="relative shrink-0 rounded-br-[12px] w-[64px] h-[64px] md:w-[80px] md:h-[80px] bg-cardBeige flex items-center justify-center">
            <img src="/images/symbol-golden-single.svg"
            alt="Symbol"
            className="absolute w-auto h-[32px] md:h-[48px] left-0 top-0 transform -translate-x-1/2 -translate-y-1/2"/>
            <span className="recife text-[28px] md:text-[36px] text-raisinBlack text-center">03</span>
            </div>
            <div>
                <h3 className="recife text-goldenBrown text-[24px] md:text-[28px] mb-2 md:mt-2">{kar_tim_t3}</h3>
                <div className="text-raisinBlack" dangerouslySetInnerHTML={{ __html: kar_tim_d3 || '' }}/>
            </div>
        </div>
        {/* Karta 4 */}
        <div className="flex flex-col md:flex-row gap-6">
            <div className="relative shrink-0 rounded-br-[12px] w-[64px] h-[64px] md:w-[80px] md:h-[80px] bg-cardBeige flex items-center justify-center">
            <img src="/images/symbol-golden-single.svg"
            alt="Symbol"
            className="absolute w-auto h-[32px] md:h-[48px] left-0 top-0 transform -translate-x-1/2 -translate-y-1/2"/>
            <span className="recife text-[28px] md:text-[36px] text-raisinBlack text-center">04</span>
            </div>
            <div>
                <h3 className="recife text-goldenBrown text-[24px] md:text-[28px] mb-2 md:mt-2">{kar_tim_t4}</h3>
                <div className="text-raisinBlack" dangerouslySetInnerHTML={{ __html: kar_tim_d4 || '' }}/>
            </div>
        </div>

        {/* Karta 5 */}
        <div className="flex flex-col md:flex-row gap-6">
            <div className="relative shrink-0 rounded-br-[12px] w-[64px] h-[64px] md:w-[80px] md:h-[80px] bg-cardBeige flex items-center justify-center">
            <img src="/images/symbol-golden-single.svg"
            alt="Symbol"
            className="absolute w-auto h-[32px] md:h-[48px] left-0 top-0 transform -translate-x-1/2 -translate-y-1/2"/>
            <span className="recife text-[28px] md:text-[36px] text-raisinBlack text-center">05</span>
            </div>
            <div>
                <h3 className="recife text-goldenBrown text-[24px] md:text-[28px] mb-2 md:mt-2">{kar_tim_t5}</h3>
                <div className="text-raisinBlack" dangerouslySetInnerHTML={{ __html: kar_tim_d5 || '' }}/>
            </div>
        </div>

      </div>
    </div>
  </div>
</section>


        {/*Pozice*/}
        <section className="flex flex-col items-center w-full max-w-[1392px] mx-auto px-4 py-12 md:py-24" id="volne-pozice">
          <div className="max-w-[1392px] w-full">
            <h2 className="text-[28px] md:text-[40px] mb-6 md:mb-12 text-center text-goldenBrown">
              Koho hledáme?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {positions.map((position) => (
                <Link
                  key={position.id}
                  href={`/kariera/${position.slug}`}
                  className="bg-silkBeige/30 rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col group"
                >
                  <h3
                    className="text-[22px] md:text-[24px] font-satoshi-bold text-goldenBrown mb-4"
                    dangerouslySetInnerHTML={{ __html: position.title }}
                  />

                  <div
                    className="text-raisinBlack mb-6 flex-grow leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: position.excerpt }}
                  />

                  {/* Divider */}
                  <hr className="border-t border-raisinBlack/10 mb-5" />

                  <span className="inline-block text-goldenBrown font-satoshi-bold group-hover:underline transition-all self-start">
                    Detail pozice
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Nová sekce Nábor 
        <section className="relative bg-silkBeige px-4 w-full py-12 md:pt-16 md:pb-48 overflow-hidden">
          <img
            src="/images/symbol-pattern-l-rev_2.svg"
            alt="Symbol Pattern"
            className="hidden lg:block absolute -left-[55px] -bottom-[185px] w-[380px] h-[380px]"
          />
          
          <div className="w-full max-w-[1392px] mx-auto text-center relative z-10">
            

            <h2 className="text-[28px] md:text-[40px] pb-8 md:pb-10 text-goldenBrown text-center">
              {career_nabor_title}
            </h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {recr_t1 && (
                <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                  <img
                    src="/images/icon-mag-glass.svg"
                    alt="Symbol Gold"
                    className="w-[68px] h-[68px]"
                  />
                  <div
                    className="mt-2 text-center card-text-fp text-goldenBrown"
                    dangerouslySetInnerHTML={{ __html: `<strong>${recr_t1}</strong><br/>${recr_d1}` }}
                  />
                </div>
              )}

              {recr_t2 && (
                <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                  <img
                    src="/images/icon-graph.svg"
                    alt="Symbol Silver"
                    className="w-[68px] h-[68px]"
                  />
                  <div
                    className="mt-2 text-center card-text-fp text-goldenBrown"
                    dangerouslySetInnerHTML={{ __html: `<strong>${recr_t2}</strong><br/>${recr_d2}` }}
                  />
                </div>
              )}

              {recr_t3 && (
                <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                  <img
                    src="/images/icon-trust.svg"
                    alt="Symbol Gold"
                    className="w-[68px] h-[68px]"
                  />
                  <div
                    className="mt-2 text-center card-text-fp text-goldenBrown"
                    dangerouslySetInnerHTML={{ __html: `<strong>${recr_t3}</strong><br/>${recr_d3}` }}
                  />
                </div>
              )}

              {recr_t4 && (
                <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                  <img
                    src="/images/icon-mountain.svg"
                    alt="Symbol Silver"
                    className="w-[68px] h-[68px]"
                  />
                  <div
                    className="mt-2 text-center card-text-fp text-goldenBrown"
                    dangerouslySetInnerHTML={{ __html: `<strong>${recr_t4}</strong><br/>${recr_d4}` }}
                  />
                </div>
              )}

              {recr_t5 && (
                <div className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center">
                  <img
                    src="/images/icon-certificate.svg"
                    alt="Symbol Gold"
                    className="w-[68px] h-[68px]"
                  />
                  <div
                    className="mt-2 text-center card-text-fp text-goldenBrown"
                    dangerouslySetInnerHTML={{ __html: `<strong>${recr_t5}</strong><br/>${recr_d5}` }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>*/}

        {/*Slova kolegů*/}
        <SlovaKoleguSection slovaKolegu={slovaKolegu} />

        <section className="bg-silkBeige w-full py-12 md:py-16">
          <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center mb-8">
          Pokud hledáš víc než práci, napiš nám.
          </h2> 

          <div className="flex flex-col w-full max-w-[1392px] mx-auto justify-center">
            <form
              action="https://formcarry.com/s/kY_1MuRL2um"
              method="POST"
              encType="multipart/form-data"
              className="mx-auto p-6 space-y-5 w-full max-w-[850px]"
              target="_self"
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select name="typ" id="typ" required className="hidden" defaultValue="spolupracovník ">
                  <option value="spolupracovník "></option>
                </select>
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
                    <input
                      type="text"
                      name="bydliste"
                      id="bydliste"
                      placeholder="Zadejte místo, kde aktuálně žijete"
                      required
                      className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 md:flex md:justify-center">
                  <div className="relative w-full md:w-1/2">
                    <select
                      name="role"
                      required
                      className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-silverSage text-inputPlacehoder"
                      style={{ color: "#747271" }}
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
                        width: "28px",
                        height: "22px",
                        backgroundColor: "#9D6219",
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

                <div className="md:col-span-2 md:flex md:justify-center">
                  <div className="relative w-full md:w-1/2">
                    <label htmlFor="cv" className="text-silverSage">
                      Životopis (PDF, DOCX):
                    </label>
                    <input
                      type="file"
                      id="cv"
                      name="cv"
                      accept=".pdf,.doc,.docx"
                      required
                      className="block w-full rounded text-center text-[rgb(151,167,165)] bg-inputLight file:bg-inputLight file:border-0 file:w-full file:py-3 file:rounded-md file:text-[rgb(151,167,165)]"
                    />
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
              Odesláním formuláře berete na vědomí podmínky zpracování osobních
              údajů uvedené v informaci o zpracování osobních údajů
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}