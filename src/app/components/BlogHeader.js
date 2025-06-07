export default function PageHeader({ title, description }) {
  return (
    <section
      className="relative w-full overflow-hidden bg-[url('/images/heroimage.png')] bg-no-repeat bg-cover md:bg-[length:120%_auto] bg-[right_center] pt-[76px] md:pt-[100px] px-4"
    >
      {/* Gradient */}
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(52, 61, 60, 0.8), rgba(151, 167, 165, 0.8))',
        }}
      />

      {/* Symbol (plusek) */}
      <div className="absolute -top-[14px] md:-top-[109px] left-4 md:left-12 z-10 overflow-visible">
        <img
          src="/images/symbol-outline.svg"
          alt=""
          className="max-w-none w-[450px] md:w-[736px]"
        />
      </div>

      {/* Text */}
      <div className="relative z-20 flex flex-col gap-[24px] md:gap-[32px] w-full max-w-[1392px] mx-auto py-8 md:py-12 items-start mt-[56px] md:mt-[64px] mb-[100px] md:mb-[144px]">
        <h1 className="text-[48px] md:text-[56px] text-silkBeige text-left">{title}</h1>
        {description && (
          <p className="text-silkBeige text-left max-w-[700px]">{description}</p>
        )}
      </div>
    </section>
  );
}
