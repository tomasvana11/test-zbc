/*'use client';

import { useState } from 'react';

export default async function RefPage() {
  const [selectedAdvisor, setSelectedAdvisor] = useState('');

// WP REST API
async function fetchPageData() {
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=reference&_embed',
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  const page = data[0];

  const acf = page?.acf || {};
  const featuredImage =
    page?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-og.jpg';

  const rawDescription = acf.seo_description || page?.excerpt?.rendered || '';
  const description = rawDescription.replace(/(<([^>]+)>)/gi, '').trim();

  const title =
    acf.seo_title || page?.title?.rendered || 'Reference | Za bohatší Česko';

  const canonicalUrl = 'https://zabohatsicesko.cz/reference';

  return {
    title,
    description,
    featuredImage,
    canonicalUrl,
  };
}

// generate metadata
export async function generateMetadata() {
  const {
    title,
    description,
    featuredImage,
    canonicalUrl,
  } = await fetchPageData();

  return {
    title,
    description,
    metadataBase: new URL('https://zabohatsicesko.cz'),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: 'index, follow',
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Za bohatší Česko',
      locale: 'cs_CZ',
      url: canonicalUrl,
      images: [featuredImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [featuredImage],
      site: '@zabohatsicesko',
    },
  };
}

const res = await fetch(
  'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed',
  { next: { revalidate: 60 } }
);
if (!res.ok) throw new Error('Failed to fetch team members');
const data = await res.json();

let members = data.map((item) => {
  const photo = item.acf?.team_member_photo?.url || '/placeholder.png';
  return {
    id: item.id,
    slug: item.slug,
    photo,
    name: item.title.rendered,
    role: item.acf?.role || '',
  };
});

export default async function RefPage() {
  const recenzeRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/recenze?per_page=100&_embed'
  );
  const recenze = await recenzeRes.json();

  return (
    <main className="relative z-100">
      <section className="px-4 w-full -mt-12 md:-mt-16 pb-12 md:pb-24 z-[100] relative">
        <div className="w-full max-w-[1392px] mx-auto text-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 md:gap-y-8">
            {recenze.map((item) => {
              const imageUrl =
                item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                '/placeholder.jpg';

              return (
                <div
                  key={item.id}
                  className="relative pt-10 pl-10 ml-4 md:ml-6 mb-2 md:mb-0 rounded-lg flex flex-row gap-5 items-start overflow-visible bg-gradient-to-b from-[#E2DBD5] to-[#D6D6D3]"
                >
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
          <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center">Kontaktujte nás</h2>
          <p className="text-center text-raisinBlack">
            Chcete mít ve financích jasno a klid? <strong>Začněte tady.</strong>
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
                  <select name="typ" id="typ" required className="hidden">
                    <option value="klient" selected></option>
                  </select>
                  <select
  name="role"
  id="role"
  required
  value={selectedAdvisor}
  onChange={(e) => setSelectedAdvisor(e.target.value)}
  className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-silverSage text-inputPlacehoder"
  style={{ color: '#747271' }}
>
  <option value="" disabled hidden>
    Vyberte poradce
  </option>
  <option value="Nevim">Důvěřuju vašemu výběru</option>
  {members.map((member) => (
    <option key={member.id} value={member.slug}>
      {member.name.replace(/(<([^>]+)>)/gi, '')}
    </option>
  ))}
</select>
{selectedAdvisor === 'vaclav-svatos' && (
  <div className="mt-4 md:col-span-2">
    <textarea
      name="messageForVaclav"
      id="messageForVaclav"
      placeholder="Zpráva pro Václava"
      className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder resize-none"
      rows={5}
    />
  </div>
)}

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
                      style={{ color: '#747271' }}
                    >
                      <option value="" disabled selected hidden>
                        Vyberte poradce
                      </option>
                      <option value="Nevim"> Důvěřuju vašemu výběru</option> 
                      {members.map((member) => (
                        <option key={member.id} value={member.slug}>
                          {member.name.replace(/(<([^>]+)>)/gi, '')}
                        </option>
                      ))}
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
            <p className="text-cardGrey text-center w-full max-w-[850px] p-6 m-auto">
              Odesláním formuláře berete na vědomí podmínky zpracování osobních údajů uvedené v informaci o zpracování osobních údajů
            </p>
          </div>
        </section>
    </main>
  );
}
*/

'use client';

import { useState, useEffect } from 'react';

export default function RefPage() {
  const [recenze, setRecenze] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const recenzeRes = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/recenze?per_page=100&_embed');
        const recenzeData = await recenzeRes.json();
        setRecenze(recenzeData);

        const membersRes = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed');
        const membersData = await membersRes.json();

        const mappedMembers = membersData.map((item) => ({
          id: item.id,
          slug: item.slug,
          name: item.title.rendered,
        }));
        setMembers(mappedMembers);
      } catch (err) {
        console.error('Chyba při načítání dat:', err);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="relative z-100">
      {/* Recenze sekce */}
      <section className="px-4 w-full -mt-12 md:-mt-16 pb-12 md:pb-24 z-[100] relative">
        <div className="w-full max-w-[1392px] mx-auto text-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 md:gap-y-8">
            {recenze.map((item) => {
              const imageUrl =
                item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg';

              return (
                <div
                  key={item.id}
                  className="relative pt-10 pl-10 ml-4 md:ml-6 mb-2 md:mb-0 rounded-lg flex flex-row gap-5 items-start overflow-visible bg-gradient-to-b from-[#E2DBD5] to-[#D6D6D3]"
                >
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
                    alt={item.title?.rendered || 'Recenze'}
                    className="w-[200px] mt-[-80px] h-auto object-contain align-middle"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formulář */}
      <section className="bg-silkBeige w-full py-12 md:py-16">
        <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center">Kontaktujte nás</h2>
        <p className="text-center text-raisinBlack">
          Chcete mít ve financích jasno a klid? <strong>Začněte tady.</strong>
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

              {/* Výběr poradce */}
              <div className="md:col-span-2 md:flex md:justify-center">
                <div className="relative w-full md:w-1/2">
                  <select
                    name="role"
                    id="role"
                    required
                    value={selectedAdvisor}
                    onChange={(e) => setSelectedAdvisor(e.target.value)}
                    className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-silverSage text-inputPlacehoder"
                    style={{ color: '#747271' }}
                  >
                    <option value="" disabled hidden>
                      Vyberte poradce
                    </option>
                    <option value="Nevim">Důvěřuju vašemu výběru</option>
                    {members.map((member) => (
                      <option key={member.id} value={member.slug}>
                        {member.name.replace(/(<([^>]+)>)/gi, '')}
                      </option>
                    ))}
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

              {/* Podmíněná zpráva pro Václava */}
              {selectedAdvisor === 'vaclav-svatos' && (
                <div className="mt-4 md:col-span-2">
                  <textarea
                    name="messageForVaclav"
                    id="messageForVaclav"
                    placeholder="Zpráva pro Václava"
                    className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder resize-none"
                    rows={5}
                  />
                </div>
              )}
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
