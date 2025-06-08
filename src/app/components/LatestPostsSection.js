// components/LatestPostsSection.jsx
import Link from 'next/link';

export default function LatestPostsSection({ posts }) {
  return (
    <section className="py-12 md:py-16 px-4 bg-silkBeige">
      <div className="max-w-[1392px] mx-auto">
        <h2 className="text-[28px] md:text-[40px] text-goldenBrown text-left mb-8">
          Nejnovější články
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="flex flex-col bg-white rounded-lg hover:shadow-lg transition overflow-hidden group"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-52 object-cover"
              />
              <div className="px-5 py-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3
                    className="text-lg text-goldenBrown font-satoshi-bold mb-2 group-hover:underline"
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  />
                  <div
                    className="text-raisinBlack text-sm"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                </div>
                <div className="pt-4 text-right text-sm text-raisinBlack/50">{post.date}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
