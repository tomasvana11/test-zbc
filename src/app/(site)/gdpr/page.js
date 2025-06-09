// pages/gdpr.js

export async function getStaticProps() {
  const res = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=gdpr');
  const data = await res.json();

  // Předpokládám, že API vrací pole a první prvek je ta stránka
  const page = data[0];

  // Vezmeme ACF pole page_content, může být prázdné string pokud není definováno
  const pageContent = page.acf?.page_content || '';

  return {
    props: {
      pageContent,
    },
    revalidate: 10, // Obnovení obsahu každých 10 sekund (ISR)
  };
}

export default function GDPRPage({ pageContent }) {
  return (
    <main>
      <section className="px-4 w-full max-w-[1000px] mx-auto py-12 md:py-24">
        {/* Vkládáme HTML z ACF pole */}
        <div dangerouslySetInnerHTML={{ __html: pageContent }} />
      </section>
    </main>
  );
}
