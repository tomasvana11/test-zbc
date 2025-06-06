export default async function TymPage() {
  // 1. Fetch členů týmu
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed',
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch team members');
  }

  const data = await res.json();

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

  // 2. Fetch ACF obsahu ze stránky /nas-tym
  const pageRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=nas-tym&_embed',
    { next: { revalidate: 60 } }
  );

  if (!pageRes.ok) {
    throw new Error('Failed to fetch team page');
  }

  const pageData = await pageRes.json();
  const page = pageData[0];

  const team_intro_title = page.acf?.team_intro_title || '';
  const team_intro_desc = page.acf?.team_intro_desc || '';
  const team_intro_img = page.acf?.team_intro_img?.url || '/placeholder.png';
  const introImgAlt = page.acf?.team_intro_img?.alt || 'Intro';

  // 3. Render
  return (
    <main className="flex flex-col items-center">
      {/* Úvodní sekce */}
      <section className="px-4 w-full -mt-8 md:-mt-20 z-[50]">
        <div className="flex flex-col lg:flex-row items-end w-full max-w-[1392px] mx-auto bg-white xl:bg-transparent">
          {/* Obrázek vlevo */}
          <div className="flex w-full lg:w-1/2 mr-0 xl:mr-6 justify-center items-center bg-white xl:bg-transparent">
            <img
              src={team_intro_img}
              alt={introImgAlt}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Text vpravo */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-12 lg:mb-8">
            <h2 className="text-[28px] lg:text-[40px] mb-4 text-goldenBrown">
              {team_intro_title}
            </h2>
            <div className="text-raisinBlack" dangerouslySetInnerHTML={{ __html: team_intro_desc }}/>
          </div>
        </div>
      </section>

      {/* Sekce členů týmu */}
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
