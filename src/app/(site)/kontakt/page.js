export default async function ContactPage() {
  return (
    <main>
      <section className="px-4 w-full">
        <div className="flex flex-col md:flex-row w-full max-w-[1392px] mx-auto py-12 md:py-24">
          <div className="w-full max-w-screen-lg mx-auto">
            <div className="flex flex-col md:grid md:grid-cols-2">
              {/* Blok 1 */}
              <div className="w-full pt-[64px] pb-[64px] pl-[77px] pr-[77px] border-b border-lightDivGrey md:border-b md:border-r border-lightDivGrey">
                <p className="text-goldenBrown text-[18px] mb-2">EMAIL</p>
                <h2 className="text-raisinBlack text-[32px]">+420 603 818 647</h2>
              </div>

              {/* Blok 2 */}
              <div className="w-full pt-[64px] pb-[64px] pl-[77px] pr-[77px] border-b border-lightDivGrey md:border-b border-lightDivGrey">
                <h2 className="mb-2">Nadpis 2</h2>
                <p>Text 2</p>
              </div>

              {/* Blok 3 */}
              <div className="w-full pt-[64px] pb-[64px] pl-[77px] pr-[77px] border-b border-lightDivGrey md:border-b-0 md:border-r border-lightDivGrey">
                <h2 className="mb-2">Nadpis 3</h2>
                <p>Text 3</p>
              </div>

              {/* Blok 4 */}
              <div className="w-full pt-[64px] pb-[64px] pl-[77px] pr-[77px] border-b border-lightDivGrey md:border-b-0 border-lightDivGrey">
                <h2 className="mb-2">Nadpis 4</h2>
                <p>Text 4</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
