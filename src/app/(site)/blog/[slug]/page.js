// src/app/(site)/blog/[slug]/page.js

export default async function BlogPostPage({ params }) {
  const { slug } = params;

  const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/blog?slug=${slug}&_embed`);
  if (!res.ok) throw new Error('Failed to fetch blog post');
  const data = await res.json();
  const post = data[0];

  if (!post) {
    return <p>Článek nebyl nalezen.</p>;
  }

  const title = post.title?.rendered || 'Článek';

  return (
    <div className="flex flex-col items-center px-4 py-12 max-w-[800px] mx-auto">
      <h1 className="text-4xl font-bold text-goldenBrown mb-6 text-center" dangerouslySetInnerHTML={{ __html: title }} />
      {/* Sem přijde později obsah článku */}
    </div>
  );
}
