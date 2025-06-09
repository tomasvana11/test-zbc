// src/app/(site)/gdpr/page.js

async function fetchGDPRPage() {
  const res = await fetch('https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=gdpr', {
    // pro ISR: cache control, třeba revalidate 10 sekund
    next: { revalidate: 10 },
  });
  const data = await res.json();
  return data[0];
}

export default async function GDPRPage() {
  const page = await fetchGDPRPage();
  const pageContent = page?.acf?.page_content || '';

  return (
    <section className="px-4 w-full max-w-[1000px] mx-auto py-12 md:py-24">
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    </section>
  );
}
