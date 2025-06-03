'use client';

import React, { useEffect, useState } from 'react';

export default function ContactForm() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/tym');
        if (!res.ok) throw new Error('Failed to fetch team members');
        const data = await res.json();
        setTeamMembers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  return (
    <section className="bg-silkBeige w-full py-12 md:py-16">
      <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center">Kontaktujte nás</h2>
      <p className="text-center text-raisinBlack">
        Chcete mít ve financích jasno a klid? <strong>Začněte tady.</strong>
      </p>

      <div className="flex flex-col w-full max-w-[1392px] mx-auto py-12 md:py-16 justify-center">
        <form
          action="https://formcarry.com/s/kY_1MuRL2um"
          method="POST"
          encType="multipart/form-data"
          className="mx-auto p-6 space-y-5 w-full max-w-[850px]"
          target="_self"
          noValidate
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Jméno"
                required
                className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Příjmení"
                required
                className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Telefon"
                required
                className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
              />
            </div>
          </div>

          {/* Select field s načtenými jmény */}
          <div>
            <label htmlFor="teamMember" className="block mb-2 text-raisinBlack font-medium">
              Vyberte člena týmu
            </label>
            {loading ? (
              <p>Načítám členy týmu...</p>
            ) : error ? (
              <p className="text-red-500">Chyba: {error}</p>
            ) : (
              <select
                name="advisor"
                id="advisor"
                required
                defaultValue=""
                className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
                >
                <option value="" disabled>
                    Vyberte poradce
                </option>
                    {teamMembers.map((member) => (
                <option key={member.id} value={member.slug}>
                {member.title.rendered}
                </option>
  ))}
</select>
            )}
          </div>

          <div>
            <textarea
              name="message"
              id="message"
              placeholder="Zpráva"
              required
              className="w-full h-40 bg-inputLight rounded p-2 resize-none focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-goldenBrown text-white py-2 px-4 rounded"
            >
              Odeslat
            </button>
          </div>
        </form>

        <p className="text-cardGrey w-full max-w-[850px] p-6 m-auto text-center text-sm">
          Odesláním formuláře berete na vědomí podmínky zpracování osobních údajů uvedené v informaci o zpracování osobních údajů
        </p>
      </div>
    </section>
  );
}
