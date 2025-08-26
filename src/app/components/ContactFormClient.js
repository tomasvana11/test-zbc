"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [members, setMembers] = useState([]);
  const [selectedAdvisor, setSelectedAdvisor] = useState("");

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch(
          "https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed"
        );
        const data = await res.json();
        const cleaned = data.map((item) => ({
          id: item.id,
          slug: item.slug,
          name: item.title.rendered,
        }));
        setMembers(cleaned);
      } catch (err) {
        console.error("Chyba při načítání týmu:", err);
      }
    }

    fetchMembers();
  }, []);

  return (
    <section className="bg-silkBeige w-full py-12 md:py-16">
      <motion.h2
        className="text-[28px] md:text-[40px] text-goldenBrown text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Kontaktujte nás
      </motion.h2>

      <motion.p
        className="text-center text-raisinBlack mb-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      >
        Chcete mít ve financích jasno a klid? <strong>Začněte tady.</strong>
      </motion.p>

      <motion.div
        className="flex flex-col w-full max-w-[1392px] mx-auto py-4 md:py-8 justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
      >
        <form
          action="https://formcarry.com/s/kY_1MuRL2um"
          method="POST"
          encType="multipart/form-data"
          className="mx-auto p-6 space-y-5 w-full max-w-[850px]"
          target="_self"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select name="typ" id="typ" required className="hidden">
                <option value="klient" defaultValue></option>
              </select>

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

            <div className="md:col-span-2 md:flex md:justify-center">
              <div className="relative w-full md:w-1/2">
                <select
                  name="role"
                  id="role"
                  required
                  value={selectedAdvisor}
                  onChange={(e) => setSelectedAdvisor(e.target.value)}
                  className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-silverSage text-inputPlacehoder"
                  style={{ color: "#747271" }}
                >
                  <option value="" disabled hidden>
                    Vyberte poradce
                  </option>
                  <option value="Nevim">Důvěřuju vašemu výběru</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.slug}>
                      {member.name.replace(/(<([^>]+)>)/gi, "")}
                    </option>
                  ))}
                </select>

                <div
                  className="pointer-events-none absolute inset-y-[9px] right-[9px] flex items-center justify-center rounded"
                  style={{
                    width: "28px",
                    height: "22px",
                    backgroundColor: "#9D6219",
                  }}
                >
                  <img
                    src="/images/chevron-down.svg"
                    alt="šipka"
                    className="w-4 h-4"
                    style={{ display: "block" }}
                  />
                </div>
              </div>
            </div>

            {selectedAdvisor === "vaclav-svatos" && (
              <div className="md:col-span-2">
                <textarea
                  name="motivacniDopis"
                  placeholder="Motivační dopis - proč bych se o vás měl starat právě já?"
                  className="w-full bg-inputLight rounded p-2 resize-none focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
                  rows={4}
                />
              </div>
            )}
          </div>

          <div className="w-full">
            <div>
              <input
                type="bydliste"
                name="bydliste"
                id="bydliste"
                placeholder="Zadejte místo, kde aktuálně žijete"
                required
                className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
              />
            </div>
          </div>

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-full md:w-auto md:mt-[24px] bg-goldenBrown text-white py-2 px-6 rounded font-satoshi-bold transition-colors duration-300 hover:bg-goldenBrownHover"
            >
              Kontaktujte mě
            </button>
          </div>
        </form>

        <p className="text-cardGrey text-center w-full max-w-[850px] p-6 m-auto">
          Odesláním formuláře berete na vědomí podmínky zpracování osobních
          údajů uvedené v informaci o zpracování osobních údajů
        </p>
      </motion.div>
    </section>
  );
}
