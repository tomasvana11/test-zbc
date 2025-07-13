'use client';

import CountUp from 'react-countup';

export default function HpNumbersSection({
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
  const cards = [
    { number: hp_number_1, desc: hp_number_desc_1 },
    { number: hp_number_2, desc: hp_number_desc_2 },
    { number: hp_number_3, desc: hp_number_desc_3 },
    { number: hp_number_4, desc: hp_number_desc_4 },
    { number: hp_number_5, desc: hp_number_desc_5 },
  ];

  return (
    <section className="relative bg-raisinBlack w-full px-4 py-12 md:py-16 overflow-hidden">
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
            {cards.map(({ number, desc }, i) => (
              <div key={i} className="aspect-square bg-raisinBlack p-6 flex flex-col justify-center">
                <span className="text-silkBeige text-[36px] md:text-[70px] recife">
                  <CountUp start={0} end={Number(number)} duration={2} separator=" " />
                </span>
                <h4 className="card-heading-v md:text-lg text-goldenBrown mt-2">{desc}</h4>
              </div>
            ))}

            {/* Skrytý tmavý čtverec */}
            <div className="aspect-square bg-raisinBlack p-6 flex" />
          </div>
        </div>
      </div>
    </section>
  );
}
