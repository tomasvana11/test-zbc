export default async function TymPage() {
  // 1. Fetch členů týmu
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed',
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to fetch team members');
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

  // 2. Fetch ACF ze stránky /nas-tym (pro tým)
  const nasTymRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=nas-tym&_embed',
    { next: { revalidate: 60 } }
  );
  if (!nasTymRes.ok) throw new Error('Failed to fetch team page');
  const nasTymData = await nasTymRes.json();
  const nasTymPage = nasTymData[0];

  const team_intro_title = nasTymPage.acf?.team_intro_title || '';
  const team_intro_desc = nasTymPage.acf?.team_intro_desc || '';
  const team_intro_img = nasTymPage.acf?.team_intro_img?.url || '/placeholder.png';
  const introImgAlt = nasTymPage.acf?.team_intro_img?.alt || 'Intro';

  // 3. Fetch ACF ze stránky /homepage (pro podcasty)
  const homepageRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=homepage&_embed',
    { next: { revalidate: 60 } }
  );
  if (!homepageRes.ok) throw new Error('Failed to fetch homepage');
  const homepageData = await homepageRes.json();
  const homepage = homepageData[0];

  const podcast_title = homepage.acf?.podcast_title || '';
  const podcast_desc = homepage.acf?.podcast_desc || '';

  // 4. Fetch poslední 3 podcasty
  const podcastRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/podcast?per_page=3&_embed',
    { next: { revalidate: 60 } }
  );
  if (!podcastRes.ok) throw new Error('Failed to fetch podcast posts');
  const podcastPosts = await podcastRes.json();

  // 5. Render
  return (
    <main className="flex flex-col items-center">
      {/* Úvodní sekce */}
      <section className="px-4 w-full -mt-8 md:-mt-20 z-[50]">
        <div className="flex flex-col lg:flex-row items-end w-full max-w-[1392px] mx-auto bg-white xl:bg-transparent">
          <div className="flex w-full lg:w-1/2 mr-0 xl:mr-6 justify-center items-center bg-white xl:bg-transparent">
            <img src={team_intro_img} alt={introImgAlt} className="w-full h-auto object-contain" />
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-12 lg:mb-12">
            <h2 className="text-[28px] lg:text-[40px] mb-4 text-goldenBrown">{team_intro_title}</h2>
            <div className="text-raisinBlack" dangerouslySetInnerHTML={{ __html: team_intro_desc }} />
          </div>
        </div>
      </section>

      {/* Sekce členů týmu */}
      <section className="px-4 w-full py-12 md:py-24">
        <div className="max-w-[1392px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-14">
          {members.map((member) => (
            <article key={member.id} className="flex flex-col w-full items-center">
              <img src={member.photo} alt={member.name} className="w-full aspect-square rounded-full object-cover mb-3" loading="lazy" />
              <h3 className="text-[18px] md:text-[20px] text-goldenBrown recife mb-1 text-center" dangerouslySetInnerHTML={{ __html: member.name }} />
              <p className="text-raisinBlack text-[15px] text-center">{member.role}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Divider */}
      <section className="px-4 w-full">
        <div className="max-w-[1392px] mx-auto">
          <hr className="w-full border-1 h-[1px] lightDivGrey" />
        </div>
      </section>

      {/* Sekce podcasty */}
      <section className="px-4 w-full py-12 md:py-24">
        <div className="flex flex-col md:flex-row w-full max-w-[1392px] mx-auto">
          <div className="w-full md:w-1/2 md:pr-12 lg:pr-16 xl:pr-16">
            {podcast_title && (
              <h2 className="text-[28px] md:text-[40px] text-goldenBrown">
                {podcast_title.split(' ')[0]}<br />
                {podcast_title.split(' ').slice(1).join(' ')}
              </h2>
            )}
          </div>
          <div className="w-full md:w-1/2 md:pr-4 lg:pr-8 xl:pr-12 pb-10 md:pb-0">
            <div className="mt-4 md:mt-6 text-raisinBlack" dangerouslySetInnerHTML={{ __html: podcast_desc }} />
          </div>
        </div>

        <div className="w-full max-w-[1392px] mx-auto text-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {podcastPosts.map((post) => {
              const title = post.title?.rendered || 'Bez názvu';
              const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.jpg';
              const episodeNumber = post.acf?.episode_number || '';
              const ytLink = post.acf?.episode_yt_link || '#';

              return (
                <a
                  key={post.id}
                  href={ytLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative rounded-lg overflow-hidden h-[300px] block"
                >
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-[rgba(35,35,35,0.5)] to-[rgba(0,0,0,0.7)]"></div>
                  <div className="absolute top-1/2 left-1/2 w-[48px] h-[48px] -translate-x-1/2 -translate-y-1/2 bg-[#E2DBD5] rounded-full flex items-center justify-center">
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 1L17 11L3 21V1Z" fill="#9D6219" />
                    </svg>
                  </div>
                  <div className="relative z-10 flex flex-col justify-between items-start h-full p-5 text-left text-silkBeige">
                    <span className="text-[28px] md:text-[40px] text-goldenBrown ep_num">#{episodeNumber}</span>
                    <h4 className="card-heading-d text-base">{title}</h4>
                  </div>
                </a>
              );
            })}
          </div>
          <a
            href="https://www.youtube.com/@ZabohatsiCesko"
            className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center"
          >
            Zobrazit všechny epizody
          </a>
        </div>
      </section>
    </main>
  );
}
