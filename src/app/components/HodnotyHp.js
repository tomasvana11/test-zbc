'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function HodnotySection({
    hp_hodnoty_title,
    hodnota_1,
    hodnota_1_desc,
    hodnota_2,
    hodnota_2_desc,
    hodnota_3,
    hodnota_3_desc,
    hodnota_4,
    hodnota_4_desc,
    hodnota_5,
    hodnota_5_desc,
}) {
  // hodnoty je pole objektů: [{title, desc, symbol, color}, ...]

  // Detect screen width to enable only on desktop
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    function checkWidth() {
      setIsDesktop(window.innerWidth >= 1024); // md breakpoint
    }
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <section className="bg-raisinBlack w-full px-4 py-12 md:py-16">
      <div className="max-w-[1392px] mx-auto flex flex-col items-center">
        <h2 className="text-[28px] md:text-[40px] pb-8 md:pb-10 text-white text-center">{hp_hodnoty_title}</h2>

        {/* Wrapper pro scroll snap */}
        <div
          className={`
            w-full
            grid
            ${isDesktop ? 'grid-cols-5 overflow-x-scroll scroll-snap-x scroll-snap-mandatory' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'}
            gap-4
            scrollbar-hide
          `}
          style={isDesktop ? {
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            overflowY: 'hidden',
          } : {}}
        >
          {hodnoty.map(({ title, desc, symbol, color }, index) => (
            <AnimatedCard
              key={index}
              title={title}
              desc={desc}
              symbol={symbol}
              color={color}
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AnimatedCard({ title, desc, symbol, color, isDesktop }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.6, // karta musí být ze 60% viditelná, aby se animace spustila
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, scale: 1 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      className="bg-cardGrey p-5 rounded-lg flex flex-col gap-3 min-w-[18rem] scroll-snap-align-start"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={controls}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ borderColor: color }}
    >
      <img src={symbol} alt={`Symbol ${title}`} className="w-[32px] h-[32px]" />
      <h4 className={`card-heading mt-2`} style={{ color }}>{title}</h4>
      <p className="text-silkBeige">{desc}</p>
    </motion.div>
  );
}
