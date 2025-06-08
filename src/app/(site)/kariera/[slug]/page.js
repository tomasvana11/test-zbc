'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Hourglass } from 'ldrs/react';
import 'ldrs/react/Hourglass.css';


export default function BlogPostPage({ params }) {
  const { slug } = params;

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestError, setLatestError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
  setShowLoader(true);
  const timer = setTimeout(() => {
    setShowLoader(false);
  }, 500); // min 500 ms

  return () => clearTimeout(timer);
}, [post]);



  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/blog?per_page=4&_embed');
        if (!res.ok) throw new Error('Nepodařilo se načíst nejnovější články');
        const data = await res.json();

        const mapped = data.map((post) => ({
          id: post.id,
          slug: post.slug,
          title: post.title.rendered,
          image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.png',
          excerpt: post.excerpt.rendered,
          date: new Date(post.date).toLocaleDateString('cs-CZ'),
        }));

        setLatestPosts(mapped);
      } catch (err) {
        setLatestError(err.message);
      }
    };

    fetchLatestPosts();
  }, []);

  if (error) {
    return <p className="text-red-600 text-center">{error}</p>;
  }

  if (!post || showLoader) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <Hourglass size="60" bgOpacity="0.1" speed="1.75" color="black" />
      <p className="mt-4 text-lg font-semibold text-gray-700">Načítání…</p>
    </div>
  );
}





  const articleContent = post.acf?.article_content || '<p>Obsah není k dispozici.</p>';

  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="px-4 w-full">
        <div className="flex flex-col md:flex-row items-center w-full max-w-[1000px] mx-auto py-12 md:py-24">
          <article
            className="prose max-w-full article"
            dangerouslySetInnerHTML={{ __html: articleContent }}
          />
        </div>
      </section>
      <section className="px-4 w-full">
        <div className="max-w-[1392px] mx-auto">
          <hr className="w-full border-1 h-[1px] lightDivGrey" />
        </div>
    </section>

    </main>
  );
}
