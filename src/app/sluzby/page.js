export default async function SluzbyPage() {
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=sluzby&_embed',
    { next: { revalidate: 60 } }
  );
  const pageRes = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=homepage', {
    cache: 'no-store',
  });

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
  const doc_1_title= page.acf?.doc_1_title || '';
  const doc_2_title= page.acf?.doc_2_title || '';
  const doc_1_desc= page.acf?.doc_1_desc || '';
  const doc_2_desc= page.acf?.doc_2_desc || '';
  
  const homepageRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=homepage&_embed',
    { next: { revalidate: 60 } }
  );
  if (!homepageRes.ok) throw new Error('Failed to fetch homepage');
  const homepageData = await homepageRes.json();
  const homepage = homepageData[0];

  const podcast_title = homepage.acf?.podcast_title || '';
  const podcast_desc = homepage.acf?.podcast_desc || '';


  const recenzeRes = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/recenze?per_page=3&_embed');
  const recenze = await recenzeRes.json();

  const podcastRes = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/podcast?per_page=3&_embed');
  const podcastPosts = await podcastRes.json();


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

    <section className="px-4 w-full">
        <div className="max-w-[1392px] mx-auto">
          <hr className="w-full border-1 h-[1px] lightDivGrey" />
        </div>
    </section>

    <section className="px-4 w-full">
        <div className="flex flex-col md:flex-row w-full max-w-[1392px] mx-auto py-12 md:py-24">
        <div className="w-full md:w-1/2 md:pr-12 lg:pr-16 xl:pr-20 pb-10 md:pb-0">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-[28px] md:text-[40px] text-goldenBrown">{doc_1_title}</h2>
            <a className="rounded py-3 bg-silkBeige px-5 flex flex-row gap-[10px] min-w-[132px]" href="https://api.zabohatsicesko.cz/wp-content/uploads/2025/06/checklist-co-zkontrolovat-pred-podpisem-smlouvy.pdf" download>
                <img src="/images/download.svg" alt="Ikona stáhnout" className="w-[17px] h-[18px]]"/>
                <span className="text-goldenBrown font-satoshi-bold">Stáhnout</span>
            </a>
            
          </div>
          <hr className="border-lightDivGrey hidden md:block"/>
          <div className="mt-4 md:mt-6 text-raisinBlack" dangerouslySetInnerHTML={{ __html: doc_1_desc }} />
        </div>
        <div className="px-4 w-full md:hidden">
        <div className="max-w-[1392px] mx-auto">
          <hr className="w-full border-1 h-[1px] lightDivGrey" />
        </div>
        </div>
        <div className="w-full md:w-1/2 md:pr-12 lg:pr-16 xl:pr-20 pb-10 md:pb-0">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-[28px] md:text-[40px] text-goldenBrown">{doc_2_title}</h2>
            <a className="rounded py-3 bg-silkBeige px-5 flex flex-row gap-[10px] min-w-[132px]" href="https://api.zabohatsicesko.cz/wp-content/uploads/2025/06/Dokument-servisni-schuzky.pdf" download>
                <img src="/images/download.svg" alt="Ikona stáhnout" className="w-[17px] h-[18px]]"/>
                <span className="text-goldenBrown font-satoshi-bold">Stáhnout</span>
            </a>
          </div>
          <hr className="border-lightDivGrey hidden md:block"/>
          <div className="mt-4 md:mt-6 text-raisinBlack" dangerouslySetInnerHTML={{ __html: doc_2_desc }} />
        </div>
        </div>
      </section>

    <section className="bg-silkBeige w-full py-12 md:py-16">
  <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center">Kontaktujte nás</h2>
  <p className="text-center text-raisinBlack">Chcete mít ve financích jasno a klid? <strong>Začněte tady.</strong></p>
  
  <div className="flex flex-col w-full max-w-[1392px] mx-auto py-4 md:py-8 justify-center">


    

    <form
  action="https://formcarry.com/s/kY_1MuRL2um"
  method="POST"
  encType="multipart/form-data"
  className="mx-auto p-6 space-y-5 w-full max-w-[850px]"
  target="_self" noValidate
>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <input
        type="text"
        name="firstName"
        id="firstName"
        placeholder="Jméno"
        required
        className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
      />
    </div>
    <div>
      <input
        type="text"
        name="lastName"
        id="lastName"
        placeholder="Příjmení"
        required
        className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
      />
    </div>
    <div>
      <input
        type="tel"
        name="phone"
        id="phone"
        placeholder="Telefon"
        required
        className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
      />
    </div>
    <div>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        required
        className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
      />
    </div>

    <div className="md:col-span-2 md:flex md:justify-center">
  <div className="relative w-full md:w-1/2">
    <select
      name="role"
      id="role"
      required
      className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-silverSage text-inputPlacehoder"
      style={{color:'#747271'}}
    >
      <option value="" disabled selected hidden>Vyberte poradce</option>
      <option value="admin">Václav Svatoš</option>
      <option value="user">Sabina Vytisková</option>
      <option value="guest">Monika Kvasničková</option>
    </select>

    <div
      className="pointer-events-none absolute inset-y-[9px] right-[9px] flex items-center justify-center rounded"
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
        style={{ display: 'block' }}
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
  <p className="text-cardGrey text-center w-full max-w-[850px] p-6 m-auto">Odesláním formuláře berete na vědomí podmínky zpracování osobních údajů uvedené v informaci o zpracování osobních údajů</p>
  </div>

    </section>


    </main>
  );
}
