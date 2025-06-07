'use client';
import { useEffect, useState } from 'react';

export default function BlogPostPage({ params }) {
  const { slug } = params;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/blog?slug=${slug}&_embed`);
        if (!res.ok) throw new Error('Failed to fetch blog post');
        const data = await res.json();
        setPost(data[0]);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPost();
  }, [slug]);

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  if (!post) {
    return <p className="text-center">Načítání článku…</p>;
  }

  const title = post.title?.rendered || 'Článek';
  // Předpokládám, že pole ACF se jmenuje article_content
  const articleContent = post.acf?.article_content || '<p>Obsah není k dispozici.</p>';

  return (
    <section className="px-4 w-full">
        <h2>test</h2>
        <div className="flex flex-col md:flex-row items-center w-full max-w-[1000px] mx-auto py-12 md:py-24">
            <article
                className="prose max-w-full article"
                dangerouslySetInnerHTML={{ __html: articleContent }}
            />
        </div>
    </section>
  );
}
