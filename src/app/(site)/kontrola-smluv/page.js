import { useState } from 'react';
import PageHeader from '../../components/PageHeader';

export default function KontrolaSmluvPage() {
  // krok formuláře: 1 = základní údaje, 2 = smlouvy
  const [step, setStep] = useState(1);
  
  // pole smluv, každá smlouva = { type, file, expectation }
  const [contracts, setContracts] = useState([
    { type: '', file: null, expectation: '' },
  ]);

  // handler změny smlouvy
  const handleContractChange = (index, field, value) => {
    const updated = [...contracts];
    updated[index][field] = value;
    setContracts(updated);
  };

  // přidání smlouvy
  const addContract = () => {
    if (contracts.length < 6) {
      setContracts([...contracts, { type: '', file: null, expectation: '' }]);
    }
  };

  // odebrání smlouvy (pokud chceš možnost, zatím není požadováno)

  // odeslání - nechám standardní submit, akorát se form postne až ve druhém kroku

  return (
    <div>
      <PageHeader
        title="Kontrola smluv"
        description={null}
      />

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
              onSubmit={e => {
                // pokud jsme v kroku 1, neodesílat formulář
                if (step === 1) {
                  e.preventDefault();
                  setStep(2);
                }
                // pokud ve 2. kroku, odešle se normálně
              }}
            >
              {step === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Jméno"
                      required
                      className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Příjmení"
                      required
                      className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Telefon"
                      required
                      className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage placeholder-inputPlacehoder"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      required
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

              {step === 2 && (
                <>
                  {contracts.map((contract, i) => (
                    <div key={i} className="mb-6 border p-4 rounded bg-white shadow-sm">
                      <h3 className="mb-2 font-semibold">Smlouva {i + 1}</h3>
                      <input
                        type="text"
                        name={`contractType${i}`}
                        placeholder="Typ smlouvy"
                        value={contract.type}
                        onChange={e => handleContractChange(i, 'type', e.target.value)}
                        required
                        className="w-full mb-2 bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage"
                      />
                      <input
                        type="file"
                        name={`contractFile${i}`}
                        accept=".pdf,.doc,.docx"
                        onChange={e => handleContractChange(i, 'file', e.target.files[0])}
                        required
                        className="w-full mb-2"
                      />
                      <textarea
                        name={`contractExpectation${i}`}
                        placeholder="Co od této smlouvy čekáte?"
                        value={contract.expectation}
                        onChange={e => handleContractChange(i, 'expectation', e.target.value)}
                        required
                        className="w-full bg-inputLight rounded p-2 focus:outline-none focus:ring-1 focus:ring-silverSage"
                        rows={3}
                      />
                    </div>
                  ))}

                  <div className="flex justify-between items-center mb-6">
                    <button
                      type="button"
                      onClick={addContract}
                      disabled={contracts.length >= 6}
                      className={`bg-silverSage text-white py-2 px-4 rounded font-satoshi-bold ${contracts.length >= 6 ? 'opacity-50 cursor-not-allowed' : ''}`}
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
              Odesláním formuláře berete na vědomí podmínky zpracování osobních údajů uvedené v informaci o zpracování osobních údajů
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
