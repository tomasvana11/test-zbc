export default async function ContactPage() {
  return (
    <main>
      <section className="px-4 w-full">
        <div className="flex flex-col md:flex-row w-full max-w-[1300px] mx-auto py-12 md:py-24">
          <div className="w-full mx-auto">
            <div className="flex flex-col md:grid md:grid-cols-2">
              {/* Blok 1 */}
              <div className="flex flex-col gap-1 md:gap-2 w-full md:pt-[64px]pt-[24px] pb-[24px] md:pb-[64px] md:pl-[77px] md:pr-[77px] border-b border-lightDivGrey md:border-b md:border-r border-lightDivGrey">
                <p className="text-goldenBrown text-[15px] md:text-[18px] mb-2">EMAIL</p>
                <h2 className="text-raisinBlack text-[24px] md:text-[32px]">+420 603 818 647</h2>
              </div>

              {/* Blok 2 */}
              <div className="flex flex-col gap-1 md:gap-2 w-full md:pt-[64px] pt-[24px] pb-[24px] md:pb-[64px] md:pl-[77px] md:pr-[77px] border-b border-lightDivGrey md:border-b md:border-r border-lightDivGrey">
                <p className="text-goldenBrown text-[15px] md:text-[18px] mb-2">EMAIL</p>
                <h2 className="text-raisinBlack text-[24px] md:text-[32px]">+420 603 818 647</h2>
              </div>

              {/* Blok 3 */}
              <div className="flex flex-col gap-1 md:gap-2 w-full md:pt-[64px] pt-[24px] pb-[24px] md:pb-[64px] md:pl-[77px] md:pr-[77px] border-b border-lightDivGrey md:border-b md:border-r border-lightDivGrey">
                <p className="text-goldenBrown text-[15px] md:text-[18px] mb-2">EMAIL</p>
                <h2 className="text-raisinBlack text-[24px] md:text-[32px]">+420 603 818 647</h2>
              </div>

              {/* Blok 4 */}
              <div className="flex flex-col gap-1 md:gap-2 w-full md:pt-[64px] pt-[24px] md:pb-[64px] md:pl-[77px] md:pr-[77px] border-b border-lightDivGrey md:border-b md:border-r border-lightDivGrey">
                <p className="text-goldenBrown text-[15px] md:text-[18px] mb-2">EMAIL</p>
                <h2 className="text-raisinBlack text-[24px] md:text-[32px]">+420 603 818 647</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
