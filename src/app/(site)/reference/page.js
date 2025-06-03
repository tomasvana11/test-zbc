export default async function RefPage() {
  const recenzeRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/recenze?per_page=3&_embed'
  );
  const recenze = await recenzeRes.json();

  return (
    <main>
      <section className="px-4 w-full py-12 md:py-24">
        <div className="w-full max-w-[1392px] mx-auto text-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recenze.map((item) => {
              const imageUrl =
                item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                '/placeholder.jpg';

              return (
                <div
                  key={item.id}
                  className="relative pt-10 pl-12 ml-2 md:ml-6 mb-2 md:mb-0 rounded-lg flex flex-row gap-5 items-start overflow-visible bg-gradient-to-b from-[#E2DBD5] to-[#D6D6D3]"
                >
                  {/* Dekorační obrázek */}
                  <img
                    src="/images/symbol-golden-s.svg"
                    alt="Dekorace"
                    className="absolute top-0 left-0 w-[46px] h-[46px] -translate-x-1/2 -translate-y-1/2 z-10"
                  />

                  <p className="text-left text-raisinBlack flex-1">
                    {item.acf?.citation || 'Bez citace'}
                  </p>

                  <img
                    src={imageUrl}
                    alt={item.title.rendered || 'Recenze'}
                    className="w-[200px] mt-[-80px] h-auto object-contain align-middle"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-silkBeige w-full py-12 md:py-16">
        <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center">
          Kontaktujte nás
        </h2>
        <p className="text-center text-raisinBlack">
          Chcete mít ve financích jasno a klid?{' '}
          <strong>Začněte tady.</strong>
        </p>

        <div className="flex flex-col w-full max-w-[1392px] mx-auto py-4 md:py-8 justify-center">
          <form
            action="https://formcarry.com/s/kY_1MuRL2um"
            method="POST"
            encType="multipart/form-data"
            className="mx-auto p-6 space-y-5 w-full max-w-[850px]"
            target="_self"
            noValidate
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
            </div>
            <div>
              <textarea
                name="message"
                id="message"
                placeholder="Zpráva"
                required
                className="w-full h-40 bg-inputLight rounded p-2 resize-none focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-goldenBrown text-white py-2 px-4 rounded"
              >
                Odeslat
              </button>
            </div>
          </form>
          <p className="text-cardGrey w-full max-w-[850px] p-6 m-auto">
            Odesláním formuláře berete na vědomí podmínky zpracování osobnich údajů
            uvedené v informaci o zpracování osobních údajů
          </p>
        </div>
      </section>
    </main>
  );
}
