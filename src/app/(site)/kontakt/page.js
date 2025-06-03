export default function ContactPage() {
  return (
    <main>
        <section className="px-4 w-full">
        <div className="flex flex-col md:flex-row w-full max-w-[1392px] mx-auto py-12 md:py-24">
            <div className="w-full max-w-screen-lg mx-auto">
            <div className="flex flex-col md:grid md:grid-cols-2">
                {/* Blok 1 */}
                <div className="p-[64px_77px] border-b border-blue-500 md:border-b md:border-r border-blue-500">
                <h2 className="mb-2">Nadpis 1</h2>
                <p>Text 1</p>
            </div>

            {/* Blok 2 */}
            <div className="p-[64px_77px] border-b border-blue-500 md:border-b border-blue-500">
            <h2 className="mb-2">Nadpis 2</h2>
            <p>Text 2</p>
            </div>

            {/* Blok 3 */}
            <div className="p-[64px_77px] border-b border-blue-500 md:border-b-0 md:border-r border-blue-500">
            <h2 className="mb-2">Nadpis 3</h2>
            <p>Text 3</p>
            </div>

            {/* Blok 4 */}
            <div className="p-[64px_77px] border-b border-blue-500 md:border-b-0 border-blue-500">
            <h2 className="mb-2">Nadpis 4</h2>
            <p>Text 4</p>
            </div>
        </div>
        </div>

        </div>
      </section>

        <section className="bg-silkBeige w-full py-12 md:py-16">
  <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-center">Kontaktujte nás</h2>
  <p className="text-center text-raisinBlack">Chcete mít ve financích jasno a klid? <strong>Začněte tady.</strong></p>
  
  <div className="flex flex-col w-full max-w-[1392px] mx-auto py-4 md:py-8 justify-center">

    <form
  action="https://formcarry.com/s/kY_1MuRL2um"
  method="POST"
  encType="multipart/form-data"
  className="mx-auto p-6 space-y-5 w-full max-w-[850px]"
  target="_self" noValidate
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
  <p className="text-cardGrey w-full max-w-[850px] p-6 m-auto">Odesláním formuláře berete na vědomí podmínky zpracování osobnich údajů uvedené v informaci o zpracování osobních údajů</p>
  </div>

</section>
    </main>
  );
}
