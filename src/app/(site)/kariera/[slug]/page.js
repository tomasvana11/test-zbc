'use client';
import { useEffect, useState } from 'react';
import { Hourglass } from 'ldrs/react';
import 'ldrs/react/Hourglass.css';

export default function KarieraPozicePage({ params }) {
  const { slug } = params;

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setShowLoader(true);
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [post]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/pracovni-pozice?slug=${slug}&_embed`);
        if (!res.ok) throw new Error('Nepodařilo se načíst pracovní pozici');
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

  if (!post || showLoader) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <Hourglass size="60" bgOpacity="0.1" speed="1.75" color="black" />
        <p className="mt-4 text-lg font-semibold text-gray-700">Načítání…</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24">
      <h1 className="text-3xl font-bold">{post.title.rendered}</h1>
      {/* Tady bude zbytek obsahu (nabízíme, požadujeme, formulář…) */}
    </main>
  );
}
