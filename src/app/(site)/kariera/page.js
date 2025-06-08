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
      date: position.date ? new Date(position.date).toLocaleDateString('cs-CZ') : null,
    };
  });

  return (
    <div>
      <PageHeader
        title={careerPage?.acf?.page_name || careerPage?.title?.rendered || 'Kariéra'}
        description={careerPage?.acf?.page_desc || null}
      />

      <main className="flex min-h-screen flex-col items-center">
        <section className="flex flex-col md:flex-row items-center w-full max-w-[1392px] mx-auto py-12 md:py-24">
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
                      <div className="mt-auto flex justify-between items-center text-goldenBrown">
                        <span className="group-hover:underline">Otevřít pozici</span>
                        <span className="text-raisinBlack/20">{position.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
        </section>

        {/* ...zbytek s kontaktním formulářem necháváš beze změny */}
        
      </main>
    </div>
  );
}
