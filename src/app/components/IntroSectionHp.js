'use client';

import { motion } from 'framer-motion';

export default function IntroSection({ hp_intro_title, hp_intro_detail }) {
  return (
    <section className="px-4 w-full bg-silkBeige">
      <motion.div
        className="flex flex-col md:flex-row items-center w-full max-w-[1392px] mx-auto py-12 md:py-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Obrázek – desktop */}
        <div className="hidden md:flex w-full md:w-1/2 pr-6 justify-center items-center">
          <img
            src="/images/intro-img.png"
            alt="Intro"
            loading="lazy"
            className="max-w-[90%] h-auto object-contain"
          />
        </div>

        {/* Textový obsah */}
        <div className="w-full md:w-1/2 md:pl-12 relative">
          <h2 className="text-[28px] md:text-[40px] mb-4 text-goldenBrown">
            {hp_intro_title}
          </h2>
          <p className="text-raisinBlack">{hp_intro_detail}</p>
          <a
            href="https://www.zabohatsicesko.cz/kontakt"
            className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center transition-colors duration-300 hover:bg-goldenBrownHover relative z-10"
          >
            Rezervovat konzultaci
          </a>

          {/* Obrázek – mobilní verze */}
          <div className="block md:hidden mt-8 relative z-0">
            <img
              src="/images/intro-img.png"
              alt="Intro"
              loading="lazy"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
