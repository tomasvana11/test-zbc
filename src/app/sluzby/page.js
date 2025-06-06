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
  const serv_title= page.acf?.serv_title || '';
  const serv_1= page.acf?.serv_1 || '';
  const serv_2= page.acf?.serv_2 || '';
  const serv_3= page.acf?.serv_3 || '';
  const serv_4= page.acf?.serv_4 || '';
  const serv_5= page.acf?.serv_5 || '';
  const serv_6= page.acf?.serv_6 || '';


  const recenzeRes = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/recenze?per_page=3&_embed');
  const recenze = await recenzeRes.json();


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

      <section className="relative bg-raisinBlack w-full px-4 pt-12 pb-24 md:py-16 overflow-hidden">
  <img
    src="/images/symbol-pattern-l.svg"
    alt="Symbol Pattern"
    className="hidden lg:block absolute -left-[44px] -bottom-[44px] w-[300px] h-[300px]"
  />
  <img
    src="/images/symbol-pattern-s.svg"
    alt="Symbol Pattern"
    className="lg:hidden absolute -right-[32px] -bottom-[32px] w-[180px] h-[180px]"
  />

  <div className="flex flex-col lg:flex-row w-full items-center max-w-[1392px] mx-auto">
    <div className="w-full flex flex-col lg:flex-row">
      <h2 className="text-[28px] md:pt-16 md:text-[40px] pb-8 md:pb-10 lg:w-1/3 text-center lg:text-left text-goldenBrown">
        {serv_title}
      </h2>

      {/* ČTVERCOVÁ MŘÍŽKA */}
      <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-px bg-darkDivGrey">
        {/* Karta 1 */}
        <div className="aspect-square bg-raisinBlack p-6 flex flex-col justify-center">
            <img
                src="/images/bank.svg"
                alt="Ikona služby"
                className="h-[36px] w-[36px] md:h-[44px] md:w-[44px] mb-4"/>
            <span className="text-silkBeige text-[24px] md:text-[32px] recife">
            {serv_1}
            </span>
        </div>

        {/* Karta 2 */}
        <div className="aspect-square bg-raisinBlack p-6 flex flex-col justify-center">
            <img
                src="/images/presentation-chart-02.svg"
                alt="Ikona služby"
                className="h-[36px] w-[36px] md:h-[44px] md:w-[44px] mb-4"/>
          <span className="text-silkBeige text-[24px] md:text-[32px] recife">
            
            {serv_2}
          </span>
        </div>

        {/* Karta 3 */}
        <div className="aspect-square bg-raisinBlack p-6 flex flex-col justify-center">
            <img
                src="/images/wallet-02.svg"
                alt="Ikona služby"
                className="h-[36px] w-[36px] md:h-[44px] md:w-[44px] mb-4"/>
          <span className="text-silkBeige text-[24px] md:text-[32px] recife">
            {serv_3}
          </span>
        </div>

        {/* Karta 4 */}
        <div className="aspect-square bg-raisinBlack p-6 flex flex-col justify-center">
            <img
                src="/images/piggy-bank-01.svg"
                alt="Ikona služby"
                className="h-[36px] w-[36px] md:h-[44px] md:w-[44px] mb-4"/>
          <span className="text-silkBeige text-[24px] md:text-[32px] recife">
            {serv_4}
          </span>
        </div>

        {/* Karta 5 */}
        <div className="aspect-square bg-raisinBlack p-6 flex flex-col justify-center">
            <img
                src="/images/shield-03.svg"
                alt="Ikona služby"
                className="h-[36px] w-[36px] md:h-[44px] md:w-[44px] mb-4"/>
          <span className="text-silkBeige text-[24px] md:text-[32px] recife">
            {serv_5}
          </span>
        </div>

        {/* Karta 6 */}
        <div className="aspect-square bg-raisinBlack p-6 flex flex-col justify-center">
            <img
                src="/images/coins-hand.svg"
                alt="Ikona služby"
                className="h-[36px] w-[36px] md:h-[44px] md:w-[44px] mb-4"/>
          <span className="text-silkBeige text-[24px] md:text-[32px] recife">
            {serv_6}
          </span>
        </div>

      </div>
    </div>
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
    <a href="https://zabohatsicesko.cz/reference" className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center">Přečíst více recenzí</a>
  </div>
</section>


    </main>
  );
}
