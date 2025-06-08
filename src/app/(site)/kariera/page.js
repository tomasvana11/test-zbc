import PageHeader from '../../components/PageHeader';
import Link from 'next/link';

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
        <section className="relative bg-raisinBlack w-full px-4 pb-16 md:pb-20 overflow-hidden">
  <img
    src="/images/symbol-pattern-l.svg"
    alt="Symbol Pattern"
    className="absolute -left-[30px] -bottom-[64px] w-[200px] h-[200px] md:-left-[55px] md:-bottom-[55px] md:w-[380px] md:h-[380px]"
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

        {/* ...zbytek s kontaktním formulářem necháváš beze změny */}
        
      </main>
    </div>
  );
}
