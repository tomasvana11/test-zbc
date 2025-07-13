'use client';

import { motion } from 'framer-motion';

export default function HeroSection({ brand_claim }) {
  return (
    <section
      className="relative w-full min-h-[600px] md:min-h-[800px] bg-[url('/images/heroimage.webp')] bg-left bg-cover bg-no-repeat overflow-hidden"
      aria-label="Úvodní sekce"
    >
      {/* Horní gradient */}
      <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-black/80 to-black/0 z-0" />
      {/* Dolní gradient */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-black/80 to-black/0 z-0" />

      <div className="absolute bottom-10 sm:top-12 md:top-10 left-4 md:left-12 z-10 overflow-visible">
        <img
          src="/images/symbol-outline.svg"
          alt=""
          className="w-[125vw] max-w-none sm:w-[90vw] md:w-[650px]"
          aria-hidden="true"
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-between z-20">
        <div className="relative z-10 w-full max-w-[1392px] mx-auto px-8 py-8" />

        <div className="relative z-10 flex px-4 flex-col md:flex-row w-full max-w-[1392px] mx-auto py-12 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-[1000px]"
          >
            <h1 className="text-[44px] md:text-[70px] hero-h text-silkBeige md:leading-snug">
              {brand_claim}
            </h1>
            <a
              href="https://www.zabohatsicesko.cz/sluzby"
              className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center transition-colors duration-300 hover:bg-goldenBrownHover"
            >
              Chci zjistit víc
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
