'use client';

import { motion } from 'framer-motion';

export default function IntroSection({ hp_intro_title, hp_intro_detail }) {
  return (
    <section className="px-4 w-full bg-silkBeige">
      <div className="flex flex-col md:flex-row items-center w-full max-w-[1392px] mx-auto py-12 md:py-24">
        
        {/* Obrázek – desktop */}
        <motion.div
          className="hidden md:flex w-full md:w-1/2 pr-6 justify-center items-center"
          initial={{ opacity: 0, x: -50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <img
            src="/images/intro-img.png"
            alt="Intro"
            className="max-w-[90%] h-auto object-contain"
          />
        </motion.div>

        {/* Textový obsah */}
        <motion.div
          className="w-full md:w-1/2 md:pl-12"
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          <h2 className="text-[28px] md:text-[40px] mb-4 text-goldenBrown">
            {hp_intro_title}
          </h2>
          <p className="text-raisinBlack">{hp_intro_detail}</p>
          <a
            href="https://www.zabohatsicesko.cz/kontakt"
            className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center transition-colors duration-300 hover:bg-goldenBrownHover"
          >
            Rezervovat konzultaci
          </a>

          {/* Obrázek – mobilní verze */}
          <motion.div
            className="block md:hidden mt-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          >
            <img
              src="/images/intro-img.png"
              alt="Intro"
              className="w-full h-auto object-contain -mt-[100px]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
