'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function HodnotyNumbers({
  hp_numbers_title,
  hp_number_1,
  hp_number_desc_1,
  hp_number_2,
  hp_number_desc_2,
  hp_number_3,
  hp_number_desc_3,
  hp_number_4,
  hp_number_desc_4,
  hp_number_5,
  hp_number_desc_5,
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section
      ref={ref}
      className="relative bg-raisinBlack w-full px-4 py-12 md:py-16 overflow-hidden"
    >
      <img
        src="/images/symbol-pattern-l.svg"
        alt="Symbol Pattern"
        className="hidden lg:block absolute -left-[64px] -bottom-[64px] w-[420px] h-[420px]"
      />
      <img
        src="/images/symbol-pattern-s.svg"
        alt="Symbol Pattern"
        className="lg:hidden absolute -right-[32px] -bottom-[32px] w-[205px] h-[205px] md:w-[280px] md:h-[280px]"
      />

      <div className="flex flex-col lg:flex-row w-full items-center max-w-[1392px] mx-auto">
        <div className="w-full flex flex-col lg:flex-row">
          <h2 className="text-[28px] md:pt-16 md:text-[40px] pb-8 md:pb-10 lg:w-1/3 text-center lg:text-left text-goldenBrown">
            {hp_numbers_title}
          </h2>

          <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-px bg-darkDivGrey">
            <NumberCard number={hp_number_1} description={hp_number_desc_1} animate={inView} />
            <NumberCard number={hp_number_2} description={hp_number_desc_2} animate={inView} />
            <NumberCard number={hp_number_3} description={hp_number_desc_3} animate={inView} />
            <NumberCard number={hp_number_4} description={hp_number_desc_4} animate={inView} />
            <NumberCard number={hp_number_5} description={hp_number_desc_5} animate={inView} />

            {/* Skrytý čtverec */}
            <div className="aspect-square bg-raisinBlack p-6 flex" />
          </div>
        </div>
      </div>
    </section>
  );
}

function NumberCard({ number, description, animate }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;

    let start = 0;
    const duration = 1500; // animace trvá 1.5 sekundy
    const stepTime = 30; // aktualizace každých 30ms
    const increment = number / (duration / stepTime);

    const interval = setInterval(() => {
      start += increment;
      if (start >= number) {
        start = number;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, stepTime);

    return () => clearInterval(interval);
  }, [animate, number]);

  return (
    <div className="aspect-square bg-raisinBlack p-6 flex flex-col justify-center">
      <span className="text-silkBeige text-[36px] md:text-[70px] recife">{count}</span>
      <h4 className="card-heading-v md:text-lg text-goldenBrown mt-2">{description}</h4>
    </div>
  );
}
