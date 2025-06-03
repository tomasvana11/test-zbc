export default function PageHeader({ title, description }) {
  return (
    <section className="relative w-full overflow-hidden bg-[url('/images/heroimage.png')] bg-[left_center] bg-cover bg-no-repeat pt-[100px]">
      {/* Gradient */}
      <div
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(52, 61, 60, 0.9), rgba(151, 167, 165, 0.9))',
        }}
      />
      {/* Symbol (plusek) – nad gradientem, ale pod textem */}
      <div className="absolute -top-[109px] left-12 z-10 overflow-visible">
        <img
          src="/images/symbol-outline.svg"
          alt=""
          className="w-[135vw] max-w-none md:w-[736px]"
        />
      </div>
      {/* Text – nejvýš */}
      <div className="relative z-20 flex flex-col gap-[32px] w-full max-w-[1392px] mx-auto py-12 items-center mt-[64px] mb-[144px]">
        <h1 className="text-[56px] text-silkBeige text-center">{title}</h1>
        {description && (
          <p className="text-silkBeige text-center max-w-[700px]">{description}</p>
        )}
      </div>
    </section>
  );
}
