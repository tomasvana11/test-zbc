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
