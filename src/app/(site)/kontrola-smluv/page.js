"use client";

import { useState } from "react";
import PageHeader from "../../components/PageHeader";

export default function KontrolaSmluvPage() {
  const [step, setStep] = useState(1);
  const [contracts, setContracts] = useState([1]);
  const [nextContractId, setNextContractId] = useState(2);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const addContract = () => {
    if (contracts.length < 6) {
      setContracts([...contracts, nextContractId]);
      setNextContractId(nextContractId + 1);
    }
  };

  const removeContract = (indexToRemove) => {
    if (contracts.length > 1) {
      setContracts(contracts.filter((_, index) => index !== indexToRemove));
    }
  };

  return (
    <div>
      <PageHeader title="Kontrola smluv" description={null} />

      <main className="flex min-h-screen flex-col items-center">
        <section className="bg-silkBeige w-full py-12 md:py-16">
          <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center mb-4">
            Nechte si nezávazně zkontrolovat své smlouvy!
          </h2>
          <p className="text-center text-raisinBlack mb-8">
            Chcete mít ve financích jasno a klid? <strong>Začněte tady.</strong>
          </p>

          <div className="flex flex-col w-full max-w-[1392px] mx-auto justify-center">
            <form
              action="https://formcarry.com/s/kY_1MuRL2um"
              method="POST"
              encType="multipart/form-data"
              className="mx-auto p-6 space-y-5 w-full max-w-[850px]"
              target="_self"
              noValidate
              onSubmit={(e) => {
                if (step === 1) {
                  e.preventDefault();
                  setStep(2);
                } else {
                  const form = e.target;
                  for (let id of contracts) {
                    const type = form[`contractType${id}`]?.value?.trim();
                    const file = form[`contractFile${id}`]?.files?.[0];
                    const expect =
                      form[`contractExpectation${id}`]?.value?.trim();

                    if (!type || !file || !expect) {
                      e.preventDefault();
                      alert(`Prosím vyplňte všechna pole u smlouvy č. ${id}.`);
                      return;
                    }
                  }
                }
              }}
            >
              {/* Hidden inputy pro odeslání z kroku 1 */}
              {step === 2 && (
                <>
                  <input
                    type="hidden"
                    name="firstName"
                    value={formData.firstName}
                  />
                  <input
                    type="hidden"
                    name="lastName"
                    value={formData.lastName}
                  />
                  <input type="hidden" name="phone" value={formData.phone} />
                  <input type="hidden" name="email" value={formData.email} />
                </>
              )}

              {/* Krok 1 */}
              {step === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Jméno"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Příjmení"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Telefon"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
                    />
                  </div>

                  <div className="w-full flex justify-center">
                    <button
                      type="submit"
                      className="w-full md:w-auto md:mt-[24px] bg-goldenBrown text-white py-2 px-6 rounded font-satoshi-bold"
                    >
                      Další krok
                    </button>
                  </div>
                </>
              )}

              {/* Krok 2 */}
              {step === 2 && (
                <>
                  {contracts.map((id, index) => (
                    <div
                      key={id}
                      className="mb-6 border p-4 rounded bg-white shadow-sm relative"
                    >
                      <h3 className="mb-2 font-semibold">
                        Smlouva {index + 1}
                      </h3>

                      <input
                        type="text"
                        name={`contractType${id}`}
                        placeholder="Typ smlouvy"
                        required
                        className="w-full mb-2 bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage"
                      />

                      <input
                        type="file"
                        name={`contractFile${id}`}
                        accept=".pdf,.doc,.docx"
                        required
                        className="w-full mb-2"
                      />

                      <textarea
                        name={`contractExpectation${id}`}
                        placeholder="Co od této smlouvy čekáte?"
                        required
                        className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage"
                        rows={3}
                      />

                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeContract(index)}
                          className="absolute top-2 right-2 text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Odebrat
                        </button>
                      )}
                    </div>
                  ))}

                  <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={addContract}
                      disabled={contracts.length >= 6}
                      className={`bg-silverSage text-white py-2 px-4 rounded font-satoshi-bold ${
                        contracts.length >= 6
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      Přidat smlouvu
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="bg-gray-400 text-white py-2 px-4 rounded font-satoshi-bold"
                    >
                      Předchozí krok
                    </button>
                  </div>

                  <div className="w-full flex justify-center">
                    <button
                      type="submit"
                      className="w-full md:w-auto bg-goldenBrown text-white py-2 px-6 rounded font-satoshi-bold"
                    >
                      Odeslat
                    </button>
                  </div>
                </>
              )}
            </form>

            <p className="text-cardGrey text-center w-full max-w-[850px] p-6 m-auto">
              Odesláním formuláře berete na vědomí podmínky zpracování osobních
              údajů uvedené v informaci o zpracování osobních údajů.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
