export default async function karieraPage() {
  let pozice = [];
  let recenze = [];

  try {
    const [recenzeRes, poziceRes] = await Promise.all([
      fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/recenze?per_page=3&_embed'),
      fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/pracovni-pozice', {
        cache: 'no-store',
      }),
    ]);

    if (!recenzeRes.ok || !poziceRes.ok) {
      throw new Error('Chyba při načítání dat');
    }

    recenze = await recenzeRes.json();
    pozice = await poziceRes.json();
  } catch (err) {
    console.error('Chyba:', err);
  }

  return (
    <main className="relative z-100">
      {/* Recenze sekce */}
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
                  src={
                    item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                    '/placeholder.jpg'
                  }
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

      {/* Pracovní pozice sekce */}
      <section className="bg-silkBeige w-full py-12 md:py-16">
        <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center">
          Přidej se k nám!
        </h2>
        <p className="text-center text-raisinBlack mb-6">
          Aktuálně hledáme kolegy na tyto pozice:
        </p>

        <div className="max-w-[800px] mx-auto mb-12">
          {pozice.length === 0 ? (
            <p className="text-center text-gray-500">
              Momentálně nemáme žádné otevřené pozice.
            </p>
          ) : (
            <ul className="list-disc list-inside text-raisinBlack text-lg space-y-2">
              {pozice.map((item) => (
                <li key={item.id}>
                  {item.title?.rendered || 'Bez názvu'}
                  {item.acf?.lokalita && ` — ${item.acf.lokalita}`}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sem patří tvůj formulář – nezměněný */}
        {/* ... */}
      </section>
    </main>
  );
}
