// src/app/(site)/blog/page.js

import PageHeader from '../../components/PageHeader';
import Link from 'next/link';
import Head from 'next/head';
import ContactFormClient from '../../components/ContactFormClient';

// WP REST API
async function fetchPageData() {
  const res = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=blog&_embed',
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
    acf.seo_title || page?.title?.rendered || 'Blog | Za bohatší Česko';

  const canonicalUrl = 'https://zabohatsicesko.cz/blog';

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
  } = await fetchPageData();

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

export default async function BlogPage() {
  // 1. Fetch ACF ze stránky /blog
  const blogPageRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=blog&_embed',
    { cache: 'no-store' }
  );
  if (!blogPageRes.ok) throw new Error('Failed to fetch blog page');
  const blogPageData = await blogPageRes.json();
  const blogPage = blogPageData[0];

  // 2. Fetch články
  const postsRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/blog?per_page=100&_embed',
    { cache: 'no-store' } 
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
      <Head>
        <link
          rel="preload"
          as="image"
          href="/images/heroimage.webp"
          type="image/webp"
        />
      </Head>
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
        <ContactFormClient/>
        
      </main>
    </div>
  );
}
