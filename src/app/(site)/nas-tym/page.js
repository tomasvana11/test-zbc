/*// src/app/(site)/nas-tym/page.js

import PageHeader from '../../components/PageHeader';
import fetchPageData from '../../../lib/fetchPageData';

// WP REST API
async function fetchMetaPageData() {
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=nas-tym&_embed',
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  const page = data[0];

  const acf = page?.acf || {};
  const featuredImage =
    page?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-og.jpg';

  const rawDescription = acf.seo_description || page?.excerpt?.rendered || '';
  const description = rawDescription.replace(/(<([^>]+)>)/gi, '').trim();

  const title =
    acf.seo_title || page?.title?.rendered || 'Podcast | Za bohatší Česko';

  const canonicalUrl = 'https://zabohatsicesko.cz/nas-tym';

  return {
    title,
    description,
    featuredImage,
    canonicalUrl,
  };
}

// generate metadata
export async function generateMetadata() {
  const {
    title,
    description,
    featuredImage,
    canonicalUrl,
  } = await fetchMetaPageData();

  return {
    title,
    description,
    metadataBase: new URL('https://zabohatsicesko.cz'),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: 'index, follow',
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Za bohatší Česko',
      locale: 'cs_CZ',
      url: canonicalUrl,
      images: [featuredImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [featuredImage],
      site: '@zabohatsicesko',
    },
  };
}

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
      slug: item.slug,             // přidáno slug
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

  return (
    <div>
      <PageHeader
  title={nasTymPage?.acf?.page_name || nasTymPage?.title?.rendered || 'Náš tým'}
  description={nasTymPage?.acf?.page_desc || null}
/>
    <main className="flex flex-col items-center">
     
      <section className="px-4 w-full -mt-8 md:-mt-20 z-[50]">
        <div className="flex flex-col lg:flex-row items-end w-full max-w-[1392px] mx-auto bg-white xl:bg-transparent">
          <div className="flex w-full lg:w-1/2 mr-0 xl:mr-6 justify-center items-center bg-white xl:bg-transparent">
            <img
              src={team_intro_img}
              alt={introImgAlt}
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-12 lg:mb-12">
            <h2 className="text-[28px] lg:text-[40px] mb-4 text-goldenBrown">{team_intro_title}</h2>
            <div
              className="text-raisinBlack"
              dangerouslySetInnerHTML={{ __html: team_intro_desc }}
            />
          </div>
        </div>
      </section>

      
      <section className="px-4 w-full py-12 md:py-24">
        <div className="max-w-[1392px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-14">
          {members.map((member) => (
            <a
              key={member.id}
              href={`/nas-tym/${member.slug}`}
              className="flex flex-col w-full items-center no-underline hover:opacity-80"
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
              <p className="text-raisinBlack text-[15px] text-center">{member.role}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
    </div>
  );
}*/

import PageHeader from '../../components/PageHeader';
import fetchPageData from '../../../lib/fetchPageData';

// WP REST API
async function fetchMetaPageData() {
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=nas-tym&_embed',
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  const page = data[0];

  const acf = page?.acf || {};
  const featuredImage =
    page?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/default-og.jpg';

  const rawDescription = acf.seo_description || page?.excerpt?.rendered || '';
  const description = rawDescription.replace(/(<([^>]+)>)/gi, '').trim();

  const title =
    acf.seo_title || page?.title?.rendered || 'Podcast | Za bohatší Česko';

  const canonicalUrl = 'https://zabohatsicesko.cz/nas-tym';

  return {
    title,
    description,
    featuredImage,
    canonicalUrl,
  };
}

// generate metadata
export async function generateMetadata() {
  const {
    title,
    description,
    featuredImage,
    canonicalUrl,
  } = await fetchMetaPageData();

  return {
    title,
    description,
    metadataBase: new URL('https://zabohatsicesko.cz'),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: 'index, follow',
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Za bohatší Česko',
      locale: 'cs_CZ',
      url: canonicalUrl,
      images: [featuredImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [featuredImage],
      site: '@zabohatsicesko',
    },
  };
}

