// src/app/(site)/blog/page.js

import PageHeader from '../../components/PageHeader';

export default async function BlogPage() {
  // 1. Fetch ACF ze stránky /blog
  const blogPageRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=blog&_embed',
    { next: { revalidate: 60 } }
  );
  if (!blogPageRes.ok) throw new Error('Failed to fetch blog page');
  const blogPageData = await blogPageRes.json();
  const blogPage = blogPageData[0];

  // 2. Fetch 3 nejnovější články
  const postsRes = await fetch(
    'https://api.zabohatsicesko.cz/wp-json/wp/v2/blog?per_page=3&_embed',
    { next: { revalidate: 60 } }
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
          <h2 className="text-[28px] lg:text-[36px] text-goldenBrown mb-10 text-center">
            Nejnovější články
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4">
                  <h3
                    className="text-lg text-raisinBlack font-semibold"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
