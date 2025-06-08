// src/app/(site)/blog/page.js

import PageHeader from '../../components/PageHeader';
import Link from 'next/link';

export default async function BlogPage() {
  // 1. Fetch ACF ze stránky /blog
  const blogPageRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=blog&_embed',
    { cache: 'no-store' } // ← TADY
  );
  if (!blogPageRes.ok) throw new Error('Failed to fetch blog page');
  const blogPageData = await blogPageRes.json();
  const blogPage = blogPageData[0];

  // 2. Fetch 3 nejnovější články
  const postsRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/blog?per_page=3&_embed',
    { cache: 'no-store' } // ← A TADY
  );
  if (!postsRes.ok) throw new Error('Failed to fetch blog posts');
  const postsData = await postsRes.json();

  const posts = postsData.map((post) => {
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.png';
  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    image,
    excerpt: post.excerpt.rendered,
    date: new Date(post.date).toLocaleDateString('cs-CZ'), // lokalizované datum
  };
});

  return (
    <div>
      <PageHeader
        title={blogPage?.acf?.page_name || blogPage?.title?.rendered || 'Blog'}
        description={blogPage?.acf?.page_desc || null}
      />

      <main className="flex min-h-screen flex-col items-center">
        <section className="flex flex-col items-center px-4 -mt-12 md:-mt-16 pb-12 md:pb-24 z-[100] relative">
        <div className="max-w-[1392px] w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
                <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="flex flex-col bg-silkBeige/30 rounded-lg hover:shadow-lg transition overflow-hidden group"
                >
                    <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-52 object-cover rounded-lg"
                    />
                    <div className="px-5 md:px-6 pt-5 md:pt-8 flex flex-col flex-grow justify-between">
                        <div>
                            <h3
                            className="text-lg text-goldenBrown text-[22px] md:text-[22px] font-satoshi-bold mb-4 md:mb-5 group-hover:underline"
                            dangerouslySetInnerHTML={{ __html: post.title }}
                            />
                            <div
                            className="text-raisinBlack"
                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                            />
                        </div>
                        <div className="flex flex-col gap-5 pt-5 pb-5 md:gap-5 md:pt-5 md:pb-6">
                            <hr className="border-t border-raisinBlack/10" />
                            <div className="mt-auto flex justify-between items-center text-goldenBrown">
                                <span className="group-hover:underline">Otevřít článek</span>
                                <span className="text-raisinBlack/20">{post.date}</span>
                            </div>
                        </div>
                    </div>
                </Link>
                ))}

          </div>
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
    <select
      name="role"
      id="role"
      required
      className="w-full appearance-none bg-inputLight text-black rounded p-2 pr-12 focus:outline-none focus:ring-1 focus:ring-silverSage text-inputPlacehoder"
      style={{color:'#747271'}}
    >
      <option value="" disabled selected hidden>Vyberte poradce</option>
      <option value="admin">Václav Svatoš</option>
      <option value="user">Sabina Vytisková</option>
      <option value="guest">Monika Kvasničková</option>
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