export default async function TymPage() {
  // 1. Fetch členů týmu
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed',
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to fetch team members');
  const data = await res.json();

  const members = data.map((item) => {
    const photo = item.acf?.team_member_photo?.url || '/placeholder.png'; // 👈 ZMĚNA zde
    return {
      id: item.id,
      slug: item.slug,
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

  return (
    <div>
      <PageHeader
        title={nasTymPage?.acf?.page_name || nasTymPage?.title?.rendered || 'Náš tým'}
        description={nasTymPage?.acf?.page_desc || null}
      />
      <main className="flex flex-col items-center">
        {/* Úvodní sekce */}
        <section className="px-4 w-full -mt-8 md:-mt-20 z-[50]">
          <div className="flex flex-col lg:flex-row items-end w-full max-w-[1392px] mx-auto bg-white xl:bg-transparent">
            <div className="flex w-full lg:w-1/2 mr-0 xl:mr-6 justify-center items-center bg-white xl:bg-transparent">
              <img
                src={team_intro_img}
                alt={introImgAlt}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-12 lg:mb-12">
              <h2 className="text-[28px] lg:text-[40px] mb-4 text-goldenBrown">{team_intro_title}</h2>
              <div
                className="text-raisinBlack"
                dangerouslySetInnerHTML={{ __html: team_intro_desc }}
              />
            </div>
          </div>
        </section>

        {/* Sekce členů týmu */}
        <section className="px-4 w-full py-12 md:py-24">
          <div className="max-w-[1392px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-10 gap-y-14">
            {members.map((member) => (
              <a
                key={member.id}
                href={`/nas-tym/${member.slug}`}
                className="flex flex-col w-full items-center no-underline hover:opacity-80"
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
                <p className="text-raisinBlack text-[15px] text-center">{member.role}</p>
              </a>
            ))}
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
      <select
      name="typ"
      id="typ"
      required
      className="hidden"
    >
      <option value="klient" selected></option>
    </select>
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

    <div className="md:col-span-2 md:flex md:justify-center">
  <div className="relative w-full md:w-1/2">
    {/*<select
      name="role"
      id="role"
      required
      className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-silverSage text-inputPlacehoder"
      style={{color:'#747271'}}
    >
      <option value="" disabled selected hidden>Vyberte poradce</option>
      <option value="vaclav_svatos">Václav Svatoš</option>
      <option value="sabina_vytiskova">Sabina Vytisková</option>
      <option value="monika_kvasnickova">Monika Kvasničková</option>
    </select>*/}
    
    <select
  name="role"
  id="role"
  required
  className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-silverSage text-inputPlacehoder"
  style={{ color: '#747271' }}
>
  <option value="" disabled selected hidden>Vyberte poradce</option>
  {members.map((member) => (
    <option key={member.id} value={member.slug}>
      {member.name.replace(/(<([^>]+)>)/gi, '')}
    </option>
  ))}
</select>

    <div
      className="pointer-events-none absolute inset-y-[9px] right-[9px] flex items-center justify-center rounded"
      style={{
        width: '28px',
        height: '22px',
        backgroundColor: '#9D6219',
      }}
    >
      <img
        src="/images/chevron-down.svg"
        alt="šipka"
        className="w-4 h-4"
        style={{ display: 'block' }}
      />
    </div>
  </div>
</div>




    
  </div>
  <div className="w-full flex justify-center">
    <button
      type="submit"
      className="w-full md:w-auto md:mt-[24px] bg-goldenBrown text-white py-2 px-6 rounded font-satoshi-bold"
    >
      Kontaktujte mě
    </button>
  </div>
</form>
  <p className="text-cardGrey text-center w-full max-w-[850px] p-6 m-auto">Odesláním formuláře berete na vědomí podmínky zpracování osobních údajů uvedené v informaci o zpracování osobních údajů</p>
  </div>

</section>
      </main>
    </div>
  );
}

