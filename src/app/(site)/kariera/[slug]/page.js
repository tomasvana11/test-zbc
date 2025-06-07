export async function generateStaticParams() {
  const res = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/pracovni-pozice');
  const pozice = await res.json();

  return pozice.map((p) => ({
    slug: p.slug,
  }));
}

export default async function PozicePage({ params }) {
  const res = await fetch(
    `https://api.zabohatsicesko.cz/wp-json/wp/v2/pracovni-pozice?slug=${params.slug}`,
    { next: { revalidate: 60 } } // nebo cache: 'no-store' pro čerstvá data
  );
  const data = await res.json();
  const pozice = data[0];

  if (!pozice) return <div>Pozice nenalezena.</div>;

  return (
    <main className="max-w-[800px] mx-auto py-12">
      <h1 className="text-[32px] text-goldenBrown text-center">
        {pozice.title.rendered}
      </h1>
      {pozice.acf?.lokalita && (
        <p className="text-center text-gray-500 mt-2">{pozice.acf.lokalita}</p>
      )}
      <div className="mt-8 text-center text-raisinBlack">
        {/* Můžeš zobrazit i pozice.content.rendered */}
        (Tady bude detail pozice…)
      </div>
    </main>
  );
}
