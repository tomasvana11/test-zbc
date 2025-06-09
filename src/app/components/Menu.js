export default function Menu() {
  return (
    <footer className="bg-raisinBlack w-full px-4 fixed">
      <div className="flex flex-col md:flex-row w-full items-center max-w-[1392px] mx-auto justify-between py-12 md:py-16">
        <div className="flex flex-row md:w-1/2 w-full justify-between">
          <div className="md:w-1/3 items-start">
            <img src="/images/zbc-logo-vertical.svg" alt="Symbol Gold" className="w-[125px]" />
          </div>
          <div className="md:w-2/3 items-start pr-8">
            <p className="text-silkBeige pl-8">
              Za bohatší Česko s.r.o<br />
              Jankovcova 1569/2c 170 00, Praha 7<br />
              +420 603 818 647 <br />
              info@zabohatsicesko.cz
            </p>
          </div>
        </div>
        <div className="md:w-1/2 w-full items-start md:items-end mt-4 md:mt-0">
          <h3 className="footer_h text-goldenBrown text-3xl text-left md:text-right">Sledujte nás</h3>
          <div className="flex flex-row gap-2 items-start md:justify-end mt-4">
            {[
              { href: "https://www.facebook.com/Zabohatsicesko", img: "icon_fb.svg", alt: "Facebook" },
              { href: "https://www.instagram.com/zabohatsicesko", img: "icon_ig.svg", alt: "Instagram" },
              { href: "https://www.youtube.com/@zabohatsicesko", img: "icon_ytb.svg", alt: "YouTube" },
              { href: "https://www.linkedin.com/company/za-bohatší-česko-s-r-o/about/", img: "icon_ln.svg", alt: "LinkedIn" },
              { href: "https://open.spotify.com/show/5Mig7pzSX0z5fairbQaeZu?si=ES-SWDUrQTSKUDjPxM_bWw", img: "icon_spot.svg", alt: "Spotify" },
              { href: "https://podcasts.apple.com/cz/podcast/za-bohat%C5%A1%C3%AD-%C4%8Desko/id1542800787", img: "icon_app.svg", alt: "Apple Podcasts" }
            ].map((link, i) => (
              <div key={i} className="bg-socialDiv w-[36px] h-[36px] rounded">
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <img src={`/images/${link.img}`} alt={link.alt} className="w-[36px] h-[36px]" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className="border-darkDivGrey w-full max-w-[1392px] mx-auto" />
      <div className="flex flex-col md:flex-row w-full items-center max-w-[1392px] mx-auto py-8 md:py-12 ">
        <p className="text-silkBeige text-center mx-auto">
          © 2025 Za bohatší Česko | Všechna práva vyhrazena |{" "}
          <a href="https://www.zabohatsicesko.cz/gdpr">Ochrana osobních údajů</a> |{" "}
          <a href="https://www.zabohatsicesko.cz/gdpr#cookies">Cookies</a>
        </p>
      </div>
    </footer>
  );
}
