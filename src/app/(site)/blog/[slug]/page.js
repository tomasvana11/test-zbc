'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Hourglass } from 'ldrs/react';
import 'ldrs/react/Hourglass.css';


export default function BlogPostPage({ params }) {
  const { slug } = params;

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestError, setLatestError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
  setShowLoader(true);
  const timer = setTimeout(() => {
    setShowLoader(false);
  }, 500); // min 500 ms

  return () => clearTimeout(timer);
}, [post]);



  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/blog?slug=${slug}&_embed`);
        if (!res.ok) throw new Error('Failed to fetch blog post');
        const data = await res.json();
        setPost(data[0]);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/blog?per_page=4&_embed');
        if (!res.ok) throw new Error('Nepodařilo se načíst nejnovější články');
        const data = await res.json();

        const mapped = data.map((post) => ({
          id: post.id,
          slug: post.slug,
          title: post.title.rendered,
          image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.png',
          excerpt: post.excerpt.rendered,
          date: new Date(post.date).toLocaleDateString('cs-CZ'),
        }));

        setLatestPosts(mapped);
      } catch (err) {
        setLatestError(err.message);
      }
    };

    fetchLatestPosts();
  }, []);

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





  const articleContent = post.acf?.article_content || '<p>Obsah není k dispozici.</p>';

  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="px-4 w-full">
        <div className="flex flex-col md:flex-row items-center w-full max-w-[1000px] mx-auto py-12 md:py-24">
          <article
            className="prose max-w-full article"
            dangerouslySetInnerHTML={{ __html: articleContent }}
          />
        </div>
      </section>
      <section className="px-4 w-full">
        <div className="max-w-[1392px] mx-auto">
          <hr className="w-full border-1 h-[1px] lightDivGrey" />
        </div>
    </section>

      {/* Nejnovější články */}
      {latestPosts.length > 0 && (
        <section className="flex flex-col items-center px-4 mx-auto py-12 md:py-24">
          <div className="max-w-[1392px] w-full">
            <h2 className="text-[28px] md:text-[40px] mb-6 md:mb-12 text-center text-goldenBrown">Nejnovější články z našeho blogu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="flex flex-col bg-silkBeige/30 rounded-lg hover:shadow-lg transition overflow-hidden group"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-52 object-cover rounded-lg"
                  />
                  <div className="px-5 md:px-6 pt-5 md:pt-8 flex flex-col flex-grow justify-between">
                    <div>
                      <h3
                        className="text-lg text-goldenBrown text-[22px] md:text-[22px] font-satoshi-bold mb-4 md:mb-5 group-hover:underline"
                        dangerouslySetInnerHTML={{ __html: post.title }}
                      />
                      <div
                        className="text-raisinBlack"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                      />
                    </div>
                    <div className="flex flex-col gap-5 pt-5 pb-5 md:gap-5 md:pt-5 md:pb-6">
                      <hr className="border-t border-raisinBlack/10" />
                      <div className="mt-auto flex justify-between items-center text-goldenBrown">
                        <span className="group-hover:underline">Otevřít článek</span>
                        <span className="text-raisinBlack/20">{post.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {latestError && (
        <p className="text-red-600 text-center mt-4">{latestError}</p>
      )}

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
              <input
                type="text"
                name="firstName"
                placeholder="Jméno"
                required
                className="w-full bg-inputLight rounded p-2"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Příjmení"
                required
                className="w-full bg-inputLight rounded p-2"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Telefon"
                required
                className="w-full bg-inputLight rounded p-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full bg-inputLight rounded p-2"
              />
              <div className="md:col-span-2 md:flex md:justify-center">
                <div className="relative w-full md:w-1/2">
                  <select
                    name="role"
                    required
                    className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12"
                    style={{ color: '#747271' }}
                  >
                    <option value="" disabled selected hidden>
                      Vyberte poradce
                    </option>
                    <option value="vaclav_svatos">Václav Svatoš</option>
                    <option value="sabina_vytiskova">Sabina Vytisková</option>
                    <option value="monika_kvasnickova">Monika Kvasničková</option>
                  </select>
                  <div
                    className="pointer-events-none absolute inset-y-[9px] right-[9px] flex items-center justify-center rounded"
                    style={{ width: '28px', height: '22px', backgroundColor: '#9D6219' }}
                  >
                    <img src="/images/chevron-down.svg" alt="šipka" className="w-4 h-4" />
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
            Odesláním formuláře berete na vědomí podmínky zpracování osobních údajů uvedené v informaci o
            zpracování osobních údajů
          </p>
        </div>
      </section>

    </main>
  );
}
