'use client';

import React, { useEffect, useState } from 'react';

export default function ContactForm() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/team');
        if (!res.ok) throw new Error('Chyba při načítání týmu');
        const data = await res.json();
        setTeamMembers(data);
      } catch (error) {
        console.error(error);
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTeam();
  }, []);

  return (
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

      <div>
        <select
          name="teamMember"
          id="teamMember"
          required
          className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage"
          defaultValue=""
        >
          <option value="" disabled>
            Vyberte člena týmu
          </option>
          {loading ? (
            <option disabled>Načítám...</option>
          ) : (
            teamMembers.map((member) => (
              <option key={member.id} value={member.id}>
                {member.title.rendered}
              </option>
            ))
          )}
        </select>
      </div>

      <div>
        <textarea
          name="message"
          id="message"
          placeholder="Zpráva"
          required
          className="w-full h-40 bg-inputLight rounded p-2 resize-none focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
        ></textarea>
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
  );
}
