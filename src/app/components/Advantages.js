'use client';

import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function HodnotyAdvantages({
  hp_adv_title,
  hp_adv_desc,
  hp_fp_card_1,
  hp_fp_card_2,
  hp_fp_card_3,
  hp_fp_card_4,
  hp_fp_card_5,
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  // Pro animaci opacity a posunu při zobrazení
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (inView) setVisible(true);
  }, [inView]);

  return (
    <section ref={ref} className="px-4 w-full py-12 md:py-24">
      <div className="flex flex-col md:flex-row w-full max-w-[1392px] mx-auto">
        <div
          className={`w-full md:w-1/2 md:pr-12 lg:pr-16 xl:pr-16 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-[28px] md:text-[40px] text-goldenBrown">{hp_adv_title}</h2>
          </div>
        </div>
        <div
          className={`w-full md:w-1/2 md:pr-4 lg:pr-8 xl:pr-12 pb-10 md:pb-0 transition-all duration-700 ease-out delay-200 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div
              className="mt-4 md:mt-6 text-raisinBlack"
              dangerouslySetInnerHTML={{ __html: hp_adv_desc }}
            />
          </div>
        </div>
      </div>

      <hr className="border-lightDivGrey w-full max-w-[1392px] mx-auto mt-10 mb-20" />

      <div
        className={`w-full max-w-[1392px] mx-auto text-center transition-opacity duration-700 ease-out delay-400 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h4 className="text-2xl md:text-3xl kfp mb-16 text-goldenBrown">
          Naše komplexní finanční plánování zahrnuje
        </h4>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[hp_fp_card_1, hp_fp_card_2, hp_fp_card_3, hp_fp_card_4, hp_fp_card_5].map(
            (cardContent, i) => (
              <FeatureCard
                key={i}
                index={i}
                content={cardContent}
                visible={visible}
              />
            )
          )}
        </div>

        <a
          href="https://www.zabohatsicesko.cz/sluzby"
          className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center transition-colors duration-300 hover:bg-goldenBrownHover"
        >
          Zjistit jak začít
        </a>
      </div>
    </section>
  );
}

function FeatureCard({ index, content, visible }) {
  // Malý delay podle indexu pro postupné vykreslení
  const delay = 300 + index * 150;

  return (
    <div
      style={{ transitionDelay: `${delay}ms` }}
      className={`bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center transform transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <img
        src={`/images/icon-${getIconName(index)}.svg`}
        alt="Symbol"
        className="w-[68px] h-[68px]"
      />
      <div
        className="mt-2 text-center card-text-fp text-goldenBrown"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}

function getIconName(index) {
  switch (index) {
    case 0:
      return 'mag-glass';
    case 1:
      return 'graph';
    case 2:
      return 'trust';
    case 3:
      return 'mountain';
    case 4:
      return 'certificate';
    default:
      return 'default-icon';
  }
}
