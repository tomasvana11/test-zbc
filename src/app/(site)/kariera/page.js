import Link from 'next/link';

export default async function KarieraPage() {
  const karieraRes = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/kariera');
  const kariera = await karieraRes.json();
  const recenzeRes = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/recenze?per_page=3&_embed');
  const poziceRes = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/pracovni-pozice');

  const { career_intro_title = '', career_intro_detail = '', career_intro_img = '' } = kariera.acf || {};

  const recenze = await recenzeRes.json();
  const pozice = await poziceRes.json();

  return (
    <main className="relative z-100">

      <section className="px-4 w-full -mt-8 md:-mt-20 z-[50]">
        <div className="flex flex-col lg:flex-row items-end w-full max-w-[1392px] mx-auto bg-white xl:bg-transparent">
          <div className="flex w-full lg:w-1/2 mr-0 xl:mr-6 justify-center items-center bg-white xl:bg-transparent">
            <img src={career_intro_img} alt={career_intro_img.alt} className="w-full h-auto object-contain" />
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-12 lg:mb-12">
            <h2 className="text-[28px] lg:text-[40px] mb-4 text-goldenBrown">{career_intro_title}</h2>
            <div className="text-raisinBlack" dangerouslySetInnerHTML={{ __html: career_intro_detail }} />
          </div>
        </div>
      </section>

      {/* Sekce: Recenze */}
      <section className="px-4 w-full py-12 md:py-24 bg-silverSage recenze">
        <div className="w-full max-w-[1392px] mx-auto text-center">
          <h2 className="text-[28px] md:text-[40px] pb-8 md:pb-10 text-white text-center">
            Chceš i ty mít reputaci jako my?
          </h2>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recenze.map((item) => (
              <div
                key={item.id}
                className="relative bg-gradient-to-b pt-10 pl-10 ml-2 md:ml-6 mb-2 md:mb-0 rounded-lg flex flex-row gap-5 items-start overflow-visible"
              >
                <img
                  src="/images/symbol-golden-s.svg"
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

          <a
            href="https://zabohatsicesko.cz/reference"
            className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center"
          >
            Přečíst více referencí
          </a>
        </div>
      </section>

      {/* Sekce: Pracovní pozice */}
      <section className="bg-silkBeige w-full py-12 md:py-16">
        <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center mb-4">
          Přidej se k nám!
        </h2>
        <p className="text-center text-raisinBlack mb-8">
          Chcete mít ve financích jasno a klid? <strong>Začněte tady.</strong>
        </p>

        <div className="flex flex-col w-full max-w-[1392px] mx-auto justify-center">

          {/* Výpis pozic */}
          <ul className="list-disc list-inside text-raisinBlack text-lg space-y-4 max-w-[700px] mx-auto mb-12">
            {pozice.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/kariera/${item.slug}`}
                  className="text-goldenBrown hover:underline"
                >
                  {item.title?.rendered || 'Bez názvu'}
                </Link>
                {item.acf?.lokalita && ` — ${item.acf.lokalita}`}
              </li>
            ))}
          </ul>

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
              <input
                type="text"
                name="firstName"
                placeholder="Jméno"
                required
                className="w-full bg-inputLight rounded p-2 placeholder-inputPlacehoder"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Příjmení"
                required
                className="w-full bg-inputLight rounded p-2 placeholder-inputPlacehoder"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefon"
                required
                className="w-full bg-inputLight rounded p-2 placeholder-inputPlacehoder"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full bg-inputLight rounded p-2 placeholder-inputPlacehoder"
              />

              <div className="md:col-span-2 md:flex md:justify-center">
                <div className="relative w-full md:w-1/2">
                  <select
                    name="role"
                    required
                    className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 text-inputPlacehoder"
                    style={{ color: '#747271' }}
                  >
                    <option value="" disabled selected hidden>
                      Jaká role tě láká nejvíce?
                    </option>
                    <option value="admin">Asistent/ka ředitele</option>
                    <option value="user">Hypoteční specialista</option>
                    <option value="guest">Finanční koncipient</option>
                    <option value="guest">Obchodník</option>
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
  );
}
