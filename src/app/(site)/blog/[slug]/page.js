'use client';
import { useEffect, useState } from 'react';

export default function BlogPostPage({ params }) {
  const { slug } = params;

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [articleUrl, setArticleUrl] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setArticleUrl(window.location.href); // ← bezpečně až na klientovi
  }, []);

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

  if (error) return <p className="text-red-600 text-center">{error}</p>;
  if (!post) return <p className="text-center">Načítání článku…</p>;

  const title = post.title?.rendered || 'Článek';
  const articleContent = post.acf?.article_content || '<p>Obsah není k dispozici.</p>';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      alert('Odkaz zkopírován do schránky!');
    } catch (err) {
      alert('Nepodařilo se zkopírovat odkaz.');
    }
  };

  return (
    <section className="px-4 w-full">
      <div className="flex flex-col items-center w-full max-w-[1000px] mx-auto py-12 md:py-24">
        <article
          className="prose max-w-full article"
          dangerouslySetInnerHTML={{ __html: articleContent }}
        />

        {/* Sdílecí tlačítka */}
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Facebook
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(articleUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            WhatsApp
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(articleUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition"
          >
            LinkedIn
          </a>
          <button
            onClick={handleCopy}
            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Kopírovat odkaz
          </button>
        </div>
      </div>
    </section>
  );
}
