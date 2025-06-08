'use client';
import { useEffect, useState } from 'react';
import { Hourglass } from 'ldrs/react';
import 'ldrs/react/Hourglass.css';

export default function KarieraPozicePage({ params }) {
  const { slug } = params;

  const [post, setPost] = useState(null);
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
    <main className="flex min-h-screen flex-col items-center px-4 py-12">
      <section className="w-full max-w-[1000px] mx-auto space-y-10">
        
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

      <section className="w-full max-w-[1392px] mx-auto mt-16">
        <hr className="w-full border-1 h-[1px] lightDivGrey" />
      </section>
    </main>
  );
}
