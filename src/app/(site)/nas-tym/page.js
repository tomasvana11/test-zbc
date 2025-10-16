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

/*
import PageHeader from '../../components/PageHeader';
import ContactFormClient from '../../components/ContactFormClient';
import SlovaKlientuSection from '../kariera/SlovaKoleguSection';

// WP REST API pro metadata
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
    acf.seo_title || page?.title?.rendered || 'Náš tým | Za bohatší Česko';

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
  const { title, description, featuredImage, canonicalUrl } = await fetchMetaPageData();
  return {
    title,
    description,
    metadataBase: new URL('https://zabohatsicesko.cz'),
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true, nocache: false, googleBot: 'index, follow' },
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

// Inline komponenta pro sekci „Očima našich kolegů"
function SlovaKoleguSection({ slovaKolegu }) {
  if (!slovaKolegu || slovaKolegu.length === 0) return null;

  return (
    <section className="px-4 w-full py-12 md:py-24 bg-lightGrey">
      <div className="max-w-[1392px] mx-auto text-center">
        <h2 className="text-[28px] md:text-[40px] mb-8 text-goldenBrown">
          Očima našich kolegů
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {slovaKolegu.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-raisinBlack mb-2">{item.citation}</p>
              {item.author && <p className="text-goldenBrown font-bold">{item.author}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function TymPage() {
  // 1️⃣ Fetch členů týmu
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed',
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to fetch team members');
  const data = await res.json();

  let members = data.map((item) => ({
    id: item.id,
    slug: item.slug,
    photo: item.acf?.team_member_photo?.url || '/placeholder.png',
    name: item.title.rendered,
    role: item.acf?.role || '',
  }));

  // 2️⃣ Řazení členů týmu
  members.sort((a, b) => {
    const prioritizedSlugs = ['vaclav-svatos','sabina-vytiskova','jan-holinka','otto-urma'];
    const aIndex = prioritizedSlugs.indexOf(a.slug);
    const bIndex = prioritizedSlugs.indexOf(b.slug);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    const roleOrder = {
      'specialista': 1,
      'relationship manažer': 2,
      'poradce': 3,
      'asistent': 4,
      'asistentka': 4
    };
    const getRolePriority = (role) => {
      const r = role.toLowerCase();
      for (const [key, val] of Object.entries(roleOrder)) if (r.includes(key)) return val;
      if (r.includes('specialist')) return roleOrder['specialista'];
      if (r.includes('manažer') || r.includes('manager')) return roleOrder['relationship manažer'];
      if (r.includes('poradc')) return roleOrder['poradce'];
      if (r.includes('asisten')) return roleOrder['asistent'];
      return 999;
    };
    const aPriority = getRolePriority(a.role);
    const bPriority = getRolePriority(b.role);
    if (aPriority !== bPriority) return aPriority - bPriority;
    return a.name.localeCompare(b.name, 'cs');
  });

  // 3️⃣ Fetch ACF ze stránky /nas-tym
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
  const slovaKoleguData = nasTymPage.acf?.slova_kolegu || [];

  // 4️⃣ Fetch slov klientů z custom post type
  const slovaKlientuRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/slova-kolegu?per_page=100&_embed',
    { next: { revalidate: 60 } }
  );
  const slovaKlientu = await slovaKlientuRes.json();

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

        <SlovaKoleguSection slovaKolegu={slovaKoleguData} />

        <SlovaKlientuSection slovaKolegu={slovaKlientu} />

        <ContactFormClient/>
      </main>
    </div>
  );
}
  */

import PageHeader from '../../components/PageHeader';
import ContactFormClient from '../../components/ContactFormClient';
import SlovaKlientuSection from '../kariera/SlovaKoleguSection';

// WP REST API pro metadata
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
    acf.seo_title || page?.title?.rendered || 'Náš tým | Za bohatší Česko';

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
  const { title, description, featuredImage, canonicalUrl } = await fetchMetaPageData();
  return {
    title,
    description,
    metadataBase: new URL('https://zabohatsicesko.cz'),
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true, nocache: false, googleBot: 'index, follow' },
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

