export default async function SluzbyPage() {
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=sluzby&_embed',
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch služby page data');
  }

  const data = await res.json();
  const page = data[0]; // protože WP vrací pole stránek

  // Z ACF polí vezmi, co potřebuješ
  const serv_intro_title = page.acf?.serv_intro_title || '';
  const serv_intro_desc = page.acf?.serv_intro_desc || '';

  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
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
              {serv_intro_title}
            </h2>
            <div className="mt-4 md:mt-6 text-raisinBlack" dangerouslySetInnerHTML={{ __html: serv_intro_desc || '' }}/>
            <a
              href="https://zabohatsicesko.cz/kontakt"
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
    </main>
  );
}
