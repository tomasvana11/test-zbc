/*
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Hourglass } from 'ldrs/react';
import 'ldrs/react/Hourglass.css';
import ContactFormClient from '../../../components/ContactFormClient';

export default function BlogPostPage({ params }) {
  // OPRAVA: Nedestrukturujeme params přímo, ale zpracujeme je asynchronně
  const [slug, setSlug] = useState(null);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestError, setLatestError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  // Zpracování params v useEffect
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);

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

  // Načtení blog postu - čekáme na slug
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

    // Spustíme fetch pouze když máme slug
    if (slug) {
      fetchPost();
    }
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

  // Přidáme !slug do podmínky pro loading
  if (!post || showLoader || !slug) {
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

      {latestPosts.length > 0 && (
        <section className="flex flex-col items-center px-4 mx-auto py-12 md:py-24">
          <div className="max-w-[1392px] w-full">
            <h2 className="text-[28px] md:text-[40px] mb-6 md:mb-12 text-center text-goldenBrown">Nejnovější články z našeho blogu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {latestPosts.map((post) => (
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
      )}

      {latestError && (
        <p className="text-red-600 text-center mt-4">{latestError}</p>
      )}

      <ContactFormClient/>

    </main>
  );
}
  */

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Hourglass } from 'ldrs/react';
import 'ldrs/react/Hourglass.css';
import ContactFormClient from '../../../components/ContactFormClient';

export default function BlogPostPage({ params }) {
  const [slug, setSlug] = useState(null);
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [latestError, setLatestError] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    resolveParams();
  }, [params]);

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
        const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/blog?slug=${slug}&_embed`);
        if (!res.ok) throw new Error('Failed to fetch blog post');
        const data = await res.json();
        setPost(data[0]);
      } catch (err) {
        setError(err.message);
      }
    };

    if (slug) {
      fetchPost();
    }
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

  if (!post || showLoader || !slug) {
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
            className="prose prose-lg prose-headings:text-goldenBrown prose-a:text-goldenBrown prose-a:underline hover:prose-a:opacity-80 prose-strong:text-raisinBlack prose-img:rounded-lg max-w-full"
            dangerouslySetInnerHTML={{ __html: articleContent }}
          />
        </div>
      </section>
      <section className="px-4 w-full">
        <div className="max-w-[1392px] mx-auto">
          <hr className="w-full border-1 h-[1px] lightDivGrey" />
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="flex flex-col items-center px-4 mx-auto py-12 md:py-24">
          <div className="max-w-[1392px] w-full">
            <h2 className="text-[28px] md:text-[40px] mb-6 md:mb-12 text-center text-goldenBrown">Nejnovější články z našeho blogu</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {latestPosts.map((post) => (
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
      )}

      {latestError && (
        <p className="text-red-600 text-center mt-4">{latestError}</p>
      )}

      <ContactFormClient/>

    </main>
  );
}