// Inline komponenta pro sekci „Očima našich kolegů"
function SlovaKoleguSection({ slovaKolegu }) {
  if (!slovaKolegu || slovaKolegu.length === 0) return null;

  return (
    <section className="px-4 w-full py-12 md:py-24 bg-lightGrey">
      <div className="max-w-[1392px] mx-auto text-center">
        <h2 className="text-[28px] md:text-[40px] mb-8 text-goldenBrown">
          Očima našich kolegů
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {slovaKolegu.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-raisinBlack mb-2">{item.citation}</p>
              {item.author && <p className="text-goldenBrown font-bold">{item.author}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function TymPage() {
  // 1️⃣ Fetch členů týmu
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/tym?per_page=100&_embed',
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error('Failed to fetch team members');
  const data = await res.json();

  let members = data.map((item) => ({
    id: item.id,
    slug: item.slug,
    photo: item.acf?.team_member_photo?.url || '/placeholder.png',
    name: item.title.rendered,
    role: item.acf?.role || '',
  }));

  // 2️⃣ Řazení členů týmu
  members.sort((a, b) => {
    const prioritizedSlugs = ['vaclav-svatos','sabina-vytiskova','jan-holinka','otto-urma'];
    const aIndex = prioritizedSlugs.indexOf(a.slug);
    const bIndex = prioritizedSlugs.indexOf(b.slug);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    const roleOrder = {
      'specialista': 1,
      'relationship manažer': 2,
      'poradce': 3,
      'asistent': 4,
      'asistentka': 4
    };
    const getRolePriority = (role) => {
      const r = role.toLowerCase();
      for (const [key, val] of Object.entries(roleOrder)) if (r.includes(key)) return val;
      if (r.includes('specialist')) return roleOrder['specialista'];
      if (r.includes('manažer') || r.includes('manager')) return roleOrder['relationship manažer'];
      if (r.includes('poradc')) return roleOrder['poradce'];
      if (r.includes('asisten')) return roleOrder['asistent'];
      return 999;
    };
    const aPriority = getRolePriority(a.role);
    const bPriority = getRolePriority(b.role);
    if (aPriority !== bPriority) return aPriority - bPriority;
    return a.name.localeCompare(b.name, 'cs');
  });

  // 3️⃣ Fetch ACF ze stránky /nas-tym
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
  const slovaKoleguData = nasTymPage.acf?.slova_kolegu || [];

  // 4️⃣ Fetch slov klientů z custom post type
  const slovaKlientuRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/slova-kolegu?per_page=100&_embed',
    { next: { revalidate: 60 } }
  );
  const slovaKlientu = await slovaKlientuRes.json();

  // 5️⃣ Fetch Homepage pro Podcast titulky
  const homepageRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=homepage',
    { next: { revalidate: 60 } }
  );
  const homepageData = await homepageRes.json();
  const homepage = homepageData[0];
  
  const podcast_title = homepage.acf?.podcast_title || '';
  const podcast_desc = homepage.acf?.podcast_desc || '';

  // 6️⃣ Fetch Podcast epizod
  const podcastRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/podcast?per_page=3&_embed',
    { next: { revalidate: 60 } }
  );
  const podcastPosts = await podcastRes.json();

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

        {/* Sekce „Očima našich kolegů" */}
        <SlovaKoleguSection slovaKolegu={slovaKoleguData} />

        {/* Sekce „Očima našich klientů" */}
        <SlovaKlientuSection slovaKolegu={slovaKlientu} />

        {/* Sekce Podcast */}
        <section className="px-4 w-full py-12 md:py-24">
          <div className="flex flex-col md:flex-row w-full max-w-[1392px] mx-auto">
            <div className="w-full md:w-1/2 md:pr-12 lg:pr-16 xl:pr-16">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                {podcast_title && (
                  <h2 className="text-[28px] md:text-[40px] text-goldenBrown">
                    {podcast_title.split(" ")[0]}
                    <br />
                    {podcast_title.split(" ").slice(1).join(" ")}
                  </h2>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 md:pr-4 lg:pr-8 xl:pr-12 pb-10 md:pb-0">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div
                  className="mt-4 md:mt-6 text-raisinBlack"
                  dangerouslySetInnerHTML={{ __html: podcast_desc }}
                />
              </div>
            </div>
          </div>

          <div className="w-full max-w-[1392px] mx-auto text-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {podcastPosts.map((post) => {
                const title = post.title?.rendered || "Bez názvu";
                const image =
                  post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
                  "/placeholder.jpg";
                const episodeNumber = post.acf?.episode_number || "";
                const ytLink = post.acf?.episode_yt_link || "#";

                return (
                  <a
                    key={post.id}
                    href={ytLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative rounded-lg overflow-hidden h-[300px] block"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>

                    <div className="absolute inset-0 bg-gradient-to-b from-[rgba(35,35,35,0.5)] to-[rgba(0,0,0,0.7)]"></div>
                    <div className="absolute top-1/2 left-1/2 w-[48px] h-[48px] -translate-x-1/2 -translate-y-1/2 bg-[#E2DBD5] rounded-full flex items-center justify-center">
                      <svg
                        width="18"
                        height="22"
                        viewBox="0 0 18 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M3 1L17 11L3 21V1Z" fill="#9D6219" />
                      </svg>
                    </div>

                    <div className="relative z-10 flex flex-col justify-between items-start h-full p-5 text-left text-silkBeige">
                      <span className="text-[28px] md:text-[40px] text-goldenBrown ep_num">
                        #{episodeNumber}
                      </span>
                      <h4 className="card-heading-d text-base">{title}</h4>
                    </div>
                  </a>
                );
              })}
            </div>

            <a
              href="https://www.youtube.com/@ZabohatsiCesko"
              className="custom-btn py-3 px-4 rounded bg-goldenBrown text-silkBeige mt-8 inline-block text-center transition-colors duration-300 hover:bg-goldenBrownHover"
            >
              Zobrazit všechny epizody
            </a>
          </div>
        </section>

        {/* Kontaktujte nás */}
        <ContactFormClient/>
      </main>
    </div>
  );
}