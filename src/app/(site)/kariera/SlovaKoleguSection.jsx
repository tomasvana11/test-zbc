'use client';
import { useState } from 'react';

export default function SlovaKoleguSection({ slovaKolegu }) {
  const [visibleCount, setVisibleCount] = useState(2);
  
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  const visibleItems = slovaKolegu.slice(0, visibleCount);
  const hasMore = visibleCount < slovaKolegu.length;

  return (
    <section className="px-4 w-full py-12 md:py-24 bg-silverSage recenze">
      <div className="w-full max-w-[1392px] mx-auto text-center">
        <h2 className="text-[28px] md:text-[40px] pb-8 md:pb-10 text-white text-center">
          Očima našich kolegů
        </h2>

        {/* 2 sloupce místo 3 */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="relative bg-gradient-to-b from-white/90 to-silkBeige/80 pt-10 px-8 ml-2 md:ml-6 rounded-lg flex flex-row items-stretch gap-5 overflow-visible"
            >
              {/* Dekorativní symbol – vyčnívá */}
              <img
                src="/images/symbol-golden-s.svg"
                alt="Dekorace"
                className="absolute top-0 left-0 w-[46px] h-[46px] -translate-x-1/2 -translate-y-1/2 z-10"
              />

              {/* Textová část */}
              <div className="flex flex-col justify-between text-left w-1/2 pb-10">
                <p className="text-raisinBlack mb-6">
                  {item.acf?.citation || "Bez citace"}
                </p>

                <div className="flex flex-col gap-1 mt-auto">
                  {item.acf?.member_name && (
                    <p className="text-goldenBrown font-bold">
                      {item.acf.member_name}
                    </p>
                  )}
                  {item.acf?.position && (
                    <p className="text-raisinBlack opacity-75">
                      {item.acf.position}
                    </p>
                  )}
                </div>
              </div>

              {/* Fotka – přesně dole, zarovnáno ke spodní hraně boxu */}
              <div className="relative w-1/2 flex justify-end">
                <img
                  src={
                    item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                    "/placeholder.jpg"
                  }
                  alt={item.acf?.member_name || "Kolega"}
                  className="absolute bottom-0 right-0 w-[200px] h-auto object-contain md:mt-[-50px] md:mr-4"
                />
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <button
            onClick={handleLoadMore}
            className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center"
          >
            Další
          </button>
        )}
      </div>
    </section>
  );
}
