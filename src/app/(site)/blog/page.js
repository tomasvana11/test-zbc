// src/app/(site)/blog/page.js

import PageHeader from '../../components/PageHeader';

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

      <main className="flex flex-col items-center px-4 py-16">
        <div className="max-w-[1392px] w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="flex flex-col bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                >
                    <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-52 object-cover"
                    />
                    <div className="p-4 flex flex-col flex-grow">
                    <h3
                        className="text-lg text-raisinBlack font-semibold mb-2"
                        dangerouslySetInnerHTML={{ __html: post.title }}
                    />
                    <div
                        className="text-sm text-gray-600 mb-4"
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    <hr className="border-t border-gray-200 my-2" />
                    <div className="mt-auto flex justify-between items-center text-sm text-blue-600">
                        <a href={`/blog/${post.slug}`} className="hover:underline">
                        Otevřít článek
                        </a>
                        <span className="text-gray-400">{post.date}</span>
                    </div>
                    </div>
                </div>
                ))}

          </div>
        </div>
      </main>
    </div>
  );
}
