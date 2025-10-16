/*
import PageHeader from '../../components/PageHeader';
import fetchPageData from '../../../lib/fetchPageData';
import ContactFormClient from '../../components/ContactFormClient'; 


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

  let members = data.map((item) => {
    const photo = item.acf?.team_member_photo?.url || '/placeholder.png';
    return {
      id: item.id,
      slug: item.slug,
      photo,
      name: item.title.rendered,
      role: item.acf?.role || '',
    };
  });

  // 👉 Sort members: prioritized first
  const prioritizedSlugs = ['vaclav-svatos', 'sabina-vytiskova'];
  members.sort((a, b) => {
    const aIndex = prioritizedSlugs.indexOf(a.slug);
    const bIndex = prioritizedSlugs.indexOf(b.slug);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
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

        <ContactFormClient/>
      </main>
    </div>
  );
}
*/

import PageHeader from '../../components/PageHeader';
import fetchPageData from '../../../lib/fetchPageData';
import ContactFormClient from '../../components/ContactFormClient'; 


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

  let members = data.map((item) => {
    const photo = item.acf?.team_member_photo?.url || '/placeholder.png';
    return {
      id: item.id,
      slug: item.slug,
      photo,
      name: item.title.rendered,
      role: item.acf?.role || '',
    };
  });

  // 👉 Komplexní řazení členů týmu
  members.sort((a, b) => {
    // 1. Prioritní osoby (v daném pořadí)
    const prioritizedSlugs = [
      'vaclav-svatos', 
      'sabina-vytiskova', 
      'jan-holinka', 
      'otto-urma'
    ];
    
    const aIndex = prioritizedSlugs.indexOf(a.slug);
    const bIndex = prioritizedSlugs.indexOf(b.slug);
    
    // Pokud jsou obě osoby v prioritním seznamu, řaď podle pořadí v seznamu
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    // Pokud jen jedna je v prioritním seznamu, dej ji dopředu
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    
    // 2. Řazení podle rolí (pro neprioritní osoby)
    const roleOrder = {
      'specialista': 1,
      'relationship manažer': 2,
      'poradce': 3,
      'asistent': 4,
      'asistentka': 4
    };
    
    // Funkce pro získání priority role
    const getRolePriority = (role) => {
      const roleLower = role.toLowerCase().trim();
      
      // Hledání klíčových slov v roli
      for (const [key, priority] of Object.entries(roleOrder)) {
        if (roleLower.includes(key)) {
          return priority;
        }
      }
      
      // Speciální případy pro různé variace
      if (roleLower.includes('specialist')) return roleOrder['specialista'];
      if (roleLower.includes('manažer') || roleLower.includes('manager')) return roleOrder['relationship manažer'];
      if (roleLower.includes('poradc')) return roleOrder['poradce'];
      if (roleLower.includes('asisten')) return roleOrder['asistent'];
      
      // Defaultní priorita pro neznámé role
      return 999;
    };
    
    const aPriority = getRolePriority(a.role);
    const bPriority = getRolePriority(b.role);
    
    // Řaď podle priority role
    if (aPriority !== bPriority) return aPriority - bPriority;
    
    // 3. Pokud mají stejnou prioritu role, řaď alfabeticky podle jména
    return a.name.localeCompare(b.name, 'cs');
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

        {/* Kontaktujte nás */}
        <ContactFormClient/>
      </main>
    </div>
  );
}