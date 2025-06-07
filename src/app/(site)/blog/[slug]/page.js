'use client';
import { useEffect } from 'react';

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

  return (
    <div className="flex flex-col items-center px-4 py-12 max-w-[800px] mx-auto">
      <h1
        className="text-4xl font-bold text-goldenBrown mb-6 text-center"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {/* Sem přijde později obsah článku */}
    </div>
  );
}
