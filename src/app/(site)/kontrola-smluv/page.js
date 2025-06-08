import PageHeader from '../../components/PageHeader';

export default function KontrolaSmluvPage() {
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
            {/* Formulář */}
            <form
              action="https://formcarry.com/s/kY_1MuRL2um"
              method="POST"
              encType="multipart/form-data"
              className="mx-auto p-6 space-y-5 w-full max-w-[850px]"
              target="_self"
              noValidate
            >
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

                <div className="md:col-span-2 md:flex md:justify-center">
                  <div className="relative w-full md:w-1/2">
                    <select
                      name="role"
                      required
                      className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-silverSage text-inputPlacehoder"
                      style={{ color: '#747271' }}
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        Jaká role tě láká nejvíce?
                      </option>
                      {/* Pokud nemáš `positions`, můžeš tyto options nahradit staticky */}
                      <option value="Role 1">Role 1</option>
                      <option value="Role 2">Role 2</option>
                    </select>

                    <div
                      className="pointer-events-none absolute inset-y-[9px] right-[9px] flex items-center justify-center rounded cursor-pointer"
                      style={{
                        width: '28px',
                        height: '22px',
                        backgroundColor: '#9D6219',
                      }}
                    >
                      <img
                        src="/images/chevron-down.svg"
                        alt="šipka"
                        className="w-4 h-4"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="w-full md:w-auto md:mt-[24px] bg-goldenBrown text-white py-2 px-6 rounded font-satoshi-bold"
                >
                  Kontaktujte mě
                </button>
              </div>
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
