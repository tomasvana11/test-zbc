// src/app/(site)/nas-tym/layout.js

import fetchPageData from '../../../lib/fetchPageData';
import PageHeader from '../../components/PageHeader';

export default async function TymLayout({ children }) {
  const page = await fetchPageData('podcast');

  return (
    <>
      <PageHeader
        title={page?.acf?.page_name || page?.title?.rendered || 'Náš tým'}
        description={page?.acf?.page_desc || null}
      >
        <div className="flex flex-row gap-2 items-start md:justify-end mt-4">
            {[
              { href: "https://www.facebook.com/Zabohatsicesko", img: "icon_fb.svg", alt: "Facebook" },
              { href: "https://www.instagram.com/zabohatsicesko", img: "icon_ig.svg", alt: "Instagram" },
              { href: "https://www.youtube.com/@zabohatsicesko", img: "icon_ytb.svg", alt: "YouTube" },
              { href: "https://www.linkedin.com/company/za-bohatší-česko-s-r-o/about/", img: "icon_ln.svg", alt: "LinkedIn" },
              { href: "https://open.spotify.com/show/5Mig7pzSX0z5fairbQaeZu?si=ES-SWDUrQTSKUDjPxM_bWw", img: "icon_spot.svg", alt: "Spotify" },
              { href: "https://podcasts.apple.com/cz/podcast/za-bohat%C5%A1%C3%AD-%C4%8Desko/id1542800787", img: "icon_app.svg", alt: "Apple Podcasts" }
            ].map((link, i) => (
              <div key={i} className="bg-raisinBlack/80 hover:bg-raisinBlack transition-colors duration-300 w-[36px] h-[36px] rounded">
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <img src={`/images/${link.img}`} alt={link.alt} className="w-[36px] h-[36px]" />
                </a>
              </div>
            ))}
          </div>
      </PageHeader>
      <main>{children}</main>
    </>
  );
}