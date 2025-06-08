export default function PageHeader({ title, excerpt, imageUrl }) {
  return (
    <section
      className="relative w-full min-h-[500px] overflow-hidden bg-[url('/images/heroimage.png')] bg-no-repeat bg-cover bg-center pt-[76px] md:pt-[100px] px-4"
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
          className="max-w-none w-[130vw] md:w-[736px]"
        />
      </div>

      {/* Text */}
      <div className="relative z-20 flex flex-col md:flex-row gap-[32px] md:gap-[48px] w-full max-w-[1392px] mx-auto py-8 md:py-12 items-center mt-[56px] md:mt-[64px] md:mb-[144px]">

        <div className="md:w-3/5 flex flex-col gap-6">
            <h1 className="text-[40px] md:text-[56px] text-silkBeige text-left">{title}</h1>
            <div className="w-full flex flex-col gap-4">
                <hr className="w-full border-1 h-[1px] silkBeige opacity-50" />
                {excerpt && (
                    <div
                        className="text-silkBeige text-left max-w-[700px]"
                        dangerouslySetInnerHTML={{ __html: excerpt }}
                    />
                )}

                <hr className="w-full border-1 h-[1px] silkBeige opacity-50" />
            </div>
        </div>

        {imageUrl && (
          <div className="md:w-2/5 overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

      </div>
    </section>
  );
}
