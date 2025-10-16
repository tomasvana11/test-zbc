'use client';

import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function HodnotyAdvantages({
  hp_adv_title,
  hp_adv_desc,
  hp_fp_card_1,
  hp_fp_card_2,
  hp_fp_card_3,
  hp_fp_card_4,
  hp_fp_card_5,
}) {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: cardsRef, inView: cardsInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const cards = [
    { icon: '/images/icon-mag-glass.svg', content: hp_fp_card_1 },
    { icon: '/images/icon-graph.svg', content: hp_fp_card_2 },
    { icon: '/images/icon-trust.svg', content: hp_fp_card_3 },
    { icon: '/images/icon-mountain.svg', content: hp_fp_card_4 },
    { icon: '/images/icon-certificate.svg', content: hp_fp_card_5 },
  ];

  return (
    <section className="px-4 w-full pb-12 md:pb-24">
            <hr className="border-lightDivGrey w-full max-w-[1392px] mx-auto mb-12 md:mb-24" />

      <div className="flex flex-col md:flex-row w-full max-w-[1392px] mx-auto" ref={headerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 md:pr-12 lg:pr-16 xl:pr-16"
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-[28px] md:text-[40px] text-goldenBrown">{hp_adv_title}</h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-1/2 md:pr-4 lg:pr-8 xl:pr-12 pb-10 md:pb-0"
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div
              className="mt-4 md:mt-6 text-raisinBlack"
              dangerouslySetInnerHTML={{ __html: hp_adv_desc }}
            />
          </div>
        </motion.div>
      </div>

      <hr className="border-lightDivGrey w-full max-w-[1392px] mx-auto mt-10 mb-20" />

      <div className="w-full max-w-[1392px] mx-auto text-center">
        <h4 className="text-2xl md:text-3xl kfp mb-16 text-goldenBrown">
          Naše komplexní finanční plánování zahrnuje
        </h4>

        <div
          ref={cardsRef}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
        >
          {cards.map((card, i) => (
            <FeatureCard
              key={i}
              index={i}
              icon={card.icon}
              content={card.content}
              visible={cardsInView}
            />
          ))}
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

function FeatureCard({ icon, content, visible, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className="bg-cardBeige p-5 rounded-lg flex flex-col gap-5 items-center"
    >
      <img src={icon} alt="Symbol" className="w-[68px] h-[68px]" />
      <div
        className="mt-2 text-center card-text-fp text-goldenBrown"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </motion.div>
  );
}
