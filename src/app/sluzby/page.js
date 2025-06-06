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
  const serv_adv_title= page.acf?.serv_adv_title || '';
  const serv_adv_1= page.acf?.serv_adv_1 || '';
  const serv_adv_1_desc= page.acf?.serv_adv_1_desc || '';
  const serv_adv_2= page.acf?.serv_adv_2 || '';
  const serv_adv_2_desc= page.acf?.serv_adv_2_desc || '';
  const serv_adv_3= page.acf?.serv_adv_3 || '';
  const serv_adv_3_desc= page.acf?.serv_adv_3_desc || '';
  const serv_adv_4= page.acf?.serv_adv_4 || '';
  const serv_adv_4_desc= page.acf?.serv_adv_4_desc || '';
  const serv_adv_5= page.acf?.serv_adv_5 || '';
  const serv_adv_5_desc= page.acf?.serv_adv_5_desc || '';


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

      <section className="bg-raisinBlack w-full  px-4 py-12 md:py-16">

        <div className="flex flex-col md:flex-row w-full items-center max-w-[1392px] mx-auto">

          <div className="w-full">

            <h2 className="text-[28px] md:text-[40px] pb-8 md:pb-10 text-white text-center">{serv_adv_title}</h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-golden.svg" alt="Symbol Gold" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-goldenBrown mt-2">{serv_adv_1}</h4>
                <p className="text-silkBeige">{serv_adv_1_desc}</p>
              </div>
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-silver.svg" alt="Symbol Silver" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-silverSage mt-2">{serv_adv_2}</h4>
                <p className="text-silkBeige">{serv_adv_2_desc}</p>
              </div>
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-golden.svg" alt="Symbol Gold" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-goldenBrown mt-2">{serv_adv_3}</h4>
                <p className="text-silkBeige">{serv_adv_3_desc}</p>
              </div>
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-silver.svg" alt="Symbol Silver" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-silverSage mt-2">{serv_adv_4}</h4>
                <p className="text-silkBeige">{serv_adv_4_desc}</p>
              </div>
              <div className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3">
                <img src="/images/zbc-symbol-golden.svg" alt="Symbol Gold" className="w-[32px] h-[32px]" />
                <h4 className="card-heading text-goldenBrown mt-2">{serv_adv_5}</h4>
                <p className="text-silkBeige">{serv_adv_5_desc}</p>
              </div>
            </div>

          </div>

          

        </div>

      </section>


    </main>
  );
}
