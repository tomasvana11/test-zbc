export async function fetchPageData(slug) {
  const res = await fetch(`https://api.zabohatsicesko.cz/wp-json/wp/v2/pages?slug=${slug}&acf_format=standard`, {
    next: { revalidate: 60 }, // ISR
  });

  const data = await res.json();
  return data?.[0] || null;
}
