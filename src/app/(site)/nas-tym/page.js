export default async function TymPage() {
  // Fetch dat z REST API
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed',
    { next: { revalidate: 60 } } // nebo cache: 'no-store' při SSR
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();

  // Připrav pole členů ve formátu { id, photo, name, role }
  const members = data.map((item) => {
    const media = item._embedded?.['wp:attachment']?.[0];
    const photo = media?.source_url || '/placeholder.png';

    return {
      id: item.id,
      photo,
      name: item.title.rendered,
      role: item.acf?.role || '',
    };
  });

  return (
    <main className="flex flex-col items-center">
        <section className="px-4 w-full">

  <div className="flex flex-col md:flex-row items-center w-full max-w-[1392px] mx-auto py-12 md:py-24">

    {/* Obrázek – desktop vlevo */}
    <div className="flex w-full md:w-1/2 pr-6 justify-center items-center">
      <img
        src="/images/intro-img.png"
        alt="Intro"
        className="max-w-[90%] h-auto object-contain"
      />
    </div>

    {/* Obsah */}
    <div className="w-full md:w-1/2 md:pl-12">
      <h2 className="text-[28px] md:text-[40px] mb-4 text-goldenBrown">
        h2
      </h2>
      <p className="text-raisinBlack">det</p>
      <a
        href="https://zabohatsicesko.cz/kontakt"
        className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center"
      >
        Rezervovat konzultaci
      </a>
    </div>
  </div>
</section>

      <section className="px-4 w-full py-12 md:py-24">
        <div className="max-w-[1392px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-14">
          {members.map((member) => (
            <article
              key={member.id}
              className="flex flex-col w-full items-center"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-full aspect-square rounded-full object-cover mb-3"
                loading="lazy"
              />
              <h3
                className="text-[18px] md:text-[20px] text-goldenBrown recife mb-1 text-center"
                dangerouslySetInnerHTML={{ __html: member.name }}
              />
              <p className="text-raisinBlack text-[15px] text-center">
                {member.role}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
