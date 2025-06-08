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
  const career_intro_img = careerPage.acf?.career_intro_img || '';
  const introImgAlt = careerPage.acf?.career_intro_img?.alt || 'Intro obrázek';

  return (
    <div>
      <PageHeader
        title={careerPage?.acf?.page_name || careerPage?.title?.rendered || 'Kariéra'}
        description={careerPage?.acf?.page_desc || null}
      />

      <main className="flex min-h-screen flex-col items-center">
        {/* Úvodní intro sekce */}
        <section className="px-4 w-full -mt-8 md:-mt-20 z-[50]">
          <div className="flex flex-col lg:flex-row items-end w-full max-w-[1392px] mx-auto bg-white xl:bg-transparent">
            <div className="flex w-full lg:w-1/2 mr-0 xl:mr-6 justify-center items-center bg-white xl:bg-transparent">
              <img
                src={introImg}
                alt={introImgAlt}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-12 lg:mb-12">
              <h2 className="text-[28px] lg:text-[40px] mb-4 text-goldenBrown">{career_intro_title}</h2>
              <div
                className="text-raisinBlack"
                dangerouslySetInnerHTML={{ __html: career_intro_detail }}
              />
            </div>
          </div>
        </section>
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
