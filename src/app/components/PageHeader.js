export default function PageHeader({ title, description }) {
  return (
    <section className="relative w-full overflow-hidden bg-[url('/images/heroimage.png')] bg-[left_center] bg-cover bg-no-repeat pt-[100px]">
        {/* Gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#343D3C]/10 to-[#97A7A5]/10 z-0" />
        {/* Symbol (plusek) – může přesahovat, ale nebude se deformovat */}
        <div className="absolute -top-[109px] left-12 z-10 overflow-visible">
            <img
                src="/images/symbol-outline.svg"
                alt=""
                className="w-[135vw] max-w-none md:w-[736px]" // přesahuje viewport
            />
        </div>
        {/*Text*/}
        <div className="flex flex-col gap-[32px] w-full max-w-[1392px] mx-auto py-12 text-center mt-[64px] mb-[144px]">
            <h1 className="text-[56px] text-silkBeige text-center">{title}</h1>
            {description && <p className="text-silkBeige text-center max-w-[700px]">{description}</p>}
        </div>
    </section>
  );
}