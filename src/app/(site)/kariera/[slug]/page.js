'use client';
import { useEffect, useState } from 'react';
import { Hourglass } from 'ldrs/react';
import 'ldrs/react/Hourglass.css';

export default function KarieraPozicePage({ params }) {
  const { slug } = params;

  const [post, setPost] = useState(null);
  const [positions, setPositions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(slug || '');
  const [error, setError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [post]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Načtení dat pro pozici podle slug
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/pracovni-pozice?slug=${slug}&_embed`);
        if (!res.ok) throw new Error('Nepodařilo se načíst pracovní pozici');
        const data = await res.json();
        setPost(data[0]);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
  }, [slug]);

  // Načtení všech pozic do selectu
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/pracovni-pozice?per_page=100&_embed');
        if (!res.ok) throw new Error('Nepodařilo se načíst pozice');
        const data = await res.json();
        setPositions(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPositions();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedRole(e.target.value);
  };

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  if (!post || showLoader) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <Hourglass size="60" bgOpacity="0.1" speed="1.75" color="black" />
        <p className="mt-4 text-lg font-semibold text-gray-700">Načítání…</p>
      </div>
    );
  }

  // Extrahuj ACF pole (můžeš to ošetřit, když by náhodou nebyla ACF)
  const {
    career_responsibility,
    career_expectation,
    career_offer,
    career_place,
  } = post.acf || {};

  return (
    <main className="flex min-h-screen flex-col items-center py-12">
      <section className="w-full max-w-[1000px] mx-auto px-4 space-y-10">
        
        {career_responsibility && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Co bude náplní práce</h2>
            <div
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: career_responsibility }}
            />
          </div>
        )}

        {career_expectation && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Co od vás očekáváme</h2>
            <div
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: career_expectation }}
            />
          </div>
        )}

        {career_offer && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Co nabízíme</h2>
            <div
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: career_offer }}
            />
          </div>
        )}

        {career_place && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Místo výkonu práce</h2>
            <div
              className="prose max-w-full"
              dangerouslySetInnerHTML={{ __html: career_place }}
            />
          </div>
        )}
      </section>

      {/* Formulář sekce */}
      <section className="bg-silkBeige w-full px-4 py-12 md:py-16 mt-16">
        <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center mb-4">
          Přidej se k nám!
        </h2>
        <p className="text-center text-raisinBlack mb-8">
          Chcete mít ve financích jasno a klid? <strong>Začněte tady.</strong>
        </p>

        <div className="flex flex-col w-full max-w-[1392px] mx-auto justify-center">
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
                className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Příjmení"
                required
                className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefon"
                required
                className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
              />

              <div className="md:col-span-2 md:flex md:justify-center">
                <div className="relative w-full md:w-1/2">
                  <select
                    name="role"
                    required
                    className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-silverSage"
                    value={selectedRole}
                    onChange={handleSelectChange}
                    style={{ color: selectedRole ? '#000' : '#747271' }}
                  >
                    <option value="" disabled hidden>
                      Jaká role tě láká nejvíce?
                    </option>
                    {positions.map((item) => (
                      <option key={item.id} value={item.slug}>
                        {item.title.rendered}
                      </option>
                    ))}
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

      <section className="w-full max-w-[1392px] mx-auto mt-16">
        <hr className="w-full border-1 h-[1px] lightDivGrey" />
      </section>
    </main>
  );
}